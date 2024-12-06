import { APIRequestContext } from '@playwright/test'
import User from '../models/User'

export default class TodoApi {
  async createTodo(request: APIRequestContext, user: User, todo: string) {
    return await request.post('/api/v1/tasks', {
      data: {
        isCompleted: false,
        item: todo,
      },
      headers: {
        Authorization: `Bearer ${user.getAccessToken()}`,
      },
    })
  }
}
