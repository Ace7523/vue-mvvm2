let id = 0;
import {pushTarget,popTarget} from './dep'
import {util} from '../utils'
class Watcher{ 
    constructor(vm, exprOrFn, cb=()=>{}, opts={}){
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        if(typeof exprOrFn === 'function'){
            this.getter = exprOrFn
        }else {
            this.getter = function () {
                return util.getValue(vm,exprOrFn)
            }
        }
        this.cb = cb;
        this.opts = opts;
        this.id = id++;
        this.deps = [];
        this.depsId = new Set()
       
        this.get()
    }
    get(){
        pushTarget(this)

        let value = this.getter.call(this.vm)
        
        popTarget()
        return value;
    }
    update() {
        this.get()
    }
    addDep(dep){
        let id = dep.id
        if(!this.depsId.has(id)){
            this.depsId.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
}

export default Watcher;