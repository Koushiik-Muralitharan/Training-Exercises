namespace TaskTrackerApplication.Modals
{
    public class TaskModel
    {
        public int UserId { get; set; }
        public int TaskId { get; set; }
        public string ClientName { get; set; }
        public string ProjectName { get; set; }
        public  string title { get; set; }
        public decimal ETA { get; set; }
        public string TaskDate { get; set; }
        public string AssignedTo { get; set; }
        public string AssignedBy { get; set; }
        public string SupportType { get; set; }
        public string PriorityType { get; set; }
        public string DescriptionField { get; set; }
    }

    public class AddTaskModel
    {
        public int UserId { get; set; }
        public string ClientName { get; set; }
        public string ProjectName { get; set; }
        public string title { get; set; }
        public decimal ETA { get; set; }
        public string TaskDate { get; set; }
        public string AssignedTo { get; set; }
        public string AssignedBy { get; set; }
        public string SupportType { get; set; }
        public string PriorityType { get; set; }
        public string DescriptionField { get; set; }
    }


}
