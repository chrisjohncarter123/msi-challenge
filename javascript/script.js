function onClick(){

    var userInput = document.getElementById("userInput").value

    var tree = new Tree("null,0,grandpa|0,1,son|0,2,daugther")

    console.log(tree)

    tree.display()

}

class Tree{
    constructor(userInput){
        var userInputNodes = userInput.split("|")
        this.nodes = []

        userInputNodes.forEach(element => {
            var values = element.split(",")

            this.addNode(new Node(values[0],values[1],values[2]))


        })
    }

    addNode(node){
        this.nodes.push(node)

    }

    display() {
        var resultDiv = document.getElementById("result");

        var resultHTML = ""

        this.nodes.forEach(element => {

            var y = 0;
            if(element.parent_id != "null"){
                y = (parseInt(element.parent_id) * 50) + 200;
                
            }
            var x = parseInt(element.node_id) * 200;
            

            resultHTML += "<div style = " + "'left:" + x + "px; top:" + y + "px;'" + "class='node'>"
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

        this.children = []
    }

    addChild(child){
        this.children.push(child)
    }

}
