import MyVue from 'vue'

let vm = new MyVue({
    el:document.getElementById('app'), 
    data(){
        return {
            name: 'Ace7523',
            age: {'age' : '18'},
            testObj: {'obj' : {'c': 'c'} },
            arr: [1,2,3]
        }
    }
})

setTimeout( () => {
    vm.name = 'newname1'
    vm.name = 'newname2'
    vm.name = 'newname3'
    vm.name = 'newname4'
    vm.name = 'newname5'
    vm.age.age = 99
}, 5000)


// 如果不加以修改，这样的重复赋值，会不断的触发set中的notify
// 导致重复渲染

// 首先，不同的属性，都有自己的dep，dep中存放了watcher，
// 也许是同一个，也许是不同的，每个watcher上有id
// 然后 对这些属性进行赋值操作时候， 会触发set拦截器， 那就会把属性对应的dep中的watcher的update方法执行
// 同一属性的话，watcher是同一个，也就是会多次触发watcher中的update方法，update中存放的是渲染方法的话，就会多次渲染

// 所以要批量更新 即 异步更新，每次的重新赋值 肯定是同步执行，等所有的赋值同步代码执行完后，
// 然后让watcher执行update，这里也是去重之后的watcher