import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import  './static/home.css'
import axios from 'axios'
// 配置基地址
axios.defaults.baseURL = 'http://127.0.0.1:7878/api/v1'
ReactDOM.render(<App />, document.getElementById('root'));


