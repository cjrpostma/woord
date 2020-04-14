import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import rootReducer from './reducers';

// styles ------------------------------
import theme from './styles/theme';
import GlobalStyles from './styles/globalStyles';

// components ------------------------------
import App from './containers/App/App';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
