const todoCardTemplate = document.querySelector('[data-todo-template]')
const todoCardContainer = document.querySelector('[data-todo-cards-container]')
const searchInput = document.querySelector('[data-search]')

let todos = []

searchInput.addEventListener('input', (e) => {
	const value = e.target.value.toLowerCase()
	todos.forEach((todo) => {
		const isVisible = todo.id.toString().includes(Number(value)) || todo.title.toLowerCase().includes(value)
		todo.element.classList.toggle('hide', !isVisible)
	})
})

fetch('https://jsonplaceholder.typicode.com/todos')
	.then((res) => res.json())
	.then((data) => {
		todos = data.map((todo) => {
			const card = todoCardTemplate.content.cloneNode(true).children[0]
			const header = card.querySelector('[data-header]')
			const body = card.querySelector('[data-body]')
			header.textContent = todo.id
			body.textContent = todo.title
			todoCardContainer.append(card)
			return { id: todo.id, title: todo.title, element: card }
		})
	})
