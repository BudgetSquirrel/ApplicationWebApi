using System;
using System.Threading.Tasks;
using BudgetSquirrel.Api.RequestModels;
using BudgetSquirrel.Business.Auth;
using BudgetSquirrel.Data.EntityFramework;
using BudgetSquirrel.Services.Interfaces;
using BudgetSqurrel.Data.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetSquirrel.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly BudgetSquirrelContext dbConext;

        public AuthService(BudgetSquirrelContext dbConext)
        {
            this.dbConext = dbConext;
        }

        public Task<UserRecord> Authenticate(LoginRequest credentials)
        {
            var userRecord = this.dbConext.Users.SingleAsync(x => x.Username == credentials.Username);

            // Ian to hook up

            return userRecord;
        }
    }
}