const fromText= document.querySelector(".from-text");
const toText= document.querySelector(".to-text");
const selectTag= document.querySelectorAll("select");
const exchangeIcon= document.querySelector(".exchange");
const translateBtn = document.querySelector("button");
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
       let selected;
       if (id == 0 && country_code == "en-GB") {
        selected = "selected";
       }else if(id == 1 && country_code == "hi-IN"){
              selected = "selected";
       }
       let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
    }
    
});

exchangeIcon.addEventListener("click",()=>{
 let tempText = fromText.value,
 tempLang = selectTag[0].value;
 fromText.value = toText.value;
 selectTag[0].value = selectTag[1].value;
 toText.value = tempText;
 selectTag[1].value = tempLang;
});


translateBtn.addEventListener("click",()=>{
     let text = fromText.value,
     translateForm = selectTag[0].value,
     translateTo = selectTag[1].value;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateForm}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
    });
  
   
});
icons.forEach(icon => {
    icon.addEventListener("click",({target})=>{
     if (target.classList.contains("fa-copy")) {
        if (target.id == "from") {
            navigator.clipboard.writeText(fromText.value);
        }else{
            navigator.clipboard.writeText(toText.value);
        }
     }else{
        //create a variable named utterance.and request to give sound in the textarea.
        let utterance;
        if (target.id == "from") {
            utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang = selectTag[0].value;
        }else{
            utterance = new SpeechSynthesisUtterance(toText.value);
            utterance.lang = selectTag[1].value;
        }
        speechSynthesis.speak(utterance);
        //to define the language in each textarea , we should give the language which an user have chosen.
     }
    });
});