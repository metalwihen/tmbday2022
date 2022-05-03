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
      const userAnswer = answerInput.value.trim().toLowerCase();
      const correctAnswer = getCurrentRiddle().get("answer"); 

      console.log("userAnswer = "+userAnswer);
      console.log("correctAnswer = "+correctAnswer);

      answerInput.value = ''; 
      if(correctAnswer.includes(userAnswer)){
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
    answerInput.value = getCurrentRiddle().get("answer")[0].toUpperCase();
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
  
  // Riddle #1 - Done
  const riddle1 = new Map();
  riddle1.set('title',"Multilingual");
  riddle1.set('question',"Handwritten words that hoped to guide.\nBut instead brought joy to the visiting side.\n\nWhat were the words?");
  riddle1.set('answer',["chammanthi podi","chammanthippodi","podi"]);
  riddle1.set('msg_drop_button',"Drop Block #1")
  riddle1.set('msg_success',"That's correct! You got the block!");
  riddle1.set('msg_failure',"Oh no. That's not right!");
  
  // Riddle #2 - Done
  const riddle2 = new Map();
  riddle2.set('title',"Resilience");
  riddle2.set('question',"The symptoms were strong but you prevailed.\nWhat was the name of this perilous trail?");
  riddle2.set('answer',["phulara ridge trek","phulara ridge"]);
  riddle2.set('msg_drop_button',"Drop Block #2")
  riddle2.set('msg_success',"That's correct! You got the block!");
  riddle2.set('msg_failure',"Oh no. That's not right!");

  
  // Riddle #3 - Done
  const riddle3 = new Map();
  riddle3.set('title',"Nostalgia");
  riddle3.set('question',"In this place, we had much fun.\nWe swam. We ran. We tanned in the sun.\nMuch has changed as decades have passed.\nThe memories however will surely last.\n\nDo you know where this is?");
  riddle3.set('answer',["udumbanoor","dam"]);
  riddle3.set('msg_drop_button',"Drop Block #3")
  riddle3.set('msg_success',"That's correct! You got the block!");
  riddle3.set('msg_failure',"Oh no. That's not right!");
  
  // Riddle #4 - Done
  const riddle4 = new Map();
  riddle4.set('title',"Skill");
  riddle4.set('question',"A hand gesture made by one to another.\nMuch like sending flying kisses.\nBut it isn't romantic.\nA visual language, what does it mean?");
  riddle4.set('answer',["thanks","thank you"]);
  riddle4.set('msg_drop_button',"Drop Block #4")
  riddle4.set('msg_success',"That's correct! You got the block!");
  riddle4.set('msg_failure',"Oh no. That's not right!");
  
  // Riddle #5
  const riddle5 = new Map();
  riddle5.set('title',"Trivia");
  riddle5.set('question',"A creature swam against the current.\nOne day, it reached the top of a waterfall.\nThe gods were impressed and rewarded it.\nAnd now this once-feeble creature stands tall.\n\nWho's that pokemon inspired by this chinese tale?");
  riddle5.set('answer',["magikarp"]);
  riddle5.set('msg_drop_button',"Drop Block #5")
  riddle5.set('msg_success',"That's correct! You got the block!");
  riddle5.set('msg_failure',"Oh no. That's not right!");

  // Riddle #6
  const riddle6 = new Map();
  riddle6.set('title',"?!");
  riddle6.set('question',"...");
  riddle6.set('answer',["ellipsis"]);
  riddle6.set('msg_drop_button',"Drop Block #6")
  riddle6.set('msg_success',"That's correct! You got the block!");
  riddle6.set('msg_failure',"Oh no. That's not right!");
  
  riddles.set(buttonNumbers[0], riddle1);
  riddles.set(buttonNumbers[1], riddle2);
  riddles.set(buttonNumbers[2], riddle3);
  riddles.set(buttonNumbers[3], riddle4);
  riddles.set(buttonNumbers[4], riddle5);
  riddles.set(buttonNumbers[5], riddle6);
}

function setCowSpeak(msg){
  const cowSpeakText = document.getElementById("cow-speak-text");
  cowSpeakText.textContent =msg;
}

function showVictory(){
  setCowSpeak("Too many obstacles... I'll go eat the neighbour's plants. Also, Happy Birthday!");

  showSnackbar("You win! Hooray!");
  
  var audio = new Audio('assets/audio/moo.mp3');
  audio.play();
}
