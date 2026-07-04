// Router Configuration
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/jobs', component: JobsList },
        { path: '/jobs/:id', component: JobDetail },
        { path: '/todos', component: TodoList },
        { path: '/about', component: About }
    ]
});
