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
    </div>

</template>

<script>
    import CarInfoBox from "../components/carInfo/CarInfoBox";
    import CarBox from "../components/carInfo/CarBox";



    export default {
components:{CarBox, CarInfoBox},
    methods:{

    }
    }
</script>

<style scoped>

</style>