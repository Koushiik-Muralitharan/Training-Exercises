using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Logger_Interface Ilogger = new FileLogger("C:\\Users\\koushiik.m\\OneDrive - Claysys Technologies Pvt Ltd -1\\Documents\\C#file output.txt");
            Logger_Interface Ilogger = new ConsoleLogger();
            //ConsoleLogger Ilogger = new ConsoleLogger();
            Application app = new Application(Ilogger);

           app.SetMessages();
        }
    }
}
