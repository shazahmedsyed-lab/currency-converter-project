const baseURL =  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".res button");
let msg = document.querySelector("#msg");
let fromt = document.querySelector(".from");
let tot = document.querySelector(".to");

// for(code in countryList){
//     console.log(code,countryList[code]);
// }

for(let select of dropdowns){
    for(let code in countryList){
        let newValue = document.createElement("option");
            newValue.innerText = code;
            newValue.value = code;
            select.append(newValue);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("form input");
    //console.log(amount.value);
    let amtVal = amount.value;
    if(amtVal<1||amtVal==" "){
        amtVal=1;
        // console.log(amtVal);
        amount.value="1";
    }

    
    //console.log(fromt.value,tot.value);

    const URL = `${baseURL}/${fromt.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    //console.log(response);

    
let from = fromt.value.toLowerCase();
let to = tot.value.toLowerCase();

    let data =await response.json();
    //console.log(data);
    
    let rate = data[from][to];
    // console.log(rate);

    let convert = amtVal*rate;

    msg.innerText = `${amtVal} ${from.toUpperCase()} = ${convert} ${to.toUpperCase()}`;

})
