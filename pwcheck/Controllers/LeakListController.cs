﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pwcheck.Models;
using pwcheck.Helpers;
using Microsoft.Extensions.Options;

namespace pwcheck.Controllers {
    public class LeakListController : Controller {

        private readonly HttpClient httpClient;
        private readonly HibpSettings hibpSettings;
        private readonly ILogger logger;

        public LeakListController(IHttpClientFactory httpClientFactory, ILogger<LeakListController> logger, IOptions<HibpSettings> hibpSettingsOptions) {
            httpClient = httpClientFactory.CreateClient(Constants.DEFAULT_HTTP_CLIENT);
            hibpSettings = hibpSettingsOptions.Value;
            this.logger = logger;
        }

        public IActionResult Index() {

            List<Breach> breaches;
            try {
                breaches = GetLatestBreaches().Result;
            } catch (Exception exception) {
                logger.LogWarning(exception, "An exception occured during http request");
                breaches = new List<Breach>();
            }
            return View(breaches);
        }

        private async Task<List<Breach>> GetLatestBreaches() {
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Add("User-Agent", Constants.HTTP_CLIENT_USERAGENT);

            DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<Breach>));

            Task<Stream> streamTask = httpClient.GetStreamAsync(hibpSettings.HibpPwnedAllBreachesUrl);
            List<Breach> breaches = serializer.ReadObject(await streamTask) as List<Breach>;
            return breaches;
        }
    }
}