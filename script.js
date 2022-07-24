const lblWordEnglish = document.querySelector(".word_English");
const btnContinue = document.querySelector(".btn__continue");
const btnVerify = document.querySelector(".btn__verify");
const txtResponse = document.querySelector(".response__txtarea");
const txtMessage = document.querySelector(".txt__message");
const txtShowAnswer = document.querySelector(".txt__answerCorrect");
const btnSelect = document.querySelector(".btn__select");

let wordsVocabulary = [];
async function fetchtext(){
    let response = await fetch("http://localhost:3000/I1");
    let data = await response.json();
    wordsVocabulary= [...data];
    lblWordEnglish.textContent= wordsVocabulary[0].en;
}
fetchtext();
btnSelect.addEventListener("change",()=>{
    let level = btnSelect.options[btnSelect.selectedIndex].textContent;
    async function fetchtext(){
        let response = await fetch(`http://localhost:3000/${level}`);
        let data = await response.json();
        wordsVocabulary= [...data];
        lblWordEnglish.textContent= wordsVocabulary[0].en;
    }
    fetchtext();
    txtMessage.textContent=""
    txtResponse.value=""
    txtResponse.removeAttribute("disabled")
    txtShowAnswer.textContent=""
})


txtResponse.addEventListener("keypress",(event)=>{
    let key = event.keyCode;
    let value=txtShowAnswer.textContent
    if(key==13){
        txtResponse.setAttribute("disabled","disabled");
        event.preventDefault(); 
        if(txtMessage.textContent=="Correcto"){
            modifyList();
            txtMessage.textContent=""
        }else if(!value){
            console.log("entra aquí");
            validateAnswer(); 
        }else{
            modifyList();
        }
    }
})

/*Show the elements in screen*/
btnContinue.classList.add("displayNone")

const validateAnswer=()=>{
    txtMessage.classList.remove("displayNone")
    let value = txtResponse.value.split(" ").join("");
    let wordCorrect = wordsVocabulary[0].es.split(" ").join("");
    if(wordCorrect==value) {
        txtMessage.classList.remove("red")
        txtMessage.textContent="Correcto";
        txtMessage.classList.add("green")
    } else{
        txtMessage.classList.remove("green")
        txtMessage.classList.add("red")
        txtMessage.textContent="Incorrecto";
        txtShowAnswer.textContent= "La respuesta correcta es: "+wordsVocabulary[0].es;
    }
    btnContinue.classList.remove("displayNone");
    btnVerify.classList.add("displayNone");
    txtResponse.setAttribute("disabled","disabled");
}

const modifyList =()=>{
    /*Delete first element and show the next word */
    btnVerify.classList.remove("displayNone");
    btnContinue.classList.add("displayNone");
    txtShowAnswer.textContent="";
    txtResponse.value=""
    txtMessage.classList.add("displayNone")
    /*if is correct */
    if(wordsVocabulary.length<=0 || wordsVocabulary==null){
        return alert("Fin del juego")
    }else{
        if(wordsVocabulary.length==1){
            lblWordEnglish.textContent = wordsVocabulary[0].en;
        }else{
            lblWordEnglish.textContent= wordsVocabulary[1].en;
        }
    }
    if(txtMessage.textContent=="Correcto"){
       for (let i = 0; i  < wordsVocabulary.length-1; i++) {
            wordsVocabulary[i] = wordsVocabulary[i+1];
       }
       wordsVocabulary.pop()
    }else{
       aux=wordsVocabulary[0];
       for (let i = 0; i  < wordsVocabulary.length-1; i++) {
           wordsVocabulary[i] = wordsVocabulary[i+1];
      }
      wordsVocabulary[wordsVocabulary.length-1]=aux;
   }
}

btnVerify.addEventListener("click",()=>{
    validateAnswer();
})

btnContinue.addEventListener("click",()=>{
    modifyList();
    txtResponse.removeAttribute("disabled");
    txtResponse.focus();
})

