using Microsoft.Data.SqlClient;
using Microsoft.Identity.Client;
using MyAPI.Connection;
using MyAPI.Model;
using System;

namespace MyAPI.Repository
{
    public interface IUserRepository
    {
        List<Users> GetUsers();
        bool AddUser(string name, string email, string phone, string password);
        bool CheckUserExists(string userEmail);
        UserInfo GetUserInfo(string userEmail);
        bool DeleteAccount(string userEmail);
        bool EditUserDetails(int userID, string userName, string userEmail, string phoneNumber );
        bool EditPassword(int userID, string oldPassword, string newPassword);
        bool AddCategory(int userID, string transactionType, string category, out string errorMessage);
        bool DeleteCategory(int categoryID, out string errorMessage);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IConnectivity conn;

        public UserRepository(IConnectivity connectionString)
        {
            this.conn = connectionString;
        }

        //using for development purpose.
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
                        UserId = Convert.ToInt32(reader["userId"]),
                        Name = reader["userName"].ToString(),
                        Email = reader["userEmail"].ToString(),
                        Phone = reader["mobileNumber"].ToString(),
                        Password = reader["passcode"].ToString()
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

        public bool AddUser( string name, string email, string phone, string password)
        {
            SqlConnection connection = conn.GetConnection();
            
            try
            {
                string addUserProcedure = "sp_insert_user";
                SqlCommand command = new SqlCommand(addUserProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userName", name);
                command.Parameters.AddWithValue("@userEmail",email );
                command.Parameters.AddWithValue("@mobileNumber", phone);
                command.Parameters.AddWithValue("@passcode", password);

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

        public bool CheckUserExists(string userEmail)
        {
            SqlConnection connection = conn.GetConnection();
            bool isUserPresent = false;

            try
            {
                string checkIfUserExists = "sp_check_user_presence";
                SqlCommand command = new SqlCommand(checkIfUserExists, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@UserEmail", userEmail);
                connection.Open();

                var result = command.ExecuteScalar();
                if(result != null)
                {
                    isUserPresent = (bool)result;
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

        public UserInfo GetUserInfo(string email)
        {
            UserInfo userInfo = null;
            List<Transactions> transactionsList = new List<Transactions>();
            List<Goal> goalList = new List<Goal>();
            
            SqlConnection connection = conn.GetConnection();

            try
            {
                string userInfoProcedure = "sp_get_user_info";
                SqlCommand command = new SqlCommand(userInfoProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userEmail", email);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    userInfo = new UserInfo
                    {
                        UserId = Convert.ToInt32(reader["userId"]),
                        Name = reader["userName"].ToString(),
                        Email = reader["userEmail"].ToString(),
                        Phone = reader["mobileNumber"].ToString(),
                        Password = reader["passcode"].ToString(),
                    };

                }

                if(reader.NextResult())
                {
                    while (reader.Read())
                    {
                        transactionsList.Add(new Transactions
                        {
                            UserId = Convert.ToInt32(reader["userID"]),
                            TransactionID = Convert.ToInt32(reader["transactionID"]),
                            TransactionType = reader["transactionType"].ToString(),
                            Category = reader["category"].ToString(),
                            Date = reader["transactionDate"].ToString(),
                            Amount = Convert.ToDecimal(reader["amount"])
                        }); 
                    }
                    userInfo.UserTransaction = transactionsList;
                }

                if(reader.NextResult())
                {
                    while (reader.Read())
                    {
                        goalList.Add(new Goal
                        {
                             UserId = Convert.ToInt32(reader["userID"]) ,
                             GoalId = Convert.ToInt32(reader["GoalID"]),
                             GoalName = reader["GoalName"].ToString(),
                             GoalAmount = Convert.ToDecimal(reader["GoalAmount"]) ,
                             GoalContribution = Convert.ToDecimal(reader["GoalContribution"]),
                        });
                    }
                    userInfo.UserGoals = goalList;
                }
                return userInfo;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return userInfo;
            }
            finally
            {
                connection.Close();
            }
        }

        public bool DeleteAccount(string email)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string deleteAccountProcedure = "sp_delete_user_account";
                SqlCommand command = new SqlCommand(deleteAccountProcedure,connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userEmail",email);
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

        public bool EditUserDetails(int userID, string userName, string userEmail, string phoneNumber)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string editUserDetailsProcedure = "sp_edit_user_details";
                SqlCommand command = new SqlCommand(editUserDetailsProcedure,connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userID", userID);
                command.Parameters.AddWithValue("@userName",userName);
                command.Parameters.AddWithValue("@userEmail", userEmail);
                command.Parameters.AddWithValue("@phoneNumber", phoneNumber);
                connection.Open();
                int rowsAffected = command.ExecuteNonQuery();


                return rowsAffected > 0;
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            finally
            {
                connection.Close();
            }
        }
        public bool EditPassword(int userID, string oldPassword, string newPassword)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string EditPasswordProcedure = "sp_edit_password";
                SqlCommand command = new SqlCommand(EditPasswordProcedure,connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userID",userID);
                command.Parameters.AddWithValue("@oldPassword",oldPassword);
                command.Parameters.AddWithValue("@newPassword",  newPassword);

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
        public bool AddCategory(int userID, string transactionType, string category, out string errorMessage)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                errorMessage = "";
                string addCategoryProcedure = "sp_add_category";
                SqlCommand command = new SqlCommand(addCategoryProcedure,connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userID", userID);
                command.Parameters.AddWithValue("@transactionType", transactionType);
                command.Parameters.AddWithValue("@category", category);
                connection.Open();
                int rowsAffected = command.ExecuteNonQuery();
                return rowsAffected > 0;   
            }
            catch (SqlException ex)
            {
                errorMessage = ex.Message;
                return false;
            }
            finally
            {
                connection.Close();
            }
        }

        public bool DeleteCategory(int categoryID, out string errorMessage)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                errorMessage = "";
                string deleteCategoryProcedure = "sp_delete_category";
                SqlCommand command = new SqlCommand(deleteCategoryProcedure,connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@categoryID",categoryID);
                connection.Open();
                int rowsAffected = command.ExecuteNonQuery();
                return rowsAffected > 0;
            }
            catch (SqlException ex)
            {
                errorMessage = ex.Message;
                return false;
            }
            finally
            {
                connection.Close();
            }
        }
    }
}
