import Component from './Component';

type MyTestComponentProps = { text: string };

class MyTestComponent extends Component<MyTestComponentProps> {
  static componentName: 'MyTestComponent';

  render() {
    //template=hbs
    return `
      <div class="my-text-component">
        {{text}}
      </div>
    `;
  }
}

describe('Testing Component class', () => {
  // const createInstance = (props: Record<string, unknown>) => new TestBlock(props);

  test('use jsdom in this test file', () => {
    const component = new MyTestComponent({ text: 'Test text' });
    expect(component).not.toBeNull();
  });
});
