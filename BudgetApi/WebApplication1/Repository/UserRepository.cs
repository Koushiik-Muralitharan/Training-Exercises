﻿using Microsoft.Data.SqlClient;
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
                        userId = Convert.ToInt32(reader["userId"]),
                        name = reader["userName"].ToString(),
                        email = reader["userEmail"].ToString(),
                        phone = reader["mobileNumber"].ToString(),
                        password = reader["passcode"].ToString()
                    });

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            finally
            {
               // connection.Close();
            }

            return users;
        }

        public bool AddUser( string name, string email, string phone, string password)
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
                Console.WriteLine($"Result from database: {result}");
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
                string userInfoProcedure = "GetUserInfo";
                SqlCommand command = new SqlCommand(userInfoProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userEmail", email);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    userInfo = new UserInfo
                    {
                        userId = Convert.ToInt32(reader["userId"]),
                        name = reader["userName"].ToString(),
                        email = reader["userEmail"].ToString(),
                        phone = reader["mobileNumber"].ToString(),
                        password = reader["passcode"].ToString(),
                    };

                }

                if(reader.NextResult())
                {
                    while (reader.Read())
                    {
                        transactionsList.Add(new Transactions
                        {
                            userId = Convert.ToInt32(reader["userID"]),
                            transactionID = Convert.ToInt32(reader["transactionID"]),
                            transactionType = reader["transactionType"].ToString(),
                            category = reader["category"].ToString(),
                            date = reader["transactionDate"].ToString(),
                            amount = Convert.ToDecimal(reader["amount"])
                        }); 
                    }
                    userInfo.userTransaction = transactionsList;
                }

                if(reader.NextResult())
                {
                    while (reader.Read())
                    {
                        goalList.Add(new Goal
                        {
                             UserID = Convert.ToInt32(reader["userID"]) ,
                             GoalID = Convert.ToInt32(reader["GoalID"]),
                             GoalName = reader["GoalName"].ToString(),
                             GoalAmount = Convert.ToDecimal(reader["GoalAmount"]) ,
                             GoalContribution = Convert.ToDecimal(reader["GoalContribution"]),
                        });
                    }
                    userInfo.userGoals = goalList;
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
                string DeleteAccountProcedure = "DeleteUserAccount";
                SqlCommand command = new SqlCommand(DeleteAccountProcedure,connection);
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
                string EditUserDetailsProcedure = "EditUserDetails";
                SqlCommand command = new SqlCommand(EditUserDetailsProcedure,connection);
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
                string EditPasswordProcedure = "EditPassword";
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
    }
}
