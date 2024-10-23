using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskTrackerApplication.Modals;
using TaskTrackerApplication.Repository;

namespace TaskTrackerApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        public UserController(IUserRepository userRepository) {
            this.userRepository = userRepository;
        }
        [HttpPost("CreateAccount")]

        public IActionResult AddUser(AddUserModal user)
        {
            try
            {
                if(user.UserName == null || user.Password == null)
                {
                    return BadRequest("Invalid data request sent for the account creation.");
                }
                string errorMessage = "";
                bool isAdded = userRepository.AddUser(user, out errorMessage);
                if (isAdded)
                {
                    return Ok(new { message = "User account created successfully." });
                }
                else
                {
                    return StatusCode(400, $"Account cannot be created, Message:{errorMessage}");
                }

            }catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error {ex.Message}");
            }
        }

        [HttpGet("LoggedUserInfo")]

        public IActionResult GetLoggedUser([FromQuery] AddUserModal user)
        {
            try
            {
                if (user.Password == null || user.UserName == null)
                {
                    return BadRequest("Invalid data passed.");
                }
                string errorMessage = "";
                var users = userRepository.GetLoggedUser(user, out errorMessage);
                if (users == null)
                {
                    return BadRequest(errorMessage);
                }


                return Ok(users);
            }catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error, {ex.Message}");
            }
        }
    }
}
