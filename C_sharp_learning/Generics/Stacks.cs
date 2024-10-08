using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generics
{
    internal class Stacks<T>
    {
        List<T> stack = new List<T>();
        public void Adds(T value)
        {
            stack.Add(value);
        }

        public void Removes(T value) {
            stack.Remove(value);     
        }

        public void Peak() {
           T value = stack.Last();

            Console.WriteLine(value);
        }

        public void Display()
        {
            foreach (var item in stack)
            {
                Console.WriteLine(item);
            }
        }

        

       
    }
}
