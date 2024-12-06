import { APIRequestContext, Page } from '@playwright/test'
import TodoApi from '../api/TodoApi'
import User from '../models/User'

export default class TodoPage {
  private page: Page

  todoHeaderLocator = () => this.page.getByTestId('header')
  todoItemLocator = () => this.page.getByTestId('todo-item')
  todoNoItemsLocator = () => this.page.getByTestId('no-todos')

  private newTodoLocator = () => this.page.getByTestId('new-todo')
  private submitNewTodoLocator = () => this.page.getByTestId('submit-newTask')
  private deleteTodoLocator = () => this.page.getByTestId('delete')

  constructor(page: Page) {
    this.page = page
  }

  async visit(url: string = '/todo') {
    await this.page.goto(url)
  }

  async createTodo(todo: string) {
    await this.visit('/todo/new')
    await this.newTodoLocator().fill(todo)
    await this.submitNewTodoLocator().click()
  }

  async deleteTodo() {
    await this.visit()
    await this.deleteTodoLocator().click()
  }

  async createTodoWithApi(
    request: APIRequestContext,
    user: User,
    todo: string
  ) {
    await new TodoApi().createTodo(request, user, todo)
  }
}
