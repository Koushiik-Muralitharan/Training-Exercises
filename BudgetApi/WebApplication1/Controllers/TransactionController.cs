using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyAPI.Model;
using MyAPI.Repository;

namespace MyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionRepository transactionRepository;

        public TransactionController(ITransactionRepository transactionRepository)
        {
            this.transactionRepository = transactionRepository;
        }

        [HttpGet("Transactions")]
        public IActionResult GetTransaction()
        {
            try
            {
                var TransactionsList = transactionRepository.GetTransactions();
                return Ok(TransactionsList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("UserTransactions/{userID}")]

        public IActionResult GetTransactions(int userID)
        {
            try
            {
                var TransactionsList = transactionRepository.GetUserTransaction(userID);
                return Ok(TransactionsList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]

        public IActionResult AddTransaction(AddTransactions addtransaction)
        {
            if (addtransaction == null || !ModelState.IsValid)
            {
                return BadRequest("Invalid Transaction data");
            }

            bool isAdded = transactionRepository.AddTransaction(addtransaction);
            if (isAdded)
            {
                return Ok(new { message = "Transaction added successfully!" });
            }
            else
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }
        }

        [HttpDelete]

        public IActionResult DeleteTransaction(int transactionID)
        {
            if(transactionID == 0)
            {
                return BadRequest("Invalid Transaction ID");
            }

            bool isDeleted = transactionRepository.DeleteTransaction(transactionID);

            if (isDeleted)
            {
                return Ok(new {message = "Transaction is deleted successfully."});
            }
            else
            {
                return StatusCode(404, "Transaction not found.");
            }
        }
        [HttpGet("UserExpenses")]
        public IActionResult GetUserExpenses(int userID)
        {
            if(userID == 0)
            {
                return BadRequest("Cannot get user Expenses");
            }

            try
            {
                var TransactionsList = transactionRepository.GetUserExpenses(userID);
                return Ok(TransactionsList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPut]

        public IActionResult UpdateTransaction(int userID, int transactionID, string transactionType, string category, string date, int amount)
        {
            if (userID == 0 || transactionID == 0 || transactionType == null || category == null || date == null || amount <0)
            {
                return BadRequest("Invalid request for update");
            }

            bool isUpdated = transactionRepository.EditTransaction( userID,  transactionID, transactionType, category, date, amount);
            if (isUpdated)
            {
                return Ok(new { message = "Transaction is updated successfully." });
            }
            else
            {
                return StatusCode(404, "Transaction not found.");
            }
        }
    }
}
