import {NextRouter} from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
/**
 * 防抖
 */
export const debounce = (fn: (params: any) => void, ms: number) => {
  let timer: any;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(args);
      timer = null;
    }, ms);
  };
};

/**
 * 复制url到剪贴板
 */
export const copyUrlToClip = (phref?: string) => {
  let href = window.location.href;
  if (phref) {
    href = phref;
  }
  const aux = document.createElement('input');
  aux.setAttribute('value', href);
  document.body.appendChild(aux);
  aux.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }
  document.body.removeChild(aux);
};

export const progressInit = (router: NextRouter) => {
  NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 初始化时的最小百分比
  });
  const handleRouteChange = () => {
    NProgress.start();
  };
  const handleRouteComplete = () => {
    NProgress.done();
  };
  router.events.on('routeChangeStart', handleRouteChange);
  router.events.on('routeChangeComplete', handleRouteComplete);
  return () => {
    router.events.off('routeChangeStart', handleRouteChange);
    router.events.off('routeChangeComplete', handleRouteComplete);
  };
};

export const formatDateToString = (date: Date, nextYear?: boolean) => {
  let year = date.getFullYear();
  if (nextYear) {
    year += 1;
  }
  let month: any = date.getMonth() + 1;
  let day: any = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};
