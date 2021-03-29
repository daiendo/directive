import {def} from './utils';
import defineReactive from './defineReactive';
import {arrayMethods} from './array'
import observe from './observe';
import Dep from './Dep'
//将Object转换为每个层级的属性都是响应式的
export default class Observer{
    constructor(value){
        this.dep = new Dep();
        //将value的__ob__属性定义为实例（this）
        def(value,'__ob__',this,false);
        if (Array.isArray(value)) {
            Object.setPrototypeOf(value,arrayMethods);
            this.observeArray(value)
        } else {
            this.walk(value); 
        }
    }
    //遍历value属性，变为响应式
    walk(value){
        for(let k in value){
            defineReactive(value,k);
        }
    }
    observeArray(arr){
        for (let i = 0; i < arr.length; i++) {
            observe(arr[i])
        }
    }
}