using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstract
{
    internal class Triangle : Shape
    {
        private double side1;
        private double side2;
        private double side3;
        private double down;
        private double height;

       public Triangle(double side1, double side2, double side3, double down, double height)
        {
            this.side1 = side1;
            this.side2 = side2;
            this.side3 = side3;
            this.down = down;
            this.height = height;
        }

        public override double CalculateArea()
        {
            return (1d / 2d) * (this.down) * this.height;
        }

        public override double CalculatePerimeter()
        {
            return side1 + side2 + side3;
        }

        public override void Display()
        {
            Console.WriteLine($"Area of the triangle: {CalculateArea()}");
            Console.WriteLine($"Perimeter of the triangle: {CalculatePerimeter()}");
        }
    }
}
