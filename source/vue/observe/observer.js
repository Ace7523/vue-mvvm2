import { observe } from './index'
import { arrayMethods, observerArray } from './array'
import Dep from './dep'

export function defineReactive(data,key,value){
    
    // 针对value仍是对象的情况， 就需要对对象再次进行观察，也就是递归操作
    observe(value)
    let dep = new Dep()
    Object.defineProperty(data,key,{
        get(){
            console.log('获取数据')
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return value;
        },
        set(newValue){
            console.log('赋值数据')
            if(newValue === value) return
            observe(newValue)
            value = newValue
            dep.notify()
        }
    })
}
class Observer { 
    constructor(data){
        if(Array.isArray(data)){

            data.__proto__ = arrayMethods
           
            observerArray(data)
            
        }else {
            this.walk(data)
        }
    }
    walk(data){
        let keys = Object.keys(data);
        for(let i = 0 ; i < keys.length;i++){
            let key = keys[i];
            let value = data[keys[i]];
            defineReactive(data,key,value);
        }
    }
}
export default Observer


