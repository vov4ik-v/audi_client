<template>
    <div class="container">
        <div class="input-group rounded">
            <input type="search" class="form-control rounded" v-model="search" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <span class="input-group-text border-0" id="search-addon">
    <i class="fas fa-search"></i>
  </span>
        </div>
                <div class="people-nearby">
                    <friend-box :friend="friend" :modal-id="'friendModalWithId'+friend.username" v-for="friend in getFriendsByFirstNameAndLastName" :key="friend.id"></friend-box>
                </div>
    </div>
</template>

<script>
    import FriendService from "../../services/friend.service";
    import FriendBox from "../../components/friend/FriendBox";
    export default {
        data(){
            return{
                friends:[],
                search:"",
            }
        },
        computed:{
            getFriendsByFirstNameAndLastName() {
                return this.friends.filter(item => (item.firstname.indexOf(this.search) || item.lastname.indexOf(this.search)) !== -1)
            },
        },
        components:{FriendBox},
        mounted(){
            FriendService.getFriendsFoUser().then((response)=>{
                this.friends = response.data

            })

        }
    }
</script>

<style scoped>

</style>