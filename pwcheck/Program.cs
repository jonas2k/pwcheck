using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace pwcheck {
    public class Program {
        public static void Main(string[] args) {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => {
                    webBuilder.ConfigureAppConfiguration((hostingContext, config) => {
                        var env = hostingContext.HostingEnvironment;
                        config.AddJsonFile("currentcommit.json", optional: true, reloadOnChange: true);
                        config.AddJsonFile("homeData.json", optional: false, reloadOnChange: true);
                        config.AddJsonFile("faqData.json", optional: false, reloadOnChange: true);
                    })

                    .UseStartup<Startup>();
                });
    }
}