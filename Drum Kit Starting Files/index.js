let isRecording = false;
let recordedChunks = [];
let mediaRecorder;

function handleInstrumentClick(instrument) {
  alert("Stay tuned for " + instrument + "!");
}

// Adding event listeners to "Guitar" and "Piano" links in the navbar
document.querySelector('.nav-item:nth-child(1) .nav-link').addEventListener('click', function() {
  handleInstrumentClick("Guitar");
});

for(var i=0; i<document.querySelectorAll(".drum").length; i++){
  document.querySelectorAll(".drum")[i].addEventListener("click", function(){
      
      var button = this.innerHTML;
      makeSound(button);
      buttonAnimation(button);
      
      if (isRecording) {
        recordedChunks.push(button);
      }
  });
}

document.addEventListener("keypress", function(event){
    makeSound(event.key);
    buttonAnimation(event.key);
    
    if (isRecording) {
      recordedChunks.push(event.key);
    }
})

function makeSound(key){
    switch(key){
        case "w":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;
        case "d":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;
        case "j":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;
        case "k":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
            break;
        case "l":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;
        default: console.log(button);
        
    }
}

function buttonAnimation(key){
    var keyPressed = document.querySelector("." + key);

    keyPressed.classList.add("pressed");

    setTimeout(function(){
        keyPressed.classList.remove("pressed");
    }, 100)
}

document.getElementById("startRecording").addEventListener("click", function() {
  startRecording();
});

document.getElementById("stopRecording").addEventListener("click", function() {
  stopRecording();
});

document.getElementById("saveRecording").addEventListener("click", function() {
  saveRecording();
});

function startRecording() {
  isRecording = true;
  recordedChunks = [];
  const options = { mimeType: 'audio/webm' };
  recordedChunks = [];
  mediaRecorder = new MediaRecorder(new MediaStream(), options);
  mediaRecorder.ondataavailable = function(e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };
  mediaRecorder.start();
}

function stopRecording() {
  isRecording = false;
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
  }
}

function saveRecording() {
  const blob = new Blob(recordedChunks, { type: 'audio/webm' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'recorded_audio.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}