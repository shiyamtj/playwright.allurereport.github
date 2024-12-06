import { expect, test } from '@playwright/test'
import User from '../models/User'
import SignUpPage from '../pages/signup.page'
import TodoPage from '../pages/todo.page'
import * as allure from 'allure-js-commons'

test('should be able to register to our application', async ({ page }) => {
  await allure.owner('Shiyam Jannan')
  await allure.tags('Web interface', 'Demo')
  await allure.severity('critical')
  await allure.epic('Web interface')
  await allure.feature('Essential features')
  await allure.story('Authentication')

  const user = new User()
  const signupPage = new SignUpPage(page)
  const todoPage = new TodoPage(page)

  await signupPage.visit()
  await signupPage.signup(
    user.getFirstName(),
    user.getLastName(),
    user.getEmail(),
    user.getPassword()
  )
  expect(await todoPage.todoHeaderLocator()).toBeVisible()
})
