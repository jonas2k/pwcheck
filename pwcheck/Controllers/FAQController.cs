using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using pwcheck.Models;

namespace pwcheck.Controllers {
    public class FaqController : Controller {

        public IActionResult Index() => View();
    }
}