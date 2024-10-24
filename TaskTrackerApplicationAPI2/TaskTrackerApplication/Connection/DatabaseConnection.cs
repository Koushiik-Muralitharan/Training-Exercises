using Microsoft.Data.SqlClient;
namespace TaskTrackerApplication.Connection
{
    public interface IConnectivity
    {
        SqlConnection GetConnection();
    }
    

    public class DatabaseConnection: IConnectivity
    {
        private string connectionString;

        public DatabaseConnection(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public SqlConnection GetConnection() 
        {
            return new SqlConnection(connectionString);
        }
    }
}
