const loginPage = Vue.component("LoginPage", {
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
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
             
                <v-form>
                 <v-card-text>
                  <v-text-field
                    label="Email"
                    name="email"
                    type="email"
                    v-model="formData.email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="formData.password"
                  />
                
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
                <router-link to="/register"><v-btn text color="primary" left>Create an account</v-btn></router-link>
                <v-btn @click="login()" color="primary">Login</v-btn>
              </v-card-actions>
              </v-form>
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