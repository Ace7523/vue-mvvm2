import { initState } from './observe'
import { compiler } from './utils'
import Watcher from './observe/watcher';

function Vue (options) {
    this._init(options)
}
// 因为子组件可能也用得到这个init方法  所以挂在原型上
Vue.prototype._init = function (options) {
    // vue中初始化  this.$options 表示的是vue中参数

    // this 当前实例 先保存起来
    let vm = this
    vm.$options = options

    // MVVM原理 需要数据重新初始化
    // 拦截数组的方法 和 对象的属性
    initState(vm)

    if(vm.$options.el){
        vm.$mount()
    }
}
Vue.prototype.$mount = function () {
    let vm = this
    let el = vm.$options.el 
    el = vm.$el= query(el)


    let updateComponent = ()=>{ 
        vm._update()
    }
    
    new Watcher(vm, updateComponent)
}
Vue.prototype._update = function () {
    console.log('重新渲染操作')
    let vm = this
    let el = vm.$el

    let node = document.createDocumentFragment()
    let firstChild
    while(firstChild = el.firstChild){ 
        node.appendChild(firstChild)
    }

    compiler(node,vm)
    el.appendChild(node)
}
function query(el){
    if(typeof el === 'string'){
        return document.querySelector(el)
    }
    return el
}


// 一个文件中 export default 只有一个  export可以有多个。
// export default 导出的时候，引用方式不加 {}
export default Vue