

function calculate(){
    var resultDiv = document.getElementById("result");

    var userInput = document.getElementById("userInput").value

    var nodes = userInput.split("|")

    var resultHTML = ""

    var coutner = 0

    nodes.forEach(element => {
        resultHTML += "<p>Node " + ++coutner + ": " + element + "</p>"
    });

    resultDiv.innerHTML = resultHTML

}