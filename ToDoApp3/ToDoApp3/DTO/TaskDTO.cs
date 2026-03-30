namespace ToDoApp3.DTO
{
    public class TaskDTO
    {
        public int TaskId { get; set; }
        public required string TaskTitle { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool Situation { get; set; }
        public DateTime CreatedAt { get; set; } 
    }
}
