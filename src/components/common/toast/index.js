import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  // console.log('!!!!!', vue);

  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2.new的方式,根据组件构造器,可以创建出一个组件对象
  const toast = new toastConstructor
  // 3.将组件对象,手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是div,把toast.$el添加到body上去
  document.body.appendChild(toast.$el)

  // 在vue原型上加上一个$toast
  Vue.prototype.$toast = toast
}

export default obj