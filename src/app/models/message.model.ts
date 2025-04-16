export interface Message {
  id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp?: Date;
  read: boolean;
}
