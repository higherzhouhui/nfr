import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {addPending, removePending} from './pending';

import {showTip, IMessageType, popUpLogin} from '@/utils';

// 处理响应
const handleResponse = (res: GlobalRequest.Response<any>) => {
  const {code, data, msg} = res;
  if (code === 40001) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('x-token');
      popUpLogin(true);
    }
  }
  if (code !== 200 && msg && typeof data === 'string') {
    showTip({
      type: IMessageType.ERROR,
      content: data,
    });
  }
};
// 处理错误
const handleError = (res: any) => {
  if (!res) {
    return;
  }
  if (res?.status === 401) {
    localStorage.removeItem('x-token');
    popUpLogin(true);
  }
  showTip({
    type: IMessageType.ERROR,
    content: res?.statusText || 'Network error',
  });
};

// 创建请求实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 500000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const xToken = localStorage.getItem('x-token');
      if (xToken) {
        config.headers = {
          ...config.headers,
          token: xToken,
          // token: 'test',
        };
      }
    }
    // config.headers = {
    //   ...config.headers,
    //   token: 'test',
    // };
    removePending(config);
    addPending(config);
    // 发送请求之前做些什么
    return config;
  },
  (err) => {
    // 对请求错误做些什么
    return Promise.reject(err);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const data: GlobalRequest.Response<any> = response.data;
    // 对响应数据做些什么
    removePending(response);
    data.code = response.data.errno;
    delete data.errno;
    handleResponse(data);
    return response;
  },
  (err) => {
    // 对响应错误做些什么
    handleError(err.response);
    return Promise.reject(err);
  }
);

function request<T = unknown>(config: AxiosRequestConfig) {
  interface Res extends GlobalRequest.Response<T> {
    data: T;
  }
  return instance
    .request<Res, AxiosResponse<Res>>(config)
    .then((res) => res.data);
}

export default request;
