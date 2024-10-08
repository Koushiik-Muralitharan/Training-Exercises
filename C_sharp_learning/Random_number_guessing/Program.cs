using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Random_number_guessing

{
    internal class Program
    {
        static void Main(string[] args)
        {
            Random random = new Random();
            int number = random.Next(1, 100);
            Console.WriteLine(number);

            while (true)
            {
                Console.WriteLine("Guess the number:");
                try
                {
                    int val = Convert.ToInt32(Console.ReadLine());

                    if (val > number)
                    {
                        Console.WriteLine("Your guess is higher");
                    }
                    else if (val < number)
                    {
                        Console.WriteLine("Your guess is Low");
                    }
                    else if (val == number)
                    {
                        Console.WriteLine("you guessed it right, congratulations");
                        break;
                    }
                }
                catch (FormatException)
                {
                    Console.WriteLine("Invaild number, Please enter a valid one.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            }
            
        }
    }
}
