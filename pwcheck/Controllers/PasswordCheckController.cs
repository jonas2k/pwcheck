using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace pwcheck.Controllers {
    public class PasswordCheckController : Controller {

        public IActionResult Index() => View();
    }
}