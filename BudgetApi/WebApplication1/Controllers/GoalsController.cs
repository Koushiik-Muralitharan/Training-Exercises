using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyAPI.Model;
using MyAPI.Repository;

namespace MyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalsController : ControllerBase
    {

        private readonly IGoalRepository goalRepository;

        public GoalsController(IGoalRepository goalRepository)
        {
            this.goalRepository = goalRepository;
        }

        [HttpGet("UserGoals/{userID}")]

        public IActionResult GetGoals(int userID)
        {
            try
            {
                var Goals = goalRepository.GetUserGoals(userID);
                return Ok(Goals);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateGoal([FromBody] AddGoals newGoal)
        {
            if(newGoal == null || !ModelState.IsValid)
            {
                return BadRequest("Invalid goal data");
            }

            bool isAdded = goalRepository.AddGoal(newGoal);
            if(isAdded)
            {
                return Ok(new { message = "Goal added successfully!" });
            }
            else
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }
        }

        [HttpPatch]
        public IActionResult AddContribution(int Contribution, int userID, int goalID)
        {
            if(Contribution == 0 || userID == 0 || goalID == 0 )
            {
                return BadRequest("Invalid goal contribution data");
            }
            bool isUpdated = goalRepository.AddContribution(Contribution, userID, goalID);

            if (isUpdated)
            {
                return Ok(new { message = "Goal updated successfully!" });
            }
            else
            {
                return StatusCode(400, "A problem happened while updating your goal update request.");
            }
        }

        [HttpPut]

        public IActionResult EditGoal(int goalID, string goalName, int goalAmount)
        {
            if (goalAmount == 0 || goalName == null || goalID == 0)
            {
                return BadRequest("Invalid goal contribution data");
            }
            bool isUpdated = goalRepository.UpdateGoal(goalID, goalName, goalAmount);

            if (isUpdated)
            {
                return Ok(new { message = "Goal updated successfully!" });   
            }
            else
            {
                return StatusCode(400, "A problem happened while updating your goal update request.");
            }
        }

        [HttpDelete]
        public IActionResult DeleteGoal(int goalID) 
        {
            if(goalID == 0)
            {
                return BadRequest("Invalid goalID");
            }

            bool isDeleted = goalRepository.DeleteGoal(goalID);

            if (isDeleted)
            {
                return Ok(new { message = "Goal Deleted successfully!" });
            }
            else
            {
                return StatusCode(404, "Goal not found.");
            }

        }
    }
}
