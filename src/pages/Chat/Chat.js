import Messenger from './components/Messenger';
import SearchBox from './components/SearchBox';
import ChatList from './components/ChatList';
import template from './Chat.hbs';
import './Chat.scss';

export const Chat = () => {
  const data = {
    searchBox: SearchBox(),
    chatList: ChatList(),
    messenger: Messenger(),
  };
  return template(data);
};
