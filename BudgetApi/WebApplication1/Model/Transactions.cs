namespace MyAPI.Model
{
    public class Transactions
    {
        public int UserId { get; set; }
        public int TransactionID { get; set; }
        public string TransactionType { get; set; }
        public string Category { get; set; }
        public string Date { get; set; }
        public decimal Amount { get; set; }
    }
}
