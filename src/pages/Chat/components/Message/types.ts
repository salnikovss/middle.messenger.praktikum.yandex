export type MessageProps = { item: MessageModel };

export type MessageAuthor = {
  avatar?: Nullable<string>;
  name: string;
};

export enum MessageType {
  TEXT = 'message',
  FILE = 'file',
  PONG = 'pong',
}

export enum MessageStatus {
  SENT = 'sent',
  READ = 'read',
}
