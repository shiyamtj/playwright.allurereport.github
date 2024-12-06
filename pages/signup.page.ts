import { APIRequestContext, BrowserContext, Page } from '@playwright/test'
import User from '../models/User'
import UserApi from '../api/UserApi'
import config from '../playwright.config'

export default class SignUpPage {
  private page: Page

  private firstNameLocator = () => this.page.getByTestId('first-name')
  private lastNameLocator = () => this.page.getByTestId('last-name')
  private emailLocator = () => this.page.getByTestId('email')
  private passwordLocator = () => this.page.getByTestId('password')
  private confirmPasswordLocator = () =>
    this.page.getByTestId('confirm-password')
  private submitLocator = () => this.page.getByTestId('submit')

  constructor(page: Page) {
    this.page = page
  }

  async visit() {
    await this.page.goto('/signup')
  }

  async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    await this.firstNameLocator().fill(firstName)
    await this.lastNameLocator().fill(lastName)
    await this.emailLocator().fill(email)
    await this.passwordLocator().fill(password)
    await this.confirmPasswordLocator().fill(password)
    await this.submitLocator().click()
  }

  async signUpWithApi(
    request: APIRequestContext,
    user: User,
    context: BrowserContext
  ) {
    const response = await new UserApi().signup(request, user)
    const responseBody = await response.json()
    const accessToken = responseBody.access_token
    const firstName = responseBody.firstName
    const userId = responseBody.userID

    user.setAccessToken(accessToken)
    user.setUserId(userId)

    await context.addCookies([
      {
        name: 'access_token',
        value: accessToken,
        url: config.use?.baseURL,
      },
      {
        name: 'firstName',
        value: firstName,
        url: config.use?.baseURL,
      },
      {
        name: 'userID',
        value: userId,
        url: config.use?.baseURL,
      },
    ])
  }
}
