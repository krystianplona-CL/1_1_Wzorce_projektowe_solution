document.addEventListener("DOMContentLoaded", function(){

    var Calculator = (function(){

        var buttons = document.querySelectorAll("button");
        var historyView = document.querySelector(".calc-history");
        var equationView = document.querySelector(".calc-view");
        var operations = ["+", "-", "*", "/", ","];

        function attachEvents() {
            for (var i = 0; i < buttons.length - 1; i++) {
                buttons[i].addEventListener("click", function (event){
                    event.preventDefault();
                    var canIaddChar = checkEquation(event.target);
                    addCharacter(event.target, canIaddChar);
                });
            }

            buttons[buttons.length -1].addEventListener("click", function (event){
                event.preventDefault();
                calculate();
            });
        }

        function checkEquation(data) {

            var currentEquation = equationView.innerHTML;         
            var lastChar = currentEquation[currentEquation.length-1];
            var isLastCharOperation = checkIfCharIsOperation(lastChar);
            var isCurrentCharOperation = checkIfCharIsOperation(data.innerHTML);

            if ((isLastCharOperation && isCurrentCharOperation) || (lastChar === undefined && isCurrentCharOperation)) {
                return false;
            } 

            return true;

        }

        function checkIfCharIsOperation(char) {

            for (var i = 0; i < operations.length; i++) {
                if (operations[i] === char) {
                    return true;
                }
            }
            return false;
        }

        function addCharacter(data, flag) {
            if (flag) {
                equationView.innerHTML += data.innerHTML;
            }
        }

        function calculate() {
            var currentEquation = equationView.innerHTML;         
            var lastChar = currentEquation[currentEquation.length-1];
            var isLastCharOperation = checkIfCharIsOperation(lastChar);

            if (isLastCharOperation) {
                currentEquation = currentEquation.slice(0, -1);
            }

            var answer = eval(currentEquation);
            updateHistory(currentEquation + "=" + answer);
            equationView.innerHTML = answer;

        }

        function updateHistory(data) {
            var newElem = document.createElement("p");
            newElem.innerHTML = data;
            var currentHistory = historyView.querySelectorAll("p");
            historyView.insertBefore(newElem, currentHistory[0]);
        }

        function init() {
            attachEvents();
        }

        return {
            init: init
        }


    })();

    Calculator.init();

});