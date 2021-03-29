let uid = 0;
export default class Dep{
    constructor(){
        this.id= uid++;
        //发布订阅模式，存储订阅者
        this.subs = [];
    }
    //添加订阅
    addSub(sub){
        this.subs.push(sub);
    }
    //添加依赖
    depend(){
        if(Dep.target){
            this.addSub(Dep.target);
        }
    }
    //通知更新
    notify(){
        const subs = this.subs.slice();
        for (let i = 0; i < subs.length; i++) {
            subs[i].update();
        }
    }
}