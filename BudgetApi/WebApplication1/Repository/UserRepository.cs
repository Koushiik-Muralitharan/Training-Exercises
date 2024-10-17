using Microsoft.Data.SqlClient;
using MyAPI.Connection;
using MyAPI.Model;
using System;

namespace MyAPI.Repository
{
    public interface IUserRepository
    {
        List<Users> GetUsers();

        bool AddUser(string name, string email, string phone, string password, int age);

        bool CheckUserExists(string userEmail);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IConnectivity conn;

        public UserRepository(IConnectivity ConnectionString)
        {
            this.conn = ConnectionString;
        }

        public List<Users> GetUsers()
        {
            var users = new List<Users>();
            SqlConnection connection = conn.GetConnection();

            try
            {
                string query = "Select * from UserDetails";
                SqlCommand command = new SqlCommand(query, connection);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    users.Add(new Users
                    {
                        userId = Convert.ToInt32(reader["usedId"]),
                        name = reader["userName"].ToString(),
                        email = reader["userEmail"].ToString(),
                        phone = reader["mobileNumber"].ToString(),
                        password = reader["passcode"].ToString(),
                        age = Convert.ToInt32(reader["age"])
                    });

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            finally
            {
                connection.Close();
            }

            return users;
        }

        public bool AddUser( string name, string email, string phone, string password, int age)
        {
            SqlConnection connection = conn.GetConnection();
            
            try
            {
                string AddUserProcedure = "InsertUser";
                SqlCommand command = new SqlCommand(AddUserProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userName", name);
                command.Parameters.AddWithValue("@userEmail",email );
                command.Parameters.AddWithValue("@mobileNumber", phone);
                command.Parameters.AddWithValue("@passcode", password);
                command.Parameters.AddWithValue("@age", age);

                connection.Open();

                int rowsAffected = command.ExecuteNonQuery();


                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            finally
            {
                connection.Close();
            }
        }

        public bool CheckUserExists(string userEmail)
        {
            SqlConnection connection = conn.GetConnection();
            bool isUserPresent = false;

            try
            {
                string query = "SELECT dbo.IsUserPresent(@UserEmail)";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@UserEmail", userEmail);
                connection.Open();

                var result = command.ExecuteScalar();

                if(result != null && int.TryParse(result.ToString(), out int isPresent))
                {
                    isUserPresent = (isPresent == 1);

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

            return isUserPresent;
        }
    }
}
