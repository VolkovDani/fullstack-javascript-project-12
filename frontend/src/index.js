import { ErrorBoundary, Provider as RollBarProvider } from '@rollbar/react';
import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const app = async () => {
  const rollbarConfig = {
    accessToken: process.env.ROLLBACK_API_KEY,
    environment: process.env.ROLLBACK_API_ENV_NAME,
  };

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <RollBarProvider config={rollbarConfig}>
      <ErrorBoundary>
        {
          await init()
        }
      </ErrorBoundary>
    </RollBarProvider>,
  );
};

app();
