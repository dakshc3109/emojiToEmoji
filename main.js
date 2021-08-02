//this is main.js

var prediction1 = "";
var prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

var camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = "<img id='captured_img' src='"+data_uri+"'>"
});
}

console.log("ml5.version", ml5.version);

var classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/BNPi1TWDy/model.json", modelLoaded);

function modelLoaded(){
    console.log("modelLoaded")
}

function speak(){
    var synth = window.speechSynthesis;
    var speak_data_1 = "First prediction is "+prediction1;
    var speak_data_2 = "and the second prediction is "+prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}