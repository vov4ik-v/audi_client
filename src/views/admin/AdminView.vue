<template>
    <div class="container">
        <section>
            <div class="row">
                <div class="col-12 mt-3 mb-1">
                    <h5 class="text-uppercase">Minimal Statistics Cards</h5>
                    <p>Statistics on minimal cards.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-3 col-sm-6 col-12 mb-4 pointer">
                    <div class="accordion accordion-flush" id="accordion1">
                        <div class="accordion-item">
                            <div class="card" data-bs-toggle="collapse" data-bs-target="#collapse1"
                                 aria-expanded="false" aria-controls="collapse1">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between px-md-1">
                                        <div class="align-self-center">
                                            <i class="fas fa-solid fa-car text-info fa-3x"></i>
                                        </div>
                                        <div class="text-end align-self-center">
                                            <h3>CAR MANAGE</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">-->
                            <!--                                </button>-->
                            <div id="collapse1" class="accordion-collapse collapse show" aria-labelledby="heading1"
                                 data-bs-parent="#accordion1">
                                <div class="accordion-body">
                                    <router-link custom v-slot="{navigate}" to="/addCar"><div style="cursor:pointer" @click="navigate" class="card">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between px-md-1">
                                                <div class="align-self-center">
                                                    <i class="fas fa-solid fa-plus fa-3x"></i>
                                                </div>
                                                <div class="text-end align-self-center">
                                                    <h3>Add new car</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div></router-link>
                                    <router-link custom v-slot="{navigate}" to="/admin/cars">
                                    <div class="card mt-2 pointer" @click="navigate">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between px-md-1">
                                                <div class="align-self-center">
                                                    <i class="fas fa-solid fa-pen-square fa-3x"></i>
                                                </div>
                                                <div class="text-end align-self-center">
                                                    <h3>Edit cars</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-xl-3 col-sm-6 col-12 mb-4 pointer">
                    <div class="accordion accordion-flush" id="accordion2">
                        <div class="accordion-item">
                            <div class="card" data-bs-toggle="collapse" data-bs-target="#collapse2"
                                 aria-expanded="false" aria-controls="collapse2">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between px-md-1">
                                        <div class="align-self-center">
                                            <i class="fas fa-solid fa-user text-info fa-3x"></i>
                                        </div>
                                        <div class="text-end align-self-center">
                                            <h3>USER MANAGE</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">-->
                            <!--                                </button>-->
                            <div id="collapse2" class="accordion-collapse collapse show" aria-labelledby="heading2"
                                 data-bs-parent="#accordion2">
                                <div class="accordion-body">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between px-md-1">
                                                <div class="align-self-center">
                                                    <i class="fas fa-solid fa-pen-square fa-3x"></i>
                                                </div>
                                                <div class="text-end align-self-center">
                                                    <h3>Edit users</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 col-12 mb-4 pointer">
                    <div class="accordion accordion-flush" id="accordion3">
                        <div class="accordion-item">
                            <div class="card" data-bs-toggle="collapse" data-bs-target="#collapse3"
                                 aria-expanded="false" aria-controls="collapse3">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between px-md-1">
                                        <div class="align-self-center">
                                            <i class="fas fa-solid fa-envelope text-info fa-3x"></i>
                                        </div>
                                        <div class="text-end align-self-center">
                                            <h3>EMAIL MANAGE</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">-->
                            <!--                                </button>-->
                            <div id="collapse3" class="accordion-collapse collapse show" aria-labelledby="heading3"
                                 data-bs-parent="#accordion3">
                                <div class="accordion-body">
                                    <div class="card" data-bs-toggle="modal" style="cursor:pointer" data-bs-target="#emailAddModal">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between px-md-1">
                                            <div class="align-self-center">
                                                <i class="fas fa-solid fa-plus fa-3x"></i>
                                            </div>
                                            <div class="text-end align-self-center">
                                                <h3>Add email</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    <div class="modal fade" id="emailAddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Add email</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body form-group">
                                                    <input type="text" class="form-control" placeholder="Email...">
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <router-link custom v-slot="{navigate}" to="/admin/emails"><div @click="navigate" class="card mt-2 pointer">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between px-md-1">
                                            <div class="align-self-center">
                                                <i class="fas fa-solid fa-pen-square fa-3x"></i>
                                            </div>
                                            <div class="text-end align-self-center">
                                                <h3>Edit emails</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 col-12 mb-4 pointer">
                    <div class="accordion accordion-flush" id="accordion4">
                        <div class="accordion-item">
                            <div class="card" data-bs-toggle="collapse" data-bs-target="#collapse4"
                                 aria-expanded="false" aria-controls="collapse4">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between px-md-1">
                                        <div class="align-self-center">
                                            <i class="fas fa-solid fa-newspaper text-info fa-3x"></i>
                                        </div>
                                        <div class="text-end align-self-center">
                                            <h3>NEWS MANAGE</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">-->
                            <!--                                </button>-->
                            <div id="collapse4" class="accordion-collapse collapse show" aria-labelledby="heading4"
                                 data-bs-parent="#accordion4">
                                <div class="accordion-body">
                                    <router-link custom v-slot="{navigate}" to="/newsAdd"> <div @click="navigate" style="cursor:pointer" class="card">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between px-md-1">
                                            <div class="align-self-center">
                                                <i class="fas fa-solid fa-plus fa-3x"></i>
                                            </div>
                                            <div class="text-end align-self-center">
                                                <h3>Add news</h3>
                                            </div>
                                        </div>
                                    </div>
                                    </div></router-link>
                                    <router-link custom v-slot="{navigate}" to="/admin/news"><div @click="navigate" class="card mt-2 pointer">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between px-md-1">
                                            <div class="align-self-center">
                                                <i class="fas fa-solid fa-pen-square fa-3x"></i>
                                            </div>
                                            <div class="text-end align-self-center">
                                                <h3>Edit news</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

    export default {

    }
</script>

<style scoped>
    .pointer{
        cursor:pointer;
    }
    h3 {
        font-size: 1.7rem;
    }
    .align-s-c{
        align-self: center;
    }
</style>