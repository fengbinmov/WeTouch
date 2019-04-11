// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    
    onCollisionEnter(other :cc.Collider,self:cc.Collider){

        if(other.tag == 0){
            this.node.color = cc.Color.RED;
            this.node.runAction(cc.sequence(
                cc.delayTime(1),
                cc.callFunc(()=>{
                    this.node.color = cc.Color.WHITE;
                })
            ));
            // console.log("enemy die");
        }
    }
}
