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
    }
}
