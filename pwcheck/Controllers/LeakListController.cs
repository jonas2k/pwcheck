using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pwcheck.Models;

namespace pwcheck.Controllers {
    public class LeakListController : Controller {

        private readonly HttpClient httpClient;

        public LeakListController(HttpClient httpClient) {
            this.httpClient = httpClient;
        }

        public IActionResult Index() {

            List<Breach> breaches;
            try {
                breaches = GetLatestBreaches().Result;
            } catch (Exception) {
                breaches = new List<Breach>();
            }
            return View(breaches);
        }

        private async Task<List<Breach>> GetLatestBreaches() {
            httpClient.DefaultRequestHeaders.Accept.Clear();

            DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<Breach>));

            Task<Stream> streamTask = httpClient.GetStreamAsync("https://haveibeenpwned.com/api/v2/breaches");
            List<Breach> breaches = serializer.ReadObject(await streamTask) as List<Breach>;
            return breaches;
        }
    }
}