//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;
     private Page1;
    private Page2;
    private stageW:number;
    private stageH:number;
    private movedistance;
    private starttouchpointY;
    private currentPage;
    private currentPageY;
    private headSculptureTween;
    private headSculpture1Tween;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
 /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

   

private textfield:egret.TextField;








    private createGameScene():void {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startScroll,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.stopScroll,this);
        this.stageW=this.stage.stageWidth;
        this.stageH=this.stage.stageHeight;


       this.scrollRect=new egret.Rectangle(0,0,this.stageW,this.stageH*2);
       this.cacheAsBitmap=true;
       this.touchEnabled=true;
      



/*加载第一个页面*/




     this.Page1=new egret.DisplayObjectContainer ();
     this.addChild(this.Page1);

        var sky1:egret.Bitmap = this.createBitmapByName("beijin_jpg");
        this.addChild(sky1);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky1.width = stageW;
        sky1.height = stageH;
        this.Page1.addChild(sky1);

        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0,stageW , 50);
        topMask.graphics.endFill();
        topMask.y =33;
        this.addChild(topMask);

        var icon:egret.Bitmap = this.createBitmapByName("tubiao_png");
        this.addChild(icon);
        icon.x =200;
        icon.y =400;
        icon.scaleX = 0.7;
        icon.scaleY = 0.7;
        icon.touchEnabled = true;
        this.Page1.addChild(icon);

        egret.Tween.get( icon ).to( { alpha:.3 }, 300, egret.Ease.circIn ).to( { alpha:1 }, 300, egret.Ease.circIn );
        egret.Tween.get( icon ).to( { y:500 }, 300, egret.Ease.circIn ).to({y:500},400,egret.Ease.circIn);
        

var label:egret.TextField = new egret.TextField();
this.addChild( label );
label.width = 150;
label.height = 45;
label.x=250;
label.y=750;
label.text = "向上滑箭头";

  var pic:egret.Bitmap=this.createBitmapByName("huadong_png");
  var offsetX:number;
  var offsetY:number;
  this.addChild(pic);
  pic.x=200;
  pic.y=800;
 /* pic.scaleX = 0.3;
  pic.scaleY = 0.3;*/
  pic.touchEnabled=true;
  pic.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);
  pic.addEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);
  function startMove(e:egret.TouchEvent):void{
      pic = e.currentTarget;
      offsetX=e.stageX-pic.x;
      offsetY=e.stageY-pic.y;
      this.addChild(pic);
      this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
}
function stopMove(e:egret.TouchEvent) {console.log(22);
   //手指离开屏幕，移除手指移动的监听
   this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
}
function onMove(e:egret.TouchEvent):void{
   //通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
   pic.x = 200;
  pic.y = 1000;
}

          this.Page2=new egret.DisplayObjectContainer();
          this.Page2.width=this.stageW;
          this.Page2.height=this.stageH;
          this.Page2.y=this.stageH;
          this.addChild(this.Page2);

          var sky2:egret.Bitmap = this.createBitmapByName("bj_jpeg");
          this.addChild(sky2);
          var stageW:number = this.stage.stageWidth;
          var stageH:number = this.stage.stageHeight;
          sky2.width = stageW;
          sky2.height = stageH;
          this.Page2.addChild(sky2);
        
          var text:egret.TextField = new egret.TextField();
          text.alpha = 1;
        text.textColor = 0xffffff;
        text.width = 540;
        text.size = 30;
        text.lineSpacing = 40;
        
        /*** 本示例关键代码段开始 ***/
   text.textFlow = <Array<egret.ITextElement>>[
            {text: "我来自美丽的西藏", style: {"size": 34}}, 
            {text: "拉萨", style: {"textColor": 0x336699, "size": 60, "strokeColor": 0x6699cc, "stroke": 2}},
            {text:",\n"},
            {text: "我非常我的家乡", style: {"fontFamily": "楷体"}},
            {text:".\n"},
            {text: "北京工业大学是我的大学", style: {"textColor": 0x00ffff}},
            {text: ",\n"},
            {text: "数字媒体技术", style: {"size": 56}},
            {text: "是我的专业", style: {"size": 34}},
            {text: ".\n"},
            {text: "以后想做影视编辑类工作", style: {"italic": true, "textColor": 0xf06f00}},
            {text: ".\n"},
            {text: "我想对我自己说", style: {"fontFamily": "KaiTi"}},//楷体
            {text: ":\n"},
            {text: "梦想路上加油！",style:{"size":50,"textColor":0xff0000}}
        ];
        /*** 本示例关键代码段结束 ***/
        this.Page2.addChild(text);
        text.x = 320 - text.textWidth / 2;
        text.y = 400 - text.textHeight / 2;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        /*
        colorLabel.textAlign = "center";*/
        colorLabel.text = "欢迎您-我的伙伴";
        colorLabel.size = 40;
        colorLabel.x = 172;
        colorLabel.y = 33;
        this.addChild(colorLabel);

        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */

    
   

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);

        this.headSculptureTween = egret.Tween.get(this.headSculpture,{loop:true});
        this.headSculpture1Tween = egret.Tween.get(this.headSculpture1,{loop:true});
        
        //每个Tween对象按顺序执行逻辑
        this.headSculptureTween.to( { y:this.headSculpture1.y }, 1500, egret.Ease.sineIn);
        this.headSculpture1Tween.to( { y:this.headSculpture.y }, 1500, egret.Ease.sineIn);

        this.headSculptureTween.to({"rotation" : 10}, 500, egret.Ease.sineIn);
        this.headSculptureTween.to({"rotation" : 0}, 500, egret.Ease.sineIn);
        this.headSculpture1Tween.to({"rotation" : 10}, 500, egret.Ease.sineIn);
        this.headSculpture1Tween.to({"rotation" : 0}, 500, egret.Ease.sineIn);


       this. change();
    }
    }
        private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
   
   


            private change() : void{

            egret.setTimeout(function(){this.page1Content1.textColor = 0xFFFFF0;this.page1Content1.text = "请翻至下页";}, this, 1500);
            egret.setTimeout(function(){this.change()}, this, 3000);
        }




        //第一次触摸屏幕时
        private startScroll(e: egret.TouchEvent): void {    

            //正常情况下scrollRect.y是stageH的整数倍；如果图片位置错误，返回上一个正确位置；
            if((this.scrollRect.y % this.stageH)!= 0) {               
                this.scrollRect.y = this.currentPageY;  
            }

            //记录下刚触摸屏幕时的y值
            this.starttouchpointY = e.stageY;

            //此时scrollRect已停留在一个page上
            this.currentPageY = this.scrollRect.y;

            //TouchEvent.TOUCH_MOVE：连续触摸时调用
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onScroll, this);
        }

        //连续触摸时调用，计算出每时每刻移动的距离，并控制屏幕滑动
        private onScroll(e: egret.TouchEvent): void {  
                 
            var rect : egret.Rectangle = this.scrollRect;
            this.movedistance = this.starttouchpointY - e.stageY;
            
            //实时改变scrollRect的位置
            if((this.currentPageY == 0 && this.movedistance < 0) || (this.currentPageY == this.stageH && this.movedistance > 0)){

            }else{
                 rect.y = (this.currentPageY + this.movedistance);
                 this.scrollRect = rect;
            }

            
        }

        
        private stopScroll(e: egret.TouchEvent): void {

            var rect: egret.Rectangle = this.scrollRect;


            //向下滑动超过屏幕的三分之一，将scrollRect向下平移一个屏幕
            if((this.movedistance>=(this.stage.stageHeight/3)) && this.currentPageY!= this.stageH) {

                rect.y = this.currentPageY + this.stageH;
                this.scrollRect = rect; 

            //向上滑动超过屏幕的三分之一，将scrollRect向上平移一个屏幕
            }else if((this.movedistance<=(-(this.stage.stageHeight/3))) && this.currentPageY!=0) {

                rect.y = this.currentPageY - this.stageH;
                this.scrollRect = rect;

            //保持当前界面，即不移动scrollRect
            }else {
                rect.y = this.currentPageY;
                this.scrollRect = rect;
            }

            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onScroll,this);
        }



}
    
    

  



