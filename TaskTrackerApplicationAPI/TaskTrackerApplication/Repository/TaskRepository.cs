using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using TaskTrackerApplication.Connection;
using TaskTrackerApplication.Modals;

namespace TaskTrackerApplication.Repository
{

    public interface ITaskrepository
    {
        bool Addtask(AddTaskModel task);
        bool EditTask(TaskModel task);
        bool DeleteTask(int taskId);
    }

    public class TaskRepository:ITaskrepository
    {
        private readonly IConnectivity conn;

        public TaskRepository(IConnectivity connectionString)
        {
            this.conn = connectionString;
        }

        public bool Addtask(AddTaskModel task) 
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string addtaskProcedure = "sp_add_task";
                SqlCommand command = new SqlCommand(addtaskProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@fUserId", task.UserId);
                command.Parameters.AddWithValue("@clientName", task.ClientName);
                command.Parameters.AddWithValue("@projectName", task.ProjectName);
                command.Parameters.AddWithValue("@Title", task.title);
                command.Parameters.AddWithValue("@ETa", task.ETA);
                command.Parameters.AddWithValue("@taskDate", task.TaskDate);
                command.Parameters.AddWithValue("@assignedTo", task.AssignedTo);
                command.Parameters.AddWithValue("@assignedBy", task.AssignedBy);
                command.Parameters.AddWithValue("@supportType", task.SupportType);
                command.Parameters.AddWithValue("@priorityType", task.PriorityType);
                command.Parameters.AddWithValue("@descriptionField", task.DescriptionField);

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
        public bool EditTask(TaskModel task)
        {
            SqlConnection connection = conn.GetConnection();
            try
            {
                string editTaskprocedure = "sp_edit_task";
                SqlCommand command = new SqlCommand(editTaskprocedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@taskID", task.TaskId);
                command.Parameters.AddWithValue("@clientName", task.ClientName);
                command.Parameters.AddWithValue("@projectName", task.ProjectName);
                command.Parameters.AddWithValue("@Title", task.title);
                command.Parameters.AddWithValue("@ETa", task.ETA);
                command.Parameters.AddWithValue("@taskDate", task.TaskDate);
                command.Parameters.AddWithValue("@assignedTo", task.AssignedTo);
                command.Parameters.AddWithValue("@assignedBy", task.AssignedBy);
                command.Parameters.AddWithValue("@supportType", task.SupportType);
                command.Parameters.AddWithValue("@priorityType", task.PriorityType);
                command.Parameters.AddWithValue("@descriptionField", task.DescriptionField);
                connection.Open();

                int rowsAffected = command.ExecuteNonQuery();


                return rowsAffected > 0;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public bool DeleteTask(int taskId)
        {
            SqlConnection connection = conn.GetConnection();
            try
            {
                string editTaskprocedure = "sp_delete_task";
                SqlCommand command = new SqlCommand(editTaskprocedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@taskID", taskId);
                
                connection.Open();

                int rowsAffected = command.ExecuteNonQuery();


                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
