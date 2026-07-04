// Jobs List Component
const JobsList = {
  template: `
    <div>
      <div class="page-header-block">
        <div class="page-kicker">Career explorer</div>
        <h1 class="page-title">Browse Jobs</h1>
        <p class="page-subtitle">
        Explore our complete database of job opportunities. Use the filters on the left to narrow down your search 
        by category, location, employment type, and experience level. Each listing provides comprehensive details 
        to help you make informed decisions about your next career move.
        </p>
      </div>
      
      <div class="row">
        <div class="col-md-3">
          <div class="filter-section">
            <h4>Job IDs</h4>
            <p class="filter-help">
              Quick access to job listings
            </p>
            <div class="list-group job-index-list">
              <router-link 
                v-for="job in filteredJobs" 
                :key="job.job_id" 
                :to="'/jobs/' + job.job_id"
                class="list-group-item">
                <span class="mdi mdi-briefcase-outline"></span> {{ job.job_id }}
                <small>{{ job.job_title }}</small>
              </router-link>
            </div>
          </div>
          
          <div class="filter-section">
            <h4>Filter Jobs</h4>
            <p class="filter-help">
              Use these filters to find jobs that match your preferences and qualifications.
            </p>
            
            <div class="form-group">
              <label>Search</label>
              <input type="text" class="form-control" v-model="filters.search" placeholder="Job title or keyword...">
            </div>
            
            <div class="form-group">
              <label>Category</label>
              <select class="form-control" v-model="filters.category">
                <option value="">All Categories</option>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Location</label>
              <select class="form-control" v-model="filters.location">
                <option value="">All Locations</option>
                <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Employment Type</label>
              <select class="form-control" v-model="filters.employmentType">
                <option value="">All Types</option>
                <option v-for="type in employmentTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Job Level</label>
              <select class="form-control" v-model="filters.jobLevel">
                <option value="">All Levels</option>
                <option v-for="level in jobLevels" :key="level" :value="level">{{ level }}</option>
              </select>
            </div>
            
            <button class="btn btn-success btn-block" @click="resetFilters">
              <span class="mdi mdi-refresh"></span> Reset Filters
            </button>
          </div>
        </div>
        
        <div class="col-md-9">
          <div v-if="filteredJobs.length === 0" class="no-results">
            <span class="mdi mdi-magnify"></span>
            <h3>No jobs found</h3>
            <p>Try adjusting your filters to see more results</p>
          </div>
          
          <div class="alert results-banner" v-if="filteredJobs.length > 0">
            Showing <strong>{{ filteredJobs.length }}</strong> of <strong>{{ jobs.length }}</strong> jobs
          </div>
          
          <div v-for="job in filteredJobs" :key="job.job_id" class="job-card">
            <h3>{{ job.job_title }}</h3>
            <p class="company">
              <span class="mdi mdi-briefcase"></span> {{ job.company }}
            </p>
            <div class="job-meta">
              <div class="job-meta-item">
                <span class="mdi mdi-map-marker"></span> {{ job.location }}
              </div>
              <div class="job-meta-item">
                <span class="mdi mdi-clock-outline"></span> {{ job.employment_type }}
              </div>
              <div class="job-meta-item">
                <span class="mdi mdi-signal"></span> {{ job.job_level }}
              </div>
              <div class="job-meta-item">
                <span class="mdi mdi-currency-usd"></span> {{ job.salary_range }}
              </div>
            </div>
            <div class="job-tags">
              <span class="label label-primary" v-for="skill in job.required_skills.slice(0, 3)" :key="skill">
                {{ skill }}
              </span>
            </div>
            <p class="description">{{ job.job_description }}</p>
            <router-link :to="'/jobs/' + job.job_id" class="btn btn-primary">
              View Full Details <span class="mdi mdi-chevron-right"></span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      jobs: jobsData,
      filters: {
        search: '',
        category: '',
        location: '',
        employmentType: '',
        jobLevel: ''
      }
    };
  },
  computed: {
    categories() {
      return [...new Set(this.jobs.map(job => job.category))].sort();
    },
    locations() {
      return [...new Set(this.jobs.map(job => job.location))].sort();
    },
    employmentTypes() {
      return [...new Set(this.jobs.map(job => job.employment_type))].sort();
    },
    jobLevels() {
      return [...new Set(this.jobs.map(job => job.job_level))].sort();
    },
    filteredJobs() {
      return this.jobs.filter(job => {
        const matchesSearch = !this.filters.search ||
          job.job_title.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          job.company.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          job.job_description.toLowerCase().includes(this.filters.search.toLowerCase());

        const matchesCategory = !this.filters.category || job.category === this.filters.category;
        const matchesLocation = !this.filters.location || job.location === this.filters.location;
        const matchesEmploymentType = !this.filters.employmentType || job.employment_type === this.filters.employmentType;
        const matchesJobLevel = !this.filters.jobLevel || job.job_level === this.filters.jobLevel;

        return matchesSearch && matchesCategory && matchesLocation && matchesEmploymentType && matchesJobLevel;
      });
    }
  },
  methods: {
    resetFilters() {
      this.filters = {
        search: '',
        category: '',
        location: '',
        employmentType: '',
        jobLevel: ''
      };
    }
  }
};
