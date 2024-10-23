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

        [HttpGet("GetAllUsers")]
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

        [HttpPost("CreateUserAccount")]
        public IActionResult AddUser(string name, string email, string phone, string password)
        {
            try
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
            catch (Exception ex) 
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("CheckUserExists")]

        public IActionResult CheckUserExists(string userEmail)
        {
            try
            {
                if (userEmail == null)
                {
                    return BadRequest("Invalid user data");
                }

                bool UserStatus = userRepository.CheckUserExists(userEmail);

                if (UserStatus)
                {
                    return StatusCode(409, "User Already Exists.");

                }
                else
                {
                    return Ok(new { message = "no such user exists" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("LoggedUser")]

        public IActionResult GetLoggedUser(string email, string password)
        {
           
            try
            {
                if (email == null || password==null)
                {
                    return BadRequest("Invalid data passed.");
                }
                string errorMessage = "";
                var users = userRepository.GetUserInfo(email,password, out errorMessage);
                if (users == null)
                {
                    return BadRequest(errorMessage); 
                }
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteAccount")]
        public IActionResult DeleteUserAccount(string email)
        {
            try
            {
                if (email == null)
                {
                    return BadRequest("Invalid Id is being sent.");
                }

                bool isDeleted = userRepository.DeleteAccount(email);

                if (isDeleted)
                {
                    return Ok(new { message = "User account deleted successfully!" });
                }
                else
                {
                    return StatusCode(404, "UserAccount not found.");
                }
            }catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPut("EditUserAccount")]

        public IActionResult EditUserDetails(int userID, string userName, string userEmail, string phoneNumber)
        {
            try
            {
                if (userID == 0 || userName == null || userEmail == null || phoneNumber == null)
                {
                    return BadRequest("Invalid Data is sent for editing.");
                }
                bool isUpdated = userRepository.EditUserDetails(userID, userName, userEmail, phoneNumber);
                if (isUpdated)
                {
                    return Ok(new { message = "User Details updated." });
                }
                else
                {
                    return StatusCode(400, "A problem happened while updating your goal update request., Email ID exists.");
                }
            }
            catch (Exception ex) 
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPatch("EditPassword")]
        public IActionResult EditPassword(int userID, string oldPassword, string newPassword)
        {
            try
            {
                if (userID == 0 || oldPassword == null || newPassword == null)
                {
                    return BadRequest("Invalid data is sent for edit.");
                }

                bool isUpdated = userRepository.EditPassword(userID, oldPassword, newPassword);
                if (isUpdated)
                {
                    return Ok(new { message = "password updated successfully" });
                }
                else
                {
                    return StatusCode(400, "A problem happened while updating your password update request.");
                }
            }
            catch (Exception ex) 
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");

            }
        }
        [HttpPost("AddCategory")]
        public IActionResult AddCategory(int userID, string transactionType, string category)
        {
            try
            {
                if(userID == 0 || transactionType == null || category == null)
                {
                    return BadRequest("The data sent for adding category is Invalid.");
                }
                string errorMessage;
                bool isAdded = userRepository.AddCategory(userID, transactionType,category, out errorMessage);
                if(isAdded)
                {
                    return Ok(new { message = "Sucessfully added the category." });
                }
                else
                {
                    return StatusCode(409, $"Error Message: {errorMessage}");
                }
            }catch (Exception ex)
            {
                return StatusCode(500, new { message = "An internal server error occurred.", ex.Message });
            }
        }

        [HttpDelete("DeleteCategory")]
        public IActionResult DeleteCategory(int categoryID)
        {
            try
            {
                if(categoryID == 0)
                {
                    return BadRequest("Invalid categoryID sent for deletion.");
                }
                string errorMessage;
                bool isDeleted = userRepository.DeleteCategory(categoryID, out errorMessage);
                if(isDeleted)
                {
                    return Ok(new { message = "The Category is deleted." });
                }
                else
                {
                    return StatusCode(404, $"Message: {errorMessage}");
                }
            }catch (Exception ex)
            {
                return StatusCode(500, new { message = "An internal server error occurred.", ex.Message });
            }
        }

        [HttpGet("GetUpdatedUserInfo")]
        public IActionResult GetUpdatedUserInfo(int userId)
        {

            try
            {
                if (userId == 0)
                {
                    return BadRequest("Invalid data passed.");
                }
                string errorMessage = "";
                var users = userRepository.GetUpdatedUserinfo(userId, out errorMessage);
                if (users == null)
                {
                    return BadRequest(errorMessage);
                }
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
