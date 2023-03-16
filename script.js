let history = {}
class unitconvertor { // basic unit conversion functions

    lengthC(arg1, arg1Type, arg2Type) {

        if(arg1Type === arg2Type ) return arg1;

        if (arg1Type === "km") {

            if (arg2Type === "m") return arg1 * 1000;

            if (arg2Type === "cm") return arg1 * 100000;


        }


        if (arg1Type === "m") {

            if (arg2Type === "km") return arg1 * 0.001;

            if (arg2Type === "cm") return arg1 * 100;

        }


        if (arg1Type === "cm") {

            if (arg2Type === "km") return arg1 * 0.00001

            if (arg2Type === "m") return arg1 * 0.01



        }


    }

    dataC(arg1, arg1Type, arg2Type) {
        if(arg1Type === arg2Type ) return arg1;

        if (arg1Type === "MB") {

            if (arg2Type === "GB") return arg1 * 0.0009765625;

            if (arg2Type === "KB") return arg1 * 1024;


        }


        if (arg1Type === "GB") {

            if (arg2Type === "MB") return arg1 * 1024;

            if (arg2Type === "KB") return arg1 * 1048576;

        }


        if (arg1Type === "KB") {

            if (arg2Type === "GB") return arg1 * 0.00000095367432

            if (arg2Type === "MB") return arg1 * 0.0009765625



        }


    }

    timeC(arg1, arg1Type, arg2Type) {
        if(arg1Type === arg2Type ) return arg1;

        if (arg1Type === "min") {

            if (arg2Type === "sec") return arg1 * 60;

            if (arg2Type === "hour") return arg1 * (1 / 60);


        }


        if (arg1Type === "sec") {

            if (arg2Type === "min") return arg1 * (1 / 60);

            if (arg2Type === "hour") return arg1 * (1 / 3600);

        }


        if (arg1Type === "hour") {

            if (arg2Type === "min") return arg1 * 60

            if (arg2Type === "sec") return arg1 * 3600



        }


    }



}


/// calculator class////


class calculator {

    constructor() {
        this.operations = document.querySelector(".operations");
        this.answers = document.querySelector(".answers")
        this.previousNum = null;
        this.currentNum = null;
        this.operatorNum = ""
    }

    updateCurrent(val) {
        this.current.innerHTML = val;
    }
    updatePrevious(val) {
        this.previous.innerHTML = val;
    }

    delete() {// delete button functionality

        if (this.operations.innerHTML.length > 0) {//Checking if there is something in to be deleted

            this.operations.innerHTML = this.operations.innerHTML.slice(0, (this.operations.innerHTML.length) - 1) // deleting last character
            try {
                this.answers.innerHTML = "=" + (eval(this.operations.innerHTML) || "")// reevaluating the answer
            } catch (error) {
            }
        }
    }

    all_clear() {// all clear button funcitonality
        this.operations.innerHTML = ""
        this.answers.innerHTML = ""
    }


    number(num) {// when ever a number/operator is added
        if (this.operations.innerHTML === "" && num === '0') return;// zero cannot be added if there is nothing previously entered for example 05 + 3 is illegal only 5+3 will work
        if (("+*/-").includes((this.operations.innerHTML.charAt(this.operations.innerHTML.length - 1))) && ("+*/").includes(num)) return; // two operators cannot be added together example 4+/6 is illegal only exveption is '-' 5+-4 is legal
        this.operations.append(num)
        try {
            this.answers.innerHTML = "=" + eval(this.operations.innerHTML)// evalutaing the answer
        } catch (error) {
        }

    }
    equals() { // equals button funcitonality
        history[this.operations.innerHTML] = this.answers.innerHTML // making key value pair of oepations and answer
        this.operations.innerHTML = eval(this.operations.innerHTML) // evaluatinng
        this.answers.innerHTML = ""//claring the small output
        historydiv.innerHTML = 'History : <br><br>'; // adding heading in history div

        for (const [key, value] of Object.entries(history)) {
            historydiv.innerHTML += (`${key} ${value} <br>`);  // adding key valye pair in history div
        }

    }

};

// History Function
function historyfun() {
    if (historydiv.style.visibility != 'visible' && historydiv.innerHTML.length > 0) { // hiding and unhiding history div
        historydiv.style.visibility = 'visible';
        return;
    }
    historydiv.style.visibility = 'hidden';

}


// Driver code
const calc = new calculator; // creating calcualtor class object

numberButtons = document.querySelectorAll(".number")// selecting all numbers and binding it to it's corresponding function
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.number(button.innerHTML)
    })
})

// console.log(numberButtons)
allClearButton = document.querySelector(".all-clear") // selecting all clear button and binding it to it's corresponding function
allClearButton.addEventListener('click', () => {
    calc.all_clear()
})

deleteButton = document.querySelector(".delete") // selecting delete button and binding it to it's corresponding function
deleteButton.addEventListener('click', () => {
    calc.delete()
})

equalsToButton = document.querySelector(".equals-to")// selecting equals to button and binding it to it's corresponding function
equalsToButton.addEventListener('click', () => {
    calc.equals()
})
historybtn = document.querySelector(".historybtn") // selecting history button and binding it to it's corresponding function
historybtn.addEventListener('click', () => {
    historyfun()
})
historydiv = document.querySelector(".history")


historydiv.style.visibility = 'hidden'; // hiding history div




//////////////////////////////////Unit Convertor's driver code////////////////////////////////


const uc1 = new unitconvertor; // unit convertor object is created
let ucdiv = document.querySelector(".unitconvertor") 
let crsbtn = document.querySelector(".close")
crsbtn.addEventListener('click', () => {  // cross button event listener

    ucdiv.style.visibility = 'hidden'
    numberButtons.forEach(button => {

        button.style.pointerEvents = 'auto';
        equalsToButton.style.pointerEvents = 'auto'; // making calulator's button usable again
    })
})
ucdiv.style.visibility = 'hidden'
function unitconvertorfun() {
    ucdiv.style.visibility = 'visible';
    numberButtons.forEach(button => {

        button.style.pointerEvents = 'none';
        equalsToButton.style.pointerEvents = 'none'; // making caluclator button unusable
    })


}
morebtn = document.querySelector(".more")
morebtn.addEventListener('click', () => {
    unitconvertorfun();
})

const conversionType = document.getElementById("Conversion-type"); // selecting converison type select tag
const conversionFromSelect = document.getElementById("Conversion-from"); // selecting conversion form select tag
const conversionToSelect = document.getElementById("Conversion-to"); // selectiong conversion to select tag
const input =document.querySelector('.input'); // selecting input box
const outputbox = document.querySelector('.output-box') // selecting output box

conversionType.addEventListener('change', () => { //populating converison options according to type
    input.value = ""
    outputbox.value = ""
    const value = conversionType.options[conversionType.selectedIndex].value;
    if(value == "Length"){
        populateSelect(conversionFromSelect, ["km", "m", "cm"]);
        populateSelect(conversionToSelect, ["km", "m", "cm"]);
        
    }
    else if (value == "Time"){
        populateSelect(conversionFromSelect, ["min", "sec", "hour"]);
        populateSelect(conversionToSelect, ["min", "sec", "hour"]);
        
    }
    
    else if (value == "Data"){
        populateSelect(conversionFromSelect, ["MB", "GB", "KB"]);
        populateSelect(conversionToSelect, ["MB", "GB", "KB"]);
    }
})

function populateSelect(select, values) { // populating function
    select.innerHTML = "";
    for (const value of values) {
      const option = document.createElement("option");
      option.value = value;
      option.text = value;
      select.add(option);
    }
  }



conversionFromSelect.addEventListener("change",()=>{// runnign converison funtion whenever a select tag is selected
    calculateUnit();
})

conversionToSelect.addEventListener("change",()=>{// runnign converison funtion whenever a select tag is selected
    calculateUnit();
})

input.addEventListener("keyup",()=>{ // runnign converison funtion whenever something is enetered
    calculateUnit();
})
let convertedValue = null
function calculateUnit(){ // converison is happening using class and it's function
    const inputValue = document.querySelector('.input').value;
    let conversionTypeVal = conversionType.value
    let conversionFrom = conversionFromSelect.options[conversionFromSelect.selectedIndex].value
    let conversionTo = conversionToSelect.options[conversionToSelect.selectedIndex].value
    if (conversionTypeVal === "Length") {
        convertedValue = uc1.lengthC(Number(inputValue), conversionFrom, conversionTo);
        outputbox.value = convertedValue
    } else if (conversionTypeVal === "Time") {
        convertedValue = uc1.timeC(Number(inputValue), conversionFrom, conversionTo);
        outputbox.value = convertedValue
    } else if (conversionTypeVal === "Data") {
        convertedValue = uc1.dataC(Number(inputValue), conversionFrom, conversionTo);
        outputbox.value = convertedValue
    }
}