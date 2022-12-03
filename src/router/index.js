import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "../views/HomeView";
// import CarDetailsView from "../views/CarDetailsView";
import CarAdd from "../views/car/CarAdd";
import CarEdit from "../views/car/CarEdit";
import News from "../views/news/News";
import NewsDetails from "../views/news/NewsDetails";
import AudiAssistant from "../views/AudiAssistant";
import NewsAdd from "../views/news/NewsAdd";
import NewsEdit from "../views/news/NewsEdit";

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
        path: '/:username',
        name: 'User',
        component: () => import(/* webpackChunkName: "about" */ '../views/user/UserProfile.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "about" */ '../views/user/SettingsUser.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/friends',
        name: 'Friends',
        component: () => import(/* webpackChunkName: "about" */ '../views/user/Friends.vue'),
        meta: {
            layout: 'main'
        }
    },
    // {
    //     path: '/direct/:directId',
    //     name: 'DirectChat',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/user/ChatTest.vue'),
    //     meta: {
    //         layout: 'main'
    //     }
    // },
    {
        path: '/direct',
        name: 'DirectChat',
        component: () => import(/* webpackChunkName: "about" */ '../views/user/ChatTest.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminView.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/admin/cars',
        name: 'AllCars',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/AllCarsView.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/admin/emails',
        name: 'AllEmails',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/AllEmailsView.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/admin/news',
        name: 'AllNews',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/AllNewsView.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/admin/users',
        name: 'AllUsers',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/AllUsersView.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/chatTest',
        name: 'ChatTest',
        component: () => import(/* webpackChunkName: "about" */ '../views/user/Chat.vue'),
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
        path: '/forgot/:resetToken',
        name: 'ChangePassword',
        component: () => import(/* webpackChunkName: "about" */ '../views/login/ChangePassword.vue'),
        meta: {
            layout: 'auth'
        }
    },
    {
        path: '/forgot/:resetPasswordToken',
        name: 'ChangePassword',
        component: () => import(/* webpackChunkName: "about" */ '../views/login/ChangePassword.vue'),
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
    }, {
        path: '/news',
        name: 'News',
        component: News,
        meta: {
            layout: 'main'
        }
    }, {
        path: '/newsAdd',
        name: 'NewsAdd',
        component: NewsAdd,
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/news/:id',
        name: 'DetailsNews',
        component: NewsDetails,
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/newsEdit/:id',
        name: 'EditNews',
        component: NewsEdit,
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/audiAssistant',
        name: 'AudiAssistant',
        component: AudiAssistant,
        meta: {
            layout: 'main'
        }
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes

});
router.beforeEach((to, from, next) => {
    // remove modal backdrop if one exists
    if (document.getElementsByClassName("modal-open").length >0) {
        document.getElementById("closeButton").click()
    }
    next()
});

export default router;
