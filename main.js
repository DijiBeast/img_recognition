var previous_result = "";
function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(675, 400);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelloaded);
}

function draw()
{
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

function modelloaded()
{
  console.log("MODEL LOADED!");
}

function gotResult(error, results) 
{
  if (error) 
  {
    console.log(error);
  }
  else
  {
    if ((results.confidence > 0.5) && (previous_result != results[0].label))
    {
      console.log(results);
      previous_result = results[0].label;
      synth = window.speechSynthesis;
      speak_data = "Object detected is : " + results[0].label;
      var utter_This = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utter_This);
      document.getElementById("results_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
} 