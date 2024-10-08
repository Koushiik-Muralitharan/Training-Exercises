using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Exception_Handling
{
    internal class Program
    {

        public static int Division(int num1, int num2)
        {
            try
            {
                int res = num1 / num2;
                return res;
            }
            catch (DivideByZeroException) {
                Console.WriteLine("Cannot divide by zero.");
                return int.MinValue;
            }
        }
        static void Main(string[] args)
        {
            int  num1 = 0;
            int  num2 = 0;
            while (true) {
                while (true)
                {
                    try
                    {
                        num1 = int.Parse(Console.ReadLine());
                        break;
                    }
                    catch (FormatException)
                    {
                        Console.WriteLine("Enter a valid number");
                    }
                }

                while (true)
                {
                    try
                    {
                        num2 = int.Parse(Console.ReadLine());
                        break;
                    }
                    catch (FormatException)
                    {
                        Console.WriteLine("Enter a valid number");
                    }
                }

                int ans = Division(num1, num2);
                if (ans != int.MinValue)
                {
                    Console.WriteLine($"The answer is : {ans}");
                    break;
                }
            }
        }
    }
}
