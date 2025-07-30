import type { DefaultSession } from 'next-auth';

//* default session type config file
declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
    };
  }
}
