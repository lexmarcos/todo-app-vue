const Toolbar = Vue.component("Toolbar", {
    template: `
        <v-toolbar :color="primary">
          <v-toolbar-title>To do app</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="logout()" v-if="isLogged">
            <v-icon>mdi-logout-variant </v-icon>
          </v-btn>
        </v-toolbar>
    `,
    data: () => {
        return {
            isLogged: false
        }
    },
    created(){
        this.setLogged()
    },
    watch: {
    '$route.path': function (path) {
        this.isLogged = path.includes("todos")
    },
    deep: true,
    immediate: true
  },
    methods: {
        logout(){
            axios.get('/logout')
                .then((res) => {
                    sessionStorage.removeItem('user_id')
                    this.$router.push('/login/');
                })
                .catch(error => {
                    console.log(error)
                })
        },
        setLogged(){
            this.isLogged = location.href.includes("todos")
        }
    }
    ,
});