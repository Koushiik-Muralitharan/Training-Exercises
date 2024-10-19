namespace MyAPI.Model
{
    public class AddGoals
    {
        public int UserID { get; set; }
        public string GoalName { get; set; }
        public decimal GoalAmount { get; set; }
        public decimal GoalContribution { get; set; }
    }
}
