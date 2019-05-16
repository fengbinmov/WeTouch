import { List } from "../Core/General";

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

class human {
    public name : string;

    constructor(va:string){
        this.name  = va;
    }
}
@ccclass
export default class NewClass extends cc.Component {

    start () {
        
        let list : List<human> = new List<human>();

        list.Add(new human("aaa"));
        list.Add(new human("bbb"));
        list.Add(new human("ccc"));
        list.Add(new human("ddd"));

        console.log(list);
        for (let i = 0; i < list.Count; i++) {
            
            console.log(list.Item(i));
        }
        let temp : human = list.Item(1);
        temp.name = "BBB";
        list.SetItem(1,temp);

        console.log(list);
        for (let i = 0; i < list.Count; i++) {
            
            console.log(list.Item(i));
        }
    }
}
