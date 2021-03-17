import Vue from "vue";
import VueRouter from "vue-router"; 
import store from '../store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth/login",
    name: "auth",
    component: () => import("../layouts/auth.vue"),
    children: [
      {
        path: "/auth/login",
        name: "login",
        component: () => import("../components/login.vue")
      },
      {
        path: "/auth/signup",
        name: "signup",
        component: () => import("../components/signup.vue")
      },
    ],
    meta:{
      guest:true
    }
  },
  {
    path: "/admin", 
    redirect: 'viewtasks',
    component: () => import("../layouts/admin.vue"),
    children: [
      {
        path: "/admin/tasks",
        name: "viewtasks",
        component: () => import("../pages/admin/tasks/tasks.vue")
      },
      {
        path: "/admin/tasks/show/:id",
        name: "viewtask",
        component: () => import("../pages/admin/tasks/viewTask.vue"), 
      },
      {
        path: "/admin/tasks/update/:id",
        name: "updateTask",
        component: () => import("../pages/admin/tasks/updateTask.vue"), 
      },
      {
        path: "/admin/tasks/add",
        name: "addtask",
        component: () => import("../pages/admin/tasks/addTask.vue"), 
      }, 
      {
        path: "/admin/departments",
        name: "viewdepartments",
        component: () => import("../pages/admin/department/departments.vue"), 
      }, 
      {
        path: "/admin/department/:id/update",
        name: "updateDept",
        component: () => import("../pages/admin/department/updateDept.vue"), 
      }, 
      {
        path: "/admin/department/create",
        name: "addDept",
        component: () => import("../pages/admin/department/addDept.vue"), 
      }, 
    ], 
    meta: {
      secure: true,
      admin:true
    },
  },
  {
    path: "/", 
    component: () => import("../layouts/user.vue"),
    children: [
      {
        path: "/",
        name: "viewusertasks",
        component: () => import("../pages/user/tasks.vue")
      },
      {
        path: "/show/:id",
        name: "showtask",
        component: () => import("../pages/user/showtask.vue")
      }, 
    ],
    meta: {
      secure: true,
    },
  }, 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from,next) => {
  if (to.matched.some(record => record.meta.secure)) {
    if (!store.getters.get_token) {
      next({
        name: 'login',
      })
    } else { 
        if(to.matched.some(record => record.meta.admin)){
          if (store.getters.get_user.user_type === 0) { 
            next()
          } else {
            next({
              name: 'viewusertasks',
            })
          }
        } else { 
          next() 
        }  
    }
  } else {  
    store.getters.get_user ? (store.getters.get_user.user_type == 1 ? next({name: 'viewusertasks'}) : next({name: 'viewtasks'})) : next()
  }
})
export default router;
