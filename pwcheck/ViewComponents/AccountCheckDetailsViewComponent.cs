using Microsoft.AspNetCore.Mvc;
using pwcheck.Helpers;
using pwcheck.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;

namespace pwcheck.ViewComponents {
    public class AccountCheckDetailsViewComponent : ViewComponent {

        private readonly HttpClient httpClient;

        public AccountCheckDetailsViewComponent(IHttpClientFactory httpClientFactory) {
            httpClient = httpClientFactory.CreateClient(Constants.DEFAULT_HTTP_CLIENT);
        }

        public async Task<IViewComponentResult> InvokeAsync(string breachName) {

            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Add("User-Agent", Constants.HTTP_CLIENT_USERAGENT);

            DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(Breach));

            Task<Stream> streamTask = httpClient.GetStreamAsync("https://haveibeenpwned.com/api/v2/breach/" + breachName);
            Breach breach = serializer.ReadObject(await streamTask) as Breach;

            return View(breach);
        }
    }
}
