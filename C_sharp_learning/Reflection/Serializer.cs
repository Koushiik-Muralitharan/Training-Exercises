using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Reflection
{
    internal class Serializer
    {
        public static string SerializeObject(object obj)
        {
            Type objType = obj.GetType();
            //Console.WriteLine(objType.Name);
            //Console.WriteLine(objType.Namespace);
            //Console.WriteLine(objType.GetProperties());
            PropertyInfo[] properties = objType.GetProperties();  
            
            string result = $"Object Type: {objType.Name}";

            foreach (PropertyInfo property in properties)
            {
                string valueString = property.GetValue(obj).ToString();  
                result += $"\n{property.Name}: {valueString}";
            }

            return result;
        }
    }
}
