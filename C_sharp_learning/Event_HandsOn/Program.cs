using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace Event_HandsOn
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Clock clock = new Clock();  
            clock.OnTick += () => Console.WriteLine($"Tick! Current Time: {DateTime.Now:HH:mm:ss}");  

            clock.Start();  

            Console.WriteLine("Press Enter to stop the clock...");
            Console.ReadLine();

            clock.Stop();  
        }
    }
}
