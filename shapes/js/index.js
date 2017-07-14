function GetShapes() {
    $.ajax({
        url: "/api/shapes",
        type: "GET",
        contentType: "application/json",
        success: function (shapes) {
            var rows = "";
            $.each(shapes, function (index, shape) {
                rows += row(shape);
            });
            $("table tbody").append(rows);
        }
    });
}

function DrawShape(id, shape) {
    $.ajax({
        url: "/api/shapes/"+id,
        type: "GET",
        contentType: "application/json",
        success: function (shape) {
            if (shape.shapeType == "circle") {
                DrawCircle(ctx, shape);
                reset();
            }
            else if (shape.shapeType == "rectangle") {
                DrawRectangle(ctx, shape);
                reset();
            }
            else if (shape.shapeType == "triangle") {
                DrawTriangle(ctx, shape);
                reset();
            }
        }
    });
}

function CreateCircle(fillColor, borderColor, shapeType) {
    var circleX = $("#circleX").val();
    var circleY =  $("#circleY").val();
    var radius = $("#radius").val();
    $.ajax({
        url: "api/shapes",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            fillColor: fillColor,
            borderColor: borderColor,
            circleX: circleX,
            circleY: circleY,
            radius: radius,
            shapeType: shapeType
        }),
        success: function (shape) {
            reset();
            $("table tbody").append(row(shape));
        }
    })
}

function CreateRectangle(fillColor, borderColor, shapeType) {
    var rectangleX1 = $("#rectangleX1").val();
    var rectangleY1 = $("#rectangleY1").val();
    var rectangleX2 = $("#rectangleX2").val();
    var rectangleY2 = $("#rectangleY2").val();
    $.ajax({
        url: "api/shapes",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            fillColor: fillColor,
            borderColor: borderColor,
            rectangleX1: rectangleX1,
            rectangleY1: rectangleY1,
            rectangleX2: rectangleX2,
            rectangleY2: rectangleY2,
            shapeType: shapeType
        }),
        success: function (shape) {
            reset();
            $("table tbody").append(row(shape));
        }
    })
}

function CreateTriangle(fillColor, borderColor, shapeType) {
    var triangleX1 = $("#triangleX1").val();
    var triangleY1 = $("#triangleY1").val();
    var triangleX2 = $("#triangleX2").val();
    var triangleY2 = $("#triangleY2").val();
    var triangleX3 = $("#triangleX3").val();
    var triangleY3 = $("#triangleY3").val();
    $.ajax({
        url: "api/shapes",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            fillColor: fillColor,
            borderColor: borderColor,
            triangleX1: triangleX1,
            triangleY1: triangleY1,
            triangleX2: triangleX2,
            triangleY2: triangleY2,
            triangleX3: triangleX3,
            triangleY3: triangleY3,
            shapeType: shapeType
        }),
        success: function (shape) {
            reset();
            $("table tbody").append(row(shape));
        }
    })
}

function reset() {
    var form = document.forms["shapeForm"];
    form.reset();
    form.elements["id"].value = 0;
}

function DeleteShape(id) {
    $.ajax({
        url: "api/shapes/"+id,
        contentType: "application/json",
        method: "DELETE",
        success: function (shape) {
            console.log(shape);
            $("tr[data-rowid='" + shape._id + "']").remove();
        }
    })
}

function circleRow(shape) {
    return "<tr data-rowid='" + shape._id + "'>" +
        "<td>" + shape.shapeType + "</td><td>" + shape.fillColor + "</td> <td>" + shape.borderColor + "</td>" +
        " <td>" +
        "<ul>" +
            "<li>x: "+ shape.circleX +"</li>" +
            "<li>y: "+ shape.circleY +"</li>" +
            "<li>radius: "+ shape.radius +"</li>" +
        "</ul>" +
        "</td>" +
        "<td><a class='removeLink' data-id='" + shape._id + "'>Delete</a> | <a class='draw' data-id='" + shape._id + "'>Draw</a></td></tr>";
}

function rectangleRow(shape) {
    return "<tr data-rowid='" + shape._id + "'>" +
        "<td>" + shape.shapeType + "</td><td>" + shape.fillColor + "</td> <td>" + shape.borderColor + "</td>" +
        " <td>" +
        "<ul>" +
            "<li>x1: "+ shape.rectangleX1 +"</li>" +
            "<li>y1: "+ shape.rectangleY1 +"</li>" +
            "<li>x2: "+ shape.rectangleX2 +"</li>" +
            "<li>y2: "+ shape.rectangleY2 +"</li>" +
        "</ul>" +
        "</td>" +
        "<td><a class='removeLink' data-id='" + shape._id + "'>Delete</a> | <a class='draw' data-id='" + shape._id + "'>Draw</a></td></tr>";
}

function triangleRow(shape) {
    return "<tr data-rowid='" + shape._id + "'>" +
        "<td>" + shape.shapeType + "</td><td>" + shape.fillColor + "</td> <td>" + shape.borderColor + "</td>" +
        " <td>" +
        "<ul>" +
            "<li>x1: "+ shape.triangleX1 +"</li>" +
            "<li>y1: "+ shape.triangleY1 +"</li>" +
            "<li>x2: "+ shape.triangleX2 +"</li>" +
            "<li>y2: "+ shape.triangleY2 +"</li>" +
            "<li>x3: "+ shape.triangleX3 +"</li>" +
            "<li>y3: "+ shape.triangleY3 +"</li>" +
        "</ul>" +
        "</td>" +
        "<td><a class='removeLink' data-id='" + shape._id + "'>Delete</a> | <a class='draw' data-id='" + shape._id + "'>Draw</a></td></tr>";
}

var row = function (shape) {
    if (shape.shapeType == "circle") {
        return circleRow(shape)
    }
    else if (shape.shapeType == "rectangle") {
        return rectangleRow(shape)
    }
    else if (shape.shapeType == "triangle") {
        return triangleRow(shape)
    }

};

$("#reset").click(function (e) {

    e.preventDefault();
    reset();
});

$("#clear").click(function (e) {

    e.preventDefault();
    ClearCanvas(ctx);
});

$("form").submit(function (e) {
    e.preventDefault();
    var id = $("#id").val();
    var fillColor = $("#fillColor").val();
    var borderColor = $("#borderColor").val();
    var shapeType = $("#shapeSelect").val();
    if (id == 0) {
        if (shapeType == "circle") {
            CreateCircle(fillColor, borderColor, shapeType);
        }
        else if (shapeType == "rectangle") {
            CreateRectangle(fillColor, borderColor, shapeType)
        }
        else if (shapeType == "triangle") {
            CreateTriangle(fillColor, borderColor, shapeType)
        }
    }

    console.log(shapeType);
});

$("body").on("click", ".removeLink", function () {
    var id = $(this).data("id");
    DeleteShape(id);
});

$("body").on("click", ".draw", function () {
    var id = $(this).data("id");
    DrawShape(id);
});

GetShapes();
