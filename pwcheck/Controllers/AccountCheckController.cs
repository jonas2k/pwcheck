using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace pwcheck.Controllers {
    public class AccountCheckController : Controller {

        public IActionResult Index() => View();
    }
}