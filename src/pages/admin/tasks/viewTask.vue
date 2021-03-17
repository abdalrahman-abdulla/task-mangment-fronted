<template>
    <div class="home p-2 p-md-4 text-left">  
        <b-card 
            v-if="task.department"
            :header="task.title"
            style="width: 30rem;"
            class="mb-2"
        > 
            <b-card-text class="small  card-date mb-2">Department: {{task.department.name}}</b-card-text>
            <b-card-text class="mb-1">
                Description:  {{task.description}}
            </b-card-text>
            <b-card-text class="mb-1">
                budget:  {{task.budget}}
            </b-card-text>  
            <b-card-text class="mb-1">
                created at:  {{task.created_at}}
            </b-card-text>
            <b-card-text class="mb-1 small  ">
                deadline:  <span class="card-date text-info mb-0">{{task.start_date + ' - ' + task.deadline}}</span>
            </b-card-text>
            <b-card-text class="mb-1">
                <span>Requirements:</span>
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 ml-2 p-0" v-for="(item,index) in task.requirements" :key="index">{{item}}</b-list-group-item>
                </b-list-group>
            </b-card-text>
            <b-card-text class="mb-1">
                <span>Resources: </span>
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 ml-2 p-0" v-for="(item,index) in task.resources" :key="index">{{item}}</b-list-group-item>
                </b-list-group>
            </b-card-text>
            <b-card-text class="mb-1">
                progress: <span :class="task.progress==0?'text-warning':'text-success'">{{task.progress==0? 'not assign to any user' : task.progress==1 ? 'in progress ': task.progress==2 ?'reviewing':'completed'}}</span>
            </b-card-text> 
            <div v-if="task.progress==0">
                <b-card-text class="mb-1 text-muted req" v-if="task.progress==0 && !task.requests">
                    no request yet
                </b-card-text>
                <b-card-text class="mb-1 text-primary req" v-if="task.progress==0 && task.requests" @click="reqModel=reqModel ?false :true">
                    {{!reqModel ?'view request ':'hide request '}}{{'('+task.requests.length+')'}}
                </b-card-text> 
                <b-card-text class="mb-1" v-if="reqModel">
                    <span>Requests: </span>
                    <b-table :fields="fields" :items="task.requests"> 
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template v-slot:cell(accept)="data">
                            <span @click=accept(data.item.id) class="text-success">Accept</span>
                        </template>
                    </b-table> 
                </b-card-text>
            </div>
            <div v-else> 
                <b-card-text class="mb-1" v-if="task.user">
                    <span>implementing by : {{task.user.name}} </span> 
                </b-card-text>
                <b-card-text class="mb-1" v-if="task.user">
                    <span>last update : {{task.updated_at}} </span> 
                </b-card-text> 
                <b-card-text class="mb-1" v-if="task.work_link">
                    <span>worklink : <b-link :href="task.work_link" >click here</b-link></span> 
                </b-card-text>
                <b-card-text class="mb-1" v-if="task.progress==2">
                    <span>Completed and need Approve delivery request : <b-link @click="acceptApprove()">go</b-link></span> 
                </b-card-text> 
            </div> 
            <div class="option">
                <router-link :to="{name:'updateTask',params:{id:task.id}}">
                <b-button 
                variant="primary"
                size="sm"
                class="p-0 px-2"
                >update</b-button>
                </router-link>
                <b-button 
                variant="danger"
                size="sm"
                class="p-0 px-2 ml-2"
                @click="deleteTask()"
                >delete</b-button>
            </div>

            <template #footer> 
                <small class="small">add Comment</small>
                <b-form @submit.prevent="post_comment()"> 
                    <b-form-textarea
                        id="textarea"
                        v-model="comment"
                        placeholder="Enter comment..."
                        rows="3"
                        max-rows="4"
                        required
                    ></b-form-textarea>
                    <b-button variant="primary" type="submit" size="sm" class="m-2 ml-auto">post</b-button>
                </b-form>
                <hr>
                <span class="mb-2">All Coments ({{task.comments.length}})</span> 
                <div v-if="task.comments[0]">
                    <hr>
                    <b-card-text  class="mb-1" v-for="(comm,index) in task.comments" :key='index'>
                        <span class="font-weight-bold" >{{comm.user_name}}:</span> <span> {{comm.body}}</span>
                    </b-card-text> 
                </div>
                
                
            </template>
            
        </b-card> 
    </div>
</template>
<script>   
export default {
    name: "showtask",
    data() {
        return {
            task:{},
            reqModel:false,
            requests:[],
            fields:[
                { key: 'index', label: 'index' },
                { key: 'user.name',label: 'User'},
                { key: 'accept',label: 'option'}, 
            ],
            comment:'' 
        }
    },
    mounted() { 
        this.fetch_task()
    },
    created() { 
        
    },
    methods: {
        fetch_task(){
            this.$http.get('admin/task/'+this.$route.params.id ).then(data => { 
                this.task=data.data.data;   
            })
        },
        get_requests(){ 
            this.$http.get('admin/task/'+this.$route.params.id+'/requests' ).then(data => { 
                this.requests=data.data.data
                this.reqModel=true
            })
        },
        accept(a){
            this.$http.post('admin/task/'+a+'/acceptrequest').then(data => {  
                this.reqModel=true 
                this.task=data.data.data
            })
        },
        post_comment(){
            this.$http.post('user/task/'+ this.task.id +'/comment',{body:this.comment}).then(() => {  
                this.fetch_task()
                this.comment=''
            })
        },
        acceptApprove(){
            this.$http.post('admin/task/'+ this.task.id +'/approverequest').then(() => {  
                this.task.progress='completed'
                this.fetch_task()
            })
        },
        deleteTask(){
            this.$http.delete('admin/task/'+ this.task.id).then(() => {   
                this.$router.push({name:'viewtasks'})
            })
        }, 
    },
    watch:{
        task(){
            if(this.task.department){
               window.Echo.private(`task.`+ this.task.department.id +'.'+this.$route.params.id)
                .listen('updatedTask', (e) => { 
                    this.task = e.task
                })
            }
        }
    }
    
};
</script>
<style lang='scss' scoped>  
.card-title{
    font-size: 20px;
}
.card-text{
    font-size: 13px;
}
.card-date{
    font-size: 11px;
}
.req
{
    cursor: pointer;
}
.table span.text-success{
    cursor: pointer;
}
::placeholder{
    font-size: 12px; 
}
</style>