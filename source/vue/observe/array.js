import { observe } from "./index";

// push shift unshift pop reverse sort splice 会对原数组进行更改，所以要拦截

let oldArrayProtoMethods = Array.prototype;

// 继承原生数组的原型
export let arrayMethods = Object.create(oldArrayProtoMethods);

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