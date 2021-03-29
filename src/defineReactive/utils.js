//工具函数，定义对象属性是否可枚举
export const def = function(obj,key,value,enumerable){
    Object.defineProperty(obj,key,{
        value,
        enumerable,
        writable:true,
        configurable:true
    })
}