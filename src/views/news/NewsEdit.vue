<template>
    <div class="container">
        <div class="form-group mt-3 border">
        <form class="mx-3 my-3" @submit.prevent="submit">
            <p style="text-align:center">
            <img :src="showImg" class="img-fluid w-75" alt="Wild Landscape" /> </p>
            <div class="form-group">
                <div class="mb-3 d-flex flex-column">
                    <div class="btn btn-rounded justify-content-center">
                        <input type="file" ref="file" @change="onFileChange($event)">
                    </div>
                </div>
            </div>


            <!-- 2 column grid layout with text inputs for the first and last names -->
            <div class="row mb-4">
                <div class="col">
                    <div class="form-outline">
                        <input type="text" id="form6Example1" v-model="news.title" class="form-control" required />
                        <label class="form-label" for="form6Example1">Title</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline">
                        <label>
                            Please select status:
                            <select class="select" v-model="news.status" required>
                                <option value="Transport" selected>Transport</option>
                                <option value="Business">Business</option>
                                <option value="Technology">Technology</option>
                                <option value="Sports">Sports</option>
                                <option value="Culture">Culture</option>
                                <option value="World News">World News</option>
                                <option value="Politics">Politics</option>
                                <option value="Travels">Travels</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Text input -->
            <div class="form-outline mb-4">
                <textarea type="text" id="form6Example3"  v-model="news.description" class="form-control"  required/>
                <label class="form-label" for="form6Example3">Description</label>
            </div>


            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block mb-4">Edit</button>
        </form>
        </div>
    </div>
</template>

<script>
    import NewsService from '../../services/news.service'
    import AdminService from '../../services/admin.service'
    import ImageService from '../../services/image.service'
    export default {
        data() {
            return {
                news:{},
                newsImage:null,
                imgToUpload: null,
                newsId:this.$route.params.id
            }
        },
        methods:{
            onFileChange(e) {
                this.imgToUpload = e.target.files[0]
                this.isUpload = true;
                let file = e.target.files[0];
                let url = '';
                var reader = new FileReader();
                reader.readAsDataURL(file);
                let that = this;
                reader.onload = function (e) {
                    url = this.result.substring(this.result.indexOf(',') + 1);
                    that.newsImage = url
                }
            },
            submit(){
                this.news.newsImage = this.newsImage
                AdminService.updateNews(this.news.id,this.news).then((response) =>{
                    if(this.imgToUpload) {
                        ImageService.uploadNewsImage(response.data.id, this.imgToUpload)
                    }
                    this.$router.push("/admin/news")
                },
                    (error)=>{
                    console.log(error)
                    })
                this.imgToShow = null

            }
        },
        computed:{
            showImg() {
                if (this.newsImage != null) {
                    return  'data:image/png;base64,' +this.newsImage
                } else {
                    return "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
                }
            }
        },
        mounted() {
            NewsService.getNewsById(this.newsId).then((response) => {
                this.news = response.data
                ImageService.getNewsImage(this.news.id).then((imageResponse) => {
                        this.newsImage = imageResponse.data.imageBytes
                    }
                    , (error) => {
                        this.newsImage = null;
                    })
            }, (error) => {
                this.news =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            })
        }
    }
</script>

<style scoped>

</style>