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
    public class JobController : ControllerBase
    {
        private readonly ReadOnlyCollection<Job> _jobs;
        private readonly FreelanceDatabase _da;

        public JobController(FreelanceDatabase db)
        {
            //var da = new FreelanceDatabase();
            //_jobs = da.FetchJobList<Job>().OrderByDescending(x => x.EndDate).ToList().AsReadOnly();
            _da = db;
            _jobs = _da.FetchJobList<Job>().OrderByDescending(x => x.EndDate).ToList().AsReadOnly();
        }

        // api/job
        [HttpGet]
        public IReadOnlyCollection<Job> GetJobs() => _jobs;

        // api/job/{id}
        [HttpGet("{id}")]
        public IReadOnlyCollection<Job> GetJobById(string id)
        {
            return _jobs.Where(x => x.Id == id).ToList().AsReadOnly();
        }

        [HttpPost]
        public JsonResult AddJob([FromBody]Job value)
        {
            Console.WriteLine($"addjob: {value}");
            return new JsonResult("success");
        }

        [HttpPut("{id}")]
        public JsonResult UpdateJob(string id, Job jb)
        {
            Console.WriteLine($"Updating {id}, {jb}");
            return new JsonResult("success");
        }


    }
}