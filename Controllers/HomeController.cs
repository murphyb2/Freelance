using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Freelance.Models;
using Microsoft.AspNetCore.Mvc;
using FreelanceDataAccess;

namespace Freelance.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private IReadOnlyCollection<Job> jobs { get; set; }
        
        [HttpGet("[action]")]
        public IReadOnlyCollection<Job> Jobs(int startDateIndex)
        {

            var da = new FreelanceDatabase();
            jobs = da.FetchJobList<Job>();
            
            return jobs;
        }
    }
}