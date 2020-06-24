import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import firebase from 'firebase'
import ViewProfile from '@/components/profile/ViewProfile'
Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        authRequired:true
      }
    },

    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        authRequired: true
      }
    }
  ]
})

router.beforeEach((to,from,next) => {
  //check to see if authentication required in this type of route
  if(to.matched.some(rec => rec.meta.authRequired)){
    //check authenticaion state of the user
    let user = firebase.auth().currentUser

    if(user){
      //user is signed in proceed to route
      next()
    }else{
      // the user is not signed in 
      next({name: 'login'})

    }


  }else{
    next()
  }
  })

  export default router

