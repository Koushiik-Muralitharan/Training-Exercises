using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    internal class ConsoleLogger : Logger_Interface
    {
        public void LogInfo(string message)
        {
            Console.WriteLine($"INFO: {message}");
        }

        public void LogWarning(string message)
        {
            Console.WriteLine($"WARNING: {message}");
        }

        public void LogError(string message)
        {
            Console.WriteLine($"ERROR: {message}");
        }
        public void LogFatal(string message) 
        {
            Console.WriteLine("hi");
        }
    }
}
