using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Freelance.Models
{
    public class JobModel
    {
        # region Properties
        private string _jobTitle;
        public string JobTitle
        {
            get { return _jobTitle; }
            set { _jobTitle = value; }
        }

        private string _companyName;
        public string CompanyName
        {
            get { return _companyName; }
            set { _companyName = value; }
        }

        private string _location;
        public string Location
        {
            get { return _location; }
            set { _location = value; }
        }

        private int _totalCompensation;
        public int TotalCompensation
        {
            get { return _totalCompensation; }
            set { _totalCompensation = value; }
        }

        private DateTime _startDate;
        public DateTime StartDate
        {
            get { return _startDate; }
            set { _startDate = value; }
        }

        private DateTime _endDate;
        public DateTime EndDate
        {
            get { return _endDate; }
            set { _endDate = value; }
        }
        #endregion

        #region Constructor
        // Parameterless, base constructor allows Dapper to function properly
        public JobModel() : base() { }
        public JobModel(string jobTitle, string companyName, string location, int totalCompensation, DateTime startDate, DateTime endDate)
        {
            this.JobTitle = jobTitle;
            this.CompanyName = companyName;
            this.Location = location;
            this.TotalCompensation = totalCompensation;
            this.StartDate = startDate;
            this.EndDate = endDate;

            // Insert into database..?
            // Associate with user..?
        }
        #endregion
    }
}
