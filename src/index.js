import MyVue from 'vue'

let vm = new MyVue({
    el:document.getElementById('app'), 
    data(){
        return {
            name: 'Ace7523',
            age: {'age' : '18'},
            testObj: {'obj' : {'c': 'c'} },
            arr: [{a: '1'},2,3]
        }
    }
})

console.log('vm', vm)
setTimeout( () => {
    vm.arr.push(4)
    vm.arr[2] = 100 // 这样改不行 这个后面再看为什么吧
}, 2000)

// ***********vue 批量更新******************
// 
// 如果不加以修改，这样的重复赋值，会不断的触发set中的notify
// 导致重复渲染

// 首先，不同的属性，都有自己的dep，dep中存放了watcher，
// 也许是同一个，也许是不同的，每个watcher上有id
// 然后 对这些属性进行赋值操作时候， 会触发set拦截器， 那就会把属性对应的dep中的watcher的update方法执行
// 同一属性的话，watcher是同一个，也就是会多次触发watcher中的update方法，update中存放的是渲染方法的话，就会多次渲染

// 所以要批量更新 即 异步更新，每次的重新赋值 肯定是同步执行，等所有的赋值同步代码执行完后，
// 然后让watcher执行update，这里也是去重之后的watcher

// ***********数组更新************************
//  问 数组怎么收集依赖？
// 看这个构造函数  data.arr 是数组的话，就没有走进walk方法中，所以就没有对arr 进行 defineReactive
// constructor(data){
//     if(Array.isArray(data)){

//         data.__proto__ = arrayMethods
       
//         observerArray(data)
        
//     }else {
//         this.walk(data)
//     }
// }

// 数组就目前来讲是没有dep的 ， 所以要想办法加上dep
