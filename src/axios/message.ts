import MessageService from '../services/MessageService'

export const getAllMessages = async (partnerId: string) => {
  try {
    const response = await MessageService.getAllMessages(partnerId)
    return response
  } catch (error) {
    throw new Error('Failed to get users')
  }
}

export const getLastMessages = async (partnerId: string) => {
  try {
    const response = await MessageService.getLastMessages(partnerId)
    return response
  } catch (error) {
    throw new Error('Failed to get users')
  }
}

export const deleteAllMessage = async (data: {
  senderId: string
  receiverId: string
}) => {
  try {
    const response = await MessageService.deleteAllMessage(data)
    return response
  } catch (error) {
    throw new Error('Failed to delete all message')
  }
}
