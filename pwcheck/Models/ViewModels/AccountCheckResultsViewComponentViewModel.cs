using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pwcheck.Models.ViewModels {
    public class AccountCheckResultsViewComponentViewModel {

        public List<Breach> Breaches { get; set; }
        public string Message { get; set; }
    }
}