using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FreelanceDataAccess;

namespace FreelanceWPF.Models
{
    public class Job : FreelanceDatabase.IJob
    {
        public bool Paid { get; set; }
        public DateTime DateInvoiced { get; set; }
        public string Employer { get; set; }
        public string JobTitle { get; set; }
        public float Rate { get; set; }
        public float HoursWorked { get; set; }
        public string Location { get; set; }
        public float Compensation { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Id { get; set; }

        // Dapper needs parameterless base constructor
        public Job() : base() { }
        public Job(string cmp, string title, string loc, float pay, DateTime start, DateTime end, float hours, bool paid, DateTime invoiceDate, float rate) 
        {
            Employer = cmp;
            JobTitle = title;
            Location = loc;
            Compensation = pay;
            StartDate = start;
            EndDate = end;
            Id = Guid.NewGuid().ToString();
            Paid = paid;
            DateInvoiced = invoiceDate;
            Rate = rate;
            HoursWorked = hours;

        }
        public Job(string cmp, string title, string loc, float pay, DateTime start, DateTime end, string id, float hours, bool paid, DateTime invoiceDate, float rate)
        {
            Employer = cmp;
            JobTitle = title;
            Location = loc;
            Compensation = pay;
            StartDate = start;
            EndDate = end;
            Id = id;
            Paid = paid;
            DateInvoiced = invoiceDate;
            Rate = rate;
            HoursWorked = hours;
        }

    }
}
