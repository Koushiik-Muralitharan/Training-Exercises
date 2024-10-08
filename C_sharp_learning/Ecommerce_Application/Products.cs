using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce_Application
{
    internal class Products
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }

        public Products(int Id, string Name, float Price, int Quantity) {
            this.Id = Id;
            this.Name = Name;
            this.Price = Price;
            this.Quantity = Quantity;
        }

        public void displayProducts()
        {
            Console.WriteLine("{0,-10} {1,-20} {2,-10} {3,-15}", this.Id, this.Name, this.Price, this.Quantity);
        }
    }
}
