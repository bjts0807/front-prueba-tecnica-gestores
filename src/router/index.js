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
    path: "/strengtheningSupervisionMans/create",
    name: "strengtheningSupervisionMans.create",
    component: () => import("../views/strengtheningSupervisionMans/CreateComponent"),
    meta : {requiresLogin: true},
  },
  {
    path: "/strengtheningSupervisionMans",
    name: "strengtheningSupervisionMans.index",
    component: () => import("../views/strengtheningSupervisionMans/IndexComponent"),
    meta : {requiresLogin: true},
  },
  {
    path: "/strengtheningSupervisionMans/edit/:id",
    name: "strengtheningSupervisionMans.edit",
    component: () => import("../views/strengtheningSupervisionMans/EditComponent"),
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
