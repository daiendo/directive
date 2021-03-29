import Watcher from './defineReactive/Watcher'
export default class Compiler {//编译真实dom，
    constructor(el, vue) {
        this.$vue = vue;
        this.$el = document.querySelector(el);
        // console.log(this.$el)
        if (this.$el) {
            let $fragment = this.node2Fragment(this.$el)
            this.compile($fragment) //解析DocumentFragment

            this.$el.appendChild($fragment) //上树
        }
    }
    /**
     * //将真实dom变为DocumentFragment
     * @param  ele //真实dom 
     * @returns fragment //DocumentFragment
     */
    node2Fragment(ele) {
        let fragment = document.createDocumentFragment()
        // console.log(fragment)
        while (ele.firstChild) {
            fragment.appendChild(ele.firstChild)
        }
        return fragment;
    }
    /**
     * //递归node节点
     * @param fragment //DocumentFragment
     */
    compile(fragment){
        let self = this
        let reg = /\{\{(.*)\}\}/;
        // console.log(fragment.childNodes)
        let childNodes = fragment.childNodes
        childNodes.forEach(node=>{
            let text = node.textContent;
            if(node.nodeType == 1){
                self.compileElement(node)
            }else if(node.nodeType == 3 && reg.test(text)){
                let name = text.match(reg)[1]
                // console.log(name)
                this.compileText(node,name);
            }
        })
    }
    /**
     * //分析元素绑定的指令
     * @param {*} node //node.nodeType == 1 代表元素
     */
    compileElement(node){
        // console.log(node.attributes)
        let self = this
        let attributes = node.attributes
        Array.prototype.slice.call(attributes).forEach(attr=>{
            let attrName = attr.name;
            let value = attr.value;
            let direct = attrName.substring(2)
            // console.log(attrName,value)
            if(attrName.indexOf('v-') != -1){
                if(direct == 'model'){
                    console.log("model")
                    new Watcher(self.$vue,value,value=>{
                        node.value = value
                    })
                    var val = self.getVueVal(self.$vue,value)
                    node.value = val;
                    node.addEventListener('input',e=>{
                        let inptValue = e.target.value;
                        // console.log(inptValue)
                        self.setVueVal(self.$vue,value,inptValue);

                    })
                }else if(direct == 'if'){

                }
            }
        })

    }
    compileText(node,name){
        // console.log(node,name);
        node.textContent = this.getVueVal(this.$vue,name);
        new Watcher(this.$vue,name,value=>{
            node.textContent = value
        })
    }
    /**
     * 
     * @param {*} vue //vue
     * @param {*} exp //a.b.c
     * @returns val //a.b.c的值
     */
    getVueVal(vue,exp){
        var val = vue;
        exp = exp.split('.');
        exp.forEach(k=>{
            val = val[k]
        })
        // console.log(val)
        return val;
    }

    setVueVal(vue,exp,newVale){
        var val = vue;
        exp = exp.split('.');
        exp.forEach((k,i)=>{
            if(i<exp.length - 1){
                console.log(1)
                val = val[k]
            }else{
                 val[k]= newVale
                //  console.log(vue.inpValue)
            }
        })
    }
}