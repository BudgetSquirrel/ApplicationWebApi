using BudgetTracker.BudgetSquirrel.Application.Messages;
using BudgetTracker.BudgetSquirrel.Application.Messages.BudgetApi;
using BudgetTracker.Business.Auth;
using BudgetTracker.Business.Budgeting;
using BudgetTracker.Business.Converters.BudgetConverters;
using BudgetTracker.Business.Ports.Exceptions;
using BudgetTracker.Business.Ports.Repositories;
using BudgetTracker.Common;

using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;
using GateKeeper.Repositories;

using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BudgetTracker.BudgetSquirrel.Application
{
    public class BudgetApi : ApiBase, IBudgetApi
    {
        private readonly IBudgetRepository _budgetRepository;
        private readonly BudgetCreator _budgetCreator;
        private readonly BudgetUpdater _budgetUpdater;
        private readonly BudgetValidator _budgetValidator;
        private readonly BudgetMessageConverter _budgetMessageConverter;

        public BudgetApi(IBudgetRepository budgetRepository, BudgetCreator budgetCreator,
            BudgetUpdater budgetUpdater, BudgetValidator budgetValidator,
            BudgetMessageConverter budgetMessageConverter,
            IAuthenticationService authenticationService)
            : base(authenticationService)
        {
            _budgetRepository = budgetRepository;
            _budgetCreator = budgetCreator;
            _budgetUpdater = budgetUpdater;
            _budgetValidator = budgetValidator;
            _budgetMessageConverter = budgetMessageConverter;
        }

        public async Task<ApiResponse> CreateBudget(ApiRequest request)
        {
            User user = await Authenticate();
            CreateBudgetArgumentApiMessage budgetRequest = request.Arguments<CreateBudgetArgumentApiMessage>();
            CreateBudgetRequestMessage budgetValues = budgetRequest.BudgetValues;

            try
            {
                Budget createdBudget = await _budgetCreator.CreateBudgetForUser(budgetValues, user);
                return new ApiResponse(new { success = true });
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        public async Task<ApiResponse> UpdateBudget(ApiRequest request)
        {
            await Authenticate();
            UpdateBudgetArgumentApiMessage budgetRequest = request.Arguments<UpdateBudgetArgumentApiMessage>();
            UpdateBudgetRequestMessage updateValues = budgetRequest.BudgetValues;

            try
            {
                Budget updatedBudget = await _budgetUpdater.UpdateBudget(updateValues);
                return new ApiResponse(new { success = true });
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        public async Task<ApiResponse> DeleteBudgets(ApiRequest request)
        {
            await Authenticate();

            ApiResponse response = null;

            DeleteBudgetArgumentsApiMessage deleteArgs = request.Arguments<DeleteBudgetArgumentsApiMessage>();
            try
            {
                await _budgetRepository.DeleteBudgets(deleteArgs.BudgetIds);
                response = new ApiResponse();
            }
            catch (RepositoryException e)
            {
                response = new ApiResponse(e.Message);
            }

            return response;
        }

        public async Task<ApiResponse> GetBudget(ApiRequest request)
        {
            User user = await Authenticate();

            GetBudgetArgumentApiMessage getBudget = request.Arguments<GetBudgetArgumentApiMessage>();

            ApiResponse response = new ApiResponse();

            try
            {
                Budget retrievedBudget = await GetBudgetIfAuthorized(getBudget.BudgetValues.Id, user.Id.Value);

                if (retrievedBudget != null)
                {
                    response.Response = _budgetMessageConverter.ToGeneralResponseMessage(retrievedBudget);
                }
                else
                {
                    response.Error = "Could not find the requested budget for this user";
                }
            }
            catch (RepositoryException ex)
            {
                response.Error = ex.Message;
            }

            return response;
        }

        public async Task<ApiResponse> GetRootBudgets(ApiRequest request)
        {
            User user = await Authenticate();
            ApiResponse response;

            List<Budget> rootBudgets = await _budgetRepository.GetRootBudgets(user.Id.Value);
            List<BudgetResponseMessage> rootBudgetMessages = _budgetMessageConverter.ToGeneralResponseMessages(rootBudgets);
            BudgetListResponseMessage responseData = new BudgetListResponseMessage()
            {
                Budgets = rootBudgetMessages
            };

            response = new ApiResponse(responseData);
            return response;
        }

        public async Task<ApiResponse> FetchBudgetTree(ApiRequest request)
        {
            User user = await Authenticate();
            ApiResponse response = null;

            Guid rootBudgetId = request.Arguments<FetchBudgetTreeArgumentsApiMessage>().RootBudgetId;

            try
            {
                Budget rootBudget = await GetBudgetIfAuthorized(rootBudgetId, user.Id.Value);

                if (rootBudget != null)
                {
                    await _budgetRepository.LoadSubBudgets(rootBudget, true);
                    BudgetResponseMessage responseMessage = _budgetMessageConverter.ToGeneralResponseMessage(rootBudget);
                    response = new ApiResponse(responseMessage);
                }
                else
                {
                    response = new ApiResponse("Could not find the requested budget for this user");
                }
            }
            catch (RepositoryException ex)
            {
                response = new ApiResponse(ex.Message);
            }

            return response;
        }

        private async Task<Budget> GetBudgetIfAuthorized(Guid budgetId, Guid userId)
        {
            Budget retrievedBudget = await _budgetRepository.GetBudget(budgetId);

            if (retrievedBudget.Owner.Id != userId)
            {
                return null;
            }

            return retrievedBudget;
        }
    }
}
