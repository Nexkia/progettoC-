using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ServiceAPI.Dal;
using ServiceAPI.Entities;

namespace SuperCoolApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            using (var context = new GameLibraryDbContext())
            {
                context.Database.EnsureCreated();
            }
            BuildWebHost(args).Run();

        }
        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
