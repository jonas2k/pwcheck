using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pwcheck.Models {
    public class Breach {

        public string Title { get; set; }
        public string Name { get; set; }
        public string AddedDate { get; set; }
        public string BreachDate { get; set; }
        public int PwnCount { get; set; }
        public string LogoPath { get; set; }
        public bool IsVerified { get; set; }
        public string[] DataClasses { get; set; }

        public string GetDottedPwnCount() {
            return PwnCount.ToString("N0");
        }

        public string GetFormattedAddedDate() {
            return ParseDate(AddedDate);
        }

        public string GetFormattedBreachDate() {
            return ParseDate(BreachDate);
        }

        private string ParseDate(string input) {
            return DateTime.Parse(input).ToString("dd.MM.yyyy");
        }
    }
}