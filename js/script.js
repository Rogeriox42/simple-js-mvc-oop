class Model {
    constructor() {
        this.todos = [
            { id: 1, text: 'Wake up Early', complete: false },
            { id: 2, text: 'Do the Dishes', complete: false },
            { id: 3, text: 'Answer Emails', complete: true }
        ]
    }

    addTodo(todoText) {
        const newTodo = { id: this.todos.length + 1, text: todoText, complete: false }
        this.todos.push(newTodo)
        this.onTodoListChanged(this.todos)
    }

    editTodo(id, todoText) {
        this.todos = this.todos.map((todo) => todo.id === id ? { id, text: todoText, complete: todo.complete } : todo)
        this.onTodoListChanged(this.todos)
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((item) => item.id === id ? false : item)
        this.onTodoListChanged(this.todos)
    }

    toggleTodo(id) {
        this.todos = this.todos.map((todo) => todo.id === id ? { id, text: todo.text, complete: !todo.complete } : todo)
        this.onTodoListChanged(this.todos)
    }

    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback
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
        this.submitButton.type = 'submit'
        this.submitButton.textContent = 'aaaaa'

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

    get todoText() {
        return this.input.value
    }

    _resetInput() {
        this.input.value = ''
    }

    displayTodos(todos) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild)
        }

        if (todos.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Nothing to do! Ask a task?'
            this.todoList.append(p)

        } else {

            todos.forEach(todo => {
                const li = this.createElement('li')
                li.id = todo.id

                const checkbox = this.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.checked = todo.complete

                const span = this.createElement('span')
                span.contentEditable = true
                span.classList.add('editable')

                if (todo.complete) {
                    const strike = this.createElement('s')
                    strike.textContent = todo.text
                    span.append(strike)
                }
                else {
                    span.textContent = todo.text
                }

                const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Delete'
                li.append(checkbox, span, deleteButton)

                this.todoList.append(li)
            })

        }
    }

    bindAddTodo(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault()

            if (this.todoText) {                
                handler(this.todoText)
                this._resetInput()
            }
        })
    }

    bindDeleteTodo(handler) {
        this.todoList.addEventListener('click', event => {
            if (event.target.className == 'delete') { // Unnecessary check | Refactor suggestion | Actually important 
                const id = parseInt(event.target.parentElement.id)
                handler(id)
            }
        })
    }

    bindToggleTodo(handler) {
        this.todoList.addEventListener('change', event => {
            if (event.target.type == 'checkbox') { // Unnecessary check | Refactor suggestion | Actually important 
                const id = parseInt(event.target.parentElement.id)
                handler(id)
            }
        })
    }
}

// As we currently don't have the controllers to bind the model and the view, run the command app.view.displayTodos(app.model.todos) to update the interface git

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.onTodoListChanged(this.model.todos)

        this.view.bindAddTodo(this.handleAddTodo)
        this.view.bindDeleteTodo(this.handleDeleteTodo)
        this.view.bindToggleTodo(this.handleToggleTodo)

        this.model.bindTodoListChanged(this.onTodoListChanged)
    }

    onTodoListChanged = todos => {
        this.view.displayTodos(todos)
    }

    handleAddTodo = todoText => {
        this.model.addTodo(todoText)
    }

    handleEditTodo = (id, editText) => {
        this.model.editTodo(id, editText)
    }

    handleDeleteTodo = id => {
        this.model.deleteTodo(id)
    }

    handleToggleTodo = id => {
        this.model.toggleTodo(id)
    }


}

const app = new Controller(new Model(), new View())