import { Component } from 'core';
import registerComponent from 'core/registerComponent';
import isEqual from 'utils/isEqual';
import withStore from 'utils/withStore';

import Message from '../Message/Message';
import { MessagesProps } from './types';

registerComponent(Message);

class Messages extends Component<MessagesProps> {
  static componentName = 'Messages';

  constructor(props: MessagesProps) {
    super(props);

    const state = this.props.store.getState();
    if (state.idParam) {
      this.setProps({
        messages: state.chats
          ?.find((chat) => chat.id === state.idParam)
          ?.messages?.sort((a, b) => +new Date(a.time) - +new Date(b.time)),
      });
    }
  }

  scrollToBottom() {
    const objDiv = this.element?.closest('.messenger__body');

    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  componentDidUpdate(oldProps: MessagesProps, newProps: MessagesProps): boolean {
    return !isEqual({ messages: oldProps.messages }, { messages: newProps.messages });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  render() {
    //template=hbs
    return `
      <div class='messages {{className}}'>
        {{#each messages}}
          {{{Message item=this}}}
        {{/each}}
      </div>
    `;
  }
}

export default withStore(Messages);
