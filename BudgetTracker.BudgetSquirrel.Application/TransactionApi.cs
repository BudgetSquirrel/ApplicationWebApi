using BudgetTracker.BudgetSquirrel.Application.Messages;
using BudgetTracker.BudgetSquirrel.Application.Messages.TransactionApi;
using BudgetTracker.Business.Auth;
using BudgetTracker.Business.Budgeting;
using BudgetTracker.Business.BudgetPeriods;
using BudgetTracker.Business.Converters;
using BudgetTracker.Business.Transactions;
using BudgetTracker.Business.Ports.Exceptions;
using BudgetTracker.Business.Ports.Repositories;
using BudgetTracker.Common.Exceptions;

using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;
using GateKeeper.Repositories;

using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BudgetTracker.BudgetSquirrel.Application
{
    public class TransactionApi : ApiBase<User>, ITransactionApi
    {
        private IBudgetRepository _budgetRepository;
        private ITransactionRepository _transactionRepository;

        public TransactionApi(ITransactionRepository transactionRepository,
            IBudgetRepository budgetRepository, IConfiguration appConfig,
            IGateKeeperUserRepository<User> userRepository)
        : base(userRepository, new Rfc2898Encryptor(),
                ConfigurationReader.FromAppConfiguration(appConfig))
        {
            _budgetRepository = budgetRepository;
            _transactionRepository = transactionRepository;
        }

        public async Task<ApiResponse> LogTransaction(ApiRequest request)
        {
            User user = await Authenticate(request);
            LogTransactionArgumentApiMessage transactionRequest = request.Arguments<LogTransactionArgumentApiMessage>();

            try {
                Budget budgetForTransaction;
                try
                {
                    budgetForTransaction = await _budgetRepository.GetBudget(transactionRequest.TransactionValues.BudgetId);
                }
                catch (RepositoryException)
                {
                    return new ApiResponse("That budget cannot be found.");
                }

                Transaction transaction = TransactionConverters.Convert(transactionRequest.TransactionValues);
                transaction.Owner = user;
                transaction.Budget = budgetForTransaction;
                await budgetForTransaction.ApplyTransaction(transaction, _budgetRepository);
                Transaction createdTransaction = await _transactionRepository.CreateTransaction(transaction);
                createdTransaction.Owner = user;
                createdTransaction.Budget = budgetForTransaction;
                TransactionMessage response = TransactionConverters.Convert(createdTransaction);
                return new ApiResponse(response);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        public async Task<ApiResponse> FetchTransactions(ApiRequest request)
        {
            User user = await Authenticate(request);
            FetchTransactionsArgumentApiMessage fetchParameters = request.Arguments<FetchTransactionsArgumentApiMessage>();

            DateTime toDate = fetchParameters.ToDate ?? DateTime.Now;
            DateTime fromDate = fetchParameters.FromDate ?? toDate.AddDays(-30);
            if (fetchParameters.ToDate - fetchParameters.FromDate > TimeSpan.FromDays(730))
            {
                return new ApiResponse("Cannot load more than 2 years worth of transactions for performace sake.");
            }

            Budget budget;
            try
            {
                budget = await _budgetRepository.GetBudget(fetchParameters.BudgetId);
            }
            catch (RepositoryException)
            {
                return new ApiResponse("That budget cannot be found.");
            }

            await _budgetRepository.LoadSubBudgets(budget, true);
            List<Transaction> transactions = await budget.GetTransactions(fetchParameters.FromDate, fetchParameters.ToDate, _transactionRepository);

            List<TransactionMessage> responseData = TransactionConverters.Convert(transactions);
            return new ApiResponse(responseData);
        }
    }
}
