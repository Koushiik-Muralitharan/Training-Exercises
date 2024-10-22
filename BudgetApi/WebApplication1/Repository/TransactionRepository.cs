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
        bool EditTransaction(int userID, int transactionID, string transactionType, string category, string date, decimal amount );
    }

    public class TransactionRepository : ITransactionRepository
    {
        private readonly IConnectivity conn;

        public TransactionRepository(IConnectivity ConnectionString)
        {
            this.conn = ConnectionString;
        }

        //using for development purpose.
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
                        UserId = Convert.ToInt32(reader["userID"]),
                        TransactionID = Convert.ToInt32(reader["transactionID"]),
                        TransactionType = reader["transactionType"].ToString(),
                        Category = reader["category"].ToString(),
                        Date = reader["transactionDate"].ToString(),
                        Amount = Convert.ToDecimal(reader["amount"])

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
                string getLoggedUserTransactionsProcedure = "sp_get_logged_user_transactions";
                SqlCommand command = new SqlCommand(getLoggedUserTransactionsProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@loggedUserID", userID);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    TransactionsList.Add(new Transactions
                    {
                        UserId = Convert.ToInt32(reader["userID"]),
                        TransactionID = Convert.ToInt32(reader["transactionID"]),
                        TransactionType = reader["transactionType"].ToString(),
                        Category = reader["category"].ToString(),
                        Date = reader["transactionDate"].ToString(),
                        Amount = Convert.ToDecimal(reader["amount"])

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
                string addTransactionProcedure = "sp_add_transaction";
                SqlCommand command = new SqlCommand(addTransactionProcedure, connection);
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
                string deleteTransactionProcedure = "sp_delete_transaction";
                SqlCommand command = new SqlCommand(deleteTransactionProcedure,connection);
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
                string getLoggedUserExpenseProcedure  = "GetLoggedUserExpenses";
                SqlCommand command = new SqlCommand(getLoggedUserExpenseProcedure, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@loggedUserId", userID);

                connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    transactionList.Add(new Transactions
                    {
                        UserId = Convert.ToInt32(reader["userID"]),
                        TransactionID = Convert.ToInt32(reader["transactionID"]),
                        TransactionType = reader["transactionType"].ToString(),
                        Category = reader["category"].ToString(),
                        Date = reader["transactionDate"].ToString(),
                        Amount = Convert.ToDecimal(reader["amount"])
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
        public bool EditTransaction(int userID, int transactionID, string transactionType, string category, string date, decimal amount)
        {
            SqlConnection connection = conn.GetConnection();
            try
            {
                string editTransactionProcedure = "sp_edit_transaction";
                SqlCommand command = new SqlCommand(editTransactionProcedure,connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userID",userID);
                command.Parameters.AddWithValue("@transactionID", transactionID);
                command.Parameters.AddWithValue("@transactionType", transactionType);
                command.Parameters.AddWithValue("@category", category);
                command.Parameters.AddWithValue("@transactionDate", date);
                command.Parameters.AddWithValue("@amount", amount);

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
                    Console.WriteLine("Transaction not found.");
                    return false;
                }
                else
                {
                    Console.WriteLine("Error: Stored procedure returned " + isSuccess);
                    return false;
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
