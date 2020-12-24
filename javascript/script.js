function onClick(){

    var userInput = document.getElementById("userInput").value

    Node.initializeFromInput("null,0,grandpa|0,1,son|0,2,daugther|1,3,grandkid|1,4,grandkid|2,5,grandkid|5,6,greatgrandkid"    )

    console.log(Node.allNodes)

    Node.display()

}

class Node{

    static allNodes = []

    static initializeFromInput(userInput) {
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
        })
    }

    static displayList() {
        var resultDiv = document.getElementById("result");

        var resultHTML = ""

        Node.allNodes.forEach(element => {
            resultHTML += "<p>"
            resultHTML += "<p>parent_id - " + element.parent_id + "</p>"
            resultHTML += "<p>node_id - " + element.node_id + "</p>"
            resultHTML += "<p>node_name - " + element.node_name + "</p>"
            resultHTML += "</p>"
        });

        resultDiv.innerHTML = resultHTML
    }
    static display() {
        var resultDiv = document.getElementById("result");

        var resultHTML = ""

        Node.allNodes.forEach(element => {

            var y = 0;
            if(element.hasParent){
                y = ((parseInt(element.parent_id)) + 1) * 250;
                
            }
            var x = (parseInt(element.node_id) * 200);
            

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
    constructor(parent_id, node_id, node_name){

        this.hasParent = parent_id != null
        this.parent_id = parent_id
        this.node_id = node_id
        this.node_name = node_name

        this.children = []

        if(this.hasParent){
            this.parent = Node.allNodes.find(node => this.parent_id == node.node_id)
            this.parent.addChild(this)
        }
        else{
            this.parent = null;
        }

        Node.allNodes.push(this)
    }

    addChild(newChild){
        this.children.push(newChild)
    }

    hasParent(){
        return this.hasParent
    }


    getYPos(){
        if(!this.hasParent){
            return 0;
        }
        else {
            return t
        }
    }

}
