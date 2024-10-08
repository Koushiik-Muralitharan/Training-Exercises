using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lambda_expression
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<int> list = new List<int>();
            list.Add(1);
            list.Add(2);
            list.Add(3);
            list.Add(4);
            list.Add(5);
            list.Add(6);
            Func<int, bool> EvenNumbers = num => num % 2 == 0;

            List<int> list2 = list.Where(EvenNumbers).ToList();

            foreach (int i in list2)
            {
                Console.WriteLine(i);
            }
        }
    }
}
