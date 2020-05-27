using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Caliburn.Micro;
using FreelanceWPF.EventModels;
using FreelanceWPF.Models;

namespace FreelanceWPF.ViewModels
{
    public class ShellViewModel : Conductor<object>, IHandle<AddJobEvent>, IHandle<CloseAddJobEvent>
    {
        #region Properties

        //private JobsViewModel _jobsVM;
        private IEventAggregator _events;
        private SimpleContainer _container;

        #endregion

        #region Constructor
        
        public ShellViewModel(IEventAggregator events, SimpleContainer container)
        {
            _container = container;

            // Instantiate VMs
            //_jobsVM = jobsVM;

            // Subscribe to events
            _events = events;
            _events.Subscribe(this);

            LoadJobs();
        }

        #endregion

        public void LoadJobs()
        {
            ActivateItem(_container.GetInstance<JobsViewModel>());
        }
        
        public void AddJob()
        {
            ActivateItem(_container.GetInstance<AddJobViewModel>());
        }

        #region Event Handlers

        public void Handle(AddJobEvent message)
        {
            ActivateItem(_container.GetInstance<AddJobViewModel>());
        }


        public void Handle(CloseAddJobEvent message)
        {
            LoadJobs();
        }
        #endregion

        #region External Links

        public void GoGithub()
        {
            Process.Start("https://github.com/murphyb2");
        }

        #endregion
    }
}
