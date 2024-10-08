using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Types_Console
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to C# programming !...");

            int number = 12;

            char ch = 'A';

            string str = "Hello C#";

            bool ans = true;

            float a = 99.99f;

            double b = 100.123D;

            Console.WriteLine($"Integer data type: {number}");
            Console.WriteLine($"Character data type: {ch}");
            Console.WriteLine($"String data type: {str}");
            Console.WriteLine($"Boolean data type: {ans}");
            Console.WriteLine($"Float data type: {a}");
            Console.WriteLine($"Double data type: {b}");


        }
    }
}
