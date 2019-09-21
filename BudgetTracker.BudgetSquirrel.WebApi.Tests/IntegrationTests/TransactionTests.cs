using BudgetTracker.BudgetSquirrel.Application;
using BudgetTracker.BudgetSquirrel.Application.Messages;
using BudgetTracker.BudgetSquirrel.WebApi.Tests.ApiMessages;
using BudgetTracker.Business.Auth;
using BudgetTracker.Business.Budgeting;
using BudgetTracker.Business.Transactions;
using BudgetTracker.Business.Ports.Repositories;
using BudgetTracker.Data.EntityFramework;
using BudgetTracker.Data.EntityFramework.Models;
using BudgetTracker.TestUtils.Seeds;
using BudgetTracker.TestUtils.Transactions;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace BudgetTracker.BudgetSquirrel.WebApi.Tests.IntegrationTests
{
    public class TransactionTests : TestBase
    {
        private BasicSeed _seeder;
        private TransactionBuilderFactory _transactionBuilderFactory;
        private TransactionFactory _transactionFactory;
        private IBudgetRepository _budgetRepository;
        private IUserRepository _userRepository;
        private ITransactionRepository _transactionRepository;

        public TransactionTests() : base()
        {
            _seeder = GetTestUtilService<BasicSeed>();
            _transactionBuilderFactory = GetTestUtilService<TransactionBuilderFactory>();
            _transactionFactory = GetTestUtilService<TransactionFactory>();
            _budgetRepository = GetTestServerService<IBudgetRepository>();
            _userRepository = GetTestServerService<IUserRepository>();
            _transactionRepository = GetTestServerService<ITransactionRepository>();
        }

        [Fact]
        public async Task Test_BudgetFundUpdated_When_TransactionLogged()
        {
            Budget root = await _seeder.Seed(_userRepository, _budgetRepository);

            Budget budgetForTransaction = root.SubBudgets[1];
            TransactionMessage message = _transactionBuilderFactory.GetMessageBuilder()
                                                    .SetBudgetId(budgetForTransaction.Id)
                                                    .SetAmount(30)
                                                    .Build();
            Dictionary<string, object> data = new Dictionary<string, object>()
            {
                { "transaction-values", message }
            };

            decimal expectedNewFundBalance = budgetForTransaction.FundBalance + message.Amount;

            string userPassword = _encryptionHelper.Decrypt(root.Owner.Password);
            ApiRequest request = ApiRequestHelper.ToMessage(root.Owner.Username, userPassword, data);
            HttpResponseMessage response = await _startup.SendJsonMessage(BudgetSquirrelUri.TRANSACTIONS_LOG, request, "POST");
            response.EnsureSuccessStatusCode();
            ResetServerServiceScope();

            BudgetModel updatedBudget = await _dbContext.Budgets.Where(b => b.Id == budgetForTransaction.Id).SingleAsync();
            Assert.Equal(expectedNewFundBalance, updatedBudget.FundBalance);
        }

        [Fact]
        public async Task Test_CorrectTransactionsReturned_When_Fetched()
        {
            Budget root = await _seeder.Seed(_userRepository, _budgetRepository);
            Budget budgetForTransactionFetch = root.SubBudgets.Single(b => b.SubBudgets != null && b.SubBudgets.Count() > 0);
            Budget randomOtherBudget = root.SubBudgets.Where(b => b.SetAmount > 0).First(b => b.SubBudgets == null || b.SubBudgets.Count() == 0);

            await _transactionFactory.CreateTransactionFor(budgetForTransactionFetch, _transactionRepository, _budgetRepository);
            await _transactionFactory.CreateTransactionFor(budgetForTransactionFetch.SubBudgets[0], _transactionRepository, _budgetRepository);

            // Create transaction that is for a completely different budget.
            await _transactionFactory.CreateTransactionFor(randomOtherBudget, _transactionRepository, _budgetRepository);

            // Now test...
        }
    }
}
