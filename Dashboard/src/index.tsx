import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.scss';
import './i18n'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './ReduxToolkit/Store';
import { unstable_batchedUpdates } from 'react-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

unstable_batchedUpdates(() => {
  console.error = () => { };
});

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  componentDidCatch(error: Error) {
    if (error.message.includes("ToastContainer")) {
      return;
    }
  }

  render() {
    return this.props.children;
  }
}

root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
