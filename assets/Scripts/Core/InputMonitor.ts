import { Dictionary, List } from "./General";

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
const BtnStatu = cc.Enum({ Up: 0 , Down: 1, Dis:2,Move:3})

/** 
 * 本脚本必须挂载到Canvas上才能生效,本脚本不可实例化并且为单例模式
*/
@ccclass
export default class InputMonitor extends cc.Component {

    private static _instance: InputMonitor;
    public static get Instance(): InputMonitor {

        if (this._instance == null) {

            // this._instance = cc.find("Canvas").addComponent(InputMonitor);
            this._instance = cc.find("Canvas").getComponent(InputMonitor);
        }
        return this._instance;
    }
    
    @property(cc.Label)
    lable : cc.Label= null;

    @property(cc.Node)
    worldCamera : cc.Node= null;

    worldCameraScript : cc.Camera;

    private mouseLeft = BtnStatu.Up;         //鼠标左键
    private mouseRight = BtnStatu.Up;        //鼠标右键
    private mouseMiddle = BtnStatu.Up;       //鼠标中键
    private mouseLocalPosition = cc.Vec2.ZERO;            //鼠标位置
    private mousePosition = cc.Vec2.ZERO;            //鼠标位置
    private mouseWorldPosition = cc.Vec2.ZERO;       //仅限内部使用的鼠标的世界位置

    private mouseMiddleNum: number = 0;        //滚轮滚动的 Y 轴距离
    private mouseDelta: cc.Vec2;               //获取鼠标距离上一次事件移动的距离


    private touchs : cc.Touch[];
    private touchStatu : ButtonStatu[];

    private keyBoards : Dictionary<cc.macro.KEY,ButtonStatu>;
    
    private uiPanelNodes : cc.Node[] = null;
    private uiPanels : List<cc.Vec2[]> = null; //所有的Canvas下的bound Size 

    public MouseBtnLeft() { return this.mouseLeft; }
    public MouseBtnRight() { return this.mouseRight; }
    public MouseBtnMiddle() { return this.mouseMiddle; }
    public MousePosition() :cc.Vec2{ 
        return this.mousePosition;
    }
    public MouseToWorldPosition() :cc.Vec2{ 
        return this.GetMouseWorldPosition(); 
    }
    public MouseMiddleNum() { return this.mouseMiddleNum; }
    public MouseDelta() { return this.mouseDelta; }

    public Touchs():cc.Touch[]{return this.touchs;}
    public TouchStatu():ButtonStatu[]{return this.touchStatu;}
    public ContainID(id:number):boolean{
        let hav = false;
        if(this.Touchs() != null)
        for(let i=0;i<this.Touchs().length;i++){
            if(this.Touchs()[i].getID() == id){
                hav = true;
                break;
            }
        }
        return hav;
    }

    
    public GetKeyBeginDown(key :cc.macro.KEY){

        if(this.keyBoards.ContainKey(key) && this.keyBoards.Item(key) == ButtonStatu.BeginDown){
            
            this.keyBoards.SetItem(key,ButtonStatu.Down);
            return true;
        }
        else{
            return false;
        }
    }
    public GetKeyDown(key :cc.macro.KEY){

        if(this.keyBoards.ContainKey(key)){
            return this.keyBoards.Item(key) == ButtonStatu.Down;
        }
        else{

            this.keyBoards.Add(key,ButtonStatu.Up);
            return false;
        }
    }

    public GetKeyUp(key :cc.macro.KEY){

        if(this.keyBoards.ContainKey(key)){

            return this.keyBoards.Item(key) == ButtonStatu.Up;
        }
        else{
            return true;
        }
    }

    public GetAnyKeyDown():boolean{
        
        return this.keyBoards.ContainValue(ButtonStatu.Down) || this.mouseLeft == ButtonStatu.Down|| this.mouseRight == ButtonStatu.Down|| this.mouseMiddle == ButtonStatu.Down || (this.touchs && this.touchs.length > 0);
    }

    public get IsInputOverObjectinWorld(){

        let isInputOverObjectinWorld: boolean = true;
        
        //单位化
        let posNor :cc.Vec2 = cc.Vec2.ZERO;
        posNor.x = this.mousePosition.x;
        posNor.y = this.mousePosition.y;

        for (let i = 0; i < this.uiPanels.Count; i++) {
            
            let bound : cc.Vec2[] = this.uiPanels.Item(i);
            if(posNor.x > bound[0].x && posNor.y > bound[0].y &&　posNor.x < bound[1].x && posNor.y < bound[1].y){
                isInputOverObjectinWorld = false;
                break;
            }
        }
        // console.log(isInputOverObjectinWorld +" "+posNor);
        return isInputOverObjectinWorld;

    }
    //计算每帧的时间间隔
    private preTime :number=0;
    private lastTime : number=0;
    private deltaTime :number=0;

    //
    private visibleSize : cc.Vec2;      //显示器的实际尺寸/2
    public DeltaTime():number{return this.deltaTime;}
    private isInit : boolean = false;
    makeDeltaStart(){

        this.preTime = (new Date).getMilliseconds();
    }
    makeDelta(){

        let temp : number = this.preTime - this.lastTime;
        temp = temp / 1000;
        if(temp < 0){
            temp = 1 + temp;
        }
        this.deltaTime = Number.parseFloat(temp.toFixed(4));
        this.lastTime = this.preTime;
    }
    onLoad() {

        InputMonitor.Instance;

        this.ReginScreenSize();

        this.touchStatu = [0,0,0,0,0,0,0,0,0,0];
        this.keyBoards = new Dictionary<cc.macro.KEY,ButtonStatu>();

        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.mouseBtnDownMonitor,this);
        this.node.on(cc.Node.EventType.MOUSE_UP, this.mouseBtnUpMonitor,this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.mousePositionMonitor,this);
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, this.mouseMiddleNumMonitor,this);

        
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchBtnDownMonitor,this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchBtnUpMonitor,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchBtnDisMonitor,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveMonitor,this);
        
        cc.director.on(cc.Director.EVENT_AFTER_DRAW,this.makeDelta,this);
        cc.director.on(cc.Director.EVENT_BEFORE_UPDATE,this.makeDeltaStart,this);

        cc.view.setResizeCallback(this.initScreenInfo());

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.keyBroadDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.keyBroadUp,this);

        this.worldCameraScript = this.worldCamera.getComponent<cc.Camera>(cc.Camera);
    }

    //初始化屏幕参数    --启动时调用或者屏幕大小改变时调用
    initScreenInfo(){

        if(!InputMonitor.Instance.isInit){
            InputMonitor.Instance.isInit = true;
            console.log("-----initScreenInfo-----");
        }
        else{
            console.log("=====initScreenInfo=====");
            cc.director.runSceneImmediate(cc.director.getScene());
        }
        // cc.director.runSceneImmediate(cc.director.getScene());
        //cc.director.loadScene("card01");
        // cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        // InputMonitor.Instance.ReginScreenSize();

    }
    
    ReginScreenSize(){
        console.log("-------ReginScreenSize---------");
        InputMonitor.Instance.visibleSize = new cc.Vec2(cc.view.getVisibleSize().width/2 ,cc.view.getVisibleSize().height/2); 
        let bi:number = cc.view.getDesignResolutionSize().width / cc.view.getCanvasSize().width * cc.view.getScaleX();
        console.log("visibleSize : "+ InputMonitor.Instance.visibleSize);
        console.log("CanvasSize : "+ cc.view.getCanvasSize());
        console.log("ResolutionSize : "+cc.view.getDesignResolutionSize());
        console.log("FrameSize : "+cc.view.getFrameSize());
        console.log("VisibleSizeInPixel : "+cc.view.getVisibleSizeInPixel());
        console.log("ScaleX : "+ cc.view.getScaleX()+"ScaleY : "+ cc.view.getScaleY());
        console.log("bi : "+ bi);

        if(InputMonitor.Instance.uiPanels == null){
            InputMonitor.Instance.uiPanelNodes = InputMonitor.Instance.node.children;
            InputMonitor.Instance.uiPanels = new List<cc.Vec2[]>();
        }

        for (let i = 0; i < InputMonitor.Instance.uiPanelNodes.length; i++) {

            let widget : cc.Widget = null;
            widget = InputMonitor.Instance.uiPanelNodes[i].getComponent(cc.Widget);

            if(widget == null || widget.isAlignLeft){

                let leftDownPoint : cc.Vec2 = cc.Vec2.ZERO;
                let size : cc.Vec2 = new cc.Vec2(InputMonitor.Instance.uiPanelNodes[i].width,InputMonitor.Instance.uiPanelNodes[i].height);
                if(size.x == 0 || size.y ==0) continue;
     
                if(InputMonitor.Instance.uiPanelNodes[i].active == false) continue;
                
                leftDownPoint = InputMonitor.Instance.uiPanelNodes[i].position;
                
                leftDownPoint.x += cc.view.getDesignResolutionSize().width/2 - InputMonitor.Instance.uiPanelNodes[i].anchorX * size.x;
                leftDownPoint.y += InputMonitor.Instance.visibleSize.y - InputMonitor.Instance.uiPanelNodes[i].anchorY * size.y;
                
                size.x *= bi;
                
                let bound : cc.Vec2[] = [];
                bound[0] = leftDownPoint;
                bound[1] = leftDownPoint.add(size);
                console.log("L"+InputMonitor.Instance.uiPanelNodes[i].position +" "+bound[0] +" "+bound[1]);
    
                InputMonitor.Instance.uiPanels.Add(bound);
            }
            else{
                let leftDownPoint : cc.Vec2 = cc.Vec2.ZERO;
                let size : cc.Vec2 = new cc.Vec2(InputMonitor.Instance.uiPanelNodes[i].width,InputMonitor.Instance.uiPanelNodes[i].height);
                if(size.x == 0 || size.y ==0) continue;
     
                
                if(InputMonitor.Instance.uiPanelNodes[i].active == false) continue;
                
                leftDownPoint = InputMonitor.Instance.uiPanelNodes[i].position;
                
                leftDownPoint.x += cc.view.getDesignResolutionSize().width/2 + (1-InputMonitor.Instance.uiPanelNodes[i].anchorX) * size.x;
                leftDownPoint.y += InputMonitor.Instance.visibleSize.y + (1 - InputMonitor.Instance.uiPanelNodes[i].anchorY) * size.y;
                
                size.x *= bi;

                let bound : cc.Vec2[] = [];
                bound[0] = leftDownPoint.sub(size);
                bound[1] = leftDownPoint;
                console.log("R"+InputMonitor.Instance.uiPanelNodes[i].position +" "+bound[0] +" "+bound[1]);

                InputMonitor.Instance.uiPanels.Add(bound);
            }
        }
        // console.log(InputMonitor.Instance.uiPanels);
    }

    private touchFingetMonitor(event :cc.Event.EventTouch){
        
        if(this.touchs){

            let temp : cc.Touch[] = [];
            let havThis :Boolean= false;
            let havThisID :number= -1;

            for(let i=0;i<this.touchs.length;i++){
                temp[i] = this.touchs[i];

                if(!havThis && temp[i] == event.touch){
                    havThis = true;
                }
                else if(havThisID == -1 && ((temp[i] == null && event.touch.getID() == i) ||temp[i].getID() == event.touch.getID())){
                    havThisID = i;
                }
            }
            if(!havThis){
                if(havThisID != -1){
                    temp[havThisID] = event.touch;
                }
                else{

                    if(event.touch.getID() < this.touchs.length){

                        for(let i=this.touchs.length;i>event.touch.getID();i--){
                            temp[i] = temp[i-1];
                        }
                        temp[event.touch.getID()] = event.touch;
                    }
                    else{
                        temp[this.touchs.length] = event.touch;
                    }
                }
            }
            
            this.touchs = temp;
        }
        else{
            this.touchs = [event.touch];
        }
    }
    private touchFingetOutMonitor(event :cc.Event.EventTouch){

        let touchID = event.touch.getID();

        if(this.touchs.length == 1){
            
            this.touchs = [];
        }
        else{

            let temp : cc.Touch[] = [];
            let thisindex :number= -1;
            for(let i=0;i<this.touchs.length;i++){
                if(this.touchs[i].getID() == event.touch.getID()){
                    thisindex = i;
                    break;
                }
            }
            let i=0;
            for(i ;i<thisindex;i++){
                temp[i] = this.touchs[i];
            }
            for(i ;i<this.touchs.length-1 ;i++){
                temp[i] = this.touchs[i+1];
            }
            this.touchs = temp;
        }
    }

    GetMouseWorldPosition():cc.Vec2{

        if(this.worldCamera != null){
            
            this.mouseWorldPosition.x = (this.worldCamera.position.x - this.visibleSize.x + this.mouseLocalPosition.x)/this.worldCameraScript.zoomRatio;

            this.mouseWorldPosition.y = (this.worldCamera.position.y - this.visibleSize.y + this.mouseLocalPosition.y)/this.worldCameraScript.zoomRatio;

            // this.mouseWorldPosition.x = this.worldCamera.position.x + this.mousePosition.x;
            // this.mouseWorldPosition.y = this.worldCamera.position.y + this.mousePosition.y;
            return this.mouseWorldPosition;

        }else{
            return this.mousePosition;
        }
        // console.log(this.mousePosition);
        
    }
    private touchBtnDownMonitor(event :cc.Event.EventTouch){
        
        this.touchFingetMonitor(event);
        this.touchStatu[event.touch.getID()] = BtnStatu.Down;

        this.mouseLeft = BtnStatu.Down;
        
        this.mouseLocalPosition = event.getLocation();
        this.mousePosition = event.getLocation();
        this.mousePosition.x = (this.mousePosition.x * cc.view.getScaleX()/cc.view.getCanvasSize().width) * cc.view.getDesignResolutionSize().width;

        this.mouseDelta = cc.Vec2.ZERO;
    }
    private touchMoveMonitor(event :cc.Event.EventTouch){

        this.touchFingetMonitor(event);
        this.touchStatu[event.touch.getID()] = BtnStatu.Move;
        this.mouseLeft = BtnStatu.Move;
        this.mouseDelta = event.getDelta();
        
        this.mouseLocalPosition = event.getLocation();
        this.mousePosition = event.getLocation();
        this.mousePosition.x = (this.mousePosition.x * cc.view.getScaleX()/cc.view.getCanvasSize().width) * cc.view.getDesignResolutionSize().width;
        
    }
    private touchBtnUpMonitor(event :cc.Event.EventTouch){

        this.touchStatu[event.touch.getID()] = BtnStatu.Up;
        this.touchFingetOutMonitor(event);
        this.mouseLeft = BtnStatu.Up;
        this.mouseDelta = cc.Vec2.ZERO;
    }
    
    private touchBtnDisMonitor(event :cc.Event.EventTouch){

        this.touchStatu[event.touch.getID()] = BtnStatu.Dis;
        this.touchFingetOutMonitor(event);
        this.mouseLeft = BtnStatu.Up;
        this.mouseDelta = cc.Vec2.ZERO;
    }

    private mouseBtnDownMonitor(event: cc.Event.EventMouse) {

        this.mouseLocalPosition = event.getLocation();
        this.mousePosition = event.getLocation();
        this.mousePosition.x = (this.mousePosition.x * cc.view.getScaleX()/cc.view.getCanvasSize().width) * cc.view.getDesignResolutionSize().width;
        
        switch (event.getButton()) {
            case cc.Event.EventMouse.BUTTON_LEFT:
                this.mouseLeft = BtnStatu.Down;
                break;
            case cc.Event.EventMouse.BUTTON_RIGHT:
                this.mouseRight = BtnStatu.Down;
                break;
            case cc.Event.EventMouse.BUTTON_MIDDLE:
                this.mouseMiddle = BtnStatu.Down;
                break;
            default:
                break;
        }
        this.mouseDelta = cc.Vec2.ZERO;
    }

    private mouseBtnUpMonitor(event: cc.Event.EventMouse) {

        switch (event.getButton()) {
            case cc.Event.EventMouse.BUTTON_LEFT:
                this.mouseLeft = BtnStatu.Up;
                break;
            case cc.Event.EventMouse.BUTTON_RIGHT:
                this.mouseRight = BtnStatu.Up;
                break;
            case cc.Event.EventMouse.BUTTON_MIDDLE:
                this.mouseMiddle = BtnStatu.Up;
                break;
            default:
                break;
        }
        this.mouseDelta = cc.Vec2.ZERO;
    }

    private mousePositionMonitor(event: cc.Event.EventMouse) {
        
        this.mouseLocalPosition = event.getLocation();
        this.mousePosition = event.getLocation();
        this.mousePosition.x = (this.mousePosition.x * cc.view.getScaleX()/cc.view.getCanvasSize().width) * cc.view.getDesignResolutionSize().width;

        switch (event.getButton()) {
            case cc.Event.EventMouse.BUTTON_LEFT:
                if(this.mouseLeft == BtnStatu.Down)
                    this.mouseLeft = BtnStatu.Move;
                break;
            case cc.Event.EventMouse.BUTTON_RIGHT:
                if(this.mouseRight == BtnStatu.Down)
                    this.mouseRight = BtnStatu.Move;
                break;
            case cc.Event.EventMouse.BUTTON_MIDDLE:
                if(this.mouseMiddle == BtnStatu.Down)
                    this.mouseMiddle = BtnStatu.Move;
                break;
            default:
                break;
        }
        this.mouseDelta = event.getDelta();
    }
    private mouseMiddleNumMonitor(event: cc.Event.EventMouse) {

        this.mouseMiddleNum = event.getScrollY();
        this.mouseDelta = cc.Vec2.ZERO;
    }

    //键盘响应
    private keyBroadDown(event :cc.Event.EventKeyboard){
        
        if(this.keyBoards.ContainKey(event.keyCode)){

            if(this.keyBoards.Item(event.keyCode) == ButtonStatu.Up || this.keyBoards.Item(event.keyCode) == ButtonStatu.Dis){
                
                this.keyBoards.SetItem(event.keyCode,ButtonStatu.BeginDown);
                this.node.runAction(
                    cc.sequence(
                        cc.delayTime(0.1),
                        cc.callFunc(()=>{
                            if(InputMonitor.Instance.keyBoards.Item(event.keyCode) == ButtonStatu.BeginDown)
                                InputMonitor.Instance.keyBoards.SetItem(event.keyCode,ButtonStatu.Down);
                        })
                    )
                );
            }
        }
        else{
            this.keyBoards.Add(event.keyCode,ButtonStatu.BeginDown);
        }
    }

    private keyBroadUp(event :cc.Event.EventKeyboard){

        if(this.keyBoards.ContainKey(event.keyCode)){
            this.keyBoards.SetItem(event.keyCode,ButtonStatu.Up);
        }
        else{
            this.keyBoards.Add(event.keyCode,ButtonStatu.Up);
        }
    }
}
export class ButtonStatu {
    static Up: number = 0;
    static Down: number = 1;
    static Dis: number = 2;
    static Move: number = 3;
    static BeginDown : number =4;

    constructor(){}
} 
