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
export default class LayerManager extends cc.Component {

    private static _instance: LayerManager;
    public static Instance(): LayerManager {

        if (this._instance == null) {

            this._instance = cc.find("Canvas").getComponent(LayerManager);
        }
        return this._instance;
    }

    @property(cc.Node)
    layer0 : cc.Node= null;

    @property(cc.Node)
    layer01 : cc.Node= null;
    
    @property(cc.Node)
    layer02 : cc.Node= null;
    
    @property(cc.Node)
    layer03 : cc.Node= null;
    
    @property(cc.Node)
    layer04 : cc.Node= null;
    
    @property(cc.Node)
    layer05 : cc.Node= null;

    onLoad() {

        LayerManager.Instance();
    }
}
