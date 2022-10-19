import './Messages.scss';

import { Component } from 'core';
import registerComponent from 'core/registerComponent';
import withStore from 'utils/withStore';

import Message from '../Message/Message';
import { MessagesProps } from './types';

registerComponent(Message);
class Messages extends Component<MessagesProps> {
  static componentName = 'Messages';

  constructor(props: MessagesProps) {
    super(props);

    this.setProps({
      messages: () => {
        const state = this.props.store.getState();
        if (state.idParam) {
          return state.chats
            ?.find((chat) => chat.id === state.idParam)
            ?.messages?.sort((a, b) => +new Date(a.time) - +new Date(b.time));
        }
        return null;
      },
    });
  }

  scrollToBottom() {
    const objDiv = this.element?.closest('.messenger__body');

    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
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
