<template>
    <div class="home p-2 p-md-4 text-left">    
        <b-card
            v-for="(task,index) in tasks"
            :key="index"
            :header="task.title"
            style="width: 30rem;"
            class="mb-2"
        > 
            <b-card-text class="small  card-date mb-2">Department: {{task.department.name}}</b-card-text>
            <b-card-text class="mb-2">
                {{task.description}}
            </b-card-text>
            <b-card-text class="small  card-date text-info mb-0">{{task.start_date + ' - ' + task.deadline}}</b-card-text>
            <template #footer>
                <router-link :to='{name:"viewtask", params:{ id:task.id,task:task }}' class="w-100">
                    <b-badge pill 
                    :variant="!task.progress?'success':task.progress==1?'info':task.progress==2?'primary':'dark'" 
                    > 
                    {{!task.progress?'AVAILABLE':task.progress==1?'INPROGRESS':task.progress==2?'REVIEWING':'COMPLETED'}}
                    </b-badge>
                    <b-badge pill variant="info ml-2">Comments <b-badge variant="light">{{task.comments}}<span class="sr-only">unread messages</span></b-badge></b-badge>
                    <small class="text-primary float-right">view task</small>
                </router-link>
            </template>
        </b-card>
        <b-pagination
            v-model="currentPage"
            :total-rows="page_info.total"
            :per-page="page_info.per_page" 
            ></b-pagination>
    </div>
</template>
<script>   
export default {
    name: "tasks",
    data() {
        return {
            tasks:[], 
            selected:null,
            options: [
                { value: null, text: 'filter' ,disabled:true},
                { value: null, text: 'all tasks' },
                { value: 'not_assign', text: 'tasks wait assign to user ' },
                { value: 'in_progress', text: 'in progress tasks' },
                { value: 'wait', text: 'tasks wait approve request to compelete' }, 
                { value: 'completed', text: 'tasks completed' }
            ],
            page_info:{},
            currentPage:1,
        }
    },
    mounted() {
        this.fetch_data()
    }, 
    methods: {
        fetch_data(){
            this.$http.get('admin/task?page=' + this.currentPage).then(data => { 
                console.log(data.data)
                this.tasks=data.data.data;   
                this.page_info=data.data.page_info
            })
        }
    },
    watch: {
        currentPage() {
            this.fetch_data()
        },
    },
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
    font-size: 10px;
}
</style>