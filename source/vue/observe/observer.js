import { observe } from './index'

export function defineReactive(data,key,value){
    
    // 针对value仍是对象的情况， 就需要对对象再次进行观察，也就是递归操作
    observe(value)

    Object.defineProperty(data,key,{
        get(){
            return value;
        },
        set(newValue){
            if(newValue === value) return;
            value = newValue;
        }
    })
}
class Observer { 
    constructor(data){
        this.walk(data);
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


