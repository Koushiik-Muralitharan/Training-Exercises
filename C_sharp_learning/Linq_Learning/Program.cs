using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Linq_Learning
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Product> products = new List<Product> {

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

            Console.WriteLine("List of products available...");    
            foreach (var product in products) 
            {
                Console.WriteLine($"{product.Name}, {product.Category}, {product.Price}"); 
            }

            Console.WriteLine();
            // Using Linq to display products with similar Category.
            Console.WriteLine("Enter the Category to be displayed:");
            string str;
            while(true)
            {
                try
                {
                    str = Console.ReadLine();
                    break;
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Enter a valid string" + ex);
                }
            }

            List<Product> list = products.Where(product => product.Category == str).ToList();
           
            float totalAvg = 0;
            Console.WriteLine($"List of products available for a {str} category ...");
            foreach (var product in list)
            {
                Console.WriteLine($"{product.Name}, {product.Category}, {product.Price}");
            }

            totalAvg = list.Average(product => product.Price);

            Console.WriteLine($"The average price of the products in particular category : {totalAvg:0.00}");
        }
    }
}
