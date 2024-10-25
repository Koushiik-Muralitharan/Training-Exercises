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
                if (task == null)
                {
                    return BadRequest("Invalid data request sent for the task creation.");
                }
                int isAdded = taskRepository.Addtask(task);
                if (isAdded != -1)
                {
                    return Ok(new { message = "task added successfully..", id = isAdded });
                }
                else
                {
                    return StatusCode(400, $"task cannot be added");
                }
            } catch (Exception ex)
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
        public IActionResult DeleteTask(int TaskId)
        {
            try
            {
                if (TaskId == 0)
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

        [HttpGet("GetTasksByDate")]

        public IActionResult GetTasks(DateTime date, int userId)
        {
            try
            {
                if (date == null)
                {
                    return BadRequest("Invalid data request sent for the getting task.");
                }
                List<TaskModel> tasks = taskRepository.GetTasks(date, userId);
                return Ok(tasks);
            }catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }
        [HttpGet("GetEditTaskDetails")]

        public IActionResult GetTask(int taskId)
        {
            try
            {
                if (taskId == null)
                {
                    return BadRequest("Invalid data sent for getting the editted task.");
                }
                TaskModel task = taskRepository.GetTask(taskId);
                return Ok(task);
            }
            catch
            {
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
