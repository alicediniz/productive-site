	// TIMER
var sound = document.getElementById("audio");


let newCicle = document.getElementById('newCicle');
let longBreak = document.getElementById('longBreak');

//circle start
let progressBar = document.querySelector('.e-c-progress');
let indicator = document.getElementById('e-indicator');
let pointer = document.getElementById('e-pointer');
let cPointer = document.querySelector('.e-c-pointer');
let length = Math.PI * 2 * 100;

progressBar.style.strokeDasharray = length;

function update(value, timePercent) {
	var offset = - length - length * value / (timePercent);
	progressBar.style.strokeDashoffset = offset; 
	pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`; 
};

//circle ends
const displayOutput = document.querySelector('.display-remain-time')
const pauseBtn = document.getElementById('pause');

let intervalTimer;
let timeLeft;
let workTime = 25 * 60;
let shortBreakTime = 5 * 60;
let longBreakTime = 20 * 60; 
let wholeTime = workTime;// manage this to set the whole time 
let isPaused = false;
let isStarted = false;
let work = true;
let longBreakInterval = false; 
function cicle () {
  update(wholeTime,wholeTime); //refreshes progress bar
  displayTimeLeft(wholeTime);
}


function changeTimerToWorkStyle () {
  // REMOVE SHORTBREAK STYLE 
  progressBar.classList.remove("shortBreak");
  displayOutput.classList.remove("shortBreak");
  cPointer.classList.remove("shortBreak");

  // REMOVE LONGBREAK STYLE
  progressBar.classList.remove("longBreak");
  displayOutput.classList.remove("longBreak");
  cPointer.classList.remove("longBreak");

  // ADD WORK STYLE 
  progressBar.classList.add("work");
  displayOutput.classList.add("work");
  cPointer.classList.add("work");
}

function changeTimerToBreakStyle () {
  // REMOVE LONGBREAK STYLE
  progressBar.classList.remove("longBreak");
  displayOutput.classList.remove("longBreak");
  cPointer.classList.remove("longBreak");

  // REMOVE WORK STYLE 
  progressBar.classList.remove("work");
  displayOutput.classList.remove("work");
  cPointer.classList.remove("work");

  // ADD SHORTBREAK STYLE 
  progressBar.classList.add("shortBreak");
  displayOutput.classList.add("shortBreak");
  cPointer.classList.add("shortBreak");
}

function changeTimerToLongBreakStyle () {
  // REMOVE WORK STYLE 
  progressBar.classList.remove("work");
  displayOutput.classList.remove("work");
  cPointer.classList.remove("work");

  // REMOVE SHORTBREAK STYLE 
  progressBar.classList.remove("shortBreak");
  displayOutput.classList.remove("shortBreak");
  cPointer.classList.remove("shortBreak");

  // ADD LONGBREAK STYLE
  progressBar.classList.add("longBreak");
  displayOutput.classList.add("longBreak");
  cPointer.classList.add("longBreak");
}


function interval () {
  wholeTime = shortBreakTime;
  changeTimerToBreakStyle();

  displayTimeLeft(wholeTime);  
  timer(wholeTime);
  isStarted = true;

}

function timer (seconds){ //counts time, takes seconds
  let remainTime = Date.now() + (seconds * 1000);
  displayTimeLeft(seconds);

  intervalTimer = setInterval(function(){
    timeLeft = Math.round((remainTime - Date.now()) / 1000);
    if(timeLeft < 0){
    	sound.play();
      work = !work;
      clearInterval(intervalTimer);
      isStarted = false;
      if (work == false && longBreakInterval == false) {
        interval();
      }
      else {
        wholeTime = 0.2*60;
        if (longBreakInterval == true) {
		  progressBar.classList.remove("longBreak");
		  displayOutput.classList.remove("longBreak");
		  cPointer.classList.remove("longBreak");
		  longBreakInterval = false; 
        }

        changeTimerToWorkStyle();
        displayTimeLeft(wholeTime);
        pauseBtn.classList.remove('pause');
        pauseBtn.classList.add('play');
      }
      return ;
    }
    displayTimeLeft(timeLeft);
  }, 1000);
}

function pauseTimer(event){
  if(isStarted === false){
    timer(wholeTime);
    isStarted = true;
    this.classList.remove('play');
    this.classList.add('pause');
  }else if(isPaused){
    this.classList.remove('play');
    this.classList.add('pause');
    timer(timeLeft);
    isPaused = isPaused ? false : true
  }else{
    this.classList.remove('pause');
    this.classList.add('play');
    clearInterval(intervalTimer);
    isPaused = isPaused ? false : true ;
  }
}

function displayTimeLeft (timeLeft){ //displays time on the input
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  displayOutput.textContent = displayString;
  update(timeLeft, wholeTime);
}

function newPomodoroCicle () {
	clearInterval(intervalTimer);
	changeTimerToWorkStyle();
	pauseBtn.classList.add('pause');
    pauseBtn.classList.remove('play');
	wholeTime = workTime;
	timer(wholeTime);
	isStarted = true;
}

function longInterval() {
	if (isStarted == false || isPaused == true ) {
		wholeTime = longBreakTime;

	
    changeTimerToLongBreakStyle();
		pauseBtn.classList.add('pause');
 	  pauseBtn.classList.remove('play');
		displayTimeLeft(wholeTime);
		timer(wholeTime);
		isStarted = true;
		longBreakInterval = true; 
	} 
}



pauseBtn.addEventListener('click',pauseTimer);
newCicle.addEventListener('click',newPomodoroCicle);
longBreak.addEventListener('click',longInterval);