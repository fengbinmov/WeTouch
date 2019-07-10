import GeneralTest from "./GeneralTest";

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
export default class GreenMonster extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    action : cc.ActionInterval;
    generaler : GeneralTest;
    public id : number = -1;

    public Init(parent :cc.Node,pos : cc.Vec2,general : GeneralTest, id : number = -1){

        this.node.setParent(parent);
        this.node.setPosition(pos);
        this.generaler = general;
        if(id != -1){
            this.id = id;
            this.label.string = id.toString();
        }
        this.node.active = true;
    }
    onEnable(){
        this.action = cc.sequence(
            cc.moveTo(5,new cc.Vec2(600,0)),
            cc.callFunc(()=>{
                this.node.stopAllActions();
                this.generaler.MonsterDie(this.id);
                this.node.active = false;
            })
        );
        this.node.runAction(this.action);
    }
}
