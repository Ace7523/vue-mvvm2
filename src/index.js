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

console.log(vm)
setTimeout( () => {
    vm.arr.push(4)
}, 2000)
// console.log(vm.arr.push(4))

// 对数组进行一些额外改造，因为，例如 页面根据数组的长度来渲染li的情况，
// 数组数据是接口返回的，那就需要监控这个数组，比如push方法，也要对这个方法进行劫持



