<template>
    <div class="container d-block">
        <nav class="navbar navbar-expand-lg navbar-light bg-white">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand">
                    <img src="../assets/img/logo2.png" height="25" alt="CoolBrand">
                </router-link>
                <ul v-if="loggedIn" class="navbar-toggler border-0" style="margin-right: 40px;" id="icon">
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
                                    :src="getCurrentUserImage"
                                    class="rounded-circle"
                                    height="22"
                                    alt="Portrait of a Woman"
                                    loading="lazy"
                            />
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li>
                              <a @click="push"
                                                                                      class="dropdown-item"><i
                                        class="fa fa-user"></i> {{getUserInfo.username}}</a>

                            </li>
                            <li>
                                <router-link to="/friends" custom v-slot="{navigate}"><a @click="navigate"
                                                                                         class=" dropdown-item"><i
                                        class="fas fa-user-friends"></i> Friends</a></router-link>

                            </li>
                            <li>
                                <router-link to="/settings" custom v-slot="{navigate}"><a @click="navigate"
                                                                                          class="dropdown-item"><i
                                        class="fa fa-sliders"></i> Settings</a></router-link>

                            </li>
                            <li>
                                <a @click.prevent="logOut" class="dropdown-item"><i class="bi bi-box-arrow-right"></i> Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <button type="button" class="navbar-toggler" style="" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse">
                    <span>Menu</span>
                </button>
                <router-link to="/signin" custom v-slot="{navigate}"><i v-if="!loggedIn" @click="navigate"
                                                                        class="navbar-toggler bi bi-box-arrow-in-right"></i>
                </router-link>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto">
                        <div class="navbar-nav navbar" id="navbar_main">

                            <router-link custom to="/" v-slot="{navigate}"><a  class="nav-link scrollto active"
                                                                       @click="navigate">Головна</a></router-link>
                            <router-link custom to="/news" v-slot="{navigate}"><a @click="navigate" class="nav-link scrollto">Новини</a></router-link>
                            <router-link custom to="/audiAssistant" v-slot="{navigate}"><a @click="navigate" class="nav-link scrollto ">Ауді Асистанс</a></router-link>
                        </div>
                    </div>
                </div>
                <div v-if="!loggedIn" class="navbar-nav profile_sign" style="">
                    <router-link to="/signin" custom v-slot="{navigate}">
                        <button class="btn my-btn-primary sign-up-btn" @click="navigate">Login</button>
                    </router-link>
                    <router-link to="/signup" custom v-slot="{navigate}">
                        <button @click="navigate" style="margin-left: 5px" class="btn my-btn-primary sign-up-btn">Sign
                            up
                        </button>
                    </router-link>
                </div>
                <div v-else class="navbar-nav profile_sign">
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown user-action"
                           data-bs-toggle="dropdown"><img
                                :src="getCurrentUserImage"
                                class="avatar rounded-circle" style="width: 40px; margin-right: 4px" alt="Avatar"> {{getUserInfo.firstname}}  {{getUserInfo.lastname}} <b class="caret"></b></a>
                        <div class="dropdown-menu" id="myMenu">
                            <a @click="push"
                                                                                  class="dropdown-item"><i
                                    class="fa fa-user"></i> Profile</a>
                            <router-link to="/friends" custom v-slot="{navigate}"><a @click="navigate"
                                                                                      class="dropdown-item"><i
                                    class="fas fa-user-friends"></i> Friends</a></router-link>
                            <router-link to="/settings" custom v-slot="{navigate}"><a @click="navigate"
                                                                                     class=" dropdown-item"><i
                                    class="fa fa-sliders"></i> Settings</a></router-link>
                            <div class="divider dropdown-divider"></div>
                            <a @click.prevent="logOut" class=" dropdown-item"><i class="bi bi-box-arrow-right"></i>
                                Logout</a>
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

            }

        },
        inject:['user','userImage'],
        computed: {
            loggedIn() {
                return this.$store.state.auth.initialState.status.loggedIn;
            },
            getUserInfo() {
                return this.user.value;
            },
            getCurrentUserImage() {
                return this.userImage.value
            },
        },
        methods: {
            logOut() {
                this.$store.dispatch('auth/logout');
                this.$router.push('/signin');
            },
            push(){
                this.$router.push({
                    name:'User',
                    params:{
                        username:this.getUserInfo.username
                    }
                })

            }
        },
        mounted() {

        }

    }

</script>
<style scoped>
    ul {
        border-color: saddlebrown;

    }

    .my-btn-primary {
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

    #myMenu .user-action {
        padding: 9px 15px;
        font-size: 15px;
    }
    #navbar_main a{
        cursor: pointer;
    }
</style>
