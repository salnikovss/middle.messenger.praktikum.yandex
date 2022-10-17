import './Avatar.scss';

import Modal from 'components/Modal';
import Component from 'core/Component';

import registerComponent from '../../../../core/registerComponent';
import AvatarForm from '../AvatarForm';
import { ButtonStyle } from './../../../../components/Button/types';
import { AvatarProps } from './types';

registerComponent(AvatarForm);
export default class Avatar extends Component<AvatarProps> {
  static componentName = 'Avatar';

  constructor({ editable = false, ...rest }: AvatarProps) {
    super({
      ...rest,
      editable,
      onClick: (e) => {
        e.preventDefault();
        (this.refs.modalRef as unknown as Modal).open();
      },
    });
  }

  componentDidUpdate(oldProps: AvatarProps, newProps: AvatarProps): boolean {
    return !this.props.editable && super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    if (this.props.editable) {
      //template=hbs
      return `
        <div class='avatar {{#if image}}avatar_filled{{/if}}'>
          {{#Button style='${ButtonStyle.UNSTYLED}' class='avatar__box' onClick=onClick}}
            <div class='avatar__inner' {{#if image}}style='background-image: url({{image}})'{{/if}}>
              <div class='avatar__hover'>Загрузить<br/>аватар</div>
            </div>
          {{/Button}}

          {{#Modal title='Загрузка файла' ref='modalRef'}}
            {{{AvatarForm}}}
          {{/Modal}}
        </div>
      `;
    }

    //template=hbs
    return `
      <div class='avatar {{#if image}}avatar_filled{{/if}}'>
        <div class='avatar__inner' {{#if image}}style='background-image: url({{image}})'{{/if}}>
        </div>
      </div>
    `;
  }
}
