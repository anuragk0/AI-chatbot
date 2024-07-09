const bg = document.querySelector('button')
var socket = io()

var textSpeech = "";
function synthVoice(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
  }
bg.addEventListener('click',function(){
    var speech = true;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            if (transcript) {
                document.getElementById('message-1').innerHTML = transcript
              } else {
                console.log("Empty transcript");
              } 
              textSpeech = transcript;
    });
    recognition.addEventListener("audioend", e=>{
        if (textSpeech) {
            socket.emit('chat message', textSpeech);
            
            socket.on('message', (msg) => {

                window.speechSynthesis.cancel(); // Stop any ongoing speech

                synthVoice(msg)
                document.getElementById('message-2').innerHTML = msg
            });

            textSpeech = '';
          }
    })

    if (speech == true) {
        recognition.start();
    }
})


