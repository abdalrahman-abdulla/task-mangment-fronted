<template> 
        <b-card title="Register" class="">
            <hr>
            <b-card-text>
                
            
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(signup)"  > 
                <ValidationProvider name="name" rules="required" v-slot="{ errors }"> 
                    <b-input-group size="sm" :class="errors[0]? 'mt-1':'mb-3'">
                        <b-input-group-prepend is-text>
                            <b-icon icon="person-fill"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input 
                            v-model="name"
                            :state="errors[0] ? false : null"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter Your Name Please ..."
                            size="sm"
                        ></b-form-input>
                    </b-input-group >
                    <b-form-invalid-feedback class="d-block">
                        {{errors[0]}}
                    </b-form-invalid-feedback> 
                </ValidationProvider>
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }"> 
                    <b-input-group size="sm" :class="errors[0] || err.email ? 'mt-1':'mb-3'"> 
                        <b-input-group-prepend is-text>
                            <b-icon icon="envelope"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input 
                            type="email"
                            v-model="email"
                            :state="err.email || errors[0] ? false : null"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter Your Mail Please ..."
                            size="sm"
                        ></b-form-input>
                    </b-input-group>
                    <b-form-invalid-feedback class="d-block" v-if="errors[0] || err.email">
                        {{err.email[0] || errors[0]}}
                    </b-form-invalid-feedback> 
                </ValidationProvider>
                <ValidationProvider name="phone" rules="required|integer|length:11" v-slot="{ errors }">
                    <b-input-group size="sm" :class="errors[0] || err.phone ? 'mt-1':'mb-3'"> 
                        <b-input-group-prepend is-text>
                            <b-icon icon="phone-fill"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input 
                            type="text"
                            v-model="phone"
                            :state="err.phone || errors[0] ? false : null"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter Your Phone Please ..."
                            size="sm"
                        ></b-form-input>
                    </b-input-group >
                    <b-form-invalid-feedback class="d-block" v-if="err.phone || errors[0]">
                        {{err.phone[0] || errors[0]}}
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
                            size="sm"
                        ></b-form-input>
                    </b-input-group>
                    <b-form-invalid-feedback class="d-block">
                        {{errors[0]}}
                    </b-form-invalid-feedback> 
                </ValidationProvider>
                <ValidationProvider name="department" rules="required" v-slot="{ errors }">
                    <b-input-group size="sm" :class="errors[0]? 'mt-1':'mb-3'">
                        <b-form-select 
                            v-model="department_id"   
                            required
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>-- Please select your department --</b-form-select-option>
                            </template>
                            <b-form-select-option v-for="(value,index) in departments" :key="index" :value="value.id">{{value.name}}</b-form-select-option>
                        </b-form-select> 
                        <b-form-invalid-feedback class="d-block">
                            {{errors[0]}}
                        </b-form-invalid-feedback> 
                    </b-input-group>
                </ValidationProvider> 
                <div class="text-danger error-sp" ></div>
                <div class="card-footer d-flex-column justify-content-center bg-white">
                    <div class="option mb-2">
                        do you have account? <router-link to="/auth/login">login now</router-link>
                    </div>
                    <div>
                        <b-button  type="submit" variant="success" class="px-4" size="sm">
                            <b-icon v-if="isLoading" icon="arrow-clockwise" animation="spin" font-scale="4" width='15px' height='15px' class="d-inline"></b-icon>
                            <span class="small ml-1">register</span>
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
            department_id:'',
            password:'',
            isLoading:false,
            err:[],
            departments:[],

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
        signup(){ 
            this.isLoading=true
            this.$store
            .dispatch("signup", {
                email: this.email,
                password: this.password,
                name: this.name,
                phone: this.phone,
                department_id:this.department_id
            }).then(()=>{
                this.$router.push({name:'auth'})
                this.isLoading=false
            })
            .catch(err => {
                this.isLoading=false;
                this.err=err.response.data.errors 
            });
        }
    },
    
};
</script>
<style lang="scss" scoped> 

</style>