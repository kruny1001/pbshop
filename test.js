/**
 * Created by KevinSo on 7/22/2014.
 */

//Linked List on JavaScript
var myMoney=1500;
var rollCount=0;
var buyCount=0;
var endGameCount=0;

var totalRollCount=0;
var totalBuyCount=0;
var indianaPurchasedCount=0;//A17

function Node(areaNum,isProperty,cost,isBought) {
    this.areaNum = areaNum;
    this.isProperty=isProperty;
    this.cost=cost;
    this.isBought=isBought;
    this.next = null;
}


function LList() {
    this.head = new Node("A00",false,0,false);
    this.head.next = this.head;
    this.insert = insert;
    this.display = display;
    this.modify = modify;
    this.rollMove=rollMove;
    this.currentSpot=this.head;
    this.land=land;
//this.find = find;
//this.findPrevious = findPrevious;
//this.remove = remove;
}



var cities = new LList();
cities.insert("A01"	,true,	400);
cities.insert("A02"	,false,	75);
cities.insert("A03"	,true,	350);
cities.insert("A04"	,false,	0);
cities.insert("A05"	,true,	200);
cities.insert("A06"	,true,	320);
cities.insert("A07"	,false,	0);
cities.insert("A08"	,true,	300);
cities.insert("A09"	,true,	300);
cities.insert("A10"	,false,	50);
cities.insert("A11"	,true,	280);
cities.insert("A12"	,true,	150);
cities.insert("A13"	,true,	260);
cities.insert("A14"	,true,	260);
cities.insert("A15"	,true,	200);
cities.insert("A16"	,true,	240);
cities.insert("A17"	,true,	220);
cities.insert("A18"	,false,	0);
cities.insert("A19"	,true,	220);
cities.insert("A20"	,false,	0);
cities.insert("A21"	,true,	200);
cities.insert("A22"	,true,	180);
cities.insert("A23"	,false,	0);
cities.insert("A24"	,true,	180);
cities.insert("A25"	,true,	200);
cities.insert("A26"	,true,	160);
cities.insert("A27"	,true,	140);
cities.insert("A28"	,true,	150);
cities.insert("A29"	,true,	140);
cities.insert("A30"	,false,	50);
cities.insert("A31"	,true,	120);
cities.insert("A32"	,true,	100);
cities.insert("A33"	,false,	0);
cities.insert("A34"	,true,	100);
cities.insert("A35"	,true,	200);
cities.insert("A36"	,false,	200);// or 10% of total cash, whichever is greater
cities.insert("A37"	,true,	60);
cities.insert("A38"	,false,	0);
cities.insert("A39"	,true,	60);


/*
 function remove(item) {
 var prevNode = this.findPrevious(item);
 if (!(prevNode.next == null)) {
 prevNode.next = prevNode.next.next;
 }
 }

 function findPrevious(item) {
 var currNode = this.head;
 while (!(currNode.next == null) &&
 (currNode.next.areaNum != item)) {
 currNode = currNode.next;
 }
 return currNode;
 }
 */

function display() {
    var currNode = this.head;
    while (!(currNode.next == null) && !(currNode.next.areaNum == "A00")) {
        console.log("Area : "+currNode.next.areaNum);
        console.log("isProperty: "+currNode.next.isProperty);
        console.log("cost: "+currNode.next.cost);
        console.log("isBought: "+currNode.next.isBought);
        console.log("");
        currNode = currNode.next;
    }
}

function modify(areaNum,isProperty,cost) {
    var currNode = this.head;
    while (currNode.areaNum != areaNum) {
        currNode = currNode.next;
    }
    currNode.isProperty=isProperty;
    currNode.cost=cost;
}

function insert(areaNum,isProperty,cost) {
    var currNode=this.head;
    var newNode = new Node(areaNum,isProperty,cost,false);
    if(this.head.next==this.head)
    {
        newNode.next=this.head;
        this.head.next=newNode;
    }

    else
    {
        while(!((currNode.next)==this.head)){
            currNode=currNode.next;
        }
    }
    currNode.next=newNode;
    newNode.next=this.head;
}

function endGame() {
    totalRollCount+=rollCount;
    totalBuyCount+=buyCount;
    console.log("게임 종료!");
    console.log("Roll Count : "+rollCount);
    console.log("Buy Count : "+buyCount);

    //맵 초기화 (초기값으로)
    cities.modify("A01"	,true,	400);
    cities.modify("A02"	,false,	75);
    cities.modify("A03"	,true,	350);
    cities.modify("A04"	,false,	0);
    cities.modify("A05"	,true,	200);
    cities.modify("A06"	,true,	320);
    cities.modify("A07"	,false,	0);
    cities.modify("A08"	,true,	300);
    cities.modify("A09"	,true,	300);
    cities.modify("A10"	,false,	50);
    cities.modify("A11"	,true,	280);
    cities.modify("A12"	,true,	150);
    cities.modify("A13"	,true,	260);
    cities.modify("A14"	,true,	260);
    cities.modify("A15"	,true,	200);
    cities.modify("A16"	,true,	240);
    cities.modify("A17"	,true,	220);
    cities.modify("A18"	,false,	0);
    cities.modify("A19"	,true,	220);
    cities.modify("A20"	,false,	0);
    cities.modify("A21"	,true,	200);
    cities.modify("A22"	,true,	180);
    cities.modify("A23"	,false,	0);
    cities.modify("A24"	,true,	180);
    cities.modify("A25"	,true,	200);
    cities.modify("A26"	,true,	160);
    cities.modify("A27"	,true,	140);
    cities.modify("A28"	,true,	150);
    cities.modify("A29"	,true,	140);
    cities.modify("A30"	,false,	50);
    cities.modify("A31"	,true,	120);
    cities.modify("A32"	,true,	100);
    cities.modify("A33"	,false,	0);
    cities.modify("A34"	,true,	100);
    cities.modify("A35"	,true,	200);
    cities.modify("A36"	,false,	200);// or 10% of total cash, whichever is greater
    cities.modify("A37"	,true,	60);
    cities.modify("A38"	,false,	0);
    cities.modify("A39"	,true,	60);

    //현재 장소 초기화
    cities.currentSpot=cities.head;
    //플레이어,주사위횟수,땅 구입횟수 초기화
    myMoney=1500;
    rollCount=0;
    buyCount=0;

    //게임종료횟수 카운트
    endGameCount++;
}

function rollMove(distance){
    for(var i=0; i<distance ; i++)
    {
        this.currentSpot=this.currentSpot.next;
    }
}

function land(){

    if(this.currentSpot.isProperty==false)//Penalty 땅일 때
    {
        if(this.currentSpot.areaNum=="A36") // A36번 땅일 때 비용 계산
        {

            if((myMoney*0.1) > 200)
            {
                myMoney-=myMoney*0.1;
            }

            else
            {
                myMoney-=this.currentSpot.cost;
            }
        }

        else
        {
            myMoney-=this.currentSpot.cost;
        }
    }

    else//Property 땅일 때,
    {
        if(this.currentSpot.isBought==false)
        {
            if(this.currentSpot.areaNum=="A17")//A17 구입횟수
            {
                indianaPurchasedCount++;
            }


            myMoney-= this.currentSpot.cost;
            this.currentSpot.isBought==true;
            buyCount++;
        }

    }
    if(myMoney<=0)
    {
        endGame();
    }

}


function roll(){

    var Roll1=Math.floor((Math.random()*5)+1);
    var Roll2=Math.floor((Math.random()*5)+1);


    if(rollCount==1000) // roll 횟수가 1000개가 되면 endGame
    {
        endGame();
    }

    switch(Roll1)
    {
        case 1:
            cities.rollMove(1);
            break;

        case 2:
            cities.rollMove(2);
            break;

        case 3:
            cities.rollMove(3);
            break;

        case 4:
            cities.rollMove(4);
            break;

        case 5:
            cities.rollMove(5);
            break;

        case 6:
            cities.rollMove(6);
            break;
    }

    switch(Roll2)
    {
        case 1:
            cities.rollMove(1);
            break;

        case 2:
            cities.rollMove(2);
            break;

        case 3:
            cities.rollMove(3);
            break;

        case 4:
            cities.rollMove(4);
            break;

        case 5:
            cities.rollMove(5);
            break;

        case 6:
            cities.rollMove(6);
            break;
    }

    rollCount++;
}





while(1)
{
    if(endGameCount==1000)
    {
        break;
    }
    roll();
    cities.land();
}


console.log("1000게임이 끝났습니다!");
console.log("주사위 횟수의 평균 : " + (totalRollCount/1000));
console.log("땅 구입 횟수의 평균 : " + (totalBuyCount/1000));
console.log("Indiana Avenue 구입 횟수(%): "+(indianaPurchasedCount/1000));
