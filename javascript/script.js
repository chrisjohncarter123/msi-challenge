function onClick(){

    var userInput = document.getElementById("userInput").value

    var tree = new Tree("null,0,grandpa|0,1,son|0,2,daugther|1,3,grandkid|1,4,grandkid|2,5,grandkid|5,6,greatgrandkid")

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
            resultHTML += "<div class='node'>"
                resultHTML += "<ul>"
                    resultHTML += "<li class='nodeItem' >Parent ID: " + element.parent_id + "</li>"
                    resultHTML += "<li class='nodeItem' >Node ID: " + element.node_id + "</li>"
                    resultHTML += "<li class='nodeItem' >Node Name: " + element.node_name + "</li>"
                resultHTML += "</ul>"
            resultHTML += "</div>"
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
