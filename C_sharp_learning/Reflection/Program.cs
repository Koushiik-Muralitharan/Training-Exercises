using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reflection
{
    internal class Program
    {
        static void Main(string[] args)
        {
           
            Person person = new Person { Name = "Akash", Age = 22, Occupation = "Product Engineer" };
            Address address = new Address { Street = "Morappur", City = "Dharmapuri", PostalCode = 635305 };

            
            string serializedPerson = Serializer.SerializeObject(person);
            Console.WriteLine("Person:");
            Console.WriteLine(serializedPerson);

            
            string serializedAddress = Serializer.SerializeObject(address);
            Console.WriteLine("\nAddress:");
            Console.WriteLine(serializedAddress);
        }
    }
}
