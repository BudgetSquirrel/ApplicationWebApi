using BudgetTracker.BudgetSquirrel.Application;
using BudgetTracker.BudgetSquirrel.Application.Messages;
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
        private IBudgetRepository _budgetRepository;
        private IUserRepository _userRepository;
        private ITransactionRepository _transactionRepository;

        public TransactionTests() : base()
        {
            _seeder = GetTestUtilService<BasicSeed>();
            _transactionBuilderFactory = GetTestUtilService<TransactionBuilderFactory>();
            _budgetRepository = GetTestServerService<IBudgetRepository>();
            _userRepository = GetTestServerService<IUserRepository>();
            _transactionRepository = GetTestServerService<ITransactionRepository>();
        }

        [Fact]
        public async Task Test_BudgetFundUpdated_When_TransactionLogged()
        {
            Budget root;
            root = await _seeder.Seed(_userRepository, _budgetRepository);

            Budget budgetForTransaction = root.SubBudgets[1];
            TransactionMessage message = _transactionBuilderFactory.GetMessageBuilder()
                                                    .SetBudgetId(budgetForTransaction.Id)
                                                    .SetAmount(30)
                                                    .Build();
            decimal expectedNewFundBalance = budgetForTransaction.FundBalance + message.Amount;

            string requestData = JsonConvert.SerializeObject(message);
            string userPassword = _encryptionHelper.Decrypt(root.Owner.Password);
            string messageStr = $"{{'user': {{ 'username': '{root.Owner.Username}', 'password': '{userPassword}' }}," +
                                $"'arguments': {{ 'transaction-values': {requestData} }} }}";
            ApiRequest request = JsonConvert.DeserializeObject<ApiRequest>(messageStr);
            HttpResponseMessage response = await _startup.SendJsonMessage(BudgetSquirrelUri.TRANSACTIONS_LOG, request, "POST");
            response.EnsureSuccessStatusCode();
            ResetServerServiceScope();

            BudgetModel updatedBudget = await _dbContext.Budgets.Where(b => b.Id == budgetForTransaction.Id).SingleAsync();
            Assert.Equal(expectedNewFundBalance, updatedBudget.FundBalance);
        }
    }
}
