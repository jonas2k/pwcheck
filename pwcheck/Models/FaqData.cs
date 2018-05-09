using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pwcheck.Models {
    public class FaqData {
        public List<FaqDataItem> FaqDataList { get; set; }
    }

    public class FaqDataItem {
        public string Question { get; set; }
        public List<string> Answer { get; set; }
    }
}