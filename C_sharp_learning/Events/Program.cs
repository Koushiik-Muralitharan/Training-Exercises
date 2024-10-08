using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Door door = new Door();
            Person person = new Person();

            door.DoorOpened += person.ReactToDoorOpening;

            door.Open();
        }
    }
}
