namespace MyAPI.Model
{
    public class Users
    {
        public int userId { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string password { get; set; }
    }

    public class UserInfo 
    {
        public int userId { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string password { get; set; }
        public List<Transactions> userTransaction {  get; set; }
        public List<Goal> userGoals { get; set; }
    }

}
