using Contracts;
using EmailService;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        //private readonly IRepositoryManager _repository;
        //private readonly IEmailSender _emailSender;

        //public WeatherForecastController(IRepositoryManager repository, IEmailSender emailSender)
        //{
        //    _repository = repository;
        //    _emailSender = emailSender;
        //}

        //[HttpGet]
        //public async Task<IEnumerable<WeatherForecast>> Get()
        //{
        //    var rng = new Random();

        //    var message = new Message(new string[] {"TO_ADDRESS"}, "Test email",
        //        "This is the content from our email", null);
        //    await _emailSender.SendEmailAsync(message);

        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast()
        //    {
        //        Date = DateTime.Now.AddDays(index),
        //        TemperatureC = rng.Next(-20, 55),
        //        Summary = "Test"
        //    }).ToArray();
        //}

        //[HttpPost]
        //public async Task<IEnumerable<WeatherForecast>> Post()
        //{
        //    var rng = new Random();
        //    var files = Request.Form.Files.Any() ? Request.Form.Files : new FormFileCollection();
        //    var message = new Message(new string[] { "TO_ADDRESS" }, "Test mail with Attachments", "This is the content from our mail with attachments.", files);
        //    await _emailSender.SendEmailAsync(message);
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //        {
        //            Date = DateTime.Now.AddDays(index),
        //            TemperatureC = rng.Next(-20, 55),
        //            Summary = "Summaries[rng.Next(Summaries.Length)]"
        //        })
        //        .ToArray();
        //}
    }
}