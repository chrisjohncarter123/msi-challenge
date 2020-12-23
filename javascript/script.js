function onClick(){

    var userInput = document.getElementById("userInput").value

    var tree = new Tree(userInput)

    console.log(tree)

   // tree.display()

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

            resultHTML += "<p>Node " + coutner++ + ":"

            var items = element.split(",")

            resultHTML += "<p>parent_id - " + items[0] + "</p>"
            resultHTML += "<p>node_id - " + items[1] + "</p>"
            resultHTML += "<p>node_name - " + items[2] + "</p>"
            
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
