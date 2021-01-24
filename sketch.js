//CREATING THE GLOBAL VARIABLES//
var dog, happyDog, database, foodS, foodStock;

function preload(){
  sadDog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
  }
  
  function setup() {
    database=firebase.database();
    createCanvas(850,400);
  
    foodObj = new Food();

    var input = createInput("Name");
    input.position(950,120);
    
    foodStock=database.ref('Food');
    foodStock.on("value",readStock);
    
    dog=createSprite(770,200,150,150);
    dog.addImage(sadDog);
    dog.scale=0.15;
    
    feed=createButton("Feed the dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);
  
    addFood=createButton("Add Food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);
  
  }
  
  function draw() {
    background(46,139,87);
    foodObj.display();
  
    fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
      foodObj.lastFed=data.val();
    });
   
    fill("white");
    textSize(15);
    if(foodObj.lastFed>=12){
      text("Last Feed : "+ foodObj.lastFed%12 + " PM", 350,30);
     }else if(foodObj.lastFed==0){
       text("Last Feed : 12 AM",350,30);
     }else{
       text("Last Feed : "+ foodObj.lastFed + " AM", 350,30);
     }

    drawSprites();
  }
  
  //function to read food Stock
  function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
  }
  
  //function to update food stock and last fed time
  function feedDog(){
    dog.addImage(happyDog);
  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
  
  //function to add food in stock
  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }