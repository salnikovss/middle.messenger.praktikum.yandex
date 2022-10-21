import { DEBUG } from 'config/app';

export default function log(message: string, ...rest: unknown[]) {
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log(message, ...rest);
  }
}
