using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskTrackerApplication.Modals;
using TaskTrackerApplication.Repository;

namespace TaskTrackerApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskrepository taskRepository;
        public TaskController(ITaskrepository taskRepository)
        {
            this.taskRepository = taskRepository;
        }
        [HttpPost("Addtask")]
        public IActionResult AddTask(AddTaskModel task) 
        {
            try
            {
                if(task == null)
                {
                    return BadRequest("Invalid data request sent for the task creation.");
                }
                bool isAdded = taskRepository.Addtask(task);
                if(isAdded)
                {
                    return Ok(new { message = "task added successfully.." });
                }
                else
                {
                    return StatusCode(400, $"task cannot be added");
                }
            }catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error {ex.Message}");
            }
        }

        [HttpPut("EditTask")]
        public IActionResult EditTransaction(TaskModel task)
        {
            try
            {
                if (task == null)
                {
                    return BadRequest("Invalid data request sent for the task edition.");
                }
                bool isEditted = taskRepository.EditTask(task);
                if (isEditted)
                {
                    return Ok(new { message = "task editted successfully.." });
                }
                else
                {
                    return StatusCode(404, $"task cannot be editted");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error {ex.Message}");
            }
        }

        [HttpDelete("DeleteTask")]
        public IActionResult DeleteTask(int TaskId )
        {
            try
            {
                if(TaskId == 0)
                {
                    return BadRequest("Invalid data request sent for the task deletion.");
                }
                bool isDeleted = taskRepository.DeleteTask(TaskId);
                if (isDeleted)
                {
                    return Ok(new { message = "task deleted successfully.." });
                }
                else
                {
                    return StatusCode(404, $"task cannot be deleted");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error {ex.Message}");
            }
        }
    }
}
