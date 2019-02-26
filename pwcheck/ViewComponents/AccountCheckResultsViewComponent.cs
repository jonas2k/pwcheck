using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using pwcheck.Helpers;
using pwcheck.Models;
using pwcheck.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;

namespace pwcheck.ViewComponents {
    public class AccountCheckResultsViewComponent : ViewComponent {

        private readonly HttpClient httpClient;
        private readonly HibpSettings hibpSettings;

        public AccountCheckResultsViewComponent(IHttpClientFactory httpClientFactory, IOptions<HibpSettings> hibpSettingsOptions) {
            httpClient = httpClientFactory.CreateClient(Constants.DEFAULT_HTTP_CLIENT);
            hibpSettings = hibpSettingsOptions.Value;
        }

        public async Task<IViewComponentResult> InvokeAsync(string input, bool includeUnverified) {

            AccountCheckResultsViewComponentViewModel model = new AccountCheckResultsViewComponentViewModel();

            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Add("User-Agent", Constants.HTTP_CLIENT_USERAGENT);

            DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<Breach>));

            HttpResponseMessage httpResponseMessage = await httpClient.GetAsync(hibpSettings.HibpPwnedAccountCheckUrl + input + "?" + (includeUnverified ? "includeUnverified=true" : "") + "&truncateResponse=true");

            model.Breaches = new List<Breach>();

            switch (httpResponseMessage.StatusCode) {
                case HttpStatusCode.OK:
                    model.Breaches = serializer.ReadObject(await httpResponseMessage.Content.ReadAsStreamAsync()) as List<Breach>;
                    break;
                case HttpStatusCode.NotFound:
                    model.Message = "Dieser Anmeldename ist in keinem bekannten gestohlenen Datensatz enthalten.";
                    break;
                case HttpStatusCode.BadRequest:
                    model.Message = "Bad request";
                    break;
                case HttpStatusCode.TooManyRequests:
                    model.Message = "Too many requests";
                    break;
                default:
                    model.Message = "Fehler beim Abfragen der Daten.";
                    break;
            }
            return View(model);
        }
    }
}