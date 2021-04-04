import { UserProvider } from '@auth0/nextjs-auth0';

import '../styles/globals.css';
import { TodosProvider } from '../contexts/todos-context';

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <TodosProvider>
        <Component {...pageProps} />;
      </TodosProvider>
    </UserProvider>
  );
}
