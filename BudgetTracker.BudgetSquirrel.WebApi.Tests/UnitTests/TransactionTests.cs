using BudgetTracker.BudgetSquirrel.Application;
using BudgetTracker.BudgetSquirrel.Application.Messages;
using BudgetTracker.BudgetSquirrel.WebApi.Tests.ApiMessages;
using BudgetTracker.BudgetSquirrel.WebApi.Tests.Utils;
using BudgetTracker.Business.Auth;
using BudgetTracker.Business.Budgeting;
using BudgetTracker.Business.Transactions;
using BudgetTracker.Business.Ports.Exceptions;
using BudgetTracker.Business.Ports.Repositories;
using BudgetTracker.TestUtils.Auth;
using BudgetTracker.TestUtils.Budgeting;
using BudgetTracker.TestUtils.Transactions;
using GateKeeper;
using GateKeeper.Repositories;
using Microsoft.Extensions.Configuration;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace BudgetTracker.BudgetSquirrel.WebApi.Tests.UnitTests
{
    public class TransactionTests : BaseUnitTest
    {
        private BudgetBuilderFactory<Budget> _budgetBuilderFactory;
        private TransactionBuilderFactory _transactionBuilderFactory;
        private UserFactory _userFactory;
        private EncryptionHelper _encryptionHelper;

        public TransactionTests()
        {
            _budgetBuilderFactory = GetService<BudgetBuilderFactory<Budget>>();
            _transactionBuilderFactory = GetService<TransactionBuilderFactory>();
            _userFactory = GetService<UserFactory>();
            _encryptionHelper = GetService<EncryptionHelper>();
        }

        [Fact]
        public async Task Test_ErrorReturned_When_TransactionLogged_And_BudgetNotFound()
        {
            User owner = _userFactory.NewUser();
            owner.Password = _encryptionHelper.Encrypt(owner.Password);
            Mock<IBudgetRepository> mockBudgetRepository = new Mock<IBudgetRepository>();
            mockBudgetRepository.Setup(repo => repo.GetBudget(It.IsAny<Guid>()))
                                .Throws(new RepositoryException(""));
            Mock<IGateKeeperUserRepository<User>> mockUserRepo = new Mock<IGateKeeperUserRepository<User>>();
            mockUserRepo.Setup(repo => repo.GetByUsername(It.IsAny<string>()))
                                .Returns(Task.FromResult(owner));

            TransactionApi api = new TransactionApi(null, mockBudgetRepository.Object,
                _startup.Config, mockUserRepo.Object);

            TransactionMessage message = _transactionBuilderFactory.GetMessageBuilder()
                                                    .SetBudgetId(Guid.NewGuid())
                                                    .Build();

            ApiRequest request = ApiRequestHelper.ToMessage("test123", _encryptionHelper.Decrypt(owner.Password), message);

            ApiResponse testResult = await api.LogTransaction(request);
            Assert.Equal("That budget cannot be found.", testResult.Error);
        }
    }
}
