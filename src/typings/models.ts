import { MessageAuthor, MessageStatus, MessageType } from 'pages/Chat/components/Message';

declare global {
  //Chat
  export type ChatModel = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message?: {
      user: {
        first_name: string;
        second_name: string;
        avatar: string;
        email: string;
        login: string;
        phone: string;
      };
      time: string;
      content: string;
    };
  };

  // User
  export type UserModel = {
    id: number;
    display_name: string;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
  };

  // Message
  export type MessageModel = {
    fromMe?: boolean;
    author?: MessageAuthor;
    dateTime: Date;
    type: MessageType;
    body?: string;
    image?: string;
    status?: MessageStatus;
  };
}

export {};
