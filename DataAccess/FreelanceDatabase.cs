﻿using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using MySql.Data.MySqlClient;

namespace FreelanceDataAccess
{
    public class FreelanceDatabase
    {
        public interface IJob
        {
            string Employer { get; set; }
            string JobTitle { get; set; }
            string Location { get; set; }
            DateTime StartDate { get; set; }
            DateTime EndDate { get; set; }
            DateTime DateInvoiced { get; set; }
            bool Paid { get; set; }
            float Rate { get; set; }
            float HoursWorked { get; set; }
            float Compensation { get; set; }
            string Id { get; set; }
            
        }


        public List<T> FetchJobList<T>()
        {
            // Retrieve all the jobs in the database

            List<T> jobs;

            string sql = $@"SELECT * FROM freelance.jobs WHERE Active = true";

            try
            {
                using (var con =
                    new MySqlConnection("Server=localhost;User ID=root;Password=ecEEn7h3mC8OCR;Database=freelance;Port=3308"))
                {
                    jobs = con.Query<T>(sql).ToList();
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                jobs = new List<T>();
            }


            return new List<T>(jobs);
        }

        public bool AddJob(IJob job)
        {
            // Insert new job into database
            string sql = $@"INSERT INTO freelance.jobs (Paid, Employer, JobTitle, Rate, HoursWorked, DateInvoiced, Location, Compensation, StartDate, EndDate, Id) 
                            Values (@Paid, @Employer, @JobTitle, @Rate, @HoursWorked, @DateInvoiced, @Location, @Compensation, @StartDate, @EndDate, @Id)";
            int affectedRows = 0;
            try
            {
                using (var con =
                    new MySqlConnection("Server=localhost;User ID=root;Password=ecEEn7h3mC8OCR;Database=freelance;Port=3308"))
                {
                    affectedRows = con.Execute(sql, new
                    {
                        Paid = job.Paid,
                        DateInvoiced = job.DateInvoiced,
                        Employer = job.Employer,
                        JobTitle = job.JobTitle,
                        Location = job.Location,
                        Rate = job.Rate,
                        HoursWorked = job.HoursWorked,
                        Compensation = job.Compensation,
                        StartDate = job.StartDate,
                        EndDate = job.EndDate,
                        Id = job.Id
                    });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return affectedRows > 0;
        }

        public bool DeleteJob(string id)
        {
            // Removes a job from the database given a primary key/job id
            string sql = $@"UPDATE freelance.jobs SET Active = false WHERE Id = @Id";

            int affectedRows = 0;

            try
            {
                using (var con =
                        new MySqlConnection("Server=localhost;User ID=root;Password=ecEEn7h3mC8OCR;Database=freelance;Port=3308"))
                {
                    affectedRows = con.Execute(sql, new { Id = id });

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return affectedRows > 0;
        }

        public bool UpdateJob(IJob job)
        {
            //Employer 
            //JobTitle 
            //Location 
            //StartDate 
            //EndDate 
            //DateInvoiced 
            //Paid 
            //Rate 
            //HoursWorked 
            //Compensation 
            //Id
            string sql = $@"UPDATE freelance.jobs 
                            SET Employer = @Employer, 
                            JobTitle = @JobTitle, 
                            Location = @Location,
                            StartDate = @StartDate,
                            EndDate = @EndDate,
                            DateInvoiced = @DateInvoiced,
                            Paid = @Paid,
                            Rate = @Rate,
                            HoursWorked = @HoursWorked,
                            Compensation = @Compensation
                            WHERE Id = @Id";

            int affectedRows = 0;
            
            try
            {
                using (var con =
                    new MySqlConnection("Server=localhost;User ID=root;Password=ecEEn7h3mC8OCR;Database=freelance;Port=3308"))
                {
                    affectedRows = con.Execute(sql, job
                        //new {
                        //Id = job.Id,
                        //Employer = job.Employer,
                        //JobTitle = job.JobTitle,
                        //Location = job.Location,
                        //StartDate = job.StartDate,
                        //EndDate = job.EndDate,
                        //DateInvoiced = job.DateInvoiced,
                        //Paid = job.Paid,
                        //Rate = job.Rate,
                        //HoursWorked = job.HoursWorked,
                        //Compensation = job.Compensation,}
                );

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return affectedRows > 0;

        }
    }
}
