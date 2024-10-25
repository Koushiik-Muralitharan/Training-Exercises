namespace TaskTrackerApplication.Modals
{
    public class ActivityModel
    {
        public int  TaskId {get; set;}
        public int ActivityId {get; set;}
        public string  Title { get; set; }
        public string DescriptionField { get; set; }
        public decimal ActivityHours { get; set; }
    }

    public class EditActivityModel
    {
        public int TaskId { get; set; }
        public int ActivityId { get; set; }
        public string Title { get; set; }
        public string DescriptionField { get; set; }
        public decimal ActivityHours { get; set; }
    }

    public class AddActivityModel
    {
        public int TaskId { get; set; }
        public string Title { get; set; }
        public string DescriptionField { get; set; }
        public decimal ActivityHours { get; set; }
    }
}
