import { MessageAuthor, MessageStatus, MessageType } from 'pages/Chat/components/Message';

declare global {
  //Chat
  export type ChatModel = {
    id: string;
    name: string;
    alt: string;
    lastMessageTime: string;
    unreadMessages: number;
    avatar: string | null;
  };

  // User
  export type UserModel = {
    display_name: Nullable<string>;
    first_name: Nullable<string>;
    second_name: Nullable<string>;
    login: Nullable<string>;
    email: Nullable<string>;
    phone: Nullable<string>;
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
