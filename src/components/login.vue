<template> 
        <b-card title="Login" class="">
            <hr>
            <b-card-text> 
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(login)"  > 
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }"> 
                    <b-input-group size="sm" :class="errors[0] ? 'mt-1':'mb-3'"> 
                        <b-input-group-prepend is-text>
                            <b-icon icon="envelope"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input 
                            type="email"
                            v-model="email"
                            :state="err.email || errors[0] ? false : null"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter Your Mail Please ..."
                            
                        ></b-form-input>
                    </b-input-group>
                    <b-form-invalid-feedback class="d-block">
                        {{errors[0]}}
                    </b-form-invalid-feedback> 
                </ValidationProvider>
                <ValidationProvider name="password" rules="required|min:8" v-slot="{ errors }">
                    <b-input-group size="sm" :class="errors[0]? 'mt-1':'mb-3'">
                        <b-input-group-prepend is-text>
                            <b-icon icon="key"></b-icon>
                        </b-input-group-prepend> 
                        <b-form-input 
                            type="password"
                            v-model="password"
                            :state="errors[0] ? false : null"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter Your Password Please ..."
                            
                        ></b-form-input>
                    </b-input-group>
                    <b-form-invalid-feedback class="d-block">
                        {{errors[0]}}
                    </b-form-invalid-feedback> 
                </ValidationProvider> 
                <div class="card-footer d-flex-column justify-content-center bg-white">
                    <div class="text-danger option" >
                        {{err}}
                    </div>
                    <div class="option mb-2">
                        you don't have account? <router-link to="/auth/signup">register now</router-link>
                    </div>
                    <div>
                        <b-button  type="submit" variant="success" class="px-4" size="sm">
                            <b-icon v-if="isLoading" icon="arrow-clockwise" animation="spin" font-scale="4" width='15px' height='15px' class="d-inline"></b-icon>
                            <span class="small ml-1">Login</span>
                        </b-button>
                    </div> 
                </div> 
            </form>
        </ValidationObserver>
        </b-card-text> 
        </b-card>
</template>
<script>  
export default {
    name: "login",
    data() {
        return {
            name:'',
            email:'',
            phone:'',
            department:'',
            password:'',
            isLoading:false,
            err:'',
            departments:[]
        }
    },
    mounted() {
        this.$http.get('auth/departments').then(data => {
            this.departments=data.data;
        }).catch(e=>{
            console.log(e)
        }) 
    },
    methods: {
        login(){
            this.isLoading=true
            this.$store
            .dispatch("login", {
                email: this.email,
                password: this.password,
                name: this.name,
                phone: this.phone
            }).then(()=>{
                this.isLoading=false
                this.err='' 
                this.$store.getters.get_user.user_type==0 ? this.$router.push({name:'viewtasks'}) : this.$router.push({name:'viewusertasks'})
            })
            .catch(() => {
                this.err='E-mail or Password is incorrect'
                this.isLoading=false 
            });
        }
    },
    
};
</script>
<style lang="scss" scoped> 

</style>