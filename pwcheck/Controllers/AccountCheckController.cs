using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace pwcheck.Controllers {
    public class AccountCheckController : Controller {

        public IActionResult Index() => View();

        [HttpPost]
        public IActionResult CheckAccount(string input, bool includeUnverified) => ViewComponent("AccountCheckResults", new { input, includeUnverified });

        [HttpPost]
        public IActionResult GetBreachDetails(string breachName) => ViewComponent("AccountCheckDetails", breachName);
    }
}