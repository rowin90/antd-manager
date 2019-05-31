import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const store = configureStore();

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider store={store}>
      <Router />
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
);
registerServiceWorker();
