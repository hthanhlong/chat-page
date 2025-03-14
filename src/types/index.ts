import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface ISignIn {
  username: string
  password: string
}

export interface ISignInResponse {
  id: string
  username: string
  accessToken?: string
  refreshToken?: string
}

export interface ISignUp {
  nickname: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface ISignUpResponse {
  accessToken: string
  refreshToken: string
}

export interface IErrorMessages {
  required: string
  maxLength: string
}

export interface IInputProps<T extends FieldValues> {
  label?: string
  name: 'username' | 'password' | 'nickname' | 'email' | 'confirmPassword'
  errorMessage: string | undefined
  register: UseFormRegister<T>
  placeholder?: string
  type?: string
  defaultValue?: string
}

export interface ISuccessResponse<T> {
  isSuccess: boolean
  errorCode: unknown
  message: string
  data: T
}

export interface IFriendRequest {
  senderId: string
  receiverId: string
  status: 'PENDING' | 'FRIEND' | 'UNFRIEND' | 'REJECT'
}

export interface ICustomWebSocket extends WebSocket {
  sendDataToServer: (data: { type: string; payload?: unknown | null }) => void
  pong: (data: string) => void
}

export interface IMessage {
  _id?: string
  senderId: string
  receiverId: string
  message: string
  createdAt?: string
}

export interface IUser {
  _id?: string
  username: string
  profilePicUrl?: string
  email: string
  nickname?: string
  caption?: string
}

export interface ICustomNotification {
  _id: string | null
  senderId: string
  receiverId: string
  type: 'FRIEND' | 'MESSAGE' | 'POST'
  content: string
  status: 'READ' | 'UNREAD'
  updatedAt?: string
  createdAt?: string
}
