export type LinkProps = {
  text: string;
  class?: string;
  to: string;
  onClick?: () => void;
};

export type LinkPropsWithEvents = Omit<LinkProps, 'onClick'> & {
  events: {
    click: (e: MouseEvent) => void;
  };
};
