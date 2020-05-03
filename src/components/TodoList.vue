<template>
    <div>
        <input type="text" class="todo-input" placeholder="Type here and press enter" v-model="newTodo" @keyup.enter="addTodo">
        <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
            <div class="todo-item-left">
                <input type="checkbox" v-model="todo.completed">

                <div v-if="!todo.editing"
                @dblclick="editTodo(todo)" 
                class="todo-item-label" 
                :class="{ completed : todo.completed }">
                    {{ todo.title }}
                </div>

                <input v-else class="todo-item-edit" type="text" 
                v-model="todo.title" @blur="doneTodo(todo)" 
                @keyup.enter="doneTodo(todo)" 
                v-focus @keyup.esc="cancelEdit(todo)">
            </div>
            <div class="remove-item" @click="removeTodo(index)">
                &times;
            </div>
        </div>
        <label>
            To edit double click and press enter or lose focus. <br>
            To cancel edit press. <br>
            Click checkbox to set item as completed
        </label>
    </div>
</template>

<script>
export default {
    name: 'todo-list',
    data () {
        return {
            newTodo: '',
            idForTodo: 3,
            beforeEdit: '',
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
            if(this.newTodo.trim().length == 0){
                todo.title = this.beforeEdit
            }
            todo.editing = false
        },
        cancelEdit(todo){
            todo.editing = false
            todo.title = this.beforeEdit
        }
    }
}
</script>

<style lang="scss">
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
        border: 1px solid gray;
        margin-left: 12px;
        font-family: Avenir, Helvetica, Arial, sans-serif;

        &:focus {
            outline: 0;
        }
    }

    .completed {
        text-decoration: line-through;
        color: gray;
    }
</style>
