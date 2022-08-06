<template>
    <div>
        <img style="width: 100%" src="../assets/img/slide/slide-11.jpg">
    </div>
    <div class="container" style="margin-top: 60px">
        <!-- ======= About List Section ======= -->
        <car-info-box alignment="left" :id="28"></car-info-box>
        <car-info-box alignment="right" :id="30"></car-info-box>
        <car-info-box alignment="left" :id="35"></car-info-box>
        <!-- ======= Portfolio Section ======= -->
        <section id="portfolio" class="portfolio">
            <div class="container">


                <div class="row portfolio-container">
                    <CarBox :id="28"></CarBox>
                    <CarBox :id="29"></CarBox>
                    <CarBox :id="30"></CarBox>
                    <CarBox :id="31"></CarBox>
                    <CarBox :id="32"></CarBox>
                    <CarBox :id="33"></CarBox>
                    <CarBox :id="34"></CarBox>
                    <CarBox :id="35"></CarBox>
                    <CarBox :id="36"></CarBox>

                </div>

            </div>
        </section><!-- End Portfolio Section -->
        <section id="tabs">
            <div class="container">
                <ul class="nav nav-tabs">
                    <li class="active"><a  class="btn" href="#series">Серия</a></li>
                </ul>

                <div class="tab-content">
                    <div id="series" class="tab-pane fade in active show">
                        <ul class="nav nav-tabs">
                            <li class="active"><a class="btn active" href="#e-tron-model">e-tron</a></li>
                            <li><a class="btn" href="#e-tron-model">e-tron GT</a></li>
                            <li><a class="btn" href="#e-tron-gt-model">A4</a></li>
                            <li><a class="btn" href="#a4-model">A5</a></li>
                            <li><a class="btn" href="#a5-model">A6</a></li>
                            <li><a class="btn" href="#a6-model">A7</a></li>
                            <li><a class="btn" href="#a7-model">A8</a></li>
                            <li><a class="btn" href="#a8-model">Q3</a></li>
                            <li><a class="btn" href="#q3-model">Q5</a></li>
                            <li><a class="btn" href="#q5-model">Q7</a></li>
                            <li><a class="btn" href="#q8-model">Q8</a></li>
                            <li><a class="btn" href="#s-model">S</a></li>
                            <li><a class="btn" href="#rs-model">RS</a></li>

                        </ul>

                        <div class="tab-content">
                            <div id="e-tron-model" class="tab-pane fade in active show">
                                <h3>e-tron</h3>
                            </div>
                            <div id="e-tron-gt-model" class="tab-pane fade">
                                <h3>e-tron-gt</h3>
                            </div>
                            <div id="a4-model" class="tab-pane fade">
                                <h3>A4</h3>
                            </div>
                            <div id="a5-model" class="tab-pane fade">
                                <h3>A5</h3>
                            </div>
                            <div id="a6-model" class="tab-pane fade">
                                <h3>A6</h3>
                            </div>
                            <div id="a7-model" class="tab-pane fade">
                                <h3>A7</h3>
                            </div>
                            <div id="a8-model" class="tab-pane fade ">
                                <h3>A8</h3>
                            </div>
                            <div id="q3-model" class="tab-pane fade">
                                <h3>q3</h3>
                            </div>
                            <div id="q5-model" class="tab-pane fade">
                                <h3>q5</h3>
                            </div>
                            <div id="q7-model" class="tab-pane fade">
                                <h3>q7</h3>
                            </div>
                            <div id="q8-model" class="tab-pane fade">
                                <h3>q8</h3>
                            </div>
                            <div id="s-model" class="tab-pane fade">
                                <h3>s</h3>
                            </div>
                            <div id="rs-model" class="tab-pane fade">
                                <h3>rs</h3>
                            </div>

                        </div>
                    </div>
                    <div id="bodyType" class="tab-pane fade">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#tabhome">Home</a></li>
                            <li><a href="#tabmenu1">Tab 1</a></li>
                        </ul>

                        <div class="tab-content">
                            <div id="tabhome" class="tab-pane fade in active">
                                <h3>HOME</h3>
                            </div>
                            <div id="tabmenu1" class="tab-pane fade">
                                <h3>Tab 1</h3>
                            </div>
                            <div id="tabmenu2" class="tab-pane fade">
                                <h3>Tab 2</h3>
                            </div>
                            <div id="tabmenu3" class="tab-pane fade">
                                <h3>Tab 3</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>

</template>

<script>

    import CarInfoBox from "../components/carInfo/CarInfoBox";
    import CarBox from "../components/carInfo/CarBox";


    $(document).ready(function(){
    $('.nav-tabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
    });
    export default {
        components: {CarBox, CarInfoBox},
        data() {
            return {
                carBox_size:0,
                carInfoBox_size:0,

            }
        },
        methods: {
            add(){

            }
        },
    }
</script>

<style scoped>

</style>