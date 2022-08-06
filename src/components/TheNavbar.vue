<template>
    <div class="container d-block">
        <nav class="navbar navbar-expand-lg navbar-light bg-white">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand">
                    <img src="../assets/img/logo2.png" height="25" alt="CoolBrand">
                </router-link>
                <ul v-if="isAuth" class="navbar-toggler border-0" style="margin-right: 40px;" id="icon">
                    <!-- Avatar -->
                    <li class="nav-item dropdown">
                        <a
                                class="nav-link dropdown-toggle d-flex align-items-center"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                        >
                            <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                                    class="rounded-circle"
                                    height="22"
                                    alt="Portrait of a Woman"
                                    loading="lazy"
                            />
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li>
                                <a class="dropdown-item" href="#">My profile</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Settings</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <button type="button" class="navbar-toggler" style="" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse">
                    <span>Menu</span>
                </button>
                <i v-if="!isAuth" class="navbar-toggler bi bi-box-arrow-in-right"></i>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto">
                        <div class="navbar-nav navbar">

                            <a class="nav-link scrollto active" href="#hero">Головна</a>
                            <a class="nav-link scrollto" href="#about">Новини</a>
                            <a class="nav-link scrollto " href="#portfolio">Ауді Асистанс</a>
                            <div class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-toggle dropdown"
                                   data-bs-toggle="dropdown">Моделі</a>
                                <div class="dropdown-menu">
                                    <TheDropDown :models="models"></TheDropDown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!isAuth" class="navbar-nav profile_sign" style="">
                   <router-link to="/signin" custom v-slot="{navigate}"><button class="btn my-btn-primary sign-up-btn" @click="navigate">Login</button></router-link>
                    <router-link to="/signup" custom v-slot="{navigate}"><button @click="navigate" style="margin-left: 5px" class="btn my-btn-primary sign-up-btn">Sign up</button></router-link>
                </div>
                <div v-else class="navbar-nav profile_sign">
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown user-action"
                           data-bs-toggle="dropdown"><img src="https://www.tutorialrepublic.com/examples/images/avatar/3.jpg" class="avatar rounded-circle" alt="Avatar"> Antonio Moreno <b class="caret"></b></a>
                        <div class="dropdown-menu" id="myMenu">
                            <a href="#" class="dropdown-item"><i class="fa fa-user"></i> Profile</a>
                            <a href="#" class="dropdown-item"><i class="fa fa-calendar-o"></i> Calendar</a>
                            <a href="#" class=" dropdown-item"><i class="fa fa-sliders"></i> Settings</a>
                            <div class="divider dropdown-divider"></div>
                            <a href="#" class=" dropdown-item"><i class="bi bi-box-arrow-right"></i> Logout</a>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
        <!-- END nav -->
    </div>
</template>

<script>
    import TheDropDown from "./TheDropDown";

    export default {
        components: {TheDropDown},
        data() {
            return {
                cars: {},
                models: [],
                isAuth: false
            }

        },
        methods: {},
        mounted() {
            setTimeout(() => {
                this.cars = this.$store.getters['carModule/carById'](this.id)
                this.models = this.$store.getters['audiModelModule/audiModels']
            }, 500)

        }

    }

</script>
<style scoped>
    ul {
        border-color: saddlebrown;

    }
    .my-btn-primary{
        color: #ffffff;
        background: #33cabb;
        border: none;
        text-align: center;

    }
    #myMenu a {
        color: #777 !important;
        padding: 8px 20px;
        line-height: normal;
        font-size: 11px;
    }
    #myMenu .user-action{
        padding: 9px 15px;
        font-size: 15px;
    }
</style>
