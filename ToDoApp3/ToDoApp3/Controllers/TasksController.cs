using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp3.DTO;
using ToDoApp3.Models;
using System.Security.Claims;

namespace ToDoApp3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   [Authorize]

    public class TasksController:ControllerBase
    {
        private readonly TaskContext _context;
        
        public TasksController(TaskContext context)
        {
            _context = context; 
        }


        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            /* var tasks = await _context.TaskItems.Select(p => TaskToDTO(p)).ToListAsync();
             return Ok(tasks);*/
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var tasks = await _context.TaskItems
                .Where(t => t.UserId == userId)
                .Select(p => TaskToDTO(p))
                .ToListAsync();
            return Ok(tasks);
        }

    
        [HttpGet("{id}")]
      
        public async Task<IActionResult> GetTasks(int? id) 
        { 
            if(id == null)
            {
                return NotFound();
            }
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var p = await _context.TaskItems
                                        .Where(i => i.TaskId == id && i.UserId == userId)  // önce filtre
                                        .Select(p => TaskToDTO(p)) // sonra DTO
                                        .FirstOrDefaultAsync();
            if (p == null) 
            {
                return NotFound();
            }
            return Ok(p);
        }


        [HttpPost]
        public async Task<IActionResult> CreateTask(CreateTaskDTO taskDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var entity2 = new TaskItem
            {
                TaskTitle = taskDto.TaskTitle,
                Description = taskDto.Description,
                Situation = taskDto.Situation,
                CreatedAt = DateTime.Now,
                UserId = userId 
            };

            _context.TaskItems.Add(entity2);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTasks),new {id = entity2.TaskId}, entity2);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, CreateTaskDTO taskDto)
        {

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var tasks = await _context.TaskItems
                .FirstOrDefaultAsync(i => i.TaskId == id && i.UserId == userId);

            if (tasks == null)
            {
                return NotFound();
            }

            tasks.TaskTitle = taskDto.TaskTitle;
            tasks.Description = taskDto.Description;
            tasks.Situation= taskDto.Situation;
 

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(Exception)
            {
                return NotFound();
            }

            return NoContent();
        }


        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteTasks(int? id) 
        {
            if (id == null)
            {
                return NotFound(); 

            }
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var tasks = await _context.TaskItems.FirstOrDefaultAsync(i => i.TaskId == id && i.UserId == userId);

            if (tasks == null)
            {
                return NotFound();
            }

            _context.TaskItems.Remove(tasks);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception) 
            {
                return NotFound();
            }
            return NoContent();
        }

        private static TaskDTO TaskToDTO(TaskItem p)
        {
            if (p == null)
                return null;

            var entity = new TaskDTO
            {
                TaskId = p.TaskId,
                TaskTitle = p.TaskTitle,
                Description = p.Description,
                Situation = p.Situation,
                CreatedAt = p.CreatedAt
            };

            return entity;
        }
    }

    
}
