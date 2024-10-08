using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generics
{
    internal class Program
    {
        static void Main(string[] args)
        {

            Stacks<int> st = new Stacks<int>();
            Stacks<string> st2 = new Stacks<string>();

            st.Adds(1);
            st.Adds(2);
            st.Adds(3);
            st.Adds(4);
            st.Adds(5);

            // Removing the elements 
            st.Removes(4);

            Console.WriteLine("Peak Element in the integer type stack:");
            st.Peak();

            Console.WriteLine("Displaying the elements with Integer data type: ");
            st.Display();


            st2.Adds("koushiik");
            st2.Adds("Cholan");
            st2.Adds("Muthamil selvan");
            st2.Adds("Theveesh");

            // Removing the elements 
            st2.Removes("Muthamil selvan");

            Console.WriteLine("Peak Element in the String type stack:");
            st2.Peak();


            Console.WriteLine("Displaying the elements with String data type: ");
            st2.Display();


            void TypeChecker<T>(T value)
            {
                Console.WriteLine($"{typeof(T)}");
                Console.WriteLine($"Value: {value}");
            }

            TypeChecker(1);
            TypeChecker("C#");
        }
    }
}
