using Microsoft.Data.SqlClient;
using TaskTrackerApplication.Connection;
using TaskTrackerApplication.Modals;

namespace TaskTrackerApplication.Repository
{
    public interface IUserRepository
    {
        bool AddUser(AddUserModal user, out string errorMessage);
        UserModal GetLoggedUser(AddUserModal user, out string errorMessage);


    }

    public class UserRepository: IUserRepository
    {
        private readonly IConnectivity conn;

        public UserRepository(IConnectivity conn) 
        {
            this.conn = conn;
        }

        public bool AddUser(AddUserModal user, out string errorMessage) 
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                errorMessage = "";
                string AddUserProcedure = "sp_add_user";
                SqlCommand command = new SqlCommand(AddUserProcedure,connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userName", user.UserName);
                command.Parameters.AddWithValue("@password", user.Password);
                connection.Open();
                int rowsAffected = command.ExecuteNonQuery();
                return rowsAffected > 0;
            }catch (SqlException ex)
            {
                errorMessage = ex.Message;
                return false;
            }
            finally
            {
                connection.Close();
            }
        }
        public UserModal GetLoggedUser(AddUserModal user, out string errorMessage)
        {
            UserModal userInfo = null;
            SqlConnection connection = conn.GetConnection();
            try
            {
                errorMessage = "";
                string getLoggedUserProcedure = "sp_get_logged_user";
                SqlCommand command = new SqlCommand(getLoggedUserProcedure,connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userName", user.UserName);
                command.Parameters.AddWithValue("@password", user.Password);
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    userInfo = new UserModal
                    {
                        UserId = Convert.ToInt32(reader["UserId"]),
                        UserName = reader["UserName"].ToString(),
                        Password = reader["passcode"].ToString()
                    };
                }

                return userInfo;

            }
            catch(SqlException ex)
            {
                errorMessage = ex.Message;
                return userInfo;
            }
            finally
            {
                connection.Close();
            }
        }
    }
}
