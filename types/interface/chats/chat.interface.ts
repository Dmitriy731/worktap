import type { User } from './user.interface'
import type { Message } from './message.interface'

export interface Chat {
  id: number
  createdAt: string
  users: User[]
  messages: Message[]
}