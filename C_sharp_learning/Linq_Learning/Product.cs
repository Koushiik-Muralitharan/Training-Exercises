using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Linq_Learning
{
    internal class Product
    {
        public string Name { get; set; }
        public string Category { get; set; }

        public float Price { get; set; }

        public Product(string Name, string Category, float Price ) 
        {
            this.Name = Name;
            this.Category = Category;   
            this.Price = Price;
        }
    }
}
