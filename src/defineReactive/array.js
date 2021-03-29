import {def} from './utils'
const arrayPrototype = Array.prototype
//Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
export const arrayMethods = Object.create(arrayPrototype);

//改写数组原型对象方法
const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];
methodsNeedChange.forEach(methodName=>{
    const original = arrayPrototype[methodName];
    def(arrayMethods,methodName,function(){
        const result = original.apply(this,arguments)
        const args = [...arguments];
        const ob = this.__ob__;
        let inserted = [];
        switch (methodName) {
            case 'push':
            case 'unshift': 
                inserted = args;  
                break;
            case 'splice' :
                inserted = args.slice(2)
                break;
            default:
                break;
        }
        if(inserted){
            ob.observeArray(inserted)
        }
        ob.dep.notify();
         return result;
    },false)
})