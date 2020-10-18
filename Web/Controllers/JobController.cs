using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Freelance.Models;
using Microsoft.AspNetCore.Mvc;
using FreelanceDataAccess;
using Microsoft.AspNetCore.Http;

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
            _da = db;
            _jobs = _da.FetchJobList<Job>().OrderByDescending(x => x.EndDate).ToList().AsReadOnly();
        }

        // api/job
        [HttpGet]
        public ActionResult GetJobs() => Ok(_jobs);

        // api/job/{id}
        [HttpGet("{id}")]
        public ActionResult GetJobById(string id)
        {
            var jobById = _jobs.First(x => x.Id == id);

            if (jobById == null) return NotFound();
            
            return Ok(jobById);
        }

        [HttpPost]
        public ActionResult AddJob([FromBody]Job jb)
        {
            if (!ValidateJob(jb))
            {
                return BadRequest(new { error = "All fields are required"});
                
            }

            var _success = _da.AddJob(new Job(jb));
            if (!_success)
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { error = $"Could not add Job {jb.JobTitle} to database" });

            return Ok(new { success = $"Successfully added {jb.JobTitle}!" });
        }

        private bool ValidateJob(Job j)
        {
            if (j.Compensation < 0 ||
                j.Employer.Length < 1 ||
                j.HoursWorked < 0.0 ||
                j.JobTitle.Length < 1 ||
                j.Location.Length < 1 ||
                j.Rate < 0 ||
                j.EndDate.Equals(null) ||
                j.StartDate.Equals(null))
            {
                return false;
            }

            return true;
        }

        [HttpPut("{id}")]
        public ActionResult UpdateJob(string id, Job jb)
        {
            if (id != jb.Id)
            {
                return BadRequest(new {error = "Updated Job Id and old Id don't match! "});
            }

            bool success = _da.UpdateJob(jb);
            if (!success)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { error = "Could not update Job in database" });
            } 
            
            return Ok(new { success = $"Successfully updated {jb.JobTitle}", updatedJob = jb });
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteJob(string id)
        {
            var jobById = _jobs.Where(x => x.Id == id);

            if (!jobById.Any()) return NotFound();

            bool success = _da.DeleteJob(id);
            if (!success)
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new {error = "Could not delete Job from database"});

            return NoContent();
        }


    }
}