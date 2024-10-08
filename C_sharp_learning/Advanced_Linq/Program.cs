using Advanced_Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Linq_Learning
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            List<Product> products = new List<Product> 
            {
                 new Product("Bread", "Essentials", 20.05f),
                new Product("Milk", "Essentials", 15.50f),
                new Product("Eggs", "Essentials", 10.75f),
                new Product("Shampoo", "Needs", 45.00f),
                new Product("Toothpaste", "Needs", 30.25f),
                new Product("Rice", "Essentials", 50.00f),
                new Product("Flour", "Essentials", 35.25f),
                new Product("Cooking Oil", "Essentials", 80.75f),
                new Product("Laundry Detergent", "Needs", 65.50f),
                new Product("Soap", "Needs", 20.30f)
            };

            // LINQ Method Syntax.

            var groupByEssentials = products.GroupBy(p => p.Category);

            foreach (var i in groupByEssentials)
            {
                Console.WriteLine($"{i.Key}");

                foreach (var product in i)
                {
                    Console.WriteLine($"{product.Name} - {product.Price}");
                }
            }

            Console.WriteLine("Using OrderBy");
            var orderByCount = groupByEssentials.OrderByDescending(group => group.Count());

            foreach (var product in orderByCount)
            {
                Console.WriteLine($"{product.Key}");

                foreach (var p in product)
                {
                    Console.WriteLine($"{p.Name} - {p.Price}");
                }
            }

            // LINQ Query Syntax.

            var Lqs = from p in products
                      group p by p.Category into g
                      select new {Category = g.Key,Count = g.Count(), Product = g.ToList() };

            foreach (var product in Lqs)
            {
                Console.WriteLine($"Product Category: {product.Category}, Count: {product.Count}");

                foreach( var p in product.Product)
                {
                    Console.WriteLine($"{p.Name} - {p.Price}");
                }
            }
                
        }
    }
}
