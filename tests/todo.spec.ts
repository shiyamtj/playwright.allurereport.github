import { expect, test } from '@playwright/test'
import User from '../models/User'
import TodoApi from '../api/TodoApi'
import TodoPage from '../pages/todo.page'
import SignUpPage from '../pages/signup.page'
import * as allure from 'allure-js-commons'

test('should be able to add a todo', async ({ page, request, context }) => {
  await allure.owner('Shiyam Jannan')
  await allure.tags('Web interface', 'Demo')
  await allure.severity('critical')
  await allure.parentSuite('Tests for web interface')
  await allure.suite('Tests for essential features')
  await allure.subSuite('Tests for authentication')

  const user = new User()
  const signUpPage = new SignUpPage(page)
  const todoPage = new TodoPage(page)

  await allure.step('Step 1', async () => {
    await signUpPage.signUpWithApi(request, user, context)
  })

  await allure.step('Step 2', async () => {
    await todoPage.visit()
  })

  await allure.step('Step 3', async () => {
    await todoPage.createTodo('Learn Playwright')
  })

  await allure.step('Step Verification', async () => {
    expect(await todoPage.todoItemLocator().textContent()).toBe(
      'Learn Playwright'
    )
  })
})

test('should be able to delete a todo', async ({ page, request, context }) => {
  const user = new User()
  const signUpPage = new SignUpPage(page)
  const todoPage = new TodoPage(page)

  await signUpPage.signUpWithApi(request, user, context)
  await todoPage.visit()
  await todoPage.createTodoWithApi(request, user, 'Learn Playwright')
  await todoPage.visit()
  await todoPage.deleteTodo()

  await expect(await todoPage.todoNoItemsLocator()).toBeVisible()
})
