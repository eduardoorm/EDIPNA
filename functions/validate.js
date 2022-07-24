
const btnContinue = document.querySelector(".btn__continue");
const btnVerify = document.querySelector(".btn__verify");
const txtResponse = document.querySelector(".response__txtarea");
const txtMessage = document.querySelector(".txt__message");
const txtShowAnswer = document.querySelector(".txt__answerCorrect");
export const validateAnswer = ()=>{
    txtMessage.classList.remove("displayNone")
    let value = txtResponse.value.split(" ").join("");
    
    if(intermediate3[0].es==value) {
        txtMessage.classList.remove("red")
        txtMessage.textContent="Correcto";
        txtMessage.classList.add("green")
    } else{
        txtMessage.classList.remove("green")
        txtMessage.classList.add("red")
        txtMessage.textContent="Incorrecto";
        txtShowAnswer.textContent= "La respuesta correcta es: "+intermediate3[0].es;
    }
    btnContinue.classList.remove("displayNone");
    btnVerify.classList.add("displayNone");
}