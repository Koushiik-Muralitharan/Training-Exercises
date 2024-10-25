using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using TaskTrackerApplication.Connection;
using TaskTrackerApplication.Modals;

namespace TaskTrackerApplication.Repository
{
    public interface IActivityRepository
    {
        bool AddActivity(AddActivityModel activity);
        bool DeleteActivity(int activityId);
        bool EditActivity(ActivityModel activity);
        List<ActivityModel> GetActivity(int taskId);
        List<ActivityModel> GetActivities(int userId);
        ActivityModel GetSingleActivity(int activityID);

    }

    public class ActivityRepository:IActivityRepository
    {
        private readonly IConnectivity conn;

        public ActivityRepository(IConnectivity connectionString)
        {
            this.conn = connectionString;
        }

        public bool AddActivity(AddActivityModel activity)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string addActivityProcedure = "sp_add_activities";
                SqlCommand command = new SqlCommand(addActivityProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@taskId", activity.TaskId);
                command.Parameters.AddWithValue("@Title", activity.Title);
                command.Parameters.AddWithValue("@DescriptionField", activity.DescriptionField);
                command.Parameters.AddWithValue("@ActivityHours", activity.ActivityHours);
                connection.Open();

                int rowsAffected = command.ExecuteNonQuery();


                return rowsAffected > 0;

            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {
                connection.Close();
            }

        }

        public bool DeleteActivity(int activityId)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string addActivityProcedure = "sp_delete_activity";
                SqlCommand command = new SqlCommand(addActivityProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@activityId", activityId);
                
                connection.Open();

                int rowsAffected = command.ExecuteNonQuery();


                return rowsAffected > 0;

            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {
                connection.Close();
            }

        }

        public bool EditActivity(ActivityModel activity)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string addActivityProcedure = "sp_edit_activity";
                SqlCommand command = new SqlCommand(addActivityProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                //command.Parameters.AddWithValue("@taskId", activity.TaskId);
                command.Parameters.AddWithValue("@activityId", activity.ActivityId);
                command.Parameters.AddWithValue("@Title", activity.Title);
                command.Parameters.AddWithValue("@DescriptionField", activity.DescriptionField);
                command.Parameters.AddWithValue("@ActivityHours", activity.ActivityHours);
                connection.Open();

                int rowsAffected = command.ExecuteNonQuery();


                return rowsAffected > 0;

            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {
                connection.Close();
            }

        }

        public List<ActivityModel> GetActivity(int taskId)
        {
            SqlConnection connection = conn.GetConnection();
            List<ActivityModel> activities = new List<ActivityModel>();

            try
            {
                string getActivityProcedure = "sp_get_activity";
                SqlCommand command = new SqlCommand(getActivityProcedure,connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@taskId", taskId);
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    ActivityModel activity = new ActivityModel
                    {
                        TaskId = Convert.ToInt32(reader["TaskId"]),
                        ActivityId = Convert.ToInt32(reader["ActivityId"]),
                        Title = reader["Title"].ToString(),
                        DescriptionField = reader["DescriptionField"].ToString(),
                        ActivityHours = Convert.ToDecimal(reader["ActivityHours"])
                    };
                    activities.Add(activity);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close();
            }
            return activities;
        }

        public List<ActivityModel> GetActivities(int taskId)
        {
            SqlConnection connection = conn.GetConnection();
            List<ActivityModel> activities = new List<ActivityModel>();

            try
            {
                string getActivityProcedure = "sp_get_activity_by_task";
                SqlCommand command = new SqlCommand(getActivityProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@taskId", taskId);
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    ActivityModel activity = new ActivityModel
                    {
                        TaskId = Convert.ToInt32(reader["TaskId"]),
                        ActivityId = Convert.ToInt32(reader["ActivityId"]),
                        Title = reader["Title"].ToString(),
                        DescriptionField = reader["DescriptionField"].ToString(),
                        ActivityHours = Convert.ToDecimal(reader["ActivityHours"])
                    };
                    activities.Add(activity);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close();
            }
            return activities;
        }

        public ActivityModel GetSingleActivity(int activityId)
        {
            SqlConnection connection = conn.GetConnection();
            //List<ActivityModel> activities = new List<ActivityModel>();
            ActivityModel currentActivity = null;

            try
            {
                string getActivityProcedure = "sp_to_get_single_activity";
                SqlCommand command = new SqlCommand(getActivityProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@activityId", activityId);
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    currentActivity  = new ActivityModel
                    {
                        TaskId = Convert.ToInt32(reader["TaskId"]),
                        ActivityId = Convert.ToInt32(reader["ActivityId"]),
                        Title = reader["Title"].ToString(),
                        DescriptionField = reader["DescriptionField"].ToString(),
                        ActivityHours = Convert.ToDecimal(reader["ActivityHours"])
                    };
                   
                }
                //Console.WriteLine(currentActivity.Title);
                //Console.WriteLine(currentActivity.TaskId);
                //Console.WriteLine(currentActivity.ActivityId);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close();
            }
            return currentActivity;
        }


    }
}
