using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Freelance.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Dapper;

namespace Freelance.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<JobModel> Jobs()
        {
            List<JobModel> jobs;

            string sql = $@"SELECT * FROM freelance.jobs";
            using(var con = new MySqlConnection("Server=localhost;User ID=root;Password=ecEEn7h3m$C8OCR;Database=freelance"))
            {
                jobs = con.Query<JobModel>(sql).ToList();
            }
            
            //DateTime start = new DateTime(2019, 05, 29);
            //DateTime end = new DateTime(2019, 09, 09);

            //List<JobModel> jobs = new List<JobModel>
            //{
            //    new JobModel("Costume PA", "Sleep No More", "Manhattan, NYC", 2210, start, end),
            //    new JobModel("Costume PA", "The Flight Attendant", "Brooklyn, NYC", 4106, start, end),
            //};
            
            return jobs;
        }
    }
}