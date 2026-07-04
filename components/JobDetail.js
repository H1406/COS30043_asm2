// Job Detail Component
const JobDetail = {
    template: `
    <div>
      <div v-if="job" class="job-detail">
        <div class="job-header">
          <h1>{{ job.job_title }}</h1>
          <p class="company-name">
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
        </div>
        
        <div class="detail-section">
          <h3>Job Description</h3>
          <p>{{ job.job_description }}</p>
        </div>
        
        <div class="detail-section">
          <h3>Job Information</h3>
          <ul class="detail-list">
            <li><strong>Job ID:</strong> {{ job.job_id }}</li>
            <li><strong>Category:</strong> {{ job.category }}</li>
            <li><strong>Supervisor:</strong> {{ job.supervisor }}</li>
            <li><strong>Positions Available:</strong> {{ job.positions_available }}</li>
            <li><strong>Start Date:</strong> {{ formatDate(job.start_date) }}</li>
            <li><strong>Posted Date:</strong> {{ formatDate(job.posted_date) }}</li>
            <li><strong>Application Deadline:</strong> {{ formatDate(job.application_deadline) }}</li>
          </ul>
        </div>
        
        <div class="detail-section">
          <h3>Required Skills</h3>
          <div class="job-tags">
            <span class="skill-badge" v-for="skill in job.required_skills" :key="skill">
              {{ skill }}
            </span>
          </div>
        </div>
        
        <div class="detail-section" v-if="job.preferred_qualifications && job.preferred_qualifications.length > 0">
          <h3>Preferred Qualifications</h3>
          <div class="job-tags">
            <span class="skill-badge is-secondary" v-for="qual in job.preferred_qualifications" :key="qual">
              {{ qual }}
            </span>
          </div>
        </div>
        
        <div class="detail-section" v-if="job.tags && job.tags.length > 0">
          <h3>Tags</h3>
          <div class="job-tags">
            <span class="tag-badge" v-for="tag in job.tags" :key="tag">
              {{ tag }}
            </span>
          </div>
        </div>
        
        <!-- Application Form Component -->
        <application-form :job="job"></application-form>
      </div>
      
      <div v-else class="loading">
        <div class="loading-spinner"></div>
        <p>Loading job details...</p>
      </div>
    </div>
  `,
    data() {
        return {
            job: null
        };
    },
    mounted() {
        this.loadJob();
    },
    methods: {
        loadJob() {
            const jobId = this.$route.params.id;
            this.job = jobsData.find(j => j.job_id === jobId);

            if (!this.job) {
                this.$router.push('/jobs');
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
        }
    },
    watch: {
        '$route.params.id'(newId) {
            this.loadJob();
        }
    }
};
