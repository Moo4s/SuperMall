import axios from 'axios'

// 终极
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2.axios的拦截器
  instance.interceptors.request.use(aaa => {
    // console.log(aaa);
    // 通过拦截,可以在此处给config多配置一些信息
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时, 都希望在界面中显示一个请求的图标
    // 3.某些网络请求(比如登录(token)),必须携带一些特殊的信息

    // 拦截后一定要再把config(此处的aaa)返回, 否则最终就拿不到config了,发送真正请求的时候就会失败
    return aaa
  }, err => {
    // console.log(err);
  })

  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    // 只返回data数据
    return res.data
  }, err => {
    console.log(err);
  })


  // 3.发送真正的网络请求
  // instance本身返回值就是一个promise, 就不需要向下面的方法一样return一个promise
  return instance(config)
}
