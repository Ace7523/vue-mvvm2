export function proxyObj(vm,source,key){
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key]
        },
        set(newValue){
            vm[source][key] = newValue
        }
    })
}

const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g
export const util = {
    getValue(vm,expr){
        let keys = expr.split('.');
        return keys.reduce((memo,current)=>{
            memo = memo[current]
            return memo
        },vm);
    },
    compilerText(node,vm){
        if(!node.expr){
            node.expr = node.textContent
        }
        node.textContent = node.expr.replace(defaultRE,function (...args) {
            return JSON.stringify(util.getValue(vm,args[1]))
        });
    }
}
export function compiler(node,vm){
    let childNodes = node.childNodes;
    let childNodesArray = [...childNodes]

    childNodesArray.forEach(child=>{
        if(child.nodeType == 1){
            compiler(child,vm)
        }else if(child.nodeType == 3){
            util.compilerText(child,vm);
        }
    });
}