﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskTrackerApplication.Modals;
using TaskTrackerApplication.Repository;

namespace TaskTrackerApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityRepository activityRepository;
        public ActivityController(IActivityRepository activityRepository)
        {
            this.activityRepository = activityRepository;
        }
        [HttpPost("AddActivity")]
        public IActionResult AddActivity(AddActivityModel activity)
        {
            try
            {
                if (activity == null)
                {
                    return BadRequest("Invalid request sent for adding a activity.");
                }
                bool isAdded = activityRepository.AddActivity(activity);
                if (isAdded)
                {
                    return Ok(new { message = "activity added successfully.." });
                }
                else
                {
                    return StatusCode(400, $"activity cannot be added");
                }
            }
            catch (Exception ex) 
            {
                return StatusCode(500, $"Internal server error {ex.Message}");
            }
        }

        [HttpDelete("DeleteActivity")]
        public IActionResult DeleteActivity(int activityId)
        {
            try
            {
                if (activityId == 0)
                {
                    return BadRequest("Invalid request sent for deleting a activity.");
                }
                bool isDeleted = activityRepository.DeleteActivity(activityId);
                if (isDeleted)
                {
                    return Ok(new { message = "activity deleted successfully.." });
                }
                else
                {
                    return StatusCode(400, $"activity cannot be deleted");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error {ex.Message}");
            }
        }

        [HttpPut("EditActivity")]
        public IActionResult EditActivity(ActivityModel activity)
        {
            try
            {
                if (activity == null)
                {
                    return BadRequest("Invalid request sent for editing a activity.");
                }
                bool isEdited = activityRepository.EditActivity(activity);
                if (isEdited)
                {
                    return Ok(new { message = "activity edited successfully.." });
                }
                else
                {
                    return StatusCode(400, $"activity cannot be edited");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error {ex.Message}");
            }
        }
    }
}
