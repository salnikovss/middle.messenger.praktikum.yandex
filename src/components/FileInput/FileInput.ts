import './FileInput.scss';

import Component from 'core/Component';

import { FileInputProps, FileInputPropsWithEvents } from './types';

export default class FileInput extends Component<FileInputPropsWithEvents> {
  static componentName = 'FileInput';

  constructor({ onChange, ...rest }: FileInputProps) {
    super({
      ...rest,
      events: {
        change: onChange,
      },
    });
  }

  render() {
    //template=hbs
    return `
      <div class='file-input'>
        <div class='file-input__placeholder'>
          {{{Input
            class=class
            style=style
            type='file'
            ref='inputRef'
            id='field-{{name}}'
            name='{{name}}'
          }}}
          <span class='file-input__placeholder-text'>
            {{#if placeholder}}
              {{{placeholder}}}
            {{else}}
              Выберите файл на компьютере
            {{/if}}
          </span>
        </div>
      </div>
    `;
  }
}
