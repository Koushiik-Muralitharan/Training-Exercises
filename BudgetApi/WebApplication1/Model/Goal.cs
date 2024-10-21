namespace MyAPI.Model
{
    public class Goal
    {
        public int UserId { get; set; }
        public int GoalId { get; set; }
        public string GoalName { get; set;}
        public decimal GoalAmount { get; set; }
        public decimal GoalContribution { get; set; }
    }
}
