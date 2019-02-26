using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pwcheck.Models {
    public class HibpSettings {
        public string HibpPwnedAccountCheckUrl { get; set; }
        public string HibpPwnedBreachDetailsUrl { get; set; }
        public string HibpPwnedAllBreachesUrl { get; set; }
        public string HibpPwnedWebsitesUrl { get; set; }
    }
}
