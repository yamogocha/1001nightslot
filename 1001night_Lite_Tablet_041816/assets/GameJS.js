/********** GAMEPLAY SPECIFIC JAVASCRIPT **********/
//This function resets the entire game and includes everything that needs to be reset, including updating the numbers. This will be different for each game
var restartGame = function() {
	totalSpin = 0;
	spinClickable = true;
	mNectarGame.totalNum = 100000;
	mNectarGame.totalBet = 3000;
	mNectarGame.winNum = 0;
	mNectarGame.megaWin=0;
	mNectarGame.animationTime = 3000;
	mNectarGame.animationSteps = 120;
	updateNum();
	slightOfHand(spin1);
	clearEffect1();
	clearEffect2();
	document.getElementById("yellowbar").className = "yellowbar";
	document.getElementById("greenbar").className = "greenbar";
	document.getElementById("yellowbar").style.webkitTransform="scaleX(0)";
	document.getElementById("greenbar").style.webkitTransform="scaleX(0)";
	document.getElementById("spin").className = "spin";
	document.getElementById("outro-container").style.display = 'none';
}
// CALL THIS WHEN THE USER FINISHES PLAYING YOUR BUILD
// this sends the user to the end of the game if the retry is clicked and the dl is not clicked
var finishGameplay = function() {
	if (typeof gotoEndScreen != 'undefined') {
		//this is a function in the engineering templates and will only work once this project is uploaded to the UI
		gotoEndScreen();
		//report that the user has finished the game
		if (typeof mn != 'undefined'){mn("play","100%");}
	}
	else {
		displayInstallScreen();
	}
}

/********** EXAMPLE JAVASCRIPT **********/


var spin1 = [
				[5,4,4,6,1,3,2,8,5,8,9,3,5,5,2,5,8,4], //reel1
				[1,3,7,1,9,7,2,8,5,3,5,3,5,11,4,6,3,2],  //reel2
				[12,2,1,4,4,5,2,8,5,6,9,12,5,5,2,7,9,5], //reel3
				[4,4,11,5,12,7,2,8,11,5,9,3,5,12,2,6,4,3], //reel4
				[7,12,11,3,6,7,2,5,5,10,9,3,5,5,6,8,9,1] //reel5
			];

var spin2 = [
				[1,11,10,10,5,7,2,7,7,5,9,3,5,5,4,4,6,1],
				[2,4,4,11,2,7,2,8,11,2,9,3,5,1,3,7,1,9],
				[5,7,4,4,1,7,12,8,5,8,9,3,5,12,2,1,4,4],
				[7,2,7,9,11,7,2,8,4,12,2,3,5,4,4,11,5,12],
				[12,11,4,4,6,7,11,8,7,4,9,3,5,7,12,11,3,6]
			];

var spin3 = [
				[3,9,7,2,5,7,2,8,2,5,11,3,5,1,11,10,10,5],
				[5,7,3,11,2,7,12,8,7,8,9,3,5,2,4,4,11,2],
				[2,2,11,3,7,6,2,8,3,8,9,3,5,5,7,4,4,1],
				[1,2,7,9,11,7,2,8,2,3,12,3,5,7,2,7,9,11],
				[11,8,2,7,1,2,11,8,2,6,9,3,5,12,11,4,4,6]
			];

var spin4 = [
				[1,2,3,10,3,7,2,8,6,6,9,3,5,3,9,7,2,5],
				[1,1,9,1,3,1,12,8,7,2,9,3,5,5,7,3,11,2],
				[3,5,9,4,3,7,2,8,8,4,9,8,5,2,2,11,3,7],
				[3,7,10,8,3,12,2,8,3,10,11,3,5,1,2,7,9,11],
				[4,2,3,1,6,7,2,8,3,6,9,11,6,11,8,2,7,1]
			];

var totalSpin = 0;
var spinClickable = true;
var mNectarGame = {};
	mNectarGame.winNum = 0;
	mNectarGame.megaWin=0;
	mNectarGame.totalNum = 100000;
	mNectarGame.totalBet = 3000;
	mNectarGame.animationTime = 3000;
	mNectarGame.animationSteps = 120;

function delimitNumbers(str) {
return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
  return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
});
}

var updateNum = function(){
	var won = delimitNumbers(mNectarGame.winNum);
	document.getElementById("winNum").innerHTML = won;
	var totalNum = delimitNumbers(mNectarGame.totalNum);
	document.getElementById("totalNum").innerHTML = totalNum;
	var megaWin = delimitNumbers(mNectarGame.totalNum);
	document.getElementById("megaPoint").innerHTML = megaWin;
}
updateNum();

var animateNum = function(winValues){
	//time per step
	var duration = mNectarGame.animationTime / mNectarGame.animationSteps;
	// value of each step
	var singleAmount = winValues / mNectarGame.animationSteps;

	incrementNum(duration, singleAmount, winValues);
}

var incrementNum = function(duration, singleAmount, winValues){
	mNectarGame.megaWin += singleAmount;
	mNectarGame.winNum += singleAmount;
	mNectarGame.totalNum += singleAmount;
	updateNum();
	setTimeout(function(){
		if (mNectarGame.winNum != winValues){
			incrementNum(duration, singleAmount, winValues);
		}
	}, duration);
}

var dimAll = function (){
	for (var r = 1; r <= 5; r++) {
		for (var e = 15 ; e <=18 ; e++) {
			var element = "reel" + r + "-" + e;  
			document.getElementById(element).className +=" dim" 
		};
	};
}

var brightAll = function (){
	for (var r = 1; r <= 5; r++) {
		for (var e = 15 ; e <=18 ; e++) {
			var element = "reel" + r + "-" + e;  
			document.getElementById(element).className +=" bright" 
		};
	};
}

var replaceImages = function (reelInfo){
	for (var r = 1; r <= 5; r++) {
		var currentReel = reelInfo[r-1];
		for (var e = 1 ; e <=18 ; e++) {
			var element = "reel" + r + "-" + e;  
			document.getElementById(element).className = "image" + currentReel[e-1];
		};
	};
}
replaceImages(spin1);

//set top px
for (var r = 1; r <= 5; r++) {
	for (var e = 1 ; e <=18 ; e++) {
		var element = "reel" + r + "-" + e;  
		// var currentReel
		document.getElementById(element).style.top =(e-1)*102 + "px" ;
	};
};

document.getElementById("spin").className = "spin";
var spin = function (){
	totalSpin++;
	document.getElementById("spin").className += " pressed";
	setTimeout(function(){
		document.getElementById("spin").className = " "
	 }, 150);
	mNectarGame.winNum=0;
	mNectarGame.totalNum -= mNectarGame.totalBet;
	updateNum();

	document.getElementById("reel1").className = "reel-spin";
	setTimeout(function(){
		document.getElementById("reel2").className = "reel-spin";
	 }, 200);
	setTimeout(function(){
		document.getElementById("reel3").className = "reel-spin";
	 }, 400);
	setTimeout(function(){
		document.getElementById("reel4").className = "reel-spin";
	 }, 600);
	setTimeout(function(){
		document.getElementById("reel5").className = "reel-spin";
	 }, 800);

	setTimeout(function(){
		if(totalSpin===1){
		 	slightOfHand(spin2);
			dimAll();
		 	document.getElementById("line1").className = "line1"
			document.getElementById("effect1").style.display = "block";
			document.getElementById("flash1").className += " flashmove";
			document.getElementById("flash2").className += " flashmove";
			document.getElementById("flash3").className += " flashmove";
		 	setTimeout(function(){
			 	document.getElementById("yellowbar").className += " bar1";
			 	document.getElementById("greenbar").className += " bar1";
			 	setTimeout(function(){
			 		document.getElementById("yellowbar").style.webkitTransform = "scaleX(.3)"
			 		document.getElementById("greenbar").style.webkitTransform = "scaleX(.3)"
			 	}, 300)
			 	var winAmount = mNectarGame.totalBet*1.5;
			 	mNectarGame.totalNum +=winAmount;
			 	animateNum(winAmount);
		    }, 800);
		setTimeout(function(){
			spinClickable=true;
			brightAll();
			clearEffect1();
			document.getElementById("spin").className = "spin";

	 	}, 4500);	

		 }
	 }, 1800);

	setTimeout(function(){
		if(totalSpin===2){
		 	slightOfHand(spin3);
		 	document.getElementById("yellowbar").className += " bar2";
		 	document.getElementById("greenbar").className += " bar2";
		 	setTimeout(function(){
			 		document.getElementById("yellowbar").style.webkitTransform = "scaleX(.6)"
			 		document.getElementById("greenbar").style.webkitTransform = "scaleX(.6)"
			 	}, 200)
			setTimeout(function(){
				spinClickable=true;
				document.getElementById("spin").className = "spin";
			}, 1000);
		}
	}, 1800);

	setTimeout(function(){
		if (totalSpin===3){
		 	slightOfHand(spin4);
		 	dimAll();
		 	document.getElementById("line2").className = "line2"
		 	document.getElementById("effect2").style.display = "block";
		 	document.getElementById("flash4").className += " flashmove";
			document.getElementById("flash5").className += " flashmove";
			document.getElementById("flash6").className += " flashmove";
			document.getElementById("flash7").className += " flashmove";
		 	setTimeout(function(){
		 		document.getElementById("yellowbar").className += " bar3";
		 		document.getElementById("greenbar").className += " bar3";

		 		setTimeout(function(){
			 		document.getElementById("yellowbar").style.webkitTransform = "scaleX(.9)"
			 		document.getElementById("greenbar").style.webkitTransform = "scaleX(.9)"

			 		document.getElementById("megaWin").style.display = "block";
					document.getElementById("megaWin").className += " enlargeWin";
					document.getElementById("megaPoint").style.opacity = "1";

			 		var winAmount = mNectarGame.totalBet*4.5;
			 		mNectarGame.totalNum +=winAmount;
			 		animateNum(winAmount);

			 	}, 700)
			 	
		    }, 800);
		 	
			setTimeout(function(){
				if (typeof gotoEndScreen != 'undefined') {
					gotoEndScreen();
					
					if(typeof mn != 'undefined'){mn("play","100%");}
				}
				else {
					displayInstallScreen();
				}

			}, 7000);
		}
	}, 1800);

	if (totalSpin === 1){
		if (typeof mn != 'undefined'){mn("play","25%");}
	}

	if (totalSpin === 2){
		if (typeof mn != 'undefined'){mn("play","50%");}
	}
	
	if (totalSpin === 3){
		if (typeof mn != 'undefined'){mn("play","75%");}
	}
}

var slightOfHand = function(reelInfo){

	document.getElementById("reel1").className = "reel-top";
	document.getElementById("reel2").className = "reel-top";
	document.getElementById("reel3").className = "reel-top";
	document.getElementById("reel4").className = "reel-top";
	document.getElementById("reel5").className = "reel-top";
	replaceImages(reelInfo);
}

var clickSpin = function(){
	if(spinClickable===true){
		spin();
		spinClickable=false;
	}
}

var clearEffect1 = function(){
	document.getElementById("line1").className = " "
	document.getElementById("effect1").style.display = "none";
	document.getElementById("flash1").className = "flashlight";
	document.getElementById("flash2").className = "flashlight";
	document.getElementById("flash3").className = "flashlight";
}

var clearEffect2 = function(){
	document.getElementById("line2").className = " "
	document.getElementById("effect2").style.display = "none";
	document.getElementById("flash4").className = "flashlight";
	document.getElementById("flash5").className = "flashlight";
	document.getElementById("flash6").className = "flashlight";
	document.getElementById("flash7").className = "flashlight";
	document.getElementById("megaWin").style.display = "none";
	document.getElementById("megaWin").className = "";
	document.getElementById("megaPoint").style.opacity = "0";
}

