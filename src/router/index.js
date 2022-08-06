import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "../views/HomeView";
import CarDetailsView from "../views/CarDetailsView";
import CarAdd from "../views/car/CarAdd";
import CarEdit from "../views/car/CarEdit";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/details/:modelName',
        name: 'Details',
        component: () => import(/* webpackChunkName: "about" */ '../views/CarDetailsView.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "about" */ '../views/user/UserProfile.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/signin',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/login/Signin.vue'),
        meta: {
            layout: 'auth'
        }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import(/* webpackChunkName: "about" */ '../views/login/Signup.vue'),
        meta: {
            layout: 'auth'
        }
    },
    {
        path: '/forgot',
        name: 'Forgot',
        component: () => import(/* webpackChunkName: "about" */ '../views/login/Forgot.vue'),
        meta: {
            layout: 'auth'
        }
    },
    {
        path: '/addCar',
        name: 'AddCar',
        component: CarAdd,
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/editCar/:modelName',
        name: 'EditCar',
        component: CarEdit,
        meta: {
            layout: 'main'
        }
    },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes

})
export default router;