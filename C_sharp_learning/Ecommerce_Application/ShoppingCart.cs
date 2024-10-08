using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce_Application
{
    internal class ShoppingCart
    {
        private List<Products> cart = new List<Products>();

        public int cartLength()
        {
            return cart.Count;
        }
       
        public void addProduct(Products product, int qty)
        {
            Products ExistsProduct = cart.Find(p => p.Id == product.Id);
            if (product.Quantity >= qty) {
                product.Quantity -= qty;
                if (ExistsProduct!=null)
                {
                    ExistsProduct.Quantity += qty;
                    Console.WriteLine("Quantity Updated successfully");
                    Console.WriteLine($"{ExistsProduct.Name}, Current quantity: ${ExistsProduct.Quantity}");
                }
                else
                {
                    cart.Add(new Products(product.Id, product.Name, product.Price, qty));
                    Console.WriteLine($"{product.Id}, {product.Name}, {product.Price}, {qty}");
                    Console.WriteLine("Product added successfully !...");
                }
                
            }
            else
            {
                Console.WriteLine($"Stock not available");
            }
        }

        public void removeProduct(Products product) {

              Products products = cart.Find(p => p.Id == product.Id);
            if (cart.Count > 0 && cart.Contains(products))
            {
                Products removeproduct = cart.Find(p => p.Id == product.Id);
                product.Quantity += removeproduct.Quantity;
                cart.Remove(removeproduct);
                Console.WriteLine($"product name: {product.Name}");
                Console.WriteLine("Product Removed successfully");
            }
            else
            {
                Console.WriteLine("There are no such product.");
            }

            
        }

        public void calculateTotals()
        {
            float total = 0;
            foreach (var product in cart) {
                total += product.Price * product.Quantity;
            }
            if (total > 0)
            {
                Console.WriteLine($"Total amount : {total}");
                Console.WriteLine("Thank you for shopping !...");
            }
            else
            {
                Console.WriteLine("Thank you for visiting our store.");
            }

            
        }

        public void displayCart()
        {
            foreach (var item in cart)
            {
                Console.WriteLine("{0,-20} {1,-20}", item.Name, item.Quantity);
            }
        }
    }
}
