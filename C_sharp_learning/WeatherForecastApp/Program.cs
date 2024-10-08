using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft;
using Newtonsoft.Json.Linq;

namespace WeatherForecastApp
{
    internal class Program
    {
        public async Task<string> FetchWeatherData(string city)
        {
            using (HttpClient client = new HttpClient())
            {
                const string apiKey = "7d3bf8ad01e8bf2375ca7989b24980c2";
                const string Url = "https://api.openweathermap.org/data/2.5/weather";
                HttpResponseMessage response = await
                client.GetAsync($"{Url}?q={city}&appid={apiKey}&units=imperial");

                if (response.IsSuccessStatusCode)
                {
                    
                    string responseData = await response.Content.ReadAsStringAsync();
                    return responseData;
                }
                else
                {
                    
                    return "Error: City does not exists... ";
                }
            }
        }
        public static async Task Main(string[] args)
        {
            Console.WriteLine("Enter a City Name:");
            string city = Console.ReadLine();

            Program p = new Program();  
            string data = await p.FetchWeatherData(city);

            if (data.StartsWith("Error"))
            {
                Console.WriteLine(data);  
            }
            else
            {
                try
                {
                    
                    JObject jsonData = JObject.Parse(data);

                   
                    string cityName = jsonData["name"].ToString() ?? "Unknown";
                    string temperature = jsonData["main"]["temp"].ToString() ?? "N/A";
                    string humidity = jsonData["main"]?["humidity"].ToString() ?? "N/A";
                    string weatherDescription = jsonData["weather"][0]["description"].ToString() ?? "No description available";

                    Console.WriteLine($"City: {cityName}");
                    Console.WriteLine($"Temperature: {temperature} °F");
                    Console.WriteLine($"Humidity: {humidity} %");
                    Console.WriteLine($"Weather: {weatherDescription}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error parsing JSON data: {ex}");
                }
            }
        }

        
    }
}
