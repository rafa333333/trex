var morreu
var pulo
var checkpoint
var gameover
var restart
var gameoverimage
var restartimage
var collided
var play = 1
var end = 0
var obstaclegroup
var cloudgroup
var gamestate = play
var score = 0
var cloud
var cloudimage
var chao
var imagemdochao
var trex
var trexanime
var chaoinvi
var obstaculo
var a1
var a2
var a3
var a4
var a5
var a6
function preload(){
    imagemdochao = loadImage("ground2.png")
    trexanime = loadAnimation("trex1.png","trex3.png","trex4.png")
    a1 =  loadImage("obstacle1.png")
    a2 =  loadImage("obstacle2.png")
    a3 =  loadImage("obstacle3.png")
    a4 =  loadImage("obstacle4.png")
    a5 =  loadImage("obstacle5.png")
    a6 =  loadImage("obstacle6.png")
    cloudimage = loadImage("cloud.png")
    collided = loadAnimation("trex_collided.png")
    gameoverimage = loadImage("gameOver.png")
    restartimage= loadImage("restart.png")
    morreu = loadSound("die.mp3")
    pulo = loadSound("jump.mp3")
    checkpoint = loadSound("checkpoint.mp3")
}
function setup(){
    createCanvas(windowWidth,windowHeight)
    chao = createSprite(200,height-50,400,20)
    chao.addImage(imagemdochao)
    trex = createSprite(50,height-80 ,20,50)
    trex.scale=0.5
    trex.addAnimation("trexanime",trexanime)
    trex.addAnimation("trex_collided.png",collided)
    chao.velocityX=-(3+3*score/500)
    chaoinvi = createSprite(200,height-40,400,10)
    chaoinvi.visible = false
    obstaclegroup = new Group ()
    cloudgroup = new Group ()
    trex.setCollider("circle",0,0,40)
    gameover = createSprite(width/2,height/2)
    restart = createSprite(width/2,height/2+50)
    gameover.scale=0.5
    restart.scale=0.5
    gameover.addImage("gameOver.png",gameoverimage)
    restart.addImage("restart.png",restartimage)
}
    function draw(){
    background("white")
    text ("score: "+score,width-100,50)
        console.log(score)
    drawSprites()
    
    
    trex.collide(chaoinvi)
    
    
    nuvem()
    
    if(gamestate===play){
        if(trex.y>=height-90&&(keyDown("space")||touches.length>0) ){
            trex.velocityY=-10
            pulo.play()
        }
        score=score+Math.round(getFrameRate()/60)
        if(chao.x<0){
            chao.x=chao.width/2
        }
        trex.velocityY+=0.5
        obstacle()
        if(trex.isTouching(obstaclegroup)){
            gamestate = end
            morreu.play()
        }
        gameover.visible=false
        restart.visible=false
        if(score%1000==0&&score>0){
        checkpoint.play()
        }
    
    
    } else if(gamestate===end){
        chao.velocityX=0
        obstaclegroup.setVelocityXEach(0)
        trex.velocityY=0
        
        trex.changeAnimation("trex_collided.png",collided)
        obstaclegroup.setLifetimeEach(-1)
        gameover.visible=true
        restart.visible=true
    }

    if(mousePressedOver(restart)||touches.length>0){
        touches=[]
        denovo()
        console.log("função")
    }
}
function obstacle(){
    var aleatoria  = Math.round(random(40,80))
    if(frameCount%aleatoria==0){
    var obstaculo = createSprite(2000,height-65,10,40)
    obstaculo.velocityX=-(10+score/500)
    obstaculo.scale = 0.5
    var imagemalea = Math.round(random(1,6))
    switch(imagemalea){
    case 1 :
    obstaculo.addImage("a1",a1)
    break
    case 2 :
    obstaculo.addImage("a2",a2)
    break
    case 3 :
    obstaculo.addImage("a3",a3)
    break
    case 4 :
    obstaculo.addImage("a4",a4)
        break
    case 5 :
    obstaculo.addImage("a5",a5)
    break
    case 6 :
    obstaculo.addImage("a6",a6)
    break
    
}
        obstaculo.lifetime=300
    obstaclegroup.add(obstaculo)
}
}
function nuvem(){
    if(frameCount%60===0){
        cloud = createSprite(600,100,40,10)
        cloud.addImage(cloudimage)
        cloud.y=Math.round(random(100,height-100))
        cloud.scale = 1
        cloud.velocityX=-3
        cloud.lifetime = 200
        cloud.depth = trex.depth
        trex.depth +=1
        cloudgroup.add(cloud)
    }
}
function denovo(){
    gamestate = play
    trex.changeAnimation("trexanime",trexanime)
    obstaclegroup.destroyEach()
    score=0
}