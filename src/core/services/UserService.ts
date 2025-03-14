import { HttpService } from '.'
import END_POINT from '../endpoint'

class UserService {
  getUserById = async (id: string) => {
    if (!id) return Promise.reject(new Error('No id found'))
    try {
      const response = await HttpService.get(END_POINT.ME, {
        params: { id },
      })
      return response
    } catch (error) {
      throw new Error('Failed to get me')
    }
  }

  getUsersWhoIsNotFriend = async (id: string) => {
    if (!id) return Promise.reject(new Error('No id found'))
    try {
      const response = await HttpService.get(END_POINT.USERS, {
        params: { id },
      })
      return response
    } catch (error) {
      throw new Error('Failed to get users')
    }
  }

  updateUserById = async (id: string, data: Record<string, unknown>) => {
    if (!id) return Promise.reject(new Error('No id found'))
    try {
      const response = await HttpService.patch(END_POINT.USERS, { id, data })
      return response
    } catch (error) {
      throw new Error('Failed to update user')
    }
  }
}

export default new UserService()
