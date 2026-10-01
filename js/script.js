const equationNode = document.querySelector(".equation");
const resultNode = document.querySelector(".result");

const calc = {
    calcEquation: "",
    calcResult: "",
    num1: "",
    operand: null, 
    num2: "",
    result: null,
    evalRes() {
        if(this.operand === "+") return this.result = +this.num1 + +this.num2;
        if(this.operand === "-") return this.result = +this.num1 - +this.num2;
        if(this.operand === "*") return this.result = +this.num1 * +this.num2;
        if(this.operand === "/") return this.result = +this.num1 / +this.num2;
    },
    insertToken(token) {
        const last = this.calcEquation.slice(-1);
        if(!isNaN(token)){
            if(last === "="){
                this.num1 = "";
                this.operand = null;
                this.num2 = "";
                this.result = null;
                this.calcEquation = "";
                this.calcResult = "";
            }
            if(this.operand === null) this.num1 += token;
            else this.num2 += token;
            this.calcEquation += token;
            if("+-*/".includes(last)) this.calcResult = "";
            this.calcResult += token;
        }
        else if(token === '.' && last !== "."){
            if(last === "="){
                this.num1 = "0";
                this.operand = null;
                this.num2 = "";
                this.result = null;
                this.calcEquation = "0";
                this.calcResult = "0";
            }
            else if("+-*/".includes(last)){
                this.num2 = "0.";
                this.calcEquation += "0.";
                this.calcResult = "0.";
            }
            else if(this.operand === null && this.num1.includes(".") === false) {
                this.num1 += token;
                this.calcEquation += token;
                this.calcResult += token;       
            }
            else if(this.operand !== null && this.num2.includes(".") === false){
                this.num2 += token;
                this.calcEquation += token;
                this.calcResult += token;       
            }
        }
        else if("+-*/".includes(token)){
            if("+-*/".includes(last)){
                this.calcEquation = this.calcEquation.slice(0, -1) + token;
                this.operand = token;
            }
            else if(this.operand === null){
                if(last === "."){
                    this.calcEquation = this.calcEquation.slice(0, -1);
                    this.calcResult = this.calcResult.slice(0, -1);
                    this.num1 = this.num1.slice(0, -1);
                }
                this.operand = token;
                this.calcEquation += token;
            }
            else{
                if(last === "="){
                    this.num1 = this.result;
                    this.operand = token;
                    this.num2 = "";
                    this.result = null;
                    this.calcEquation = this.num1 + token;
                    this.calcResult = this.num1;
                }
                else{
                    if(last === "."){
                        this.calcEquation = this.calcEquation.slice(0, -1);
                        this.calcResult = this.calcResult.slice(0, -1);
                        this.num2 = this.num2.slice(0, -1);
                    }
                    this.evalRes();
                    this.num1 = this.result;
                    this.operand = token;
                    this.num2 = "";
                    this.calcEquation = this.num1 + this.operand;
                    this.calcResult = this.result;
                }   
            }
        }
        else if(token === '='){
            if(last === "="){
                this.num1 = this.result;
                this.evalRes();
                this.calcEquation = this.num1 + this.operand + this.num2 + "=";
                this.calcResult = this.result;
            }
            else if("+-*/".includes(last)){
                this.num2 = this.num1;
                this.evalRes();
                this.calcEquation = this.num1 + this.operand + this.num2 + "=";
                this.calcResult = this.result;
            }
            else if(this.operand == null){
                if(last === "."){
                    this.num1 = this.num1.slice(0, -1);
                    this.calcEquation = this.num1;
                    this.calcResult = this.num1;
                }
            }
            else{
                if(last === "."){
                    this.num2 = this.num2.slice(0, -1);
                }
                this.evalRes();
                this.calcEquation = this.num1 + this.operand + this.num2 + "=";
                this.calcResult = this.result;
            }
        }
        equationNode.textContent = this.calcEquation;
        resultNode.textContent = this.calcResult === "" ? "0" : this.calcResult;
    }
};

document.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if(button === null) return;
    if(button.closest(".buttons-ui") !== null){
        return calc.insertToken(button.textContent);
    }
});