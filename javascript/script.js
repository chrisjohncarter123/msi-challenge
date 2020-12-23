
function onClick(){

    var userInput = document.getElementById("userInput").value

    var inputObject = inputToObject(userInput)

    display(userInput)

}

function inputToObject (userInput){

    

}

function display(nodesObject){
    
    var resultDiv = document.getElementById("result");

    var resultHTML = ""
    var coutner = 0
    var nodes = nodesObject.split("|")

    nodes.forEach(element => {

        resultHTML += "<p>Node " + coutner++ + ":"

        var items = element.split(",")

        resultHTML += "<p>parent_id - " + items[0] + "</p>"
        resultHTML += "<p>node_id - " + items[1] + "</p>"
        resultHTML += "<p>node_name - " + items[2] + "</p>"
        
    });

    resultDiv.innerHTML = resultHTML

}
