<template>
<!--    <div class="row">-->
<!--        <div class="col-12">-->
<!--            <div class="card mt-3 tab-card">-->
<!--                <div class=" tab-card-header">-->

<!--                    <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" id="e-tron-tab" data-toggle="tab" href="#e-tron" role="tab"-->
<!--                               aria-controls="e-tron" aria-selected="true">e-tron</a>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" id="e-tron-gt-tab" data-toggle="tab" href="#e-tron-gt" role="tab"-->
<!--                               aria-controls="e-tron-gt" aria-selected="false">e-tron GT</a>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                            <router-link class="nav-link" id="a4-tab" data-toggle="tab" to="#a4" role="tab"-->
<!--                               aria-controls="a4" aria-selected="false">A4</router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" id="a5-tab" data-toggle="tab" href="#a5" role="tab"-->
<!--                               aria-controls="a5" aria-selected="false">A5</a>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" id="a6-tab" data-toggle="tab" href="#a6" role="tab"-->
<!--                               aria-controls="a6" aria-selected="false">A6</a>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" id="a7-tab" data-toggle="tab" href="#a4" role="tab"-->
<!--                               aria-controls="a7" aria-selected="false">A7</a>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" id="a8-tab" data-toggle="tab" href="#a8" role="tab"-->
<!--                               aria-controls="a8" aria-selected="false">A8</a>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" id="q3-tab" data-toggle="tab" href="#q3" role="tab"-->
<!--                               aria-controls="q3" aria-selected="false">Q3</a>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" id="q5-tab" data-toggle="tab" href="#q5" role="tab"-->
<!--                               aria-controls="q5" aria-selected="false">Q5</a>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" id="q7-tab" data-toggle="tab" href="#q7" role="tab"-->
<!--                               aria-controls="q7" aria-selected="false">Q7</a>-->
<!--                        </li>-->
<!--                       <li class="nav-item">-->
<!--                            <a class="nav-link" id="q8-tab" data-toggle="tab" href="#q8" role="tab"-->
<!--                               aria-controls="q8" aria-selected="false">Q8</a>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" id="s-tab" data-toggle="tab" href="#s" role="tab"-->
<!--                               aria-controls="s" aria-selected="false">S</a>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" id="rs-tab" data-toggle="tab" href="#rs" role="tab"-->
<!--                               aria-controls="e-tron-gt" aria-selected="false">RS</a>-->
<!--                        </li>-->
<!--&lt;!&ndash;                            <li class="nav-item" v-for="(model,idx) in models" :key="model.id">&ndash;&gt;-->
<!--&lt;!&ndash;                                <a class="nav-link" :id="toIdTab(model.name)" data-toggle="tab"&ndash;&gt;-->
<!--&lt;!&ndash;                                   :href="toHref(model.name)" role="tab" :aria-controls="toAriaControls(model.name)"&ndash;&gt;-->
<!--&lt;!&ndash;                                   :aria-selected="idx === 0">{{model.name}}</a>&ndash;&gt;-->
<!--&lt;!&ndash;                            </li>&ndash;&gt;-->
<!--                    </ul>-->
<!--                </div>-->

<!--                <div class="tab-content" id="myTabContent">-->
<!--                    <hr>-->
<!--                    <div v-for="(model,idx) in models" :key="model.id"-->
<!--                         :class="['tab-pane','fade','p-3', {'show active' : idx===0} ]" :id="toId(model.name)"-->
<!--                         role="tabpanel" :aria-labelledby="toAriaLabel(model.name)">-->
<!--                        <CarBox :audi-model="model.name"></CarBox>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
    <div>
        <ul class="nav nav-tabs">
            <li class="nav-item" v-for="tab in tabs" :key="tab">
                <a :class="{active: tab === selected}" class="nav-link" @click="setTab(tab)">{{tab}}</a>
            </li>

        </ul>
        <slot></slot>

    </div>

</template>

<script>
    import CarBox from "./carInfo/CarBox";
    export default {

        // props: ["models"],
        components: {CarBox},
       props:{
            tabs:{
                type:Array,
                required:true
            },
           selected:{
               type:String,
               required:true
           }
       },
        methods:{
            setTab(tab){
                this.$emit('selected',tab)
            }
        }
        // methods: {
        //     toHref(name) {
        //         return `#${this.toId(name)}`
        //
        //     },
        //     toIdTab(name) {
        //         return `${name.replace(/\s/g, '-').toLowerCase()}-tab`
        //     },
        //     toId(name) {
        //         return name.replace(/\s/g, '-').toLowerCase()
        //     },
        //     toAriaControls(name) {
        //         return this.toId(name);
        //     },
        //     toAriaLabel(name) {
        //         return this.toIdTab(name)
        //     }
        //
        // }


    }
</script>

<style scoped>
    a{
        color:black;
    }
    .tabs{
        max-width: 400px;
        margin: 0 auto;
    }
    .tabs_header{
        margin-bottom: 10px;
        list-style:none;
        padding: 0;
        display:flex;
    }
    .tabs_header li{
        width: 80px;
        text-align: center;
        padding: 10px 20px;
        margin-right: 10px;
        background-color: white;
        border-radius:5px;
        cursor:pointer;
        transition: 0.4s all ease-out;
        
    }
    .card {
        border: none;

    }
</style>