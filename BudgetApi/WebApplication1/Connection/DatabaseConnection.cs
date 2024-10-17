using Microsoft.Data.SqlClient;

namespace MyAPI.Connection
{
    public interface IConnectivity
    {
        SqlConnection GetConnection();
    }

    public class DatabaseConnection : IConnectivity
    {
        private string connectionString;

        public DatabaseConnection(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(this.connectionString);
        }
    }
}
