import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../use/useFirebase'

// Layouts
import BlankLayout from '../layouts/BlankLayout.vue'

// Views
import Dashboard from '../views/Dashboard.vue'
import Articles from '../views/Articles.vue'
import SignIn from '../views/SignIn.vue'
import Register from '../views/Register.vue'
import Auth from '../views/Auth.vue'
import Tool from '../views/Tool.vue'
import Markdown from '../views/Markdown.vue'
import Admin from '../views/Admin.vue'
import Contribute from '../views/Contribute.vue'
import Submit from '../views/Submit.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { 
        path: '/', 
        name: 'Dashboard',
        component: Dashboard, 
      },
      { 
        path: '/articles', 
        name: 'Articles',
        component: Articles, 
      },
      { 
        path: '/admin', 
        name: 'Admin',
        component: Admin, 
      },
      { 
        path: '/editor/:id', 
        name: 'Markdown',
        component: Markdown, 
        props: true
      },
      { 
        path: '/tool/:site', 
        name: 'Tool',
        component: Tool, 
        props: true
      },
      { 
        path: '/contribute', 
        name: 'Contribute',
        component: Contribute, 
        meta: {
          visible: true,
          layout: BlankLayout
        }
      },
      { 
        path: '/submit', 
        name: 'Submit',
        component: Submit, 
        meta: {
          visible: true,
          layout: BlankLayout
        }
      },
      { 
        path: '/sign-in', 
        name: 'SignIn',
        component: SignIn,
        meta: {
          visible: true,
          layout: BlankLayout
        }
      },
      { 
        path: '/:catchAll(.*)', 
        name: 'NotFound',
        component: NotFound
      },
      { 
        path: '/auth', 
        name: 'Auth',
        component: Auth,
        meta: {
          visible: true,
          layout: BlankLayout
        }
      }
    ]
})

router.beforeEach((to, from, next) => {
  const visible = to.matched.some(record => record.meta.visible);
  const isAuthenticated = auth.currentUser;
  if (!visible && !isAuthenticated) {
    next("/sign-in");
  } else {
    next();
  }
})

export default router