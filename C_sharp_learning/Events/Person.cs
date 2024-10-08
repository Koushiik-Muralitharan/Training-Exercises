using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events
{
    internal class Person
    {
        public void ReactToDoorOpening()
        {
            Console.WriteLine("Person: I heard the door open. I'll go check!");
        }
    }
}
