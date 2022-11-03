import Component from './Component';

type MyTestComponentProps = { text: string };

class MyTestComponent extends Component<MyTestComponentProps> {
  static componentName: 'MyTestComponent';

  render() {
    //template=hbs
    return `
      <div class="my-text-component">
        <div class="my-text-component__inner">
          {{text}}
        </div>
      </div>
    `;
  }
}

const getComponent = () => new MyTestComponent({ text: 'Test text' });

describe('Component class', () => {
  test('Renders element', () => {
    expect(getComponent().element).not.toBeNull();
  });

  test('Renders inner element', () => {
    const componentInnerElement = getComponent().element?.querySelector('.my-text-component__inner');
    expect(componentInnerElement).not.toBeNull();
  });

  test('Renders correct text', () => {
    const componentInnerElement = getComponent().element?.querySelector('.my-text-component__inner');
    expect(componentInnerElement?.textContent).toContain('Test text');
  });
});
