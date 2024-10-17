using Microsoft.Data.SqlClient;
using MyAPI.Connection;
using MyAPI.Model;

namespace MyAPI.Repository
{
    public interface ITransactionRepository
    {
        List<Transactions> GetTransactions();
        List<Transactions> GetUserTransaction(int userID);
        List<Transactions> GetUserExpenses(int userID);
        bool AddTransaction(AddTransactions addtransaction);
        bool DeleteTransaction(int transactionID);
    }

    public class TransactionRepository : ITransactionRepository
    {
        private readonly IConnectivity conn;

        public TransactionRepository(IConnectivity ConnectionString)
        {
            this.conn = ConnectionString;
        }

        public List<Transactions> GetTransactions()
        {
            var TransactionsList = new List<Transactions>();
            SqlConnection connection = conn.GetConnection();

            try
            {
                string query = "Select * from Transactions";
                SqlCommand command = new SqlCommand(query, connection);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    TransactionsList.Add(new Transactions
                    {
                        userId = Convert.ToInt32(reader["userID"]),
                        transactionID = Convert.ToInt32(reader["transactionID"]),
                        transactionType = reader["transactionType"].ToString(),
                        category = reader["category"].ToString(),
                        date = reader["transactionDate"].ToString(),
                        amount = Convert.ToInt32(reader["amount"])

                    });

                }
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close();
            }

            return TransactionsList;
        }

        public List<Transactions> GetUserTransaction(int userID)
        {
            var TransactionsList = new List<Transactions>();
            SqlConnection connection = conn.GetConnection();

            try
            {
                string query = "select * from dbo.getUserTransactions(@loggedUserID)";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@loggedUserID", userID);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    TransactionsList.Add(new Transactions
                    {
                        userId = Convert.ToInt32(reader["userID"]),
                        transactionID = Convert.ToInt32(reader["transactionID"]),
                        transactionType = reader["transactionType"].ToString(),
                        category = reader["category"].ToString(),
                        date = reader["transactionDate"].ToString(),
                        amount = Convert.ToInt32(reader["amount"])

                    });
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
            return TransactionsList;
        }

        public bool AddTransaction(AddTransactions addTransactions)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string AddTransactionProcedure = "addTransaction";
                SqlCommand command = new SqlCommand(AddTransactionProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@UserID", addTransactions.userId);
                command.Parameters.AddWithValue("@transactionType", addTransactions.transactionType);
                command.Parameters.AddWithValue("@category", addTransactions.category );
                command.Parameters.AddWithValue("@transactionDate", Convert.ToDateTime(addTransactions.date));
                command.Parameters.AddWithValue("@amount", addTransactions.amount);
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

        public bool DeleteTransaction(int transactionID)
        {
            SqlConnection connection = conn.GetConnection();

            try
            {
                string DeleteTransactionProcedure = "DeleteTransaction";
                SqlCommand command = new SqlCommand(DeleteTransactionProcedure,connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@TransactionID", transactionID);
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

        public List<Transactions> GetUserExpenses(int userID)
        {
            SqlConnection connection = conn.GetConnection();
            var transactionList = new List<Transactions>();
            try
            {
                string query = "select * from dbo.GetExpenses(@loggedUserId) ";
                SqlCommand command = new SqlCommand(query, connection);

                command.Parameters.AddWithValue("@loggedUserId", userID);

                connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    transactionList.Add(new Transactions
                    {
                        userId = Convert.ToInt32(reader["userID"]),
                        transactionID = Convert.ToInt32(reader["transactionID"]),
                        transactionType = reader["transactionType"].ToString(),
                        category = reader["category"].ToString(),
                        date = reader["transactionDate"].ToString(),
                        amount = Convert.ToInt32(reader["amount"])

                    });
                }

                return transactionList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close();
            }
            return transactionList;
        }
    }
}
