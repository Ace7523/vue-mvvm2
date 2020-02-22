import { observe } from "./index";

// push shift unshift pop reverse sort splice 会对原数组进行更改，所以要拦截

let oldArrayProtoMethods = Array.prototype;

// 继承原生数组的原型
export let arrayMethods = Object.create(oldArrayProtoMethods);

export function dependArray(value){ 
    for(let i = 0; i < value.length;i++){
        let currentItem = value[i]
        // 数组中的每一项，可能不是引用类型，普通类型的话就没有__ob__ 
        // 所以这里做一层判断
        currentItem.__ob__ && currentItem.__ob__.dep.depend()
        if(Array.isArray(currentItem)){
            dependArray(currentItem)
        }
    }
}

let methods = [ 'push', 'shift', 'pop', 'unshift', 'reverse', 'sort', 'splice' ]

methods.forEach(method=>{
    arrayMethods[method] = function (...args) {
        // call apply bind的用法
        let r = oldArrayProtoMethods[method].apply(this,args);

        // 这里就是要增加的功能部分
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
            default:
                break;
        }
        if(inserted) observerArray(inserted);
        this.__ob__.dep.notify()
        return r;
    }
})

export function observerArray(inserted){
    for(let i = 0 ; i < inserted.length;i++){
        observe(inserted[i])
    }
}