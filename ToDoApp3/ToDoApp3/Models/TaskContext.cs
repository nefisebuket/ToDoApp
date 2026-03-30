using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ToDoApp3.Models

{
    public class TaskContext:IdentityDbContext<AppUser,AppRole,int>

    {

        public TaskContext(DbContextOptions<TaskContext> options) : base(options)

        { 
           
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           
            modelBuilder.Entity<TaskItem>()
                .HasOne(t => t.User)           // Her görevin bir kullanıcısı var
                .WithMany()                    // Bir kullanıcının birçok görevi olabilir
                .HasForeignKey(t => t.UserId)  // Bağlantı UserId üzerinden kurulur
                .OnDelete(DeleteBehavior.Cascade); // Kullanıcı silinirse görevleri de silinsin
        
            
        }

        public DbSet<TaskItem> TaskItems { get; set; }
    }

}