const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;

//criar as variáveis de blink, eat, sad

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  //carregar a animação para eat
  //carregar a animação para sad

  blink.playing = true;
  //playing no eat
  //playing no sad
  sad.looping = false;
 //looping false no eat
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  blink.frameDelay = 20;
  //alterar o delay do eat
  //alterar o delay do sad
  bunny = createSprite(200,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation("blinking", blink);
  //adicionar a animação do eat
  //adicionar a animação do sad
  bunny.changeAnimation("blinking");
  

  //btn 1
  button = createImg('cut_btn.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  
  rope = new Rope(8,{x:220,y:30});
  ground = new Ground(200,690,600,20);

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();

  Engine.update(engine);
  ground.show();

  //se colisão com fruit, bunny for igual a verdadeiro
  //altere a animação do bunny para eating

  // if(collider(fruit,buny) == true){
  //   bunny.changerAnimation('eating');
  // }

  // if(collide(fruit,bunny) == true){
  //   bunny.changeAnimation('eating');
  // }

  // if(collision(bunny) == true){
  //   bunny.changeAnimation('eating');
  // }



  //se a colisão de fruit, ground.body for igual a verdadeiro
  //altere a animação do bunny para crying

  // if(collide(fruit,ground.body)=true){
  //   bunny.changeAnimation('crying');
  // }

  // if(collide(fruit,ground.body)==true){
  //   bunny.changeanimation('crying');
  // }

  // if(collide(fruit,ground.body)==true){
  //   bunny.changeAnimation('crying');
  // }

  drawSprites();
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if(d<=80){
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }else{
      return false;
    }
  }
}





