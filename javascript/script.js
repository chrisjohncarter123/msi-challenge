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


            var parent_id = null
            if(values[0] != "null"){
                parent_id = parseInt(values[0])
            }
            var node_id = parseInt(values[1])
            var node_name = values[2]

            
            var newNode = new Node(parent_id, node_id, node_name)

            console.log(newNode)

            this.addNode(newNode)

            

        })
    }

    addNode(newNode){
        this.nodes.push(newNode)

        if(newNode.hasParent){
            var parentNode = this.nodes.find(node => newNode.parent_id == node.node_id)
            
            parentNode.addChild(newNode)
        }
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

        this.hasParent = parent_id != null
        this.parent_id = parent_id
        this.node_id = node_id
        this.node_name = node_name

        this.children = []
    }

    addChild(newChild){
        this.children.push(newChild)
    }

    hasParent(){
        return this.hasParent
    }

}
