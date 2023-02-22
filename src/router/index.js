import { createRouter, createWebHistory } from "vue-router";


const routes = [

  {
    path: "/",
    name: "/",
    redirect: "/signin",
    component: () => import("../views/LoginComponent")
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/LoginComponent"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardComponent"),
    meta : {requiresLogin: true},
  },
  {
    path: "/strengtheningSupervisionMans",
    name: "strengtheningSupervisionMans.create",
    component: () => import("../views/strengtheningSupervisionMans/createdosComponent"),
    meta : {requiresLogin: true},
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode: 'history',
  linkActiveClass: "active",
});


export default router;
