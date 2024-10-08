using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstract
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Circle cle = new Circle(5);
            //circle's Display
            Console.WriteLine("Circle");
            cle.Display();

            Rectangle rect = new Rectangle(5, 10);
            //rectangle's Display
            Console.WriteLine("Rectangle");
            rect.Display();

            Triangle tri = new Triangle(1, 2, 3, 3, 1.5);
            //triangle's Display
            Console.WriteLine("Triangle");
            tri.Display();
        }
    }
}
