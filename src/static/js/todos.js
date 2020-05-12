const todosPage = Vue.component("Todos", {
    template: `
        <v-app id="inspire">
            <v-content>
                <v-container>
                <v-row justify="center">
                <v-col lg="8">
                <v-card class="pa-10">
                    <div class="todos-shell" id="todos-shell">
                    <h1 class="my-5">To do's of {{ name }}</h1>
                        <div v-for="todo in formData.todos" :key="todo.id + 'not-finished'">
                            <div v-if="todo.isFinished == false" class="not-finished shell-todo">
                            <v-checkbox
                                style="margin-top: 8px"
                                v-model="todo.isFinished"
                            ></v-checkbox>
                            <v-text-field
                                style="font-weight: 500; max-width: 30%"
                                v-model="todo.text"
                                solo
                                flat
                                >
                                </v-text-field>
                                <v-btn class="ma-2" text icon @click="removeIndex(formData.todos, todo.id)">
                                    <v-icon>mdi-delete-forever</v-icon>
                                </v-btn>
                                </div>
                        </div>
                        <v-divider class="my-10"></v-divider>
                        <h3>Done</h3>
                        <div v-for="todo in formData.todos" :key="todo.id + 'finished'">
                            <div v-if="todo.isFinished == true" class="finished shell-todo">
                            <v-checkbox
                                color="#c0c8d0"
                                style="margin-top: 8px;"
                                v-model="todo.isFinished"
                            ></v-checkbox>
                            <v-text-field
                                style="font-weight: 500; max-width: 30%;"
                                v-model="todo.text"
                                solo
                                disabled
                                flat
                                >
                                </v-text-field>
                                <v-btn class="ma-2" text icon @click="removeIndex(formData.todos, todo.id)">
                                    <v-icon>mdi-delete-forever</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                        </div>
                    <v-btn color="primary" class="mt-10" @click="addTodo()">Add new To-Do</v-btn>
                </v-card>
                </v-col>
                </v-row>
                </v-container>
            </v-content>
      </v-app>
    `,
    data: () => {
        return {
            formData: {
                todos: []
            },
            name: ""
        }
    },
    created() {
        if (!sessionStorage.getItem("user_id")) {
            this.$router.push('/login/');
        }
        this.getUser()
    },
    mounted() {
        this.getTodo()
    },
    watch: {
        formData: {
            deep: true,
            handler() {
                axios.post('/todos/new', this.formData)
                    .then(() => {
                        console.log("todos changed")
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    },
    methods: {
        getTodo() {
            axios.get(('/todos/' + sessionStorage.getItem("user_id")),)
                .then((res) => {
                    this.formData.todos = res.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getUser() {
            axios.get(('/user/' + sessionStorage.getItem("user_id")),)
                .then((res) => {
                    this.name = res.data.name
                })
                .catch(error => {
                    console.log(error)
                })
        },
        addTodo() {
            this.formData.todos.push({
                id: this.formData.todos.length + 1,
                isFinished: false,
                text: ""
            })
        },
        removeIndex(todos, id) {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    todos.splice(i, 1);
                }
            }
            return todos;
        }
    },
});