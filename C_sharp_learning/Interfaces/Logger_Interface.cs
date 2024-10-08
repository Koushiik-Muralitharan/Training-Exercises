using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    internal interface Logger_Interface
    {
         void LogInfo(string message);
         void LogWarning(string message);
         void LogError(string message);
    }
}
