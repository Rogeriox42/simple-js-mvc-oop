class Model {
    constructor() {
        this.todos = [
            { id: 1, text: 'Wake up Early', complete: false },
            { id: 2, text: 'Do the Dishes', complete: false },
            { id: 3, text: 'Answer Emails', complete: true }
        ]
    }

    addTodo(todoText) {
        const newTodo = {
            id: this.todos.length + 1,
            text: todoText,
            complete: false
        }

        this.todos.push(newTodo)
    }

    editTodo(id, todoText) {
        this.todos = this.todos.map((todo) => todo.id === id ? { id, text: todoText, complete: todo.complete } : todo)
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((item) => item.id === id ? false : item)
    }

    toggleTodo(id) {
        this.todos = this.todos.map((todo) => todo.id === id ? { id, text: todo.text, complete: !todo.complete } : todo)
    }
}

module.exports = new Model() 