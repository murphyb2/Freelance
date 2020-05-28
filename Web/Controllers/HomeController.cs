using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Freelance.Models;
using Microsoft.AspNetCore.Mvc;
using FreelanceDataAccess;

namespace Freelance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private ReadOnlyCollection<Job> jobs { get; set; }

        [HttpGet("[action]")]
        public IReadOnlyCollection<Job> Jobs()
        //[HttpGet("Jobs")]
        //public IReadOnlyCollection<Job> Jobs()
        {

            var da = new FreelanceDatabase();
            jobs = da.FetchJobList<Job>().OrderByDescending(x => x.EndDate).ToList().AsReadOnly();

            return jobs;
        }
        
        [HttpGet("[action]/{startDateIndex}")]
        public IReadOnlyCollection<Job> Jobs(int startDateIndex)
        //[HttpGet("Jobs")]
        //public IReadOnlyCollection<Job> Jobs()
        {

            var da = new FreelanceDatabase();
            jobs = da.FetchJobList<Job>().OrderByDescending(x => x.EndDate).ToList().AsReadOnly();

            return jobs;
        }


    }
}