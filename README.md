# WeTouch
CocosCreate 触控辅助插件

介绍地址 [本人博客](https://blog.csdn.net/f980511/article/details/89033050)

![ScreenShot](https://img-blog.csdnimg.cn/2019040419313889.gif)
![ScreenShot](https://img-blog.csdnimg.cn/20190411165524134.GIF)
![ScreenShot](https://img-blog.csdnimg.cn/20190412161110430.gif)

**使用方法**

  只需要将Core文件拖入你的项目，并把InputMoniter挂在到你的主Canvas即可
  
**功能简介**

1.实时访问每个触摸手指的状态（手指顺序，touch位置，按钮状态，Touch类）

2.使鼠标与触摸的API兼容访问

3.实时访问键盘按钮状态

4.增加基础数据结构 List Dictionary Statck Queue

**范例展示**

  card : 展示了实时访问多点触控的使用
  
  card01 :展示了鼠标位置与世界的转换  
  
  card02 :展示了实时访问键盘按钮状态
  
**API**
  
  ```
  //获取鼠标左键（触摸第一根手指）状态
  MouseBtnLeft() : ButtonStatu
  
  //获取鼠标右键状态
  MouseBtnRight() : ButtonStatu
  
  //获取鼠标中键状态

  MouseBtnMiddle() : ButtonStatu
  
  //获取鼠标屏幕位置（非屏幕实际尺寸，为Canvas的相对位置）
  MousePosition() :cc.Vec2
  
  //获取鼠标世界位置
  MouseToWorldPosition() :cc.Vec2
    
  //获取鼠标中键滚动状态
  MouseMiddleNum() : number
  
  //获取鼠标移动差值
  MouseDelta() : number

  //获取触摸点
  Touchs():cc.Touch[]
  
  //获取触摸点状态
  TouchStatu():ButtonStatu[]
  
  //查询该触摸ID是否存在触控
  ContainID(id:number):boolean
  
  //每帧的时间
  DeltaTime():number
  ```
  
