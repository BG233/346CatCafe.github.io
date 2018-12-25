enchant();
var FPS = 24;
var DISPLAY_X = 640;
var DISPLAY_Y = 1000;
var GameObject = null;
var SceneMaker = {}
var VERSION = "ver1.0.0";

var cat_list =[
    new Cat('凛', 'cats/cat2.png', ['cats/cat2_store1.png'],'ふーん','cats/cat2_touch.png'),
    new Cat('未央', '', ['cats/cat3_store1.png'],'MIO','')
]

var customer_list = [
    new Customer('脸熟OL','chara/chr1.png',['送出了生火腿蜜瓜','卯月猫被抢走了'])
];

function Cat(name, enqueue_fig, store_fig,sound,touch){
    this.name = name;
    this.enqueue_fig = enqueue_fig;
    this.store_fig = store_fig;
    this.meet_time = 0;
    this.sound = sound;
    this.touch = touch;
}

function Customer(name,figure,reaction){
    this.name = name;
    this.figure = figure;
    this.reaction_txt = reaction;
    // this.tag = tag;
}

var stage = 0;
var queue = new Array();
var can_pass = 1, can_op1=1, can_op2=1;

window.onload = function () {
    GameObject = new Core(DISPLAY_X, DISPLAY_Y);
    GameObject.fps = FPS;
    GameObject.scale = 1;

    GameObject.preload(
        'op/op1.png',
        'op/op2.png',
        'op/op3.png',
        'op/op4.png',

        'bg.png',
        'emp_tmp.png',

        'cats/ept.png',
        'cats/cat1.png',
        'cats/cat1_touch.png',
        'cats/cat2_store1.png',
        'cats/cat2_touch_sp.png',
        'cats/cat2_touch.png',
        'cats/cat2.png',
        'cats/cat3_store1.png',
        'cats/cat3.png',
    
        'btn/bt1.png',
        'btn/bt1_1.png',
        'btn/bt2.png',
        'btn/bt2_1.png',
        'btn/bt3.png',
        'btn/bt3_1.png',
    
        'txt/ept.png',
        'txt/txt1.png',
    
        'chara/chr1.png',

        'skill/skill1_1.png'
        );

    GameObject.onload = function () {
        // start scene
        SceneMaker.createStartScene = function () {
            var scene = new Scene();
            scene.backgroundColor = '#ffffff';

            var versionLabel = new Label(VERSION);
            versionLabel.textAlign = 'center';
            versionLabel.color = '#000';
            versionLabel.x = 0;
            versionLabel.y = 8;
            versionLabel.width = DISPLAY_X - 8;
            versionLabel.font = '15px sans-serif';
            // scene.addChild(versionLabel);

            bg = new  Sprite(640,700);//Sprite(640,700);
            bg.image = GameObject.assets['op/op1.png'];
            bg.y = DISPLAY_Y/2-300;
            scene.addChild(bg);
            scene.addChild(versionLabel);

            var num = 1;
            bg.addEventListener(Event.TOUCH_START, function (e){
                num++;
                if (num==5) GameObject.replaceScene(SceneMaker.createGameScene());
                bg.image = GameObject.assets['op/op'+num+'.png'];

            });


            return scene;
        };

        SceneMaker.createGameScene = function () {
            var scene = new Scene();
            scene.backgroundColor = '#ffffff';

            bg = new Sprite(600,656);
            bg.image = GameObject.assets['bg.png'];
            bg.x = 20; bg.y = 35;
            scene.addChild(bg);

            meet = new Sprite(550,550);
            meet.image = GameObject.assets['emp_tmp.png']; //test
            meet.x = 50; meet.y = 90;
            scene.addChild(meet);

            skill_fig = new Sprite(350,350);
            skill_fig.image = GameObject.assets['emp_tmp.png']; //test
            skill_fig.x = DISPLAY_X/2-175; skill_fig.y = 200;
            scene.addChild(skill_fig);

            var label = new Label();
            label.text = 'うづう〜';
            label.textAlign = 'center';
            label.color = '#000';
            label.x = 0; label.y = 15;
            label.width = DISPLAY_X-20;
            label.font = '25px sans-serif';
            scene.addChild(label);

            cat1 = new Sprite(200,200);
            cat1.image = GameObject.assets['cats/cat1.png'];
            cat1.x = 10; cat1.y = DISPLAY_Y-400;
            scene.addChild(cat1);

            //touch
            cat1.addEventListener(Event.TOUCH_START, function (e) {
                cat1.image = GameObject.assets['cats/cat1_touch.png']; 
                if (queue.length>0){
                    if (queue[0].name = '凛') cat2.image = GameObject.assets['cats/cat2_touch_sp.png']; 
                    else if(queue.length==2 && queue[1].name == '凛') cat3.image = GameObject.assets['cats/cat2_touch_sp.png']; 
                }
            });
            cat1.addEventListener(Event.TOUCH_END, function (e) {
                cat1.image = GameObject.assets['cats/cat1.png']; 
                if (queue.length>0){
                    if (queue[0].name = '凛') cat2.image = GameObject.assets['cats/cat2.png']; 
                    else if(queue.length==2 && queue[1].name == '凛') cat3.image = GameObject.assets['cats/cat2.png']; 
                }
            });

            cat2 = new Sprite(200,200);
            cat2.image = GameObject.assets['cats/ept.png'];
            cat2.x = 200+10; cat2.y = DISPLAY_Y-400;
            scene.addChild(cat2);
            //touch
            cat2.addEventListener(Event.TOUCH_START, function (e) {
                if (queue.length>=1){
                    cat2.image = GameObject.assets[queue[0].touch]; 
                }

            });
            cat2.addEventListener(Event.TOUCH_END, function (e) {
                if (queue.length>=1){
                    cat2.image = GameObject.assets[queue[0].enqueue_fig]; 
                }

            });

            cat3 = new Sprite(200,200);
            cat3.image = GameObject.assets['cats/ept.png'];
            cat3.x = 400+10; cat3.y = DISPLAY_Y-400;
            scene.addChild(cat3);

            bt1 = new Sprite(200,100);
            bt1.image = GameObject.assets['btn/bt1.png'];
            bt1.x = 20; bt1.y = DISPLAY_Y-180;
            scene.addChild(bt1);

            bt2 = new Sprite(200,100);
            bt2.image = GameObject.assets['btn/bt2.png'];
            bt2.x = 200+20; bt2.y = DISPLAY_Y-180;
            scene.addChild(bt2);

            bt3 = new Sprite(200,100);
            bt3.image = GameObject.assets['btn/bt3.png'];
            bt3.x = 400+20; bt3.y = DISPLAY_Y-180;
            scene.addChild(bt3);
            
            //溜走btn
            function passby(){
                if (can_pass){
            
                    can_pass = 0;
                    //回收上个情况
                    label.text = '';
                    skill_fig.image = GameObject.assets['emp_tmp.png']; 
                    meet.image = GameObject.assets['emp_tmp.png'];
                    //凛的特判
                    if (cat_list[0].meet_time==2 && cat_list[0].name=='凛' && queue.length<2){ 
                        label.text = "凛跟了过来";
                        cat2.image = GameObject.assets[cat_list[0].enqueue_fig];
                        queue.push(cat_list[0]);
                        cat_list.splice(0,1);
                        can_pass = 1;
                        return;
                    }
            
                    var a=Math.random();
                    if (a<0.2){ //empty
                        label.text = '这里啥也没有';
                        stage = 0;
            
                    }else if(a<0.6){ //meet cat    
                        stage = 1;
                        meet_cat();
            
                    }else{ //meet customer
                        label.text = '猫咖里的客人出现了';
                        stage = 2;
                        meet_customer()
                    }
                    
                    can_pass = 1;
                    can_op1 = 1;
                    can_op2 = 1;
                    bt1.image = GameObject.assets['btn/bt1.png'];
                    bt2.image = GameObject.assets['btn/bt2.png'];
                }
                
            
            }
            
            function meet_cat(){   
                var index = Math.floor((Math.random()* cat_list.length)); 
                cat_list[index].meet_time++;
                var index1 = Math.floor((Math.random()* cat_list[index].store_fig.length)); 
                
                meet.image = GameObject.assets[cat_list[index].store_fig[index1]];
                label.text = cat_list[index].name + "猫出现了";
            }

            function meet_customer(){
                var index = Math.floor((Math.random()* customer_list.length));
                meet.image = GameObject.assets[customer_list[index].figure];
                label.text = customer_list[index].name + "出现了";
            }

            bt3.addEventListener(Event.TOUCH_START, function (e) {
                bt3.image = GameObject.assets['btn/bt3_1.png'];
            });
            bt3.addEventListener(Event.TOUCH_END, function (e) {
                passby();
                bt3.image = GameObject.assets['btn/bt3.png'];
            });

            //特技披露
            function skill(){
                if (queue.length == 0){
                    skill_fig.image = GameObject.assets['skill/skill1_1.png'];
                }
                // skill_fig.addEventListener(Event.TOUCH_END, function (e) {
                //     skill_fig.image = GameObject.assets['emp_tmp.png']; 
                // });

                if(stage == 0){
                    label.text = '然而什么也没发生';

                }else if(stage == 1){

                }else if(stage == 2){

                }   

            }

            bt2.addEventListener(Event.TOUCH_END, function (e) {
                if(can_op2){
                    can_op2 = 0;
                    bt2.image = GameObject.assets['btn/bt2_1.png'];
                    skill();
                }
            
            });

            //喵

            bt1.addEventListener(Event.TOUCH_END, function (e) {
                
                can_op1 = 0;
                bt1.image = GameObject.assets['btn/bt1_1.png'];
            });




            return scene;
        };


        GameObject.replaceScene(SceneMaker.createStartScene());
    }
    GameObject.start(); 

};

