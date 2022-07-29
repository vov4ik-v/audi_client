<template>
    <header id="header" class=" d-flex align-items-center">
        <div class="container d-flex align-items-center justify-content-between">

            <div class="logo">
                <router-link to="/"><img src="../assets/img/logo2.png" alt="AUDI" class="img-fluid"></router-link>
            </div>

            <nav id="navbar" class="navbar">
                <ul>
                    <li><a class="nav-link scrollto active" href="#hero">Головна</a></li>
                    <li><a class="nav-link scrollto" href="#about">Новини</a></li>
                    <li><a class="nav-link scrollto " href="#portfolio">Ауді Асистанс</a></li>
                    <li class="dropdown"><a href="#"><span>Моделі</span> <i class="bi bi-chevron-down"></i></a>
                        <ul>

                            <li class="dropdown" v-for="audiModel in models" :key="audiModel.id"><a href="#"><span>
                        {{audiModel.name}}
                        </span> <i class="bi bi-chevron-right"></i></a>
                                <ul>
                                    <li v-for="car in audiModel.cars" :key="car.id">
                                        <router-link :to="{name:'Details', params:{modelName:toPathName(car)}}">{{car.modelName}}</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <i class="bi bi-list mobile-nav-toggle"></i>
            </nav><!-- .navbar -->

        </div>
    </header><!-- End Header -->
</template>

<script>
    export default {
        data() {
            return {
                cars: {},
                models: []
            }

        },
        methods: {
           toPathName(car){
               return car.modelName.replace(/\s/g, '-').toLowerCase()
           },
        },
        mounted() {
            setTimeout(() => {
                this.cars = this.$store.getters['carModule/carById'](this.id)
                this.models = this.$store.getters['audiModelModule/audiModels']
            }, 500)

        }

    }

</script>
