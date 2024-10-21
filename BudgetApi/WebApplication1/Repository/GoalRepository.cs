using Microsoft.Data.SqlClient;
using MyAPI.Connection;
using MyAPI.Model;
using System.Security.Cryptography.Xml;
namespace MyAPI.Repository
{
    public interface IGoalRepository 
    {
        List<Goal> GetUserGoals(int userID);
        bool AddGoal(AddGoals newGoal);
        bool AddContribution(decimal Contribution, int userID, int goalID);
        bool UpdateGoal(int goalID, string goalName, decimal goalAmount);
        bool DeleteGoal(int goalID);
    }

    public class GoalRepository : IGoalRepository
    {
        private readonly IConnectivity conn;

        public GoalRepository(IConnectivity connectionString)
        {
            this.conn = connectionString;   
        }

        public List<Goal> GetUserGoals(int userID)
        {
            var Goals = new List<Goal>();
            SqlConnection connection = conn.GetConnection();

            try
            {
                // string query = "select * from dbo.getUserGoals(@loggedUserID)";
                string getLoggedUserGoalsProcedure = "getLoggedUserGoals";
                SqlCommand command = new SqlCommand(getLoggedUserGoalsProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@loggedUserID", userID);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read()) 
                {
                    Goals.Add(
                        new Goal
                        {
                            UserId = Convert.ToInt32(reader["userID"]),
                            GoalId = Convert.ToInt32(reader["GoalID"]),
                            GoalName = reader["GoalName"].ToString(),
                            GoalAmount = Convert.ToDecimal(reader["GoalAmount"]),
                            GoalContribution = Convert.ToDecimal(reader["GoalContribution"]),
                        });
                }
            }
            catch (Exception ex) 
            {
                Console.WriteLine(ex.ToString());
            }

            finally
            {
                connection.Close();
            }

            return Goals;
        }


        public bool AddGoal(AddGoals newGoal)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string AddGoalProcedure = "AddGoal";
                SqlCommand command = new SqlCommand(AddGoalProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@UserID", newGoal.UserID);
                command.Parameters.AddWithValue("@GoalName", newGoal.GoalName);
                command.Parameters.AddWithValue("@GoalAmount", newGoal.GoalAmount);
                command.Parameters.AddWithValue("@GoalContribution", newGoal.GoalContribution);

                connection.Open();

                int rowsAffected = command.ExecuteNonQuery();

                
                return rowsAffected > 0;

            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            finally
            {
                connection.Close();
            }          
        }

        public bool AddContribution(decimal Contribution, int userID, int goalID)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string AddContributionProcedure = "AddContribution";
                SqlCommand command = new SqlCommand(AddContributionProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@userID", userID);
                command.Parameters.AddWithValue("@goalID", goalID);
                command.Parameters.AddWithValue("@contributionAmount", Contribution);
                connection.Open();

                int rowsAffected = command.ExecuteNonQuery();


                return rowsAffected > 0;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool UpdateGoal(int goalID, string goalName, decimal goalAmount)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                
                string UpdateGoalProcedure = "UpdateGoal";
                SqlCommand command = new SqlCommand(UpdateGoalProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@goalID", goalID);
                command.Parameters.AddWithValue("@goalName", goalName);
                command.Parameters.AddWithValue("@goalAmount", goalAmount);

               
                SqlParameter resultParam = new SqlParameter("@result", System.Data.SqlDbType.Bit);
                resultParam.Direction = System.Data.ParameterDirection.Output;
                command.Parameters.Add(resultParam);

                connection.Open();

                command.ExecuteNonQuery();

               
                bool isSuccess = (bool)command.Parameters["@result"].Value;

                if (isSuccess)
                {
                    return true; 
                }
                else if (isSuccess)
                {
                    Console.WriteLine("Goal not found.");
                    return false; 
                }
                else
                {
                    Console.WriteLine("Error: Stored procedure returned " + isSuccess);
                    return false; 
                }
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

        public bool DeleteGoal(int goalID)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string DeleteGoalProcedure = "DeleteGoal";

                SqlCommand command = new SqlCommand(DeleteGoalProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@goalID", goalID);

                connection.Open();

                int rowsAffected = command.ExecuteNonQuery();


                return rowsAffected > 0;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

    }
}
