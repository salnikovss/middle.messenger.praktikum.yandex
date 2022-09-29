export type MessageProps = { item: MessageModel };

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
