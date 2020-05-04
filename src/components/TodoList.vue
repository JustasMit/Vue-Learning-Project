<template>
    <div>
        <input type="text" class="todo-input" placeholder="Type here and press enter" v-model="newTodo" @keyup.enter="addTodo">
        <transition-group name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <todo-item v-for="(todo, index) in todosFiltered" 
            :key="todo.id" 
            :todo="todo" 
            :index="index"
            :checkAll="!remaining" 
            @removedTodo="removeTodo" 
            @finishedEdit="finishEdit">
            </todo-item>
        </transition-group>
        
        <div class="extra-container">
            <div>
                <label>
                    <input type="checkbox" :checked="!remaining" @change="checkAll">
                    Check all
                </label>
            </div>

            <div>
                {{ remaining }} active left
            </div>
        </div>

        <div class="extra-container">
            <div>
                <button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
                <button :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
                <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
            </div>

            <div>
                <button :disabled="!enableClearButton" @click="clearCompleted">Clear completed</button>
            </div>
        </div>

        <label class="extra-container">
            To edit double click on item. <br>
            To cancel edit press ESC. <br>
            Click checkbox to set item as completed. <br>
        </label>
    </div>
</template>

<script>
import TodoItem from './TodoItem'

export default {
    name: 'todo-list',
    components: {
        TodoItem,
    },
    data () {
        return {
            newTodo: '',
            idForTodo: 3,
            beforeEdit: '',
            filter: 'all',
            todos: [
                {
                    'id': 1,
                    'title': 'Asdasd',
                    'completed': false, 
                    'editing': false,
                },
                {
                    'id': 2,
                    'title': 'Gfgawg',
                    'completed': false,
                    'editing': false, 
                },
                {
                    'id': 3,
                    'title': 'Twgwgwa',
                    'completed': false,
                    'editing': false, 
                },
            ]
        } 
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },
    computed: {
        remaining() {
            return this.todos.filter(todo => !todo.completed).length
        },
        todosFiltered(){
            switch(this.filter){
                case 'active':
                    return this.todos.filter(todo => !todo.completed);
                case 'completed':
                    return this.todos.filter(todo => todo.completed)
            }
            return this.todos;
        },
        enableClearButton() {
            return this.todos.filter(todo => todo.completed).length > 0
        }
    },
    methods: {
        addTodo() {
            if(this.newTodo.trim().length == 0){
                alert("Please write something")
                return
            }
            this.todos.push({
                id: this.idForTodo,
                title: this.newTodo,
                completed: false,
            })
        this.newTodo = ''
        this.idForTodo++
        },
        removeTodo(index){
            this.todos.splice(index, 1)
        },
        editTodo(todo){
            this.beforeEdit = todo.title
            todo.editing = true
        },
        doneTodo(todo){
            if(this.title.trim().length == 0){
                todo.title = this.beforeEdit
            }
            todo.editing = false
        },
        cancelEdit(todo){
            todo.title = this.beforeEdit
            todo.editing = false
        },
        checkAll() {
            this.todos.forEach((todo) => todo.completed = event.target.checked)
        },
        clearCompleted() {
            this.todos = this.todos.filter(todo => !todo.completed)
        },
        finishEdit(data) {
            this.todos.splice(data.index, 1, data.todo)
        }
    }
}
</script>

<style lang="scss">
    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");

    .todo-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;

        &:focus {
            outline: 0;
        }
    }

    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;
    }

    .remove-item {
        cursor: pointer;
        margin-left: 14px;
        &:hover {
            color: black;
        }
    }

    .todo-item-left {
        display: flex;
        align-items: center;
    }

    .todo-item-label {
        padding: 10px;
        border: 1px solid white;
        margin-left: 12px;
    }

    .todo-item-edit {
        font-size: 20px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid lightgray;
        margin-left: 12px;
        font-family: Avenir, Helvetica, Arial, sans-serif;

        &:focus {
            outline: 0;
        }
    }

    .completed {
        text-decoration: line-through;
        color: lightgray;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgray;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    button {
        font-size: 14px;
        background-color: white;
        appearance: none; 
        
        &:hover {
            background: lightgray;
        }

        &:focus {
            outline: none;
        }
    }

    .active {
        background: lightgreen;
    }
</style>
