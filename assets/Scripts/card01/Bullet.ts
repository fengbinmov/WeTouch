import InputMonitor from "../Core/InputMonitor";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    public dir :cc.Vec2  =new cc.Vec2(0,1000);

    onEnable(){
        this.node.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.callFunc(
                    ()=>{
                        this.node.destroy();
                    }
                )
            )
        )
    }
    update(){

        this.node.position = new cc.Vec2(this.node.position.x + this.dir.x * InputMonitor.Instance().DeltaTime(),this.node.position.y + this.dir.y * InputMonitor.Instance().DeltaTime());
    }
}
