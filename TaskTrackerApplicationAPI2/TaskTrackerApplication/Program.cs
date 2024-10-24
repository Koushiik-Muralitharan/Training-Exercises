
using TaskTrackerApplication.Connection;
using TaskTrackerApplication.Repository;

namespace TaskTrackerApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<ITaskrepository, TaskRepository>();
            builder.Services.AddScoped<IActivityRepository,ActivityRepository>();
            builder.Services.AddScoped<IConnectivity>(
                  provider =>
                  {
                      var s = builder.Configuration.GetConnectionString("dbConnection");
                      return new DatabaseConnection(s);
                  });

            var app = builder.Build();

            app.UseCors(builder => builder
                   .AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .SetIsOriginAllowed(origin => true));

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
