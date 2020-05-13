const signUpPage = Vue.component("SignUpPage", {
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
                <v-toolbar-title>Sign Up</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-form>
              <v-card-text>
                
                <v-text-field
                    v-model="formData.name"
                    label="Name"
                    name="name"
                    type="text"
                  />
                  <v-text-field
                    v-model="formData.email"
                    label="email"
                    name="email"
                    type="email"
                  />
                  <v-text-field
                    v-model="formData.password"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  />
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
                <router-link to="/login"><v-btn text color="primary" left>Login</v-btn></router-link>
                <v-btn @click="register()" color="primary">Register</v-btn>
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
                name: '',
                email: '',
                password: '',
            }
        }
    },
    created(){
        if(sessionStorage.getItem("user_id")){
            this.$router.push('/todos/');
        }
    },
    methods: {
        register() {
          axios.post('/auth/register', this.formData)
            .then(() => {
              this.$router.push('/login');
            })
            .catch(error => {
              console.log(error)
            })
        }
    }
    ,
});