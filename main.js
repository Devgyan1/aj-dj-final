song = "";
leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

scoreLeftWrist=0;
scoreRightWrist=0; 

function preload(){
    song = loadSound("music.mp3")
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    stroke("#3c05f0");
    fill("#180261");

    circle(rightWristX, rightWristY, 30)
if (scoreRightWrist > 0.2) {
    if (rightWristY >0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML ="Speed = 0.5x";
        song.rate(0.5);
    }

    else if (rightWristY >100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML ="Speed = 1x";
        song.rate(1);
    }

    else if (rightWristY >200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML ="Speed = 1.5x";
        song.rate(1.5);
    }

    else if (rightWristY >300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML ="Speed =2x";
        song.rate(2);
    }

    else if (rightWristY >400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML ="Speed = 2.5x";
        song.rate(2.5);
    }
}
    if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 30);
    inNumber_leftWristY = Number(leftWristY);
    removedDecimalsLeft = floor(inNumber_leftWristY);
        volume = removedDecimalsLeft/500;

        document.getElementById("volume").innerHTML ="Volume is set to" + volume + ".";
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
    song.setVolume(0);
    song.rate(0);
}

function modelLoaded(){
    console.log("Posenet is Initialized");
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);

        scoreLeftWrist= results[0].pose.keypoints[9].score;
        scoreRightWrist= results[0].pose.keypoints[10].score;
        console.log("Score right wrist:" + scoreRightWrist + "Score left wrist:" + scoreLeftWrist)

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("left wrist is at (" + leftWristX + leftWristY + ")");

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("right wrist is at (" + rightWristX + rightWristY + ")");
    }
}