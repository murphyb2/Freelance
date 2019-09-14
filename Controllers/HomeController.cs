using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Freelance.Models;
using Microsoft.AspNetCore.Mvc;

namespace Freelance.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        [HttpGet("[action]")]
        public JsonResult Index()
        {
            DateTime start = new DateTime(2019, 05, 29);
            DateTime end = new DateTime(2019, 09, 09);

            return Json(new JobModel("Costume PA", "Sleep No More", "Manhattan, NYC", 210, start, end));
        }
    }
}