import InputMonitor from "../Core/InputMonitor";
import LayerManager from "../Core/LayerManager";
import Bullet from "./Bullet";

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
export default class WeaponSystem extends cc.Component {

    @property(cc.Prefab)
    bullet : cc.Prefab = null;

    @property(cc.Float)
    attackRate : number = 1;

    nowTime: number = 0;
    delta : number = 0;

    start(){
            
    }
    update(){

        this.nowTime += this.nowTime + InputMonitor.Instance().DeltaTime();
        if(this.nowTime >= this.attackRate){
            this.nowTime = 0;
            
            this.ShootBullet();
        }
        // console.log(this.nowTime+" "+InputMonitor.Instance().DeltaTime());
    }
    ShootBullet(){

        if(this.bullet != null){

            let temp :cc.Node = cc.instantiate(this.bullet);
            temp.parent = LayerManager.Instance().layer01;
            temp.position  = this.node.parent.position;
            temp.rotation = this.node.parent.rotation;
            let angR = -(this.node.parent.rotation/90) * 1.57;
            let x,y;
            let dir :cc.Vec2 = cc.Vec2.UP 
            x = dir.x * Math.cos(angR) - dir.y * Math.sin(angR);
            y = dir.x * Math.sin(angR)  + dir.y * Math.cos(angR);
            temp.getComponent(Bullet).dir = new cc.Vec2(x*1000,y*1000);

            // console.log("ShootBullet "+this.node.parent.position);
        }
    }
}
