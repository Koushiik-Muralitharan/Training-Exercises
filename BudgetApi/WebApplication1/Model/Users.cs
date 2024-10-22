namespace MyAPI.Model
{
    public class Users
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
    }

    public class UserInfo
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public List<Transactions> UserTransaction { get; set; }
        public List<Goal> UserGoals { get; set; }
        public decimal Balance { get; set; }
        public decimal Expense { get; set; }
        public decimal Savings { get; set; }
        public decimal Income { get; set; }
    }

}
