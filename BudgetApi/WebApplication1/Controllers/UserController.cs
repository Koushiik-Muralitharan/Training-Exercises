using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using MyAPI.Connection;
using MyAPI.Model;
using MyAPI.Repository;

namespace MyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        

        private readonly IUserRepository userRepository;

        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult getUsers()
        {
            try
            {
                var users = userRepository.GetUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult AddUser(string name, string email, string phone, string password)
        {
            if (name == null || email == null || phone == null || password == null)
            {
                return BadRequest("Invalid user data");
            }
            bool isAdded = userRepository.AddUser(name, email, phone, password);

            if (isAdded)
            {
                return Ok(new { message = "User added successfully!" });
            }
            else
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }
        }

        [HttpGet("CheckUserExists")]

        public IActionResult CheckUserExists(string userEmail)
        {
            if(userEmail == null)
            {
                return BadRequest("Invalid user data");
            }

            bool UserStatus = userRepository.CheckUserExists(userEmail);

            if(UserStatus)
            {
                return StatusCode(409, "User Already Exists.");
               
            }
            else
            {
                return Ok(new { message = "no such user exists" });
            }
        }

    }
}
