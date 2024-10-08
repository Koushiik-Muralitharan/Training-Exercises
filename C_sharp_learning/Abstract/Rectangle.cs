using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstract
{
    internal class Rectangle : Shape
    {
        private double width;
        private double height;

        public Rectangle(double width, double height)
        {
            this.width = width;
            this.height = height;   
        }

        public override double CalculateArea()
        {
            return width * height;
        }

        public override double CalculatePerimeter()
        {
            return  2 * (width + height);
        }

        public override void Display()
        {
            Console.WriteLine($"Area of the rectangle: {CalculateArea()}");
            Console.WriteLine($"Perimeter of the rectangle: {CalculatePerimeter()}");
        }
    }
}
