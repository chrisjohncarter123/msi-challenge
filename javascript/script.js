function onClick(){

    var userInput = document.getElementById("userInput").value

    var tree = new Tree(userInput)

    console.log(tree)

    tree.display()

}

class Tree{
    constructor(userInput){
        var userInputNodes = userInput.split("|")
        this.nodes = []

        userInputNodes.forEach(element => {
            var values = element.split(",")

            this.nodes.push(new Node(values[0],values[1],values[2]))
        })
    }

    display() {
        var resultDiv = document.getElementById("result");

        var resultHTML = ""

        this.nodes.forEach(element => {
            resultHTML += "<div class='node'></div>"
        });

        resultDiv.innerHTML = resultHTML
    }

    displayList() {
        var resultDiv = document.getElementById("result");

        var resultHTML = ""

        this.nodes.forEach(element => {
            resultHTML += "<p>"
            resultHTML += "<p>parent_id - " + element.parent_id + "</p>"
            resultHTML += "<p>node_id - " + element.node_id + "</p>"
            resultHTML += "<p>node_name - " + element.node_name + "</p>"
            resultHTML += "</p>"
        });

        resultDiv.innerHTML = resultHTML
    }
}

class Node{
    constructor(parent_id, node_id, node_name){
        this.parent_id = parent_id;
        this.node_id = node_id;
        this.node_name = node_name;
    }
}
