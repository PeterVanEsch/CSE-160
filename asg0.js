 // DrawRectangle.js
var ctx; 
 function main() {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
    return;
    }

 // Get the rendering context for 2DCG <- (2)

 var ctx = canvas.getContext('2d');
 ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
 ctx.fillRect(0, 0, 400, 400);

 var v1 = new Vector3([2.3, 2.3, 0]);
 drawVector(v1, "red");
} 

function drawVector(v, color){
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.error("Canvas element not found.");
        return;
    }
    
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Failed to get canvas context.");
        return;
    }
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(200,200);
    var tempScaleX = v.elements[0] * 20;
    var tempScaleY = v.elements[1] * 20;
    var tempScaleZ = v.elements[2] * 20;
    ctx.lineTo(200 + tempScaleX, 200 - tempScaleY, tempScaleZ);
    ctx.stroke();

 }//end of drawVector funciton

 function handleDrawEvent(){
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    var x1 = document.getElementById('x-coordinate1').value;
    var y1 = document.getElementById('y-coordinate1').value;
    var x2 = document.getElementById('x-coordinate2').value;
    var y2 = document.getElementById('y-coordinate2').value;
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, 400, 400);
    var v11 = new Vector3([x1, y1, 0]);
    var v22  = new Vector3([x2, y2, 0]);
    drawVector(v11, "red");
    drawVector(v22, "blue");

 }// end handle draw function

 function handleDrawOperationEvent(){
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    var x11 = document.getElementById('x-coordinate1').value;
    var y11 = document.getElementById('y-coordinate1').value;
    var x22 = document.getElementById('x-coordinate2').value;
    var y22 = document.getElementById('y-coordinate2').value;
    var v11 = new Vector3([x11, y11, 0]);
    var var11Copy = new Vector3([x11, y11, 0]);
    var v22  = new Vector3([x22, y22, 0]);
    var var22Copy = new Vector3([x22, y22, 0]);
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, 400, 400);

    var op = document.getElementById('operation').value;
    if (op == 'add'){
        v11.add(v22);
        drawVector(var11Copy, "red");
        drawVector(var22Copy, "blue");
        drawVector(v11, "green");

    }
    else if (op == "sub"){
        v11.sub(v22);
        drawVector(var11Copy, "red");
        drawVector(var22Copy, "blue");
        drawVector(v11, "green");
    }
    else if ( op == "div"){
        scalerVal = document.getElementById('scalar').value;
        v11.div(scalerVal);
        v22.div(scalerVal);
        drawVector(var11Copy, "red");
        drawVector(var22Copy, "blue");
        drawVector(v11, "green");
        drawVector(v22, "green");
    }

    else if ( op == "mul"){
        scalerVal = document.getElementById('scalar').value;
        drawVector(var11Copy, "red");
        drawVector(var22Copy, "blue");
        v11.mul(scalerVal);
        v22.mul(scalerVal);
        drawVector(v11, "green");
        drawVector(v22, "green");
    }

    else if ( op == "mag"){
        drawVector(var11Copy, "red");
        drawVector(var22Copy, "blue");
        console.log("Magnitude of Vector 1: ", v11.magnitude());
        console.log("Magnitude of Vector 2: ", v22.magnitude());
    }

    else if ( op == "norm"){
        drawVector(var11Copy, "red");
        drawVector(var22Copy, "blue");
        v11.normalize();
        v22.normalize();
        drawVector(v11, "green");
        drawVector(v22, "green");
    }

    else if ( op == "angle"){
        drawVector(var11Copy, "red");
        drawVector(var22Copy, "blue");
        console.log("Angle: ", angleBetween(var11Copy, var22Copy))

    }

    else if ( op == "area"){
        drawVector(var11Copy, "red");
        drawVector(var22Copy, "blue");
        console.log("Area of Triangle: " , areaTriangle(var11Copy, var22Copy))
    }
 }

 function angleBetween(vfirst, vsecond){
    var mag1 = vfirst.magnitude();
    var mag2 = vsecond.magnitude();
    var dot = Vector3.dot(vfirst, vsecond);
    var radianAngle = Math.acos( dot / (mag1 * mag2));
    var degreeAngle = radianAngle * 180 / Math.PI;
    return degreeAngle;


 }//end angle between

 function areaTriangle(vfirst, vsecond){
    var v = Vector3.cross(vfirst, vsecond);
    magV = v.magnitude();
    area = magV/2;
    return area;
 }
