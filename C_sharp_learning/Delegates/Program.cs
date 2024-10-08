using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegates
{
    internal class Program
    {
        public delegate int Operations(int x, int y);

        static void Main(string[] args)
        {
            int option = 0;
            int val1 = 0;
            int val2 = 0;

            Console.WriteLine("Enter the number 1: ");

            while (true)
            {
                try
                {
                    val1 = Convert.ToInt32(Console.ReadLine());
                    break;
                }
                catch (FormatException)
                {
                    Console.WriteLine("Enter a valid number");
                }
            }

            Console.WriteLine("Enter the number 2: ");
            while (true)
            {
                try
                {
                    val2 = Convert.ToInt32(Console.ReadLine());
                    break;
                }
                catch (FormatException)
                {
                    Console.WriteLine("Enter a valid number");
                }
            }
            Console.WriteLine("Enter a option to perform arithmetic option:");
            Console.WriteLine("1. Multiplication");
            Console.WriteLine("2. Addition");
            Console.WriteLine("3. Subtraction");
            Console.WriteLine("4. Division");
            while (true)
            {
                try
                {
                    option = Convert.ToInt32(Console.ReadLine());
                    if (option == 1 || option == 2 || option == 3 || option == 4)
                    {
                        break;
                    }
                    else
                    {
                        Console.WriteLine("Enter a valid option");
                    }
                }
                catch (FormatException)
                {
                    Console.WriteLine("Enter a valid option of numeric type");
                }
            }

            switch (option)
            {
                case 1:
                    Operations op = new Operations(multiplication);
                    Console.WriteLine($"Multiplication: {op(val1, val2)}");
                    break;
                case 2:
                    op = new Operations(addition);
                    Console.WriteLine($"Addition: {op(val1, val2)}");
                    break;
                case 3:
                    op = new Operations(subtraction);
                    Console.WriteLine($"Subtraction: {op(val1, val2)}");
                    break;
                case 4:
                    op = new Operations(division);
                    Console.WriteLine($"Division: {op(val1, val2)}");
                    break;

            }

            delegates_basics dl = new delegates_basics();
            dl.brain();
        }

        static int addition(int a, int b)
        {
            return a + b;
        }

        static int subtraction(int a, int b)
        {
            return a - b;
        }

        static int multiplication(int a, int b)
        {
            return a * b;
        }

        static int division(int a, int b)
        {
            return (a / b);
        }
    }
}
