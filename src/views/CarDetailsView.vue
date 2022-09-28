<template>
    <main id="main">
        <div class="container">
            <div class="">
                <img class="w-100" :src="car.imageURL">
            </div>
            <nav class="navbar navbar-expand-lg navbar-light" style="background-color: lightgray">
                <div class="container-fluid">
                    <button type="button" class="navbar-toggler" data-bs-toggle="collapse"
                            data-bs-target="#navbarDetails">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarDetails">
                        <div class="navbar-nav">
                            <div class="navbar-nav navbar">
                                <a class="nav-link scrollto active">Audi {{car.modelName}}</a>
                                <a class="nav-link scrollto tablink">Технічні характеристики</a>
                                <a class="nav-link scrollto tablink" type="button" @click="defaultTabOpen"
                                   data-bs-toggle="modal" data-bs-target="#exampleModal">Габарити</a>
                                <a class="nav-link scrollto tablink" type="button" @click="defaultTabOpen"
                                   data-bs-toggle="modal" data-bs-target="#videoModal">Crash test</a>
                                <div class="modal fade" id="exampleModal" tabindex="-1"
                                     aria-labelledby="exampleModalLabel"
                                     aria-hidden="true">
                                    <div class="modal-dialog modal-lg modal-dialog-centered" id="myModal" style="">
                                        <div class="modal-content" style="">
                                            <div class="modal-header">
                                                <h3 class="modal-title text-center" style="text-align: center"
                                                    id="exampleModalLabel">Габарити</h3>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="justify-content-center d-flex p-0 m-0">
                                                    <li><a class="tablink" @click="openPage('SideView', this)"
                                                           id="defaultOpen">Збоку</a>
                                                    </li>
                                                    <li><a class="tablink" @click="openPage('TopView', this)">Зверху</a>
                                                    </li>
                                                    <li><a class="tablink" @click="openPage('FrontView', this)">Спереду
                                                        та
                                                        ззаду</a></li>
                                                </div>
                                                <div id="SideView" class="tabcontent">
                                                    <div>
                                                        <div class="container">
                                                            <h3 style="text-align: center">
                                                                Вид збоку
                                                            </h3>

                                                            <div class="block">
                                                                <img class="block-img w-100" style="text-align: center"
                                                                     :src="car.sideViewImageURL"/>
                                                            </div>
                                                            <h6 style="text-align: center">
                                                                <i>Розміри у міліметрах.</i>
                                                            </h6>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div id="TopView" class="tabcontent">
                                                    <div>
                                                        <div class="container" style="margin-top: 5%">
                                                            <h3 style="text-align: center">
                                                                Вид зверху
                                                            </h3>

                                                            <div class="block">
                                                                <img class="block-img w-100" style="text-align: center"
                                                                     :src="car.topViewImageUrl"/>
                                                            </div>

                                                            <h6 style="text-align: center">
                                                                <i>Розміри у міліметрах.</i>
                                                            </h6>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div id="FrontView" class="tabcontent">
                                                    <div>
                                                        <div class="container" style="margin-top: 5%">
                                                            <h3 style="text-align: center">
                                                                Вид спереду та ззаду
                                                            </h3>
                                                            <div class="block">
                                                                <img class="block-img w-100" style="text-align: center"
                                                                     :src="car.frontViewImageUrl"/>
                                                            </div>
                                                            <h6 style="text-align: center">
                                                                <i>Розміри у міліметрах.</i>
                                                                <br>
                                                                <br>
                                                                <br>

                                                            </h6>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade" id="videoModal" tabindex="-1"
                                     aria-labelledby="videoModalLabel"
                                     aria-hidden="true">
                                    <div class="modal-dialog modal-lg modal-dialog-centered" id="myVideo" style="">
                                        <div class="modal-content" style="">
                                            <div class="modal-header">
                                                <h3 class="modal-title text-center" style="text-align: center"
                                                    id="videoModalLabel">Crash Test</h3>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class='embed-container'>
                                                    <iframe :src='car.crashTestMovie'
                                                            frameborder='0' allowfullscreen></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div>
                <div class="container mt-2">
                    <!-- ======= About List Section ======= -->
                    <div class="row">
                        <h1 style="text-align: center"><strong>Технічні характеристики Audi {{car.modelName}}</strong>
                        </h1>
                        <div class="col-lg-12" style="margin-top: 40px">
                            <p style="text-align: center"><b>Audi завжди символізує прогрес через технології. Ви зможете
                                відкрити його для себе не лише у наших потужних і водночас економічних двигунах, але й у
                                нашому
                                багатому серійному оснащенні та індивідуальних комплектаціях.</b></p>


                        </div>

                    </div>
                </div>
                <div class="container" style="margin-top: 39px">
                    <h4><b>Двигун</b></h4>
                    <table class="table " bgcolor="#d3d3d3" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                        <tr>
                            <td>
                                <h6>Тип двигуна: {{car.engineType}}<span></span></h6>
                            </td>
                        </tr>
                        </tbody>

                    </table>


                </div>
                <div class="container" style="margin-top: 39px">
                    <h4><b>Трансмісія</b></h4>
                    <table class="table " bgcolor="#d3d3d3" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                        <tr>
                            <td>
                                <h6>Тип приводу: {{car.driveType}} <span></span></h6>
                            </td>
                        </tr>
                        </tbody>

                    </table>


                </div>
                <div class="container" style="margin-top: 39px">
                    <h4><b>Загальна маса
                    </b></h4>
                    <table class="table " bgcolor="#d3d3d3" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                        <tr>
                            <td>
                                <h6>
                                    Порожня маса*: {{car.emptyWeight}}<span></span></h6>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>
                                    Повна маса: {{car.grossWeight}}<span></span></h6>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>
                                    Об'єм багажного відсіку в л.: {{car.trunkVolume}}<span></span></h6>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>
                                    <i>* Споряджена маса автомобіля з водієм вагою 68 кг, маса багажу 7 кг і паливний
                                        бак заповнений на 90%, визначається відповідно до Директиви ЕG 1230/2012 в
                                        чинній редакції. Додаткове обладнання може збільшити масу автомобіля і
                                        коефіцієнт опору, в результаті чого, відповідно корисне навантаження і
                                        максимальна швидкість знижується.
                                    </i>
                                </h6>
                            </td>
                        </tr>
                        </tbody>

                    </table>


                </div>
                <div class="container" style="margin-top: 39px">
                    <h4><b>Пропускна здатність</b></h4>
                    <table class="table " bgcolor="#d3d3d3" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                        <tr>
                            <td>
                                <h6>
                                    Максимальна швидкість: {{car.maxSpeed}}<span></span></h6>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>
                                    Динаміка від 0-100 км/год, с.: {{car.from0to100}}<span></span></h6>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>
                                    Середні витрати пального: {{car.averageFuelConsumption}}<span></span></h6>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>
                                    <i>* Інформація ЄС про споживання палива та викиди СО2 згідно VO (EG) 715/2007:
                                        Зазначені значення визначалися відповідно до встановленого методу вимірювання VO
                                        (EG) 715/2007. Інформація не стосується одного транспортного засобу і не є
                                        частиною пропозиції, а служить лише для порівняння між різними типами
                                        транспортних засобів. Зокрема, спеціальне обладнання та аксесуари (наприклад,
                                        ширші шини, кондиціонер, стійки на даху тощо) можуть призвести до різних значень
                                        споживання та викидів CO2.
                                    </i>
                                </h6>
                            </td>
                        </tr>
                        </tbody>

                    </table>


                </div>
                <div class="container" style="margin-top: 39px">
                    <h4><b>Габарити</b></h4>
                    <table class="table " bgcolor="#d3d3d3" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                        <tr>
                            <td>
                                <h6>
                                    Довжина, мм: {{car.length}}<span></span></h6>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>
                                    Ширина, мм: {{car.width}}<span></span></h6>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>
                                    Висота, мм: {{car.height}}<span></span></h6>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>
                                    Колісна база: {{car.wheelBase}}<span></span></h6>

                            </td>
                        </tr>
                        </tbody>

                    </table>

                    <p><i>Зверніть, будь ласка, увагу, що інформація на сайті наведена лише для ознайомлення. Функції та
                        їх наявність в автомобілі можуть відрізнятися в залежності від їх доступності в країні та/або
                        технічних характеристик (конфігурації) автомобіля. За детальною інформацією звертайтесь до
                        найближчого авторизованого дилера Audi. Дана інформація по автомобілю не є публічною пропозицією
                        щодо придбання товару. Дана інформація по автомобілю також не є рекламою та не зобовязує жодну
                        зі сторін до продажу чи придбання автомобіля. Точна комплектація та перелік опцій вказуються у
                        договорах купівлі-продажу автомобіля, які підписані з офіційним дилером в Україні. Будь ласка,
                        перед підписанням договору купівлі-продажу автомобіля з офіційним дилером в Україні детально
                        ознайомтесь з точною ціною та комплектацією автомобіля. </i></p>
                </div>
            </div>

            <div id="News" class="tabcontent">
                <div>
                    <!-- ======= About List Section ======= -->
                    <div class="row">
                        <h1 style="text-align: center"><strong>Габарити</strong></h1>
                    </div>
                </div>
            </div>
        </div>
    </main><!-- End #main -->
</template>


<script>
    import axios from 'axios'
    import {useRouter, useRoute} from 'vue-router'
    import {ref, reactive, onMounted, toRefs} from 'vue'
    import {useStore, mapGetters} from 'vuex'

    export default {
        data() {
            return {
                car: {},
                modelName: "",
            }
        },
        methods: {
            openPage(pageName, elemnt) {
                let i, tabcontent, tablinks;
                tabcontent = document.getElementsByClassName("tabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablink");
                for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].style.backgroundColor = "";
                }
                document.getElementById(pageName).style.display = "block";

            },
            defaultTabOpen() {
                document.getElementById("defaultOpen").click();
            },
            async loadAudiInfo(){
                await this.$store.dispatch("carModule/getAllCars")
                this.modelName = this.$route.params.modelName
                this.car = await this.$store.getters['carModule/carByAudiModel'](this.modelName)
            }

        },

         created() {
             this.loadAudiInfo()

        }
    }
</script>

<style scoped>
    .tablink {
        float: left;
        cursor: context-menu;
        padding: 14px 16px;
    }

    /*.tablink:hover {*/
    /*    background-color: black;*/
    /*}*/

    /* Style the tab content (and add height:100% for full page content) */
    .tabcontent {
        display: none;
        /*padding: 100px 20px;*/
        height: 100%;
    }
    tab{
        text-align: left;
    }
</style>