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

            var x = element.getXPos()
            var y = element.getYPos()  

            if(element.hasParent){
                var parent_x = element.parent.getXPos()
                var parent_y = element.parent.getYPos()

                
                resultHTML += " <svg height='1000px' width='1000px'>"
            
                resultHTML += "<line x1='" + (x + 50) + "px' y1='" + (y + 50) + "px' x2='" + (parent_x + 50) + "px' y2='" + (parent_y + 50) + "px' style='stroke:rgb(0,0,255);stroke-width:5' />"
                resultHTML += "</svg>"
            }

            
            resultHTML += "<div style = " + "'left:" + x + "px; top:" + y + "px;'" + "class='node'>"

                resultHTML += "<ul>"
                    resultHTML += "<li class='nodeItem' ><b>Parent ID:</b> " + element.parent_id + "</li>"
                    resultHTML += "<li class='nodeItem' ><b>Node ID:</b> " + element.node_id + "</li>"
                    resultHTML += "<li class='nodeItem' ><b>Node Name:</b> " + element.node_name + "</li>"
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
            this.siblingIndex = this.parent.children.length - 1
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

    
    getXPos(){
        if(!this.hasParent){
            return 0;
        }
        else {
            if(this.siblingIndex == 0){
                return this.parent.getXPos() + (200 * this.siblingIndex)
            }
            else {
                if(this.parent.children[this.parent.children.length - 1 - this.siblingIndex]){
                    return this.parent.getXPos() + (200 * this.siblingIndex) + this.parent.children[this.siblingIndex - 1].children.length * 200
                }
                else {
                    return this.parent.getXPos() + (200 * this.siblingIndex)
                }
            }
        }

    }
    getYPos(){
        if(!this.hasParent){
            return 0;
        }
        else {
            return this.parent.getYPos() + 200
        }
    }


}
