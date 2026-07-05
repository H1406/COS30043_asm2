// Application Form Component
const ApplicationForm = {
  props: ['job'],
  template: `
    <div class="detail-section">
      <h2>Application Form</h2>
      <p class="hint-text">
        Please fill out the form below to apply for this position. All fields marked with <span class="required-mark">*</span> are required.
      </p>
      
      <form  method="POST" action="http://mercury.swin.edu.au/it000000/formtest.php"
        @submit="handleSubmit"
        class="aurora-form"
        autocomplete="off"
      >
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="firstName">First Name <span class="required-mark">*</span></label>
              <input 
                type="text" 
                class="form-control" 
                id="firstName" 
                v-model="formData.firstName" 
                required
                pattern="[A-Za-z]+"
                title="Letters only"
                placeholder="Enter your first name">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="lastName">Last Name <span class="required-mark">*</span></label>
              <input 
                type="text" 
                class="form-control" 
                id="lastName" 
                v-model="formData.lastName" 
                required
                pattern="[A-Za-z]+"
                title="Letters only"
                placeholder="Enter your last name">
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="username">Username <span class="required-mark">*</span></label>
              <input 
                type="text" 
                class="form-control" 
                id="username" 
                v-model="formData.username" 
                required
                minlength="3"
                title="Minimum 3 characters"
                placeholder="Enter your username">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="dob">Date of Birth <span class="required-mark">*</span></label>
              <input 
                type="date" 
                class="form-control" 
                id="dob" 
                v-model="formData.dob" 
                required
                :max="maxDate"
                @blur="validateAge"
                placeholder="DD/MM/YYYY">
              <small class="form-text text-muted">Must be at least 16 years old</small>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="password">Password <span class="required-mark">*</span></label>
              <input 
                type="password" 
                class="form-control" 
                id="password" 
                v-model="formData.password" 
                required
                minlength="8"
                pattern="(?=.*[$%^&*]).*"
                title="Minimum 8 characters, must include at least one special character ($, %, ^, &, *)"
                placeholder="Enter your password">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="confirmPassword">Confirm Password <span class="required-mark">*</span></label>
              <input 
                type="password" 
                class="form-control" 
                id="confirmPassword" 
                v-model="formData.confirmPassword" 
                required
                @input="checkPasswordMatch"
                placeholder="Re-enter your password">
              <small v-if="passwordMismatch" class="text-danger">Passwords do not match</small>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="email">Email Address <span class="required-mark">*</span></label>
              <input 
                type="email" 
                class="form-control" 
                id="email" 
                v-model="formData.email" 
                required
                placeholder="your.email@example.com">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="phone">Mobile Number <span class="required-mark">*</span></label>
              <input 
                type="tel" 
                class="form-control" 
                id="phone" 
                v-model="formData.phone" 
                required
                pattern="04[0-9]{8}"
                title="Exactly 10 digits, must start with 04"
                placeholder="04XX XXX XXX">
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="address">Street Address</label>
          <input 
            type="text" 
            class="form-control" 
            id="address" 
            v-model="formData.address" 
            maxlength="40"
            placeholder="Enter your street address (optional, max 40 characters)">
        </div>
        
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label for="suburb">Suburb/City</label>
              <input 
                type="text" 
                class="form-control" 
                id="suburb" 
                v-model="formData.suburb" 
                maxlength="20"
                placeholder="Suburb (optional, max 20 characters)">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="state">State <span class="required-mark">*</span></label>
              <select class="form-control" id="state" v-model="formData.state" required>
                <option value="">Select State</option>
                <option value="VIC">Victoria</option>
                <option value="NSW">New South Wales</option>
                <option value="QLD">Queensland</option>
                <option value="SA">South Australia</option>
                <option value="WA">Western Australia</option>
                <option value="TAS">Tasmania</option>
                <option value="NT">Northern Territory</option>
                <option value="ACT">Australian Capital Territory</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="postcode">Postcode <span class="required-mark">*</span></label>
              <input 
                type="text" 
                class="form-control" 
                id="postcode" 
                v-model="formData.postcode" 
                required
                pattern="[0-9]{4}"
                title="Exactly 4 digits"
                placeholder="XXXX">
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="jobCategory">Preferred Job Category <span class="required-mark">*</span></label>
          <select class="form-control" id="jobCategory" v-model="formData.jobCategory" required>
            <option value="">Select a category</option>
            <option value="AI">AI</option>
            <option value="Data Science">Data Science</option>
            <option value="Web Development">Web Development</option>
            <option value="Software Development">Software Development</option>
            <option value="DevOps">DevOps</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="skills">Skills <span class="required-mark">*</span></label>
          <textarea 
            class="form-control" 
            id="skills" 
            v-model="formData.skills" 
            rows="3" 
            required
            placeholder="List your relevant skills (comma separated)"></textarea>
          <small class="form-text text-muted">
            Required skills for this position: {{ job.required_skills.join(', ') }}
          </small>
        </div>
        
        <div class="form-group">
          <label for="experience">Work Experience <span class="required-mark">*</span></label>
          <textarea 
            class="form-control" 
            id="experience" 
            v-model="formData.experience" 
            rows="4" 
            required
            placeholder="Describe your relevant work experience"></textarea>
        </div>
        
        <div class="form-group">
          <label for="coverLetter">Cover Letter <span class="required-mark">*</span></label>
          <textarea 
            class="form-control" 
            id="coverLetter" 
            v-model="formData.coverLetter" 
            rows="6" 
            required
            placeholder="Tell us why you're interested in this position and why you'd be a great fit"></textarea>
        </div>
        
        <div class="form-group">
          <label for="resume">Resume/CV <span class="required-mark">*</span></label>
          <input 
            type="file" 
            class="form-control" 
            id="resume" 
            @change="handleFileUpload"
            accept=".pdf,.doc,.docx"
            required>
          <small class="form-text text-muted">
            Accepted formats: PDF, DOC, DOCX (Max 5MB)
          </small>
        </div>
        
        <div class="form-group">
          <label>Terms and Conditions <span class="required-mark">*</span></label>
          <div>
            <button 
              type="button" 
              @click="showTerms = !showTerms"
              class="btn btn-info btn-sm terms-toggle">
              {{ showTerms ? 'Hide Terms' : 'Show Terms' }}
            </button>
            <div v-if="showTerms" class="terms-panel">
              <h4>Terms and Conditions</h4>
              <p>By submitting this application, you agree to the following:</p>
              <ul>
                <li>All information provided is accurate and truthful</li>
                <li>Your data will be used for recruitment purposes only</li>
                <li>We may contact you regarding your application</li>
                <li>Your resume and personal information will be stored securely</li>
                <li>You can request data deletion at any time by contacting us</li>
              </ul>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="formData.agreeTerms" required>
                I have read and agree to the terms and conditions
              </label>
            </div>
          </div>
        </div>
        
        <input type="hidden" name="job_id" :value="job.job_id">
        <input type="hidden" name="job_title" :value="job.job_title">
        <input type="hidden" name="company" :value="job.company">
        
        <div class="form-actions">
          <button type="submit" class="btn btn-success btn-lg">
            <span class="mdi mdi-send"></span> Submit Application
          </button>
          <router-link to="/jobs" class="btn btn-default btn-lg">
            <span class="mdi mdi-arrow-left"></span> Back to Jobs
          </router-link>
        </div>
      </form>
    </div>
  `,
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        username: '',
        dob: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        address: '',
        suburb: '',
        state: '',
        postcode: '',
        jobCategory: '',
        skills: '',
        experience: '',
        coverLetter: '',
        resume: null,
        agreeTerms: false
      },
      showTerms: false,
      passwordMismatch: false
    };
  },
  computed: {
    maxDate() {
      // Calculate date 16 years ago from today
      const today = new Date();
      const year = today.getFullYear() - 16;
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  methods: {
    checkPasswordMatch() {
      this.passwordMismatch = this.formData.password !== this.formData.confirmPassword;
    },
    validateAge() {
      if (this.formData.dob) {
        const today = new Date();
        const birthDate = new Date(this.formData.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 16) {
          alert('You must be at least 16 years old to apply.');
          this.formData.dob = '';
        }
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Check file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size must be less than 5MB');
          event.target.value = '';
          return;
        }
        this.formData.resume = file;
      }
    },
    submitApplication() {
      // Create FormData object for file upload
      const formDataToSend = new FormData();

      // Append all form fields
      formDataToSend.append('firstName', this.formData.firstName);
      formDataToSend.append('lastName', this.formData.lastName);
      formDataToSend.append('username', this.formData.username);
      formDataToSend.append('dob', this.formData.dob);
      formDataToSend.append('password', this.formData.password);
      formDataToSend.append('email', this.formData.email);
      formDataToSend.append('phone', this.formData.phone);
      formDataToSend.append('address', this.formData.address);
      formDataToSend.append('suburb', this.formData.suburb);
      formDataToSend.append('state', this.formData.state);
      formDataToSend.append('postcode', this.formData.postcode);
      formDataToSend.append('jobCategory', this.formData.jobCategory);
      formDataToSend.append('skills', this.formData.skills);
      formDataToSend.append('experience', this.formData.experience);
      formDataToSend.append('coverLetter', this.formData.coverLetter);
      formDataToSend.append('agreeTerms', this.formData.agreeTerms);

      // Append job details
      formDataToSend.append('job_id', this.job.job_id);
      formDataToSend.append('job_title', this.job.job_title);
      formDataToSend.append('company', this.job.company);

      // Append resume file
      if (this.formData.resume) {
        formDataToSend.append('resume', this.formData.resume);
      }

      // Submit URL - as specified in the form action
      const submitURL = 'https://mercury.swin.edu.au/it000000/formtest.php';

      // Send POST request
      fetch(submitURL, {
        method: 'POST',
        body: formDataToSend
      })
        .then(response => response.text())
        .then(data => {
          alert(`Application submitted successfully!\n\nThank you for applying to the ${this.job.job_title} position at ${this.job.company}.\n\nWe will review your application and contact you soon.`);
          // Reset form
          this.resetForm();
        })
        .catch(error => {
          console.error('Error:', error);
          alert('There was an error submitting your application. Please try again.');
        });
    },
    resetForm() {
      this.formData = {
        firstName: '',
        lastName: '',
        username: '',
        dob: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        address: '',
        suburb: '',
        state: '',
        postcode: '',
        jobCategory: '',
        skills: '',
        experience: '',
        coverLetter: '',
        resume: null,
        agreeTerms: false
      };
      this.showTerms = false;
      this.passwordMismatch = false;
      // Reset file input
      const fileInput = document.getElementById('resume');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }
};
