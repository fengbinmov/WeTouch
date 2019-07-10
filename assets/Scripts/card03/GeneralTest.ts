import { List, Dictionary, Queue, Stack, Test } from "../Core/General";
import InputMonitor from "../Core/InputMonitor";
import GreenMonster from "./GreenMonster";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GeneralTest extends cc.Component {

    @property(cc.Prefab)
    monsterPrefab : cc.Prefab;

    @property(cc.Node)
    word : cc.Node;

    @property(cc.Label)
    label: cc.Label = null;

    monsters : Dictionary<number,GreenMonster> = new Dictionary<number,GreenMonster>();
    monsterDis : Queue<number> = new Queue<number>();
    stackNum : Stack<cc.Vec2> = new Stack<cc.Vec2>();

    onLoad(){
        
        let temp : List<Number> = new List();
        let x1 = new cc.Vec2(0,0);
        let x2 = new cc.Vec2(0,1);
        let x3 = new cc.Vec2(0,2);
        let x4 = new cc.Vec2(0,3);

        temp.Add(1);
        temp.Add(2);
        temp.Add(3);
        temp.Add(4);

        // temp.RemoveAt(12);
        temp.RemoveAt(1);
        
    }
    update(){

        this.test01();

    }
    test01(){

        this.label.string = "[child,"+this.monsters.Count+"][die,"+this.monsterDis.Count+"]";

        if(InputMonitor.Instance.GetKeyBeginDown(cc.macro.KEY.a)){

            if(this.monsterDis.Count > 5){

                let obj:GreenMonster = this.monsters.Item(this.monsterDis.Pop());
                obj.Init(this.word,cc.Vec2.ZERO,this);
            }
            else{
                let obj:GreenMonster = cc.instantiate(this.monsterPrefab).getComponent(GreenMonster);
                let id :number = Math.round((Math.random() * 1000));
                obj.Init(this.word,cc.Vec2.ZERO,this,id);
    
                this.monsters.Add(id,obj);
            }
            console.log("11");
        }

        if(InputMonitor.Instance.GetKeyBeginDown(cc.macro.KEY.w)){
            
            let pos :cc.Vec2 = new cc.Vec2(Math.round((Math.random() * 1000)),Math.round((Math.random() * 1000)));
            this.stackNum.Push(pos);
            console.log("Push "+pos.x +" "+pos.y);
        }
        if(InputMonitor.Instance.GetKeyBeginDown(cc.macro.KEY.s)){
            let pos :cc.Vec2 = this.stackNum.Pop();
            console.log("Pop  "+pos.x +" "+pos.y);
            
        }
    }
    public MonsterDie(id : number){

        this.monsterDis.Push(id);
    }
}
