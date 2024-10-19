namespace MyAPI.Model
{
    public class Goal
    {
        public int UserID { get; set; }
        public int GoalID { get; set; }
        public string GoalName { get; set;}
        public decimal GoalAmount { get; set; }
        public decimal GoalContribution { get; set; }
    }
}
