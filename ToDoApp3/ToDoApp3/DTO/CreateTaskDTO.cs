namespace ToDoApp3.DTO
{
    public class CreateTaskDTO
    {
        public string TaskTitle { get; set; } = null!;
        public string Description { get; set; } = null!;
        public bool Situation { get; set; }
    }
}