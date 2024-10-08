using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegates
{
    internal class delegates_basics
    {
        public delegate void Printdel(int x);

        public void brain() 
        {
            delegates_basics basics = new delegates_basics();
            printSomething(100, basics.printMoney);
        }

        public  void printMoney(int money)
        {
            Console.WriteLine($"printMoney: {money}");
        }

        public  void printNumber(int num) 
        {
            Console.WriteLine(num);
        }

        public static void printSomething(int money, Printdel del) 
        {
            del(money);
        }
    }

    
}
