using Microsoft.AspNetCore.Identity;

namespace ToDoApp3.Models
{
    public class AppUser:IdentityUser<int>
    {
        public string FullName { get; set; } = null!;
        public DateTime DateAdded { get; set; }
    }
}