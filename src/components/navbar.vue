<template>  
    <b-navbar toggleable="lg" type="dark" variant="dark" >
        <b-navbar-brand href="#">Hrins</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav> 
            <b-nav-item-dropdown text="Task" left>
                <b-dropdown-item :to="{name:$store.getters.get_user.user_type == 0? 'viewtasks' :'viewusertasks'}">view tasks</b-dropdown-item>
                <b-dropdown-item v-if="$store.getters.get_user.user_type == 0" :to="{name:'addtask'}">add new task</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Department" left v-if="$store.getters.get_user.user_type == 0">
                <b-dropdown-item :to="{name:'viewdepartments'}">view departments</b-dropdown-item>
                <b-dropdown-item :to="{name:'addDept'}">create new department</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item @click="$store.dispatch('logout')">Logout</b-nav-item>
        </b-navbar-nav> 
        </b-collapse>
    </b-navbar> 
</template> 
<script>  
export default {
    name: "navbar",
    data() {
        return { 
        }
    },
    mounted() { 
    },
    methods: {  
    }, 
};
</script>
<style lang="scss" scoped> 

</style>