﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using pwcheck.Models;
using System.Linq;
using System.Diagnostics;
using System.Net.Http;
using pwcheck.Helpers;
using System.Net;
using Microsoft.Extensions.Hosting;

namespace pwcheck {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services) {
            services.Configure<CurrentCommit>(Configuration);
            services.Configure<FaqData>(Configuration.GetSection("faqData"));
            services.Configure<HomeData>(Configuration.GetSection("homeData"));
            services.Configure<HibpSettings>(Configuration);

            services.AddHttpClient(Constants.DEFAULT_HTTP_CLIENT).ConfigurePrimaryHttpMessageHandler(() => {
                return GetHttpClientHandler();
            });

            services.AddRazorPages();
            services.AddApplicationInsightsTelemetry();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            } else {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseEndpoints(endpoints => {
                endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
            });
        }

        private HttpMessageHandler GetHttpClientHandler() {
            HttpClientHandler handler = new HttpClientHandler();
            string proxyHost = Configuration.GetValue<string>("ProxyHost");
            string proxyPort = Configuration.GetValue<string>("ProxyPort");

            if (!proxyHost.IsNullOrEmptyExt() && !proxyPort.IsNullOrEmptyExt()) {
                handler.Proxy = new WebProxy(proxyHost + ":" + Configuration.GetValue<string>("ProxyPort"), true);
                handler.UseProxy = true;
            } else {
                handler.UseProxy = false;
            }
            return handler;
        }
    }
}