import { APIError } from 'api/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function apiHasError(response: Record<string, any>): response is APIError {
  return response && response.reason;
}
