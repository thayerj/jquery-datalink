module("Discrete Inputs");
test("One way link with setup using boolean in call to link", 4, function(){
    var model = {};
    $("#inputa").link(model, true);
    $("#inputa").val("5").change();
    equals(model.a, "5", "Input linked to model.");
    $(model).setField("a", 7);
    equals(model.a, 7, "Model was changed.");
    equals($("#inputa").val(), "5", "Link is only one way.");
    $("#inputa").unlink(model);
    $("#inputa").val("9").change();
    equals(model.a, 7, "Model was not changed by view change after unlink.");
});

test("Two way link", 4, function(){
    var model = {};
    $("#inputa").link(model);
    $("#inputa").val("5").change();
    equals(model.a, "5", "Input linked to model.");
    $(model).setField("a", 7);
    equals(model.a, 7, "Model was changed.");
    equals($("#inputa").val(), "7", "Link is two way.");
    $("#inputa").unlink(model);
    $("#inputa").val("9").change();
    equals(model.a, 7, "Model was not changed by view change after unlink.");
});


test("One way link using mapping", 4, function(){
    var model = {};
    $("#inputa").link(model,{a:{twoWay:false}});
    $("#inputa").val("5").change();
    equals(model.a, "5", "Input linked to model.");
    $(model).setField("a", 7);
    equals(model.a, 7, "Model was changed.");
    equals($("#inputa").val(), "5", "Link is one way.");
    $("#inputa").unlink(model);
    $("#inputa").val("9").change();
    equals(model.a, 7, "Model was not changed by view change after unlink.");
});


test("One way link using mapping with non-existent attribute", 3, function(){
    var model = {};
    $("#inputa").link(model,{e:{twoWay:false}});
    $("#inputa").val("5").change();
    equals(model.a, undefined, "Model not changed");
    $(model).setField("a", 7);
    equals(model.a, 7, "Model was changed.");
    equals($("#inputa").val(), "5", "Model did not update view.");
    $("#inputa").unlink(model);
});



test("One way link using default mapping", 4, function(){
    var model = {};
    $("#inputa").link(model,{__twoWay:false});
    $("#inputa").val("5").change();
    debugger;
    equals(model.a, "5", "Input linked to model.");
    $(model).setField("a", 7);
    equals(model.a, 7, "Model was changed.");
    equals($("#inputa").val(), "5", "Link is one way.");
    $("#inputa").unlink(model);
    $("#inputa").val("9").change();
    equals(model.a, 7, "Model was not changed by view change after unlink.");
});


test("One way link using default convert", 4, function(){
    var model = {};
    $("#inputa").link(model,{__convert:function(value){return parseInt(value)*2;}});
    $("#inputa").val("5").change();
    equals(model.a, 10, "Input linked to model.");
    $(model).setField("a", 7);
    equals(model.a, 7, "Model was changed.");
    equals($("#inputa").val(), "5", "Link is one way.");
    $("#inputa").unlink(model);
    $("#inputa").val("9").change();
    equals(model.a, 7, "Model was not changed by view change after unlink.");
});



