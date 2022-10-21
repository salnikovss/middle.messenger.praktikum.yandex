export type MessageProps = { item: MessageModel & { user?: UserModel } };

export enum MessageType {
  TEXT = 'message',
  FILE = 'file',
  PONG = 'pong',
}

export enum MessageStatus {
  SENT = 'sent',
  READ = 'read',
}
