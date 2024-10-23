namespace TaskTrackerApplication.Modals
{
    public class UserModal
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class AddUserModal
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

}
