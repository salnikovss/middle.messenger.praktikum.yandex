import './FileInput.scss';

import Error from 'components/Error';
import Component from 'core/Component';

import { FileInputProps, FileInputPropsWithEvents } from './types';

export default class FileInput extends Component<FileInputPropsWithEvents> {
  static componentName = 'FileInput';

  constructor({ onChange, ...rest }: FileInputProps) {
    super({
      ...rest,
      events: {
        change: (e: Event) => {
          this.element?.classList.remove('file-input_filled');
          const files = (this.refs.inputRef.element as HTMLInputElement).files;
          if (files && files.length > 0) {
            this.element?.classList.add('file-input_filled');
            const fileName = files[0].name;
            const textElement = this.element?.querySelector('.file-input__filename');
            if (textElement) {
              textElement.textContent = fileName;
            }
          }

          if (typeof onChange === 'function') {
            onChange(e);
          }
        },
      },
    });
  }

  setError(text = '') {
    (this.refs.errorRef as unknown as Error).setProps({ text });
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
            accept=accept
            ref='inputRef'
            id='field-{{name}}'
            name='{{name}}'
          }}}
          <span class='file-input__filename'></span>
          <span class='file-input__placeholder-text'>
            {{#if placeholder}}
              {{{placeholder}}}
            {{else}}
              Выберите файл на компьютере
            {{/if}}
          </span>
        </div>
        {{{Error ref='errorRef'}}}
      </div>
    `;
  }
}
