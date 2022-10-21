import { ComponentConstructable } from 'core/Component';

type WithUserProps = { user: UserModel | null };

export default function withUser<P extends WithUserProps>(WrappedBlock: ComponentConstructable<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, user: window.store.getState().user });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      if (JSON.stringify(prevState.user) !== JSON.stringify(nextState.user)) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, user: nextState.user });
      }
    };

    componentDidMount(props: P) {
      super.componentDidMount && super.componentDidMount(props);
      window.store.on('changed', this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount && super.componentWillUnmount();
      window.store.off('changed', this.__onChangeUserCallback);
    }
  } as ComponentConstructable<Omit<P, 'user'>>;
}
