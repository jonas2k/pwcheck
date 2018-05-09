using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pwcheck.Helpers {
    public static class Extensions {

        public static bool IsNullOrEmptyExt(this string s) {
            return (s == null || s.Equals(""));
        }

        public static bool IsNullOrEmptyExt(this ICollection collection) {
            return (collection == null || collection.Count == 0);
        }
    }
}