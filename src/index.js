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



