const homePage = Vue.component("HomePage", {
    template: `
        <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Welcome to to do app</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-actions class="d-flex justify-space-between">
                <div class="my-2">
                    <router-link to="/login"><v-btn color="primary">Login</v-btn></router-link>
                  </div>
                  <div class="my-2">
                    <router-link to="/register"><v-btn color="teal ">Register</v-btn></router-link>
                  </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
    `,
    data: () => {
        return {
            formData:{
                email: '',
                password: ''
            }
        }
    },
    created(){
        if(sessionStorage.getItem("user_id")){
            this.$router.push('/todos/');
        }
    },
    methods: {
        login() {
          axios.post('/auth/login', this.formData)
            .then((res) => {
                if(res.data.response === "works"){
                    sessionStorage.setItem('user_id', res.data.user_id);
                    this.$router.push('/todos/');
                }else{
                    console.log(res.data.response)
                }
            })
            .catch(error => {
              console.log(error)
            })
        }
    }
    ,
});