import Service from "../../Service";
export default {
    state:{
        Loginstat: false,
        token: localStorage.getItem('token') || '',
        user : JSON.parse(localStorage.getItem('user'))  || ''
    },
    mutations: {
        SET_AUTH(state, payload) {
            state.user = payload.user; 
            localStorage.setItem(
                "user",
                JSON.stringify(state.user)
            ) 
            if(payload.access_token){
                state.token = payload.access_token;
                localStorage.setItem(
                    "token",
                    state.token
                )
            }
        }, 
        SET_loggedIn(state, payload) {
            state.loggedIn = payload;
        }
    },
    actions: {
        async login({ commit }, payload){
            return new Promise((resolve, reject) => {
                Service
                .post("auth/login",payload)
                .then(res => {
                    commit("SET_AUTH", res.data); 
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
            });
        },
        async signup({commit }, payload){
            return new Promise((resolve, reject) => {
                Service
                .post("auth/register",payload)
                .then(res => {  
                    commit("SET_AUTH", res.data); 
                    resolve(res);
                })
                .catch(err => { 
                    reject(err);  
                }); 
            });
        },
        logout({ commit  }){ 
            return new Promise((resolve, reject) => {  
                Service
                .post("auth/logout")
                .then(res => {  
                    resolve(res); 
                })
                .catch(err => { 
                    reject(err);
                }).then(() => { 
                    commit("SET_AUTH", {user:'',access_token:''});
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    location.reload();
                });  
                
            });
        },
        me({ commit,state,dispatch }){  
            if(state.token){
                return new Promise((resolve) => {
                    Service
                    .post("auth/me")
                    .then(res => { 
                        commit("SET_AUTH", {user:res.data.data}); 
                        resolve(res.data)
                    })
                    .catch(() => {
                        dispatch('logout')
                    });
                });    
            } 
            
        }
    },
    getters: {
        get_loggedIn(state) {
            return state.loggedIn;
        },
        get_user(state) {
            return state.user;
        },
        get_token(state) {
            return state.token;
        },
    }
};
