using ServiceAPI.Dal;
using System.Collections.Generic;

namespace ServiceAPI.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public ICollection<Game> Games { get; set; }
    }
}