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

class View {
    constructor() {
        this.app = this.getElement('#root')

        this.title = this.createElement('h1')
        this.title.textContent = 'Todos'

        this.form = this.createElement('form')

        this.input = this.createElement('input')
        this.input.type = 'text'
        this.input.placeholder = 'Add Todo'
        this.input.name = 'todo'

        this.submitButton = this.createElement('button')
        this.submitButton.textContent = 'Submit'

        this.todoList = this.createElement('ul', 'todo-list')

        this.form.append(this.input, this.submitButton)

        this.app.append(this.title, this.form, this.todoList)


    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)

        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    get todoText(){
        return this.input.value 
    }

    _resetInput(){
        this.input.value = '' 
    }

    displayTodos(){
        while(this.todoList.firstChild){
            this.todoList.removeChild(this.todoList.firstChild) 
        }

        if(todos.length === 0){
            const p = this.createElement('p') 
            p.textContent = 'Nothing to do! Ask a task?'
            this.todoList.append(p) 
        }else{
            
        }
    }
}

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}

const app = new Controller(new Model(), new View())