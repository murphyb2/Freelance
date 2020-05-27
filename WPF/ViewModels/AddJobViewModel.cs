using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Caliburn.Micro;
using FreelanceDataAccess;
using FreelanceWPF.EventModels;
using FreelanceWPF.Models;

namespace FreelanceWPF.ViewModels
{
    public class AddJobViewModel : Screen
    {
        #region Properties

        private static readonly Regex IsNotNumber = new Regex("[^0-9.]+");

        private IEventAggregator _events;
        private bool _paid;
        private DateTime _dateInvoiced = DateTime.Today;
        private string _employer;
        private string _jobTitle;
        private string _rate;
        private string _hoursWorked;
        private string _location;
        private double _compensation;
        private DateTime _startDate = DateTime.Today;
        private DateTime _endDate = DateTime.Today;
        private string _errorMessage = "";

        public string ErrorMessage
        {
            get => _errorMessage;
            set
            {
                _errorMessage = value;
                NotifyOfPropertyChange(ErrorMessage);
            }
        }


        public bool Paid
        {
            get => _paid;
            set
            {
                if (value == _paid) return;
                _paid = value;
                NotifyOfPropertyChange(() => Paid);
            }
        }

        public DateTime DateInvoiced
        {
            get => _dateInvoiced;
            set
            {
                if (value.Equals(_dateInvoiced)) return;
                _dateInvoiced = value;
                NotifyOfPropertyChange(() => DateInvoiced);
            }
        }

        public string Employer
        {
            get => _employer;
            set
            {
                if (value == _employer) return;
                _employer = value;
                NotifyOfPropertyChange(() => Employer);
            }
        }

        public string JobTitle
        {
            get => _jobTitle;
            set
            {
                if (value == _jobTitle) return;
                _jobTitle = value;
                NotifyOfPropertyChange(() => JobTitle);
            }
        }

        public string Rate
        {
            get => _rate;
            set
            {
                //if (value == _rate) return;
                _rate = value;

                NotifyOfPropertyChange(() => Rate);
                NotifyOfPropertyChange(() => Compensation);
            }
        }

        public string HoursWorked
        {
            get => _hoursWorked;
            set
            {
                //if (value == _hoursWorked) return;
                _hoursWorked = value;
                
                NotifyOfPropertyChange(() => HoursWorked);
                NotifyOfPropertyChange(() => Compensation);
            }
        }

        public string Location
        {
            get => _location;
            set
            {
                if (value == _location) return;
                _location = value;
                NotifyOfPropertyChange(() => Location);
            }
        }

        public double Compensation
        {
            get
            {
                if (string.IsNullOrWhiteSpace(Rate) || string.IsNullOrWhiteSpace(HoursWorked) ) return 0;
                if (IsNotNumber.IsMatch(Rate))
                {
                    return _compensation;
                }
                
                if (IsNotNumber.IsMatch(HoursWorked))
                {
                    return _compensation;
                }


                _compensation = (double.Parse(Rate) * double.Parse(HoursWorked));
                return _compensation;
            }
        }

        public DateTime StartDate
        {
            get => _startDate;
            set
            {
                if (value.Equals(_startDate)) return;
                _startDate = value;
                NotifyOfPropertyChange(() => StartDate);
            }
        }

        public DateTime EndDate
        {
            get => _endDate;
            set
            {
                if (value.Equals(_endDate)) return;
                _endDate = value;
                NotifyOfPropertyChange(() => EndDate);
            }
        }

        #endregion


        #region Constructor

        public AddJobViewModel(IEventAggregator events)
        {
            _events = events;

        }

        #endregion
        public void Close()
        {
            _events.PublishOnUIThread(new CloseAddJobEvent());
        }
        
        public void Save()
        {
            var da = new FreelanceDatabase();
            var success = da.AddJob(new Job(Employer,
                                            JobTitle,
                                            Location,
                                            (float)Compensation,
                                            StartDate,
                                            EndDate,
                                            float.Parse(HoursWorked),
                                            Paid,
                                            DateInvoiced,
                                            float.Parse(Rate)
                                            ));
            if (success) _events.PublishOnUIThread(new CloseAddJobEvent());
            else
            {
                ErrorMessage = "Could Not Add New Job to Database!";
            }
        }
    }
}
