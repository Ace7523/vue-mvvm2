let id = 0
import {pushTarget,popTarget} from './dep'
import {util} from '../utils'
import {nextTick} from './nextTick'
class Watcher{ 
    constructor(vm, exprOrFn, cb=()=>{}, opts={}){
        this.vm = vm
        this.exprOrFn = exprOrFn
        if(typeof exprOrFn === 'function'){
            this.getter = exprOrFn
        }else {
            this.getter = function () {
                return util.getValue(vm,exprOrFn)
            }
        }
        if(opts.user){
            this.user = true
        }
        this.cb = cb
        this.opts = opts
        this.id = id++
        this.deps = []
        this.depsId = new Set()
        // watch 中需要（newVal， oldVal）所以在创建的时候就把老值保存起来  
        this.value = this.get()
    }
    get(){
        pushTarget(this)

        let value = this.getter.call(this.vm)
        
        popTarget()
        return value
    }
    update() {
        queueWatcher(this)
    }
    addDep(dep){
        let id = dep.id
        if(!this.depsId.has(id)){
            this.depsId.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
    run(){
        let value = this.get()
        if(this.value !== value) {
            this.cb(value, this.value)
        }
    }
}
let has = {}
let queue = []
function flushQueue(){
    queue.forEach(watcher=>watcher.run())
    has = {}
    queue = []
}
function queueWatcher(watcher){
    let id = watcher.id
    if(has[id] == null){
        has[id] = true
        queue.push(watcher)
        nextTick(flushQueue)
    }
}
export default Watcher