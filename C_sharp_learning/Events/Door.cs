using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events
{
    public delegate void DoorOpenedEventHandler();
    internal class Door
    {
        public event DoorOpenedEventHandler DoorOpened;

        public void Open()
        {
            Console.WriteLine("Door is now open.");

            if (DoorOpened != null)
            {
                DoorOpened();
            }
        }
    }
}
