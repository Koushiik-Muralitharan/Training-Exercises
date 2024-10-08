using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce_Application
{
    internal class Program
    {
        static void Main(string[] args)
        {
            bool keepShopping = true;
            ShoppingCart cart = new ShoppingCart();

            List<Products> list = new List<Products>();

            list.Add(new Products(1, "Laptop", 999.99f, 10));
            list.Add(new Products(2, "Smartphone", 499.99f, 25));
            list.Add(new Products(3, "Tablet", 299.99f, 15));
            list.Add(new Products(4, "SmartWatch", 199.87f, 15));
            list.Add(new Products(5, "Earbuds", 100.45f, 20));

            Console.WriteLine("MENU");
            Console.WriteLine("1. View Details");
            Console.WriteLine("2. Add To Cart");
            Console.WriteLine("3. Remove From Cart");
            Console.WriteLine("4. View Cart");
            Console.WriteLine("5. Checkout");


            try
            {
                while (keepShopping)
                {
                    int option = Convert.ToInt32(Console.ReadLine());
                    switch (option)
                    {
                        case 1:
                            Console.WriteLine("Available Products:");

                            Console.WriteLine("{0,-10} {1,-20} {2,-10} {3,-10}", "ID", "Name", "Price", "Quantity");
                            Console.WriteLine(new string('-', 55));


                            foreach (var item in list)
                            {
                                item.displayProducts();
                            }
                            break;

                        case 2:
                            Console.WriteLine("Enter the product ID to be added:");
                            int productId;

                            while (true)
                            {
                                try
                                {
                                    productId = Convert.ToInt32(Console.ReadLine());
                                    break;
                                }
                                catch (FormatException)
                                {
                                    Console.WriteLine("Enter a valid productId.");
                                }
                            }

                            Products product = list.Find(p => p.Id == productId);



                            Console.WriteLine("Enter the quantity:");
                            int qty;

                            while (true)
                            {
                                try
                                {
                                    qty = Convert.ToInt32(Console.ReadLine());
                                    break;
                                }
                                catch (FormatException)
                                {
                                    Console.WriteLine("Enter a valid value for quantity.");
                                }
                            }

                            if (product != null)
                            {
                                cart.addProduct(product, qty);
                            }

                            break;

                        case 3:
                            Console.WriteLine("Enter the product ID to be deleted:");


                            int removeProductId;

                            while (true)
                            {
                                try
                                {
                                    removeProductId = Convert.ToInt32(Console.ReadLine());
                                    
                                    break;
                                }
                                catch (FormatException)
                                {
                                    Console.WriteLine("Enter a valid productId.");
                                }
                            }
                            Products removeproduct = list.Find(p => p.Id == removeProductId); 
                             
                            if(removeproduct != null)
                            {
                                cart.removeProduct(removeproduct);
                            }
                            
                            break;

                        case 4:
                            Console.WriteLine("Your Cart:");

                            if (cart.cartLength()>0)
                            {
                                Console.WriteLine("{0,-20} {1,-20}", "product", "quantity" );
                                Console.WriteLine(new string('-', 30));
                                cart.displayCart();
                            }
                            else
                            {
                                Console.WriteLine("No items were present in your cart.");
                            }
                            break;

                        case 5:
                           
                                cart.calculateTotals();
                                keepShopping = false;
                                break;


                        default:
                            Console.WriteLine("Enter a valid option");
                            break;

                    }
                }
            } catch (Exception ex) { 
              Console.WriteLine(ex);
            }
        }
    }
}
