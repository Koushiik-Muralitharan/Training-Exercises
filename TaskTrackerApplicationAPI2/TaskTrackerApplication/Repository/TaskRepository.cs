using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using TaskTrackerApplication.Connection;
using TaskTrackerApplication.Modals;

namespace TaskTrackerApplication.Repository
{

    public interface ITaskrepository
    {
        int Addtask(AddTaskModel task);
        bool EditTask(TaskModel task);
        bool DeleteTask(int taskId);
        List<TaskModel> GetTasks(DateTime date, int userId);
        TaskModel GetTask(int taskId);
        int TaskCount(int userId);
    }

    public class TaskRepository:ITaskrepository
    {
        private readonly IConnectivity conn;

        public TaskRepository(IConnectivity connectionString)
        {
            this.conn = connectionString;
        }

        public int Addtask(AddTaskModel task) 
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                int newTaskID = 0;
                string addtaskProcedure = "sp_add_tasks";
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

                //int rowsAffected = command.ExecuteNonQuery();
                object result = command.ExecuteScalar();
                //int newTaskId = Convert.ToInt32(command.ExecuteScalar());
                if(result!=null)
                {
                    Console.WriteLine(result.ToString());
                    newTaskID = Convert.ToInt32(result.ToString());
                }

                return newTaskID;
            }
            catch (Exception ex) 
            {
                return -1;
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
            finally
            {
                connection.Close();
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
            finally
            {
                connection.Close();
            }
        }

        public List<TaskModel> GetTasks(DateTime date, int userId)
        {
            SqlConnection connection = conn.GetConnection();
            List<TaskModel> tasks = new List<TaskModel>();
            try
            {
                string getTaksProcedure = "sp_get_task_by_date";
                SqlCommand command = new SqlCommand(getTaksProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@TaskDate", date);
                command.Parameters.AddWithValue("@userId", userId);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    TaskModel task = new TaskModel
                    {
                        UserId = Convert.ToInt32(reader["FUserId"]),
                        TaskId = Convert.ToInt32(reader["TaskID"]),
                        ClientName = reader["ClientName"].ToString(),
                        ProjectName = reader["ProjectName"].ToString(),
                        title = reader["title"].ToString(),
                        ETA = reader.GetDecimal(reader.GetOrdinal("ETA")), 
                        TaskDate = reader["TaskDate"].ToString(), 
                        AssignedTo = reader["AssignedTo"].ToString(),
                        AssignedBy = reader["AssignedBy"].ToString(),
                        SupportType = reader["SupportType"].ToString(),
                        PriorityType = reader["PriorityType"].ToString(),
                        DescriptionField = reader["DescriptionField"].ToString()
                    };
                    tasks.Add(task);
                }

            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close();
            }
            return tasks;
        }

        public TaskModel GetTask(int taskId)
        {
            SqlConnection connection = conn.GetConnection();
            
            TaskModel task = null;
            try
            {
                string getTaskProcedure = "sp_get_task_by_taskId";
                SqlCommand command = new SqlCommand(getTaskProcedure,connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@taskId", taskId);

                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    task = new TaskModel
                    {
                        UserId = Convert.ToInt32(reader["FUserId"]),
                        TaskId = Convert.ToInt32(reader["TaskID"]),
                        ClientName = reader["ClientName"].ToString(),
                        ProjectName = reader["ProjectName"].ToString(),
                        title = reader["title"].ToString(),
                        ETA = reader.GetDecimal(reader.GetOrdinal("ETA")),
                        TaskDate = reader["TaskDate"].ToString(),
                        AssignedTo = reader["AssignedTo"].ToString(),
                        AssignedBy = reader["AssignedBy"].ToString(),
                        SupportType = reader["SupportType"].ToString(),
                        PriorityType = reader["PriorityType"].ToString(),
                        DescriptionField = reader["DescriptionField"].ToString()
                    };
                }
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                
            }
            finally
            {
                connection.Close();
            }
            return task;
        }

        public int TaskCount(int userId)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string totalTask = "sp_get_total_tasks";
                SqlCommand command = new SqlCommand(totalTask, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userId", userId);

                connection.Open();

                int count = Convert.ToInt32(command.ExecuteScalar());

                return count;  
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return -1;
            }
            finally
            {
                    connection.Close();
            }
        }

    }
}
