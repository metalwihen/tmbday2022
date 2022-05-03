const _KEY = {
  ENTER: 13,
};

// global variables
const buttonNumbers = [
    1,
    2,
    3,
    4,
    5,
    6,
  ];
const riddles = new Map();
var currentRiddle = buttonNumbers[0];
var solvedRiddles = new Set();

// view variables
var answerInput = document.getElementById("riddle-answer-input");

// setup
addRiddles();
setupListenerRiddleInput();
setupListenerNumberButtons();
setupListenerDropButtons();
configureCurrentRiddle(currentRiddle);

function setupListenerNumberButtons() {
  for(buttonNumber of buttonNumbers){
    const buttonId = "number-button-" +  buttonNumber;
    let button = document.getElementById(buttonId);
    button.addEventListener("click", function(event) {
      let clickedButtonId = event.target.id;
      let digitSuffix = clickedButtonId.split("-")[2];
      console.log("Click "+clickedButtonId);
      configureCurrentRiddle(parseInt(digitSuffix)); 
    });
  }
}

function setupListenerRiddleInput(){
  answerInput.addEventListener('keyup',function(e){
    if (e.keyCode === _KEY.ENTER) {    	
      const userAnswer = answerInput.value.trim();
      const correctAnswer = getCurrentRiddle().get("answer"); 

      console.log("userAnswer = "+userAnswer);
      console.log("correctAnswer = "+correctAnswer);

      answerInput.value = ''; 
      if(userAnswer == correctAnswer){
        solvedRiddles.add(currentRiddle);
        configureCurrentRiddle(currentRiddle);
        showSnackbar(getCurrentRiddle().get("msg_success"));
      }else{
        showSnackbar(getCurrentRiddle().get("msg_failure"));
      }
    }
  });
}

function setupListenerDropButtons() {
    const buttonId = "riddle-drop-button";
    let button = document.getElementById(buttonId);
    button.addEventListener("click", function(event) {
      switch(currentRiddle){
        case 1: drawBlock1(); break;
        case 2: drawBlock2(); break;
        case 3: drawBlock3(); break;
        case 4: drawBlock4(); break;
        case 5: drawBlock5(); break;
        case 6: drawBlock6(); break;
      }
      if(solvedRiddles.size == 6){
        showVictory();
      }
    });
}

function getCurrentRiddle(){
  return riddles.get(currentRiddle);
}

function configureCurrentRiddle(number){
  currentRiddle = number;
  console.log("new-current = " + number);

  const qTitleSpan = document.getElementById("riddle-title-text");
  qTitleSpan.textContent = getCurrentRiddle().get("title");
  const questionSpan = document.getElementById("riddle-question-text");
  questionSpan.textContent = getCurrentRiddle().get("question");

  const dropButtonSpan = document.getElementById("riddle-drop-button-text");
  dropButtonSpan.textContent = getCurrentRiddle().get("msg_drop_button");

  const dropButton = document.getElementById("riddle-drop-button");
  
  if(solvedRiddles.has(number)){
    answerInput.value = getCurrentRiddle().get("answer");
    answerInput.disabled = true;

    dropButton.disabled = false;
  } else {
    answerInput.value = '';
    answerInput.disabled = false;

    dropButton.disabled = true;
  }

  configureNumberButtons();
}

function configureNumberButtons(){

  for(buttonNumber of buttonNumbers){
    const button = document.getElementById("number-button-" + buttonNumber);
    button.className = "number-button";
  }

  const currentButton = document.getElementById("number-button-" + currentRiddle);
  currentButton.className = "number-button-current";
  
}

  
function showSnackbar(msg){
  const snackbarText = document.getElementById("snackbar-text");
  snackbarText.textContent = msg;

  const snackbarView = document.getElementById("snackbar");
  snackbarView.className = "show";
  setTimeout(function(){ snackbarView.className = snackbarView.className.replace("show", ""); }, 3000);

}

function addRiddles(){
  // TODO: Canvas block?
  
  // Riddle #1
  const riddle1 = new Map();
  riddle1.set('title',"Resilience");
  riddle1.set('question',"What's capital of Canada?");
  riddle1.set('answer',"Ottawa");
  riddle1.set('msg_drop_button',"Drop Block #1")
  riddle1.set('msg_success',"You got it!");
  riddle1.set('msg_failure',"Almost There. Starts with an O!");
  
  // Riddle #2
  const riddle2 = new Map();
  riddle2.set('title',"Discipline");
  riddle2.set('question',"What's capital of Canada?");
  riddle2.set('answer',"Ottawa");
  riddle2.set('msg_drop_button',"Drop Block #2")
  riddle2.set('msg_success',"You got it!");
  riddle2.set('msg_failure',"Almost There. Starts with an O!");

  
  // Riddle #3
  const riddle3 = new Map();
  riddle3.set('title',"Bravery");
  riddle3.set('question',"What's capital of Canada?");
  riddle3.set('answer',"Ottawa");
  riddle3.set('msg_drop_button',"Drop Block #3")
  riddle3.set('msg_success',"You got it!");
  riddle3.set('msg_failure',"Almost There. Starts with an O!");

  riddles.set(buttonNumbers[0], riddle1);
  riddles.set(buttonNumbers[1], riddle2);
  riddles.set(buttonNumbers[2], riddle3);
  riddles.set(buttonNumbers[3], riddle3);
  riddles.set(buttonNumbers[4], riddle3);
  riddles.set(buttonNumbers[5], riddle3);
}

function setCowSpeak(msg){
  const cowSpeakText = document.getElementById("cow-speak-text");
  cowSpeakText.textContent =msg;
}

function showVictory(){
  setCowSpeak("Too many obstacles... I'll go eat the neighbour's plants. Also, Happy Birthday!");
}
