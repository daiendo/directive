import observe from './observe'
import Dep from './Dep'
//利用闭包实现响应式,defineReactive提供闭包环境，当调用Object.defineProperty()时，会借助JavaScript的访问链，形成闭包。
export default function defineReactive(data,key,val){
    const dep = new Dep();
    if (arguments.length ==2) {
        val = data[key];
    }
    let childObj = observe(val);
    Object.defineProperty(data,key,{
        enumerable:true,//可枚举
        configurable:true,//可配置
        get(){
            if (Dep.target) {
                dep.depend();
                if (childObj) {
                    childObj.dep.depend();
                }
            }
            return val;
        },
        set(newValue){
            if(val===newValue){
                return;
            }
            val = newValue;
            childObj = observe(newValue);
            dep.notify();
        }
    })
}