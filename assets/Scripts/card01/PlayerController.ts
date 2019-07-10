import InputMonitor, { ButtonStatu } from "../Core/InputMonitor";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {


    @property(cc.Node)
    camera : cc.Node= null;

    nowDir : cc.Vec2;
    speed : number =3;

    ss : cc.Vec2;
    onLoad() {

        cc.director.getCollisionManager().enabled = true;
        this.ss = this.node.position;
    }

    update() {

        let target = InputMonitor.Instance.MouseToWorldPosition();

        if(InputMonitor.Instance.MouseBtnLeft() == ButtonStatu.Down || InputMonitor.Instance.MouseBtnLeft() == ButtonStatu.Move){
            if (this.dis(this.node.position,target) > 150) {

                this.nowDir = target.sub(this.node.position).normalize().mul(this.speed);

                this.node.position = this.node.position.add( this.nowDir);
                this.camera.position = this.camera.position.add( this.nowDir);
            }
            else{

                let ang = cc.Vec2.UP.angle(target.sub(this.node.position).normalize()) * 57.3248;
                if (target.x < this.node.position.x) {
                    ang = (180 - ang) + 180;
                }
                this.node.rotation = ang;
            }
        }
        if(InputMonitor.Instance.MouseBtnLeft() == ButtonStatu.Up){
            this.nowDir = cc.Vec2.ZERO;
        }

        InputMonitor.Instance.lable.string = 
        "ScreenPosition: "+InputMonitor.Instance.MousePosition() +"\n"+
        "worldPosition: "+target +"\n"+
        "selfPosition: "+this.node.position+"\n"+
        "worldCamera: "+this.camera.position+"\n"+
        "dis: "+this.dis(target,this.node.position)+"\n"+
        "dir: "+this.nowDir+"\n"+
        "MouseBtnLeft: "+InputMonitor.Instance.MouseBtnLeft()+"\n"+
        "delta: "+InputMonitor.Instance.DeltaTime()+"\n"+
        "InputOver: "+InputMonitor.Instance.IsInputOverObjectinWorld;
    }

    dis(a : cc.Vec2,b :cc.Vec2):number{
        let x = a.x -b.x;
        let y = a.y - b.y;
        let dis : number = Math.sqrt(x * x + y * y);
        return Number.parseFloat(dis.toFixed(3));
    }


    onCollisionEnter(other: cc.Collider, self: cc.Collider) {

        if (other.tag == 3) {
            console.log("player die");
        }
    }

    // onCollisionStay( other,self){
    //     console.log("onCollisionStay");
    // }

    // onCollisionExit( other,self){
    //     console.log("onCollisionExit");
    // }

}
