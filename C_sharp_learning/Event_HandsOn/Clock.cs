using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
//using System.Threading;
using System.Threading.Tasks;
using System.Timers;

namespace Event_HandsOn
{
    public delegate void ClockHandler();
    internal class Clock
    {
        public event ClockHandler OnTick;

        private Timer timer;

        public Clock()
        {
            timer = new Timer(1000);
            timer.Elapsed += OnTimedEvent;
        }

        private void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            if(OnTick != null)
            {
                OnTick();
            }
        }

        public void Start()
        {
            timer.Start();
        }

        public void Stop()
        {
            timer.Stop();
        }
    }
}
