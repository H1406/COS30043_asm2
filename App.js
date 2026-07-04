// Main Entry Point
const app = Vue.createApp({
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    }
  },
  watch: {
    $route() {
      // Close menu when route changes
      this.menuOpen = false;
    }
  }
});

app.component('application-form', ApplicationForm);

app.use(router);
app.mount('#app');
