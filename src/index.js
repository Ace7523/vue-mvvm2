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
    vm.name = 'newname'
}, 2000)



