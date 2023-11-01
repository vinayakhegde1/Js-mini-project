function thankYouState(){
    document.getElementById("activeState").style.display = "none";

    document.getElementById("thankYouState").style.display = "flex";

    validate();
    score.innerText = `You selected ${theScore} out of 5`;
}

let theScore;
function validate(){
    if(document.getElementById("one").checked){
        theScore = 1;
    }else if(document.getElementById("two").checked){
        theScore = 2;
    }else if (document.getElementById("three").checked){
        theScore = 3;
    }else if (document.getElementById("four")){
        theScore = 4;
    }else if (document.getElementById("five")){
        theScore = 5;
    }else{
        theScore = "none";
    }
}