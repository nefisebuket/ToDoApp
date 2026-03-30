using System.ComponentModel.DataAnnotations;
namespace ToDoApp3.Models
{
    public class TaskItem
    {
        [Key]
        public int TaskId { get; set; }

        public required string TaskTitle { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool Situation { get; set; }
        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }
        public AppUser? User { get; set; }

    }
}