using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using System.Threading;
using ServiceAPI.Dal;
using Microsoft.EntityFrameworkCore;

namespace ServiceAPI
{
    [Route("api")]
    public class GameController : Controller
    {
        static readonly object setupLock = new object();
        static readonly SemaphoreSlim parallelism = new SemaphoreSlim(2);

        

        [HttpGet("gamesuser")]
        public async Task<IActionResult> GetGameOfUser([FromQuery]int id)
        {
            try
            {
                await parallelism.WaitAsync();
                using (var context = new GameLibraryDbContext())
                {
                    return Ok(context.Games.Where(p => p.Userid == id).ToList());
                }
            }

            finally
            {
                parallelism.Release();
            }
        }
        [HttpGet("gamedetail")]
        public async Task<IActionResult> GetGameDetail([FromQuery]int id)
        {
            try
            {
                await parallelism.WaitAsync();
                using (var context = new GameLibraryDbContext())
                {
                    return Ok(context.Games.Where(p => p.Id == id).ToList());
                }
            }

            finally
            {
                parallelism.Release();
            }
        }
        [HttpGet("games")]
        public async Task<IActionResult> GetGames()
        {
            try
            {
                await parallelism.WaitAsync();
                using (var context = new GameLibraryDbContext())
                {
                    return Ok(context.Games.ToList());
                }
             
            }
            finally
            {
                parallelism.Release();
            }
        }
        
        [HttpGet("game")]
        public async Task<IActionResult> GetGame([FromQuery]int id)
        {
            
                await parallelism.WaitAsync();
                using (var context = new GameLibraryDbContext())
                {
                    return Ok(context.Games.Where(p => p.Id == id).ToList());
                }
       
       
        }


        [HttpPut("game")]
        public async Task<IActionResult> CreateGame([FromBody]Game game)
        {
            using (var context = new GameLibraryDbContext())
            {
                context.Games.Add(game);

                await context.SaveChangesAsync();

                return Ok();
            }

        }

        [HttpPost("game")]
        public async Task<IActionResult> UpdateGame([FromBody]Game game)
        {
            using (var context = new GameLibraryDbContext())
            {
                context.Games.Update(game);
                await context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpDelete("game")]
        public async Task<IActionResult> DeleteGame([FromQuery]int id)
        {
            using (var context = new GameLibraryDbContext())
            {
                var game = await context.Games.FirstOrDefaultAsync(x => x.Id == id);
                context.Games.Remove(game);
                await context.SaveChangesAsync();
                return Ok();


            }
        }
    }
}