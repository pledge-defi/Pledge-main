// 定义URL
const URLSource = {
  info: {
    poolBaseInfo: '/poolBaseInfo',
    poolDataInfo: '/poolDataInfo',
    poolBaseInfo1: ':8081/poolBaseInfo',
  },
};

// 联调环境接口判断
const baseUrl = {
  development: 'https://dev-v2-backend.pledger.finance',
  production: 'https://pro.test.com/api',
  development1: 'http://50.18.79.42',
};

// 代理监听 URL配置
const handler = {
  get(target, key) {
    // get 的trap 拦截get方法
    let value = target[key];
    const nowHost = window.location.hostname;

    try {
      return new Proxy(value, handler); // 使用try catch 巧妙的实现了 深层 属性代理
    } catch (err) {
      if (typeof value === 'string') {
        let base = baseUrl.development;
        if (nowHost.includes('127.0.0.1') || nowHost.includes('localhost')) {
          base = baseUrl['development'];
        }
        return base + value;
      }
    }
  },
  set(target, key) {
    // 阻止外部误操作，导致URL配置文件被修改，设置属性为只读属性
    try {
      return new Proxy(target[key], handler);
    } catch (err) {
      return true;
    }
  },
};

const URL = new Proxy(URLSource, handler);

export default URL;
