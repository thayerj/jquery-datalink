module("Discrete Inputs");
test("Sending false instead of mapping results in one-way link", 4, function(){
    var model = {};
    $("#inputa").link(model, false);
    $("#inputa").val("5").change();
    equal(model.a, "5", "Input linked to model.");
    $(model).setField("a", 7);
    equal(model.a, 7, "Model was changed.");
    equal($("#inputa").val(), "5", "Link is only one way.");
    $("#inputa").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, 7, "Model was not changed by view change after unlink.");
});

test("Two way link is default with no mapping passed in.", 4, function(){
    var model = {};
    $("#inputa").link(model);
    $("#inputa").val("5").change();
    equal(model.a, "5", "Input linked to model.");
    $(model).setField("a", 7);
    equal(model.a, 7, "Model was changed.");
    equal($("#inputa").val(), "7", "Link is two way.");
    $("#inputa").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, 7, "Model was not changed by view change after unlink.");
});

test("Two way link using mapping", 4, function(){
    var model = {};
    $("#inputa").link(model,{a:{twoWay:true}});
    $("#inputa").val("5").change();
    equal(model.a, "5", "Input linked to model.");
    $(model).setField("a", 7);
    equal(model.a, 7, "Model was changed.");
    equal($("#inputa").val(), "7", "Link is two way.");
    $("#inputa").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, 7, "Model was not changed by view change after unlink.");
});

test("One way link using mapping", 4, function(){
    var model = {};
    $("#inputa").link(model,{a:{twoWay:false}});
    $("#inputa").val("5").change();
    equal(model.a, "5", "Input linked to model.");
    $(model).setField("a", 7);
    equal(model.a, 7, "Model was changed.");
    equal($("#inputa").val(), "5", "Link is one way.");
    $("#inputa").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, 7, "Model was not changed by view change after unlink.");
});


test("One way link using mapping with non-existent attribute", 3, function(){
    var model = {};
    $("#inputa").link(model,{e:{twoWay:false}});
    $("#inputa").val("5").change();
    equal(model.a, undefined, "Model not changed");
    $(model).setField("a", 7);
    equal(model.a, 7, "Model was changed.");
    equal($("#inputa").val(), "5", "Model did not update view.");
    $("#inputa").unlink(model);
});


test("One way link using default mapping", 4, function(){
    var model = {};
    $("#inputa").link(model,{__twoWay:false});
    $("#inputa").val("5").change();
    equal(model.a, "5", "Input linked to model.");
    $(model).setField("a", 7);
    equal(model.a, 7, "Model was changed.");
    equal($("#inputa").val(), "5", "Link is one way.");
    $("#inputa").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, 7, "Model was not changed by view change after unlink.");
});

test("One way link using default convert", 4, function(){
    var model = {};
    $("#inputa").link(model,{__convert:function(value){return parseInt(value)*2;}});
    $("#inputa").val("5").change();
    equal(model.a, 10, "Input linked to model.");
    $(model).setField("a", 7);
    equal(model.a, 7, "Model was changed.");
    equal($("#inputa").val(), "7", "Link is two way.");
    $("#inputa").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, 7, "Model was not changed by view change after unlink.");
});

test("Two way link using default mapping with a pre-populated object", 2, function(){
    var model = {a:"32"};
    $("#inputa").link(model,{__twoWay:true});
    equal($("#inputa").val(), "32", "Element was updated during link.");
    $("#inputa").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, "32", "Model was not changed by view change after unlink.");
});

module("Form Inputs");

test("One way linking using false", 6, function(){
    var model = {};
    $("input").link(model, false);
    $("#inputa").val("5").change();
    $("#inputb").val("adb").change();
    $("#inputc").val("7").change();

    equal(model.a, "5", "Input linked to model.");
    equal(model.b, "adb", "Input linked to model.");
    equal(model.c, "7", "Input linked to model.");
    $(model).setField("a", 7);
    equal(model.a, 7, "Model was changed.");
    equal($("#inputa").val(), "5", "Link is only one way.");
    $("input").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, 7, "Model was not changed by view change after unlink.");
});

test("Two way link is default with no mapping passed in.", 9, function(){
    var model = {};
    $("input").link(model);
    $("#inputa").val("8").change();
    $("#inputc").val("testy").change();
    equal(model.a, "8", "Input linked to model.");
    equal(model.c, "testy", "Input linked to model.");
    
    $(model).setField("a", 7);
    $(model).setField("b", "bbb");
    $(model).setField("c", "989");

    equal(model.a, 7, "Model was changed.");
    equal(model.b, "bbb", "Model was changed.");
    equal(model.c, "989", "Model was changed.");
    
    equal($("#inputa").val(), "7", "Link is two way.");
    equal($("#inputb").val(), "bbb", "Link is two way.");
    equal($("#inputc").val(), "989", "Link is two way.");
    
    $("input").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, 7, "Model was not changed by view change after unlink.");
}); 

test("Two way link using mapping", 5, function(){
    var model = {};
    $("input").link(model,{a:{twoWay:true}});
    $("#inputa").val("5").change();
    $("#inputb").val("8").change()
    equal(model.a, "5", "Input linked to model.");
    equal(model.b, undefined, "Input not explicitly mapped was not linked.");
    $(model).setField("a", 7);
    equal(model.a, 7, "Model was changed.");
    equal($("#inputa").val(), "7", "Link is two way.");
    $("input").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, 7, "Model was not changed by view change after unlink.");
});

test("One way link using mapping", 5, function(){
    var model = {};
    $("input").link(model,{a:{twoWay:false}});
    $("#inputa").val("4").change();
    $("#inputc").val("832").change();
    equal(model.a, "4", "Input linked to model.");
    equal(model.c, undefined, "Input not explicitly mapped was not linked.");

    $(model).setField("a", 7);
    equal(model.a, 7, "Model was changed.");
    equal($("#inputa").val(), "4", "Link is one way.");

    $("input").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, 7, "Model was not changed by view change after unlink.");
});


test("One way link using default mapping", 6, function(){
    var model = {};
    $("input").link(model,{__twoWay:false});
    $("#inputa").val("9").change();
    $("#inputb").val("10").change();
    $("#inputc").val("11").change();

    equal(model.a, "9", "Input linked to model.");
    equal(model.b, "10", "Input linked to model.");
    equal(model.c, "11", "Input linked to model.");
    
    $(model).setField("a", 7);
    equal(model.a, 7, "Model was changed.");
    equal($("#inputa").val(), "9", "Link is one way.");
    $("input").unlink(model);
    $("#inputa").val("13").change();
    equal(model.a, 7, "Model was not changed by view change after unlink.");
});

test("Two way link using default convert", 5, function(){
    var model = {};
    $("input").link(model,{__convert:function(value){return parseInt(value)*2;}});
    $("#inputa").val("5").change();
    $("#inputc").val("8").change();
    equal(model.a, 10, "Input linked to model.");
    equal(model.c, 16, "Input linked to model.");
    $(model).setField("a", 7);
    equal(model.a, 7, "Model was changed.");
    equal($("#inputa").val(), "7", "Link is two way.");
    $("input").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, 7, "Model was not changed by view change after unlink.");
});

test("Two way link using default mapping keyword with a pre-populated object", 6, function(){
    var model = {a:"32", b:"aword", c:"things"};
    $("input").link(model,{__twoWay:true});
    equal($("#inputa").val(), "32", "Element was updated during link.");
    equal($("#inputb").val(), "aword", "Element was updated during link.");
    equal($("#inputc").val(), "things", "Element was updated during link.");
    $(model).setField("c", "stuff");
    equal($("#inputc").val(), "stuff", "Element was updated by model.");
    $("#inputb").val("google").change();
    equal(model.b, "google", "Change to element changed model");
    $("input").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, "32", "Model was not changed by view change after unlink.");
});

test("Two way link by default with a pre-populated object", 6, function(){
    var model = {a:"32", b:"aword", c:"things"};
    $("input").link(model);
    equal($("#inputa").val(), "32", "Element was updated during link.");
    equal($("#inputb").val(), "aword", "Element was updated during link.");
    equal($("#inputc").val(), "things", "Element was updated during link.");
    $(model).setField("c", "stuff");
    equal($("#inputc").val(), "stuff", "Element was updated by model.");
    $("#inputb").val("google").change();
    equal(model.b, "google", "Change to element changed model");
    $("input").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, "32", "Model was not changed by view change after unlink.");
});


test("Two way link by default with a pre-populated object and convertBack defined", 6, function(){
    var model = {a:32, b:10, c:20};
    $("input").link(model, {__convertBack: function(value){return value*2}});
    equal($("#inputa").val(), 64, "Element was updated during link and converted.");
    equal($("#inputb").val(), 20, "Element was updated during link and converted.");
    equal($("#inputc").val(), 40, "Element was updated during link and converted.");
    $(model).setField("c", 35);
    equal($("#inputc").val(), "70", "Element was updated by model.");
    $("#inputb").val(12).change();
    // TODO Note the above actually causes the inputb to be populated with 24 because it changes
    // the model, and this causes it to sync back and it goes through the convertBack function.
    equal(model.b, "12", "Change to element changed model");
    $("input").unlink(model);
    $("#inputa").val("9").change();
    equal(model.a, "32", "Model was not changed by view change after unlink.");
});

// TODO, look at mixing explicity mappings and default mappings as the backup
// TODO test explicit name mapping
//test("Verify old plugin had same behavior for two-way bindings", 1, function(){
//    var model = {};
//    $("#inputa").link(model,{a:{convertBack:function(value){return value*2;}}});
//    $("#inputa").val(12).change();
//    equal($("#inputa").val(), "24", "Two events fired.");
//    
//});
