namespace MyAPI.Model
{
    public class Transactions
    {
        public int userId { get; set; }
        public int transactionID { get; set; }
        public string transactionType { get; set; }
        public string category { get; set; }
        public string date { get; set; }
        public decimal amount { get; set; }
    }
}
