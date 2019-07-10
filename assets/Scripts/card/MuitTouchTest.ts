import InputMonitor from "../Core/InputMonitor";
import * as General  from "../Core/General";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MuitTouchTest extends cc.Component {

    @property(cc.Label)
    label : cc.Label = null;

    @property(cc.Prefab)
    fingerPrefab : cc.Prefab = null;

    finger : General.Dictionary<number,cc.Node>;
    list : string[];

    index : number =0;


    onLoad(){
        this.list = [];
        for(let i=0;i<this.list.length;i++){
            this.list.push("");
        }
        this.finger = new General.Dictionary<number,cc.Node>();
    }

    update(){
        
        let ss =  "";
        let nav = "";
        if(InputMonitor.Instance.Touchs() != null){

            nav += InputMonitor.Instance.Touchs().length + "\n";
            let step = 0;
            
            for(let i=0;i<InputMonitor.Instance.Touchs().length;i++){

                for(let j=i + step;j<InputMonitor.Instance.Touchs()[i].getID();j++){
                    nav += "I ";
                    ss += "\n";
                    step++;
                }
                let id = InputMonitor.Instance.Touchs()[i].getID();
                ss += id+" "+InputMonitor.Instance.TouchStatu()[id]+ " "+InputMonitor.Instance.Touchs()[i].getLocation() + "\n";
                nav += id+" ";
                
                
                if(!this.finger.ContainKey(id)){
                    
                    let obj:cc.Node = cc.instantiate(this.fingerPrefab);
                    obj.parent = cc.director.getScene();
                    obj.position = InputMonitor.Instance.Touchs()[i].getLocation();
                    obj.getComponentInChildren(cc.Label).string = id.toString();
                    this.finger.Add(id,obj);
                }
                else{
                    this.finger.Item(id).position = InputMonitor.Instance.Touchs()[i].getLocation();
                }
            }
        }
        
        let del : General.List<number> = new General.List<number>();

        for(let j=0;j<this.finger.Count;j++){

            let id : number = this.finger.ItemKeyofIndex(j);
            if(!InputMonitor.Instance.ContainID(id)){
                del.Add(id);
            }
        }
        for(let j =0;j<del.Count;j++){

            this.finger.Item(del.Item(j)).destroy();
            this.finger.Remove(del.Item(j));
        }

        this.label.string = nav + "\n"  +ss;
        console.log(ss);
    }
}