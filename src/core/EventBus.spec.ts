import EventBus from './EventBus';

describe('Subscribe to EventBus event', () => {
  test('Omit the event and listen to the event to be fired', () => {
    const eventBus = new EventBus();
    return new Promise((resolve, reject) => {
      const timeOut = setTimeout(() => reject('Rejected'), 1000);
      eventBus.on('eventName', () => {
        clearTimeout(timeOut);
        resolve('Event fired');
      });

      eventBus.emit('eventName');
    }).then((data) => expect(data).toEqual('Event fired'));
  });

  test('Destroy all events, skip the event and listen that the event was not received', () => {
    const eventBus = new EventBus();
    return new Promise((resolve, reject) => {
      const timeOut = setTimeout(() => reject('Event not fired'), 500);
      eventBus.on('eventName', () => {
        clearTimeout(timeOut);
        resolve('Event fired');
      });

      eventBus.destroy();
      eventBus.emit('eventName');
    })
      .then(() => {
        throw new Error('Event should not be fired');
      })
      .catch((e) => {
        expect(e).toEqual('Event not fired');
      });
  });
});
