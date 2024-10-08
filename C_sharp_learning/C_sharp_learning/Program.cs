using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C_sharp_learning
{
    internal class Program
    {
        static void Main(string[] args)
        {
           
            int principal, rate, year, si;

            Console.Write("Enter the principal amount: ");
            principal = int.Parse(Console.ReadLine());
            Console.Write("Enter the Rate of Interest: ");
            rate = int.Parse(Console.ReadLine());
            Console.Write("Enter the no of years: ");
            year = int.Parse(Console.ReadLine());

            si = (principal * rate * year) / 100;

            Console.WriteLine($"The simple interest is {si}");


            Console.Write("Enter a value");
            int a = Console.Read();
            Console.WriteLine("Ascii :"+a);

        }
    }
}
