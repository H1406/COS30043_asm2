// Home Component
const Home = {
    template: `
    <div>
      <div class="hero-section">
        <div class="hero-content text-center">
          <div class="hero-badge">
            <span class="mdi mdi-rocket-launch-outline"></span>
            Designed for ambitious tech careers
          </div>
          <h1>Find Your Dream Job</h1>
          <p>Discover exciting opportunities in AI, Data Science, Software Development, and more</p>
          <div class="hero-actions">
            <router-link to="/jobs" class="btn btn-primary btn-lg">
              <span class="mdi mdi-magnify"></span> Browse All Jobs
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-12">
          <div class="content-panel">
            <h2>Why Choose Our Job Portal?</h2>
            <p>
              Welcome to the premier destination for tech professionals seeking their next career opportunity. 
              Our platform connects talented individuals with leading companies across Australia and globally. 
              With a focus on emerging technologies and cutting-edge roles, we bring you the most sought-after 
              positions in Artificial Intelligence, Data Science, Software Development, Cybersecurity, and DevOps.
            </p>
            <p>
              Whether you're a fresh graduate eager to start your career journey, a mid-level professional looking 
              for new challenges, or a seasoned expert seeking senior leadership roles, our comprehensive job portal 
              has something for everyone. We partner with innovative companies that value talent and offer competitive 
              compensation packages, flexible work arrangements, and opportunities for professional growth.
            </p>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-4">
          <div class="stats-card">
            <div class="stat-number">{{ totalJobs }}</div>
            <div class="stat-label">Total Jobs</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stats-card">
            <div class="stat-number">{{ categories.length }}</div>
            <div class="stat-label">Categories</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stats-card">
            <div class="stat-number">{{ companies.length }}</div>
            <div class="stat-label">Companies</div>
          </div>
        </div>
      </div>

      <div class="row section-heading-row">
        <div class="col-md-12">
          <div class="page-kicker">Hand-picked roles</div>
          <h2 class="section-title">Featured Jobs</h2>
          <p class="section-subtitle">
            Check out our hand-picked selection of the most exciting job opportunities available right now. 
            These positions offer excellent growth potential, competitive salaries, and the chance to work 
            with cutting-edge technologies.
          </p>
        </div>
      </div>
      <div class="row featured-jobs-row">
        <div class="col-md-6" v-for="job in featuredJobs" :key="job.job_id">
          <div class="job-card">
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
                <span class="mdi mdi-cash-multiple"></span> {{ job.salary_range }}
              </div>
            </div>
            <p class="description">{{ job.job_description.substring(0, 150) }}...</p>
            <router-link :to="'/jobs/' + job.job_id" class="btn btn-primary">
              View Details <span class="mdi mdi-chevron-right"></span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  `,
    data() {
        return {
            jobs: jobsData
        };
    },
    computed: {
        totalJobs() {
            return this.jobs.length;
        },

        categories() {
            return [...new Set(this.jobs.map(job => job.category))];
        },
        companies() {
            return [...new Set(this.jobs.map(job => job.company))];
        },
        featuredJobs() {
            return this.jobs.slice(0, 4);
        }
    }
};
