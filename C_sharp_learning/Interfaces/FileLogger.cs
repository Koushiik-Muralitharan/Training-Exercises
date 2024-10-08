using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    internal class FileLogger : Logger_Interface
    {
        private readonly string filePath;

        public FileLogger(string filePath)
        {
            this.filePath = filePath;
        }

        public void LogInfo(string message)
        {
            LogToFile($"INFO: {message}");
        }

        public void LogWarning(string message)
        {
            LogToFile($"WARNING: {message}");
        }

        public void LogError(string message)
        {
            LogToFile($"ERROR: {message}");
        }

        private void LogToFile(string message)
        {
            using (StreamWriter writer = new StreamWriter(filePath, true))
            {
                writer.WriteLine($"{DateTime.Now}: {message}");
            }
        }
    }
}
