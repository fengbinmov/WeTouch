import InputMonitor, { ButtonStatu } from "../Core/InputMonitor";
import { List, Stack, Queue } from "../Core/General";

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
export default class AimationPlayer extends cc.Component {

    @property(cc.Animation)
    anim :cc.Animation = null;

    @property(cc.Label)
    label :cc.Label = null;


    isDown :boolean = false;

    ss : Queue<string> = new Queue<string>();

    start(){
    }
    update(){

        if(InputMonitor.Instance.GetKeyBeginDown(cc.macro.KEY.a)){

            if(this.node.width > 0)
                this.node.width = -this.node.width;
            this.anim.play("run",0);

            if(this.ss.Count > 10)
                this.ss.Pop();
            this.ss.Push("A 触发");
        }
        if(InputMonitor.Instance.GetKeyBeginDown(cc.macro.KEY.d)){

            if(this.node.width < 0)
                this.node.width = -this.node.width;
            this.anim.play("run",0);

            if(this.ss.Count > 10)
                this.ss.Pop();
            this.ss.Push("D 触发");
        }
        if(InputMonitor.Instance.GetKeyBeginDown(cc.macro.KEY.w)){

            this.anim.play("jump",0);
            
            if(this.ss.Count > 10)
                this.ss.Pop();
            this.ss.Push("W 触发");
        }
        if(InputMonitor.Instance.GetKeyBeginDown(cc.macro.KEY.s)){

            this.anim.play("dying",0);

            
            if(this.ss.Count > 10)
                this.ss.Pop();
            this.ss.Push("S 触发");
        }



        let mess = "";
        for(let i=0;i<this.ss.Count;i++){
            mess += this.ss.Item(i)+"\n";
        }
        this.label.string = mess;

    }
    



}
