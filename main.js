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

function check(){
    var img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
};

function gotResult(error, result){
    if(error){
        console.error();
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak();
        if(result[0].label == "Angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545";
        }
        if(result[0].label == "Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532";
        }
        if(result[0].label == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128512";
        }

        if(result[1].label == "Angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128545";
        }
        if(result[1].label == "Sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532";
        }
        if(result[1].label == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128512";
        };
    };
};