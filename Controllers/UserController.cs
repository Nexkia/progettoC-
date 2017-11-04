using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Linq;
using System.Threading;
using ServiceAPI.Dal;
using ServiceAPI.Entities;
using Microsoft.EntityFrameworkCore;
using SuperCoolApp.Dal;

namespace ServiceAPI
{
    [Route("api")]
    public class UserController : Controller
    {
        static readonly object setupLock = new object();
        static readonly SemaphoreSlim parallelism = new SemaphoreSlim(2);



        [HttpGet("user")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                await parallelism.WaitAsync();
                using (var context = new GameLibraryDbContext())
                {
                    return Ok(context.Users.ToList());
                }
            }
            finally
            {
                parallelism.Release();
            }
        }



        [HttpPost("user/login")]
        public async Task<IActionResult> GetUser([FromBody]Datilogin dati)
        {
            try
            {
                await parallelism.WaitAsync();
                using (var context = new GameLibraryDbContext())
                {
                    var userlogin = context.Users.Where(p => p.Username == dati.Username && p.Password == dati.Password).ToList();
                    if (userlogin.Count==0)
                        return NotFound();
                   return Ok(userlogin);
                
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
            finally
            {
                parallelism.Release();
            }
        }
        
        [HttpPut("user")]
        public async Task<IActionResult> CreateUser([FromBody]User user)
        {
            using (var context = new GameLibraryDbContext())
            {
                context.Users.Add(user);

                await context.SaveChangesAsync();

                return Ok();
            }
        }
        

        [HttpPost("user")]
        public async Task<IActionResult> UpdateUser([FromBody]User user)
        {
            using (var context = new GameLibraryDbContext())
            {
                context.Users.Update(user);
                await context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpDelete("user")]
        public async Task<IActionResult> DeleteUser([FromQuery]int id)
        {
            using (var context = new GameLibraryDbContext())
            {
                var user = await context.Users.FirstOrDefaultAsync(x => x.Id == id);
                context.Users.Remove(user);
                await context.SaveChangesAsync();
                return Ok();


            }
        }
    }
}