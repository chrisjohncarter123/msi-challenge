function onClick(){

    var userInput = document.getElementById("userInput").value

    document.getElementById("error").innerHTML = ""

    Node.initializeFromInput(userInput)

    Node.display()

}

const nodeWidth = 100
const nodeHeight = 100
const nodeDistance = 200

class Node{



    static allNodes = []

    static formatErrorCheck(userInput){
        //https://regex101.com/codegen?language=javascript
        const regex = /((((NULL)|(null)|([0-9]+)),[0-9]+,[a-zA-Z]+)\|)+(((NULL)|(null)|([0-9]+)),[0-9]+,[a-zA-Z]+)|(((NULL)|(null)),[0-9]+,[a-zA-Z]+)/gm;
        let m = regex.exec(userInput);

        if(m != null && m.length > 0 && m[0] == userInput){
            return true
        }

        return false;
        
        
    }


    static idDuplicationErrorCheck(userInputNodes){
        var node_ids = []
        var result = true;

        userInputNodes.forEach(element => {

            var element_node_id = element.split(",")[1]

            if(node_ids.length == 0){
                node_ids.push(element_node_id)
            }
            else{

                var find_result = node_ids.find(x => x == element_node_id)

                if(find_result == undefined){

                    node_ids.push(element.split(",")[1])
                    
                }
                else {
                    result = false
                    
                }
            }

        })
    
        return result
        
    }

    static nonexistentParentIdErrorCheck(userInputNodes){
        var result = true
        var parent_ids = []
        userInputNodes.forEach(element => {

            parent_ids.push(element.split(",")[1])
                
        })

        var i;
        for (i = 1; i < userInputNodes.length; i++) {
            var element_parent_id = userInputNodes[i].split(",")[0]

            var find_result = parent_ids.find(x => x == element_parent_id)

            if(find_result == undefined){

                result = false
                
            }
        }

        return result

    }

    static initializeFromInput(userInput) {

        this.allNodes = []

        //The input must match the regex, otherwise there is an error!
        if(!Node.formatErrorCheck(userInput)){
            document.getElementById("error").innerHTML += "Input Format Error!"
        }
        else {
            
            var userInputNodes = userInput.split("|")

            if(!Node.idDuplicationErrorCheck(userInputNodes)){
                document.getElementById("error").innerHTML += "node_id Duplication Error!"
                
            }

            else if(!Node.nonexistentParentIdErrorCheck(userInputNodes)){
                document.getElementById("error").innerHTML += "Nonexistent parent_id Error!"
                
            }

            else{

                //Passed all error checks

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

                Node.calculatePositions()

            }
        }
    }

    static calculatePositions(){

        //Set-up
        Node.allNodes.forEach(node => {
            if(!node.hasParent){
                node.xPosition = 0
                node.yPosition = 0
            }
            else{
                node.xPosition = node.parent.xPosition + (node.siblingIndex * nodeDistance)
                node.yPosition = node.parent.yPosition + nodeDistance
            }

        })

        Node.allNodes.forEach(node => {
            if(node.children.length > 0){
                node.children.forEach(childNode => {
                    childNode.xPosition += 400 * (childNode.siblingIndex)

                })
                

            }
                
        })

        //Adjustment
        /*
        Node.allNodes.forEach(node => {
            node.allNodes.forEach(nodeB => {
                if(nodeB.parent_id == node.node_id){
                    if(nodeB.siblingIndex > node.siblingIndex){
                        Node.allNodes(nodeC => {
                            if(nodeC.parent_id == nodeB.node_id){
                                node.allNodes(nodeD => {
                                    if(nodeD.parent_id ==)

                                })
                            }
                        })
                    }
                }
            })

        })
        */
        
        //TODO: center children to parents

    }

    static displayList() {
        document.getElementById("result").innerHTML = "";

        var resultDiv = document.getElementById("result");

        var resultHTML = ""

        Node.allNodes.forEach(element => {
            resultHTML += "<div>"
            resultHTML += "<p>parent_id - " + element.parent_id + "</p>"
            resultHTML += "<p>node_id - " + element.node_id + "</p>"
            resultHTML += "<p>node_name - " + element.node_name + "</p>"
            resultHTML += "</div>"
        });

        resultDiv.innerHTML = resultHTML
    }
    static display() {
        document.getElementById("result").innerHTML = "";

        var resultDiv = document.getElementById("result");

        var resultHTML = ""

        Node.allNodes.forEach(element => {

            var x = element.xPosition
            var y = element.yPosition 

            if(element.hasParent){
                //Draw line between parent and child nodes

                var parent_x = element.parent.xPosition
                var parent_y = element.parent.yPosition

                
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
        this.xPosition = 0
        this.yPosition = 0

        this.children = []

        if(this.hasParent){
            this.parent = Node.allNodes.find(node => this.parent_id == node.node_id)
            this.parent.addChild(this)
            this.siblingIndex = this.parent.children.length - 1
        }
        else{
            this.parent = null
            this.siblingIndex = 0
        }

        Node.allNodes.push(this)
    }

    addChild(newChild){
        this.children.push(newChild)
    }

    hasParent(){
        return this.hasParent
    }



    
    


}
