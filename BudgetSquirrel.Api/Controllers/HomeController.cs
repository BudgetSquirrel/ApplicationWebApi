using BudgetTracker.BudgetSquirrel.Application;
using BudgetTracker.BudgetSquirrel.Application.Messages;
using BudgetTracker.BudgetSquirrel.Application.Messages.AuthenticationApi;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using BudgetSquirrel.Api.Models;

namespace BudgetSquirrel.Api.Controllers
{
    public class HomeController : Controller
    {
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
