using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Caliburn.Micro;
//using FreelanceWPF.DataAccess;
using FreelanceWPF.Models;
using FreelanceDataAccess;
using FreelanceWPF.EventModels;

namespace FreelanceWPF.ViewModels
{
    public class JobsViewModel : Screen
    {
        #region Properties

        private ReadOnlyObservableCollection<Job> _jobs;

        public ReadOnlyObservableCollection<Job> Jobs
        {
            get { return _jobs; }
            set
            {
                _jobs = value;
                NotifyOfPropertyChange(() => Jobs);
            }
        }

        private IEventAggregator _events;
        #endregion

        #region Constructors

        public JobsViewModel(IEventAggregator events)
        {
            _events = events;

            var da = new FreelanceDatabase();

            ObservableCollection<Job> jobs = new ObservableCollection<Job>(da.FetchJobList<Job>());
            Jobs = new ReadOnlyObservableCollection<Job>(jobs);
        }

        #endregion

        public void AddJob()
        {
            _events.PublishOnUIThread(new AddJobEvent());

        }

        public void DeleteJob(Job job)
        {
            // Find job with matching ID
            var da = new FreelanceDatabase();
            var success = da.DeleteJob(job.Id);
            if (success) RefreshJobList();
        }

        private void RefreshJobList()
        {
            var da = new FreelanceDatabase();
            ObservableCollection<Job> jobs = new ObservableCollection<Job>(da.FetchJobList<Job>());
            Jobs = new ReadOnlyObservableCollection<Job>(jobs);
        }
    }
}
