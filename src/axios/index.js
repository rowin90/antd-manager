import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import Utils from './../utils/utils';

// 拦截请求
axios.interceptors.request.use(function(config) {
  document.getElementById('ajaxLoading').style.display = 'block';
  return config;
});

// 拦截响应
axios.interceptors.response.use(function(config) {
  // hide();
  document.getElementById('ajaxLoading').style.display = 'none';
  return config;
});

export default class Axios {
  static requestList(_this, url, params, isMock) {
    var data = {
      params,
      isMock
    };
    // 静态方法中的this指向的是类本身，也即是Axios
    this.ajax({
      url,
      data
    }).then(data => {
      if (data && data.result) {
        let list = data.result.item_list.map((item, index) => {
          item.key = index;
          return item;
        });

        _this.setState({
          list,
          pagination: Utils.pagination(data, current => {
            _this.params.page = current;
            _this.requestList();
          })
        });
      }
    });
  }

  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(
        options.url,
        {
          param: 'callback'
        },
        function(err, response) {
          if (response.status == 'success') {
            resolve(response);
          } else {
            reject(response.messsage);
          }
        }
      );
    });
  }

  // 模拟接口，之前学习时
  static ajax(options) {
    let baseURL = '';
    if (options.isMock) {
      baseURL =
        'https://www.easy-mock.com/mock/5bbcc3305c48786433cbf822/mockapi';
    } else {
      // 后端真实地址
      baseURL =
        'https://www.easy-mock.com/mock/5bbcc3305c48786433cbf822/mockapi';
    }
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then(response => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
        if (response.status === 200) {
          let res = response.data;
          if (res.code == 0) {
            resolve(res);
          } else {
            Modal.info({
              title: '提示',
              content: res.msg
            });
          }
        } else {
          reject(response.msg);
        }
      });
    });
  }

  static getBaseUrl() {
    return 'https://www.easy-mock.com/mock/5bbcc3305c48786433cbf822/mockapi';
  }

  axios(method, url, params = {}) {
    let baseURL = Axios.getBaseUrl();
    return new Promise((resolve, reject) => {
      let _option = params;
      _option = {
        method,
        url,
        baseURL,
        data: params,
        ...params
      };
      axios.request(_option).then(response => {
        if (response.status === 200) {
          let res = response.data;
          console.log(res);
          if (res.code == 200) {
            resolve(res);
          } else {
            Modal.info({
              title: '提示',
              content: res.msg
            });
          }
        } else {
          reject(response.msg);
        }
      });
    });
  }
}
