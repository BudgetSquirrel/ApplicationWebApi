using System;
using BudgetTracker.Business.Auth;

namespace BudgetTracker.BudgetSquirrel.Application.Messages.AuthenticationApi
{
    public class UserResponseMessage
    {
        public UserResponseMessage(User user)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Username = user.Username;
            Email = user.Email;
        }

        public UserResponseMessage() {}
        
        public Guid? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}