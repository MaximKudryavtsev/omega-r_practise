var canvas = document.getElementById("drawingArea");
var ctx = canvas.getContext("2d");

function DrawCircle(ctx, shape) {
    var form = document.forms["shapeForm"];
    form.elements["id"].value = shape._id;
    form.elements["fillColor"].value = shape.fillColor;
    form.elements["borderColor"].value = shape.borderColor;
    form.elements["circleX"].value = shape.circleX;
    form.elements["circleY"].value = shape.circleY;
    form.elements["radius"].value = shape.radius;
    ctx.beginPath();
    ctx.arc(shape.circleX, shape.circleY, shape.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = shape.fillColor;
    ctx.fill();
    ctx.strokeStyle = shape.borderColor;
    ctx.stroke();
}

function DrawRectangle(ctx, shape) {
    var widthRectangle = Math.abs(shape.rectangleX2 - shape.rectangleX1);
    var heightRectangle = Math.abs(shape.rectangleY2 - shape.rectangleY1);
    ctx.beginPath();
    ctx.fillStyle = shape.fillColor;
    ctx.fillRect(shape.rectangleX1, shape.rectangleY1, widthRectangle, heightRectangle);
    ctx.strokeStyle = shape.borderColor;
    ctx.strokeRect(shape.rectangleX1, shape.rectangleY1, widthRectangle, heightRectangle);
    ctx.closePath();
}

function DrawTriangle(ctx, shape) {
    ctx.beginPath();
    ctx.moveTo(shape.triangleX1, shape.triangleY1);
    ctx.lineTo(shape.triangleX2, shape.triangleY2);
    ctx.lineTo(shape.triangleX3, shape.triangleY3);
    ctx.lineTo(shape.triangleX1, shape.triangleY1);
    ctx.fillStyle = shape.fillColor;
    ctx.fill();
    ctx.strokeStyle = shape.borderColor;
    ctx.stroke();
    ctx.closePath();
}

function ClearCanvas(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var elements = {
    "circle": $("#circleInfo"),
    "triangle": $("#triangleInfo"),
    "rectangle": $("#rectangleInfo"),
    "shapeSelect": $("#shapeSelect")
};

elements.triangle.hide();
elements.circle.show();
elements.rectangle.hide();
elements.shapeSelect.on('click', function(){
    switch ($(this).val())
    {
        case "circle" :
            elements.circle.show();
            elements.triangle.hide();
            elements.rectangle.hide();
            break;
        case "triangle" :
            elements.circle.hide();
            elements.triangle.show();
            elements.rectangle.hide();
            break;
        case "rectangle" :
            elements.circle.hide();
            elements.triangle.hide();
            elements.rectangle.show();
            break;
    }
});
