import { Node } from './Node.js';
import { Card } from './Card.js';
import { Label } from './Label.js';
import { Button } from './Button.js';
import { Animate } from './Animate.js';

var clickedImg = [];
var score = 10000;
var countClick = 0;
var time = 0;
var clickable = false;
var win = 0;
var animate = new Animate();

export class Game extends Node {
    init() {
        let bg = new Card('./img/bg.jpg');
        bg.width = window.innerWidth;
        bg.height = window.innerHeight;

        let title = new Card('./img/title.jpg');
        title.width = window.innerWidth / 6;
        title.id = 'title';
        title.height = window.innerHeight / 6;
        title.x = 2 * title.width * 0.95 + window.innerHeight * 0.2;

        let btnPlay = new Button();
        btnPlay.id = 'play';
        btnPlay.text = 'PLAY';
        btnPlay.fontSize = '30px';  
        btnPlay.width = window.innerWidth / 14;
        btnPlay.height = window.innerHeight / 12;
        btnPlay.elm.style.borderRadius = '12px';
        btnPlay.x = window.innerWidth / 2.2;
        btnPlay.y = window.innerHeight / 3;
        btnPlay.elm.style.color = 'LightGreen';
        btnPlay.elm.style.background = 'white';
        btnPlay.on('click', this.play.bind(this));
        btnPlay.on('mouseenter',this.mouseenter.bind(this));
        btnPlay.on('mouseleave',this.mouseleave.bind(this));

        let btnMode = new Button();
        btnMode.id = 'mode';
        btnMode.text = 'MODE';
        btnMode.fontSize = '30px';  
        btnMode.width = window.innerWidth / 14;
        btnMode.height = window.innerHeight / 12;
        btnMode.elm.style.borderRadius = '12px';
        btnMode.x = window.innerWidth / 2.2;
        btnMode.y = window.innerHeight / 2.34;
        btnMode.elm.style.color = 'LightGreen';
        btnMode.elm.style.background = 'white';
        btnMode.on('click', this.mode.bind(this));  //ADD FUNCTION MODE
        btnMode.on('mouseenter',this.mouseenter.bind(this));
        btnMode.on('mouseleave',this.mouseleave.bind(this));

        let btnQuit = new Button();
        btnQuit.id = 'quit';
        btnQuit.text = 'QUIT';
        btnQuit.fontSize = '30px';  
        btnQuit.width = window.innerWidth / 14;
        btnQuit.height = window.innerHeight / 12;
        btnQuit.elm.style.borderRadius = '12px';
        btnQuit.x = window.innerWidth / 2.2;
        btnQuit.y = window.innerHeight / 1.9;
        btnQuit.elm.style.color = 'LightGreen';
        btnQuit.elm.style.background = 'white';
        btnQuit.on('click', this.quit.bind(this));  //ADD FUNCTION QUIT
        btnQuit.on('mouseenter',this.mouseenter.bind(this));
        btnQuit.on('mouseleave',this.mouseleave.bind(this));

        this.addChild(bg);
        this.addChild(btnPlay);
        this.addChild(btnMode);
        this.addChild(btnQuit);
        this.addChild(title);
    }

    mouseenter(evt) {
        var btn = evt.target;
        btn.style.color = 'White';
        btn.style.background = 'LightGreen';
        gsap.to(document.getElementById(btn.id), { duration: 0.5, opacity: 1, scaleX: 1.5, scaleY: 1.5, zIndex: 99 });
    }

    mouseleave(evt) {
        var btn = evt.target;
        btn.style.color = 'LightGreen';
        btn.style.background = 'white';
        gsap.to(document.getElementById(btn.id), { duration: 0.5, opacity: 1, scaleX: 1, scaleY: 1, zIndex: 1 });
    }

    AddMinutesToDate(date, minutes) {
        var newDate = new Date();
        newDate = date.getTime() + minutes*60000;
        return newDate;
    }

    play() {
        //document.getElementById('play').style.display = 'none';
        //document.getElementById('quit').style.display = 'none';
        //document.getElementById('mode').style.display = 'none';
        document.getElementById('play').remove();
        document.getElementById('quit').remove();
        document.getElementById('mode').remove();
        
        score = 1000;
        countClick = 0;
        win = 0;
        clickedImg = [];

        let bg = new Card('./img/bg.jpg');
        bg.width = window.innerWidth;
        bg.height = window.innerHeight;

        let vic = new Card('./img/victory.jpeg');
        vic.width = window.innerWidth;
        vic.height = window.innerHeight;
        vic.elm.style.display = 'none';
        vic.id = 'victory';

        let title = new Card('./img/title.jpg');
        title.width = window.innerWidth / 6;
        title.id = 'title';
        title.height = window.innerHeight / 6;
        title.x = 2 * title.width * 0.95 + window.innerHeight * 0.2;

        let showScore = new Label('score', score, 80);
        showScore.x = window.innerWidth / (10.5);
        showScore.y = window.innerHeight / 7;

        let labelScore = new Label('labelscore', 'Score', 60, 'red');
        labelScore.x = window.innerWidth / 10;
        labelScore.y = window.innerHeight / 8.5;

        let time = 0;
        let timer = new Label('timer', time, 60,'black');
        timer.x = window.innerWidth / 1.3;
        timer.y = window.innerHeight / 7;
        timer.elm.style.display = 'none';

        let btnPlayAgain = new Button();
        btnPlayAgain.text = 'Play Again';
        btnPlayAgain.fontSize = '40px';
        btnPlayAgain.width = window.innerWidth / 5;
        btnPlayAgain.height = window.innerHeight / 6;
        btnPlayAgain.x = window.innerWidth / 2.5;
        btnPlayAgain.y = window.innerHeight / 1.5;
        btnPlayAgain.backgroundColor = 'LightGreen';
        btnPlayAgain.color = 'White';
        btnPlayAgain.elm.style.display = 'none';
        btnPlayAgain.id = 'btnAgain';
        btnPlayAgain.on('click', this.onClickAgain.bind(this));

        let imgLose = new Card('./img/lose.jpeg','lose');
        imgLose.width = window.innerWidth / 4;
        imgLose.height = window.innerWidth / 4;
        imgLose.x = window.innerWidth / 2.55;
        imgLose.y = window.innerHeight / 1;
        imgLose.elm.style.display = 'none';

        let btnReturn = new Button();
        btnReturn.text = 'Return';
        btnReturn.fontSize = '40px';
        btnReturn.width = window.innerWidth / 5;
        btnReturn.height = window.innerHeight / 6;
        btnReturn.x = window.innerWidth / 2.52;
        btnReturn.y = window.innerHeight / 1.38;
        btnReturn.backgroundColor = 'White';
        btnReturn.color = 'Black';
        btnReturn.elm.style.display = 'none';
        btnReturn.id = 'btnReturn';
        btnReturn.on('click', this.onClickAgain.bind(this));

        this.addChild(bg);
        this.addChild(imgLose);
        this.addChild(vic);
        this.addChild(title);
        this.addChild(showScore);
        this.addChild(labelScore);
        this.addChild(timer);
        this.addChild(btnPlayAgain);
        this.addChild(btnReturn);
        this._initSize();
        this._initCards();
        this._initRandom();
    }

    mode() {
        console.log('Hello World');
    }

    quit() {
        window.close();
    }

    _initSize() {    //Window to play game;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    countdown(minute,second) {
        var minute = minute;
        var second = second;
        document.getElementById('timer').innerHTML = '0' + minute + ':' + '00';
        var x = setInterval(() => {
            if(score <= 0) clearInterval(x);
            if(second < 10) document.getElementById('timer').innerHTML = '0' + minute + ':' + '0' + second;
            else document.getElementById('timer').innerHTML = '0' + minute + ':' + second;
            second--;
            if(second < 0) {minute--; second = 59;}
            if(second === 0 && minute === 0) this.timeout();
        }, 1000);
    }

    timeout() {
        for (let index = 0; index < 20; index++) {
            document.getElementById(index).remove();
        }
        document.getElementById('score').remove();
        document.getElementById('timer').remove();
        document.getElementById('labelscore').remove();
        document.getElementById('btnAgain').style.display = 'block';
    }

    resetClick() {
        this.play;
    }

    _initRandom() {
        var name = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //var arr = new Array(20).fill(0);
        var arr = [];
        for (let i = 0; i < 20; i++) arr.push(-1);
        for (let i = 0; i < 20; i++) {
            let random = Math.floor(Math.random() * 10);
            while (name[random] >= 2) {
                random = Math.floor(Math.random() * 10);
            }
            name[random]++;
            arr[i] = random;
        }
        return arr;
    }

    _initCards() {
        var randomname = this._initRandom();
        for (let i = 0, img = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++, img++) {
                let card = new Card('./img/back.jpeg', img, randomname[img]);
                let posy = i * (window.innerWidth / 12) + window.innerHeight * 0.2;
                let posx = j * (window.innerWidth / 12) + window.innerWidth * 0.3;
                card.y = window.innerHeight / 2.5;
                card.x = window.innerWidth / 1.2;
                card.width = window.innerWidth / 8;
                card.height = window.innerHeight / 4;
                card.id = img;
                card.valueCard = randomname[img];
                this.addChild(card);
                animate.cardMove(card, posx, posy, card.width, card.height, img);
                card.on("click", this.onClickCard.bind(this));
            }
        }
        gsap.delayedCall(6.5, () => { 
            clickable = true;
            var date = new Date();
            time = this.AddMinutesToDate(date,1);
            this.countdown(3, 0);
            document.getElementById('timer').style.display = 'block';
         });
    }

    onClickCard(evt) {
        if (clickable === false) return;
        if(countClick >= 2) return;
        let card = evt.target;
        clickedImg.push(card);
        countClick++;
        if (countClick === 2) {
            if (clickedImg[0].id === clickedImg[1].id) {
                countClick--; clickedImg.pop();
                return;
            }
        }
        if (countClick === 2) clickable = false;
        animate.cardFlipAnimate(card);
        gsap.delayedCall(0.4, () => {
            clickedImg[countClick - 1].src = './img/trucxanh' + card.valueCard + '.jpg';
            if(countClick === 2) {
                clickable = false;
                gsap.delayedCall(0.4, () => {
                    this.checkValue(clickedImg[0],clickedImg[1]);
                })
            }
        })
    }

    checkOver() {
        if(score <= 0) {
            for (let index = 0; index < 20; index++) {
                document.getElementById(index).remove();
            }
            document.getElementById('score').remove();
            document.getElementById('labelscore').remove();
            document.getElementById('timer').remove();
            document.getElementById('btnAgain').style.display = 'block';
            document.getElementById('lose').style.display = 'block';
        }
        if (win === 10) {
            for (let index = 0; index < 20; index++) {
                document.getElementById(index).remove();
            }

            document.getElementById('score').remove();
            document.getElementById('labelscore').remove();
            document.getElementById('title').remove();
            document.getElementById('timer').remove();
            document.getElementById('victory').style.display = 'block';
            document.getElementById('btnReturn').style.display = 'block';
        }
    }

    reset() {
        clickable = true;
        clickedImg = [];
        countClick = 0;
    }

    onClickAgain() {
        location.reload();
    }

    checkValue(item1, item2) {
        if (item1.valueCard === item2.valueCard) {
            animate.cardCorrect(item1);
            animate.cardCorrect(item2);
            score = animate.updateScore(true, score, 'score');
            win++;
            var correct = new Audio('./sound/correct.wav');
            correct.play();

        }
        else {
            setTimeout(() => {
                document.getElementById(item1.id).src = './img/back.jpeg';
                document.getElementById(item2.id).src = './img/back.jpeg';
            }, 400)
            var wrong = new Audio('./sound/wrong.wav');
            wrong.play();
            score = animate.updateScore(false, score, 'score');
            animate.cardFlipAnimate(item1);
            animate.cardFlipAnimate(item2);
        }
        gsap.delayedCall(0.4, this.reset);
        gsap.delayedCall(1, this.checkOver);;
    }
}