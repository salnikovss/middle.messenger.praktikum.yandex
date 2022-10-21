import { MessageType } from 'pages/Chat/components/Message';

declare global {
  //Chat
  export type ChatModel = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message?: {
      user?: {
        first_name: string;
        second_name: string;
        avatar: string;
        email: string;
        login: string;
        phone: string;
      };
      time: string;
      content: string;
      from_me?: boolean;
    };

    socket?: WebSocket;
    token?: string;
    chatUsers: UserModel[];
    messages: MessageModel[];
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
    role?: string;
  };

  // Message
  export type MessageModel = {
    chat_id: number;
    time: string;
    type: MessageType;
    user_id: number;
    content: string;
    from_me?: boolean;
    is_read: boolean;
    file?: {
      id: number;
      user_id: number;
      path: string;
      filename: string;
      content_type: string;
      content_size: number;
      upload_date: string;
    };
    user?: UserModel;
  };
}

export {};
