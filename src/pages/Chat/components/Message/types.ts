// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMessageProps extends MessageModel {}

export type MessageAuthor = {
  avatar?: Nullable<string>;
  name: string;
};

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
}
export enum MessageStatus {
  SENT = 'sent',
  READ = 'read',
}
