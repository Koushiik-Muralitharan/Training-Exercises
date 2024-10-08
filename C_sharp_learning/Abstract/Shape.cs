using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstract
{
    internal abstract class Shape
    {
        public abstract double CalculateArea();

        public abstract double CalculatePerimeter();

        public abstract void Display();
    }
}
