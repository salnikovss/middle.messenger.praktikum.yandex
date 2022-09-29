export type LinkProps = {
  text: string;
  class?: string;
  to: string;
};

export type LinkPropsWithEvents = LinkProps & {
  events: {
    click: (e: MouseEvent) => void;
  };
};
