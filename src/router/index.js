import {createRouter,createWebHistory} from 'vue-router'
import HomeView from "../views/HomeView";
import CarDetailsView from "../views/CarDetailsView";
import CarAdd from "../views/car/CarAdd";
import CarEdit from "../views/car/CarEdit";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/details/:modelName',
        name: 'Details',
        component: CarDetailsView
    },
    {
        path: '/addCar',
        name: 'AddCar',
        component: CarAdd
    },
    {
        path: '/editCar/:modelName',
        name: 'EditCar',
        component: CarEdit
    },
]
    const router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes

    })
export default router;