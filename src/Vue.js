import observe from './defineReactive/observe'
import Watcher from './defineReactive/Watcher'
import Compiler from './Compiler'
export default class Vue{
    constructor(options){
        this.$options = options || {};
        this._data = options.data || {};
        observe(this._data) //数据响应式
        this._initData();//将data挂载带vue上
        this._initWatch();//监听
        new Compiler(options.el,this) //将dom ->DocumentFragment,分析指令

    }

    _initData(){
        let self = this;
        Object.keys(this._data).forEach(key=>{
            Object.defineProperty(self,key,{
                get(){
                    return self._data[key]
                },
                set(val){
                    self._data[key] = val;
                }
            })
        })
    }
    _initWatch(){
        let self = this;
        let watch = this.$options.watch;
        Object.keys(watch).forEach(key=>{
            // console.log(key)
            new Watcher(self,key,watch[key])
        })

    }
}