using BudgetTracker.BudgetSquirrel.Application;
using BudgetTracker.BudgetSquirrel.Application.Messages;
using BudgetSquirrel.Api.Tests.ApiMessages;
using BudgetSquirrel.Api.Tests.Utils;
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

namespace BudgetSquirrel.Api.Tests.UnitTests
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
            Dictionary<string, object> data = new Dictionary<string, object>()
            {
                { "transaction-values", message }
            };

            ApiRequest request = ApiRequestHelper.ToMessage(owner.Username, _encryptionHelper.Decrypt(owner.Password), data);

            ApiResponse testResult = await api.LogTransaction(request);
            Assert.Equal("That budget cannot be found.", testResult.Error);
        }

        [Fact]
        public async Task Test_ErrorReturned_When_TransactionsFetched_And_BudgetNotFound()
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

            Dictionary<string, object> data = new Dictionary<string, object>()
            {
                { "budget-id", Guid.NewGuid() }
            };

            ApiRequest request = ApiRequestHelper.ToMessage(owner.Username, _encryptionHelper.Decrypt(owner.Password), data);

            ApiResponse testResult = await api.FetchTransactions(request);
            Assert.Equal("That budget cannot be found.", testResult.Error);
        }

        [Fact]
        public async Task Test_ErrorReturned_When_TransactionsFetched_And_UserDoesntOwnBudget()
        {
            User owner = _userFactory.NewUser();
            owner.Password = _encryptionHelper.Encrypt(owner.Password);
            Budget budget = _budgetBuilderFactory.GetBuilder().Build();

            Mock<IBudgetRepository> mockBudgetRepository = new Mock<IBudgetRepository>();
            mockBudgetRepository.Setup(repo => repo.GetBudget(It.IsAny<Guid>()))
                                .Returns(Task.FromResult(budget));
            Mock<IGateKeeperUserRepository<User>> mockUserRepo = new Mock<IGateKeeperUserRepository<User>>();
            mockUserRepo.Setup(repo => repo.GetByUsername(It.IsAny<string>()))
                                .Returns(Task.FromResult(owner));

            TransactionApi api = new TransactionApi(null, mockBudgetRepository.Object,
                _startup.Config, mockUserRepo.Object);

            Dictionary<string, object> data = new Dictionary<string, object>()
            {
                { "budget-id", budget.Id }
            };

            ApiRequest request = ApiRequestHelper.ToMessage(owner.Username, _encryptionHelper.Decrypt(owner.Password), data);

            ApiResponse testResult = await api.FetchTransactions(request);
            Assert.Equal("User does not own this budget.", testResult.Error);
        }

        [Theory]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        public async Task Test_ErrorReturned_When_TransactionsFetched_And_MoreThan2YearsFetched(int numYears)
        {
            User owner = _userFactory.NewUser();
            owner.Password = _encryptionHelper.Encrypt(owner.Password);
            Budget budget = _budgetBuilderFactory.GetBuilder().SetOwner(owner).Build();

            Mock<IBudgetRepository> mockBudgetRepository = new Mock<IBudgetRepository>();
            mockBudgetRepository.Setup(repo => repo.GetBudget(It.IsAny<Guid>()))
                                .Returns(Task.FromResult(budget));
            Mock<IGateKeeperUserRepository<User>> mockUserRepo = new Mock<IGateKeeperUserRepository<User>>();
            mockUserRepo.Setup(repo => repo.GetByUsername(It.IsAny<string>()))
                                .Returns(Task.FromResult(owner));

            TransactionApi api = new TransactionApi(null, mockBudgetRepository.Object,
                _startup.Config, mockUserRepo.Object);

            int startYear = 2015;
            int endYear = startYear + numYears;
            Dictionary<string, object> data = new Dictionary<string, object>()
            {
                { "budget-id", budget.Id },
                { "from-date", new DateTime(startYear, 01, 01) },
                { "to-date", new DateTime(endYear, 01, 01) }
            };

            ApiRequest request = ApiRequestHelper.ToMessage(owner.Username, _encryptionHelper.Decrypt(owner.Password), data);

            ApiResponse testResult = await api.FetchTransactions(request);
            Assert.Equal("Cannot load more than 2 years worth of transactions for performace sake.", testResult.Error);
        }
    }
}
