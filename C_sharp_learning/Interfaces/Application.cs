using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    internal class Application
    {
        private Logger_Interface Ilogger;

        public Application(Logger_Interface Ilogger) 
        {
            this.Ilogger = Ilogger;
        }

        public void SetMessages()
        {
            this.Ilogger.LogInfo("Application is doing something...");
            this.Ilogger.LogWarning("This is a warning message.");
            this.Ilogger.LogError("An error occurred.");
        }
    }
}
