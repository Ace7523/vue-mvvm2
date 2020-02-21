import Observer from './observer';
import { proxyObj } from '../utils'

// 这种导出方式，没有写default ，import时候需要 { initState } 这种方式来导入
export function initState(vm){ 
    //做不同的初始化工作 
    let opts = vm.$options;
    if(opts.data){
        initData(vm); // 初始化数据
    }
    if(opts.computed){
        initComputed(vm,opts.computed); // 初始化计算属性
    }
    if(opts.watch){ 
        initWatch(vm); // 初始化watch
    }
}
export function observe(data){
    // 边界校验
    if(typeof data !== 'object' || data == null) {
        return 
    }
    if(data.__ob__){
        return data.__ob__
    }
    return new Observer(data)
}

function initData(vm){ // 将用户插入的数据 通过object.defineProperty重新定义
    let data = vm.$options.data; // 用户传入的data

    // 把用户传的数据，给vm.__data , 防止影响最开始传的数据
    data = vm._data = typeof data === 'function'?data.call(vm) :data || {}

    // 做一层代理 方便读 写 数据
    for(let key in data){
         proxyObj(vm,'_data',key); //会将对vm上的取值操作和赋值操作代理给vm._data 属性
    }

    observe(data); // 观察数据
}