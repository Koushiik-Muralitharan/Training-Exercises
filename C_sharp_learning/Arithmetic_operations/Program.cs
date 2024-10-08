using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Arithmetic_operations
{
    internal class Program
    {
        static void Main(string[] args)
        {
            float a = 0;
            float b = 0;
            bool canproceed = true;

            while (canproceed)
            {
                canproceed = false;

                Console.WriteLine("Enter two numbers to perform arithmetic operation:");
                Console.WriteLine("Enter the first number:");
                while (true)
                {
                    try
                    {
                        a = float.Parse(Console.ReadLine());
                        break;
                    }
                    catch (FormatException) {
                        Console.WriteLine("Enter a valid numeric value");
                    }
                }
                Console.WriteLine("Enter the second number:");
                while (true)
                {
                    try
                    {
                        b = float.Parse(Console.ReadLine());
                        break;
                    }
                    catch (FormatException)
                    {
                        Console.WriteLine("Enter a valid numeric value");
                    }
                }
                Console.WriteLine("These are the operations performed that can be performed on the operands: +, -, *, /");
                Console.WriteLine("Enter the operation to be performed on that numbers:");
                string symbol;
                while (true) {
                    try
                    {
                        symbol = Console.ReadLine();

                        if(symbol == "+" || symbol == "-" || symbol == "*" || symbol == "/")
                        {
                            break;
                        }
                        else
                        {
                            throw new Exception("Enter a valid operator");
                        }
                    }
                    catch (Exception ex) {
                        Console.WriteLine(ex);
                    
                    }
                }
                float c = 0;
                    switch (symbol)
                    {
                        case "+":
                            c = a + b;
                            Console.WriteLine(c);
                            break;
                        case "-":
                            c = Math.Max(a,b) - Math.Min(a,b);
                            Console.WriteLine(c);
                            break;
                        case "*":
                            c = a * b;
                            Console.WriteLine(c);
                            break;
                        case "/":
                            c = Math.Max(a, b) / Math.Min(a, b);
                            Console.WriteLine(c);
                            break;
                        default:
                            Console.WriteLine("Enter a valid operation");
                            break;
                    }
            }
        }
    }
}
