# jQuery Data Link plugin forked

*Note: This plugin is currently in beta form and may change significantly before version 1.0 is released. See tagged versions for stable Beta releases. Requires jquery version 1.4.2.*

Documentation for the _jQuery Data Link_ plugin can be found on the [jQuery site](http://api.jquery.com/category/plugins/data-link/")
* * *
**Breaking change:**
In jQuery 1.5, the behavior of $(plainObject).data() has been modified. In order to work against all versions of jQuery including jQuery 1.5, 
current builds of jquery-datalink have therefore been modified as follows:

* The API to modify field values is now .setField( name, value ), rather than .data( name, value ). (Examples below).</li>
* The events associated with the modified field are now "setField" and "changeField", rather than "setData" and changeData".
Note: This plugin currently depends on jQuery version 1.4.3.<br/>



# Introduction

The term "data linking" is used here to mean "automatically linking the field of an object to another field of another object." That is to say, the two objects are "linked" to each other, where changing the value of one object (the 'source') automatically updates the value in the other object (the 'target').

*This is a fork of the official jQuery DataLink plugin. It has the following changes:*

* It is possible to apply convert and convertBack functions to more than one DOM element at a time.

```javascript
var model = {};
$("input").link(model, {__convert:function(val) { return val * 2;}});
// all inputs will be linked to model through the specified function
```

* It is possible to disable two way linking on more than one DOM element at a time.

```javascript
var model = {};

$("input").link(model, false);
// OR
$("input").link(model, {__twoWay:false});
// will create a one-way link from all elements to model
// all inputs on the page will have the function applied
```

* Values in the model will be pushed to DOM elements at link time.  

```javascript
var model = {a:76};

$("input").link(model);
// If the page contains an input with name (or failing that, id) equal to "a", it will now contain the value 76.
```

The reason for the first two changes are that for some work flows it is likely one would want to apply this functionality across more than one element at a time rather than having to specify every element's name. The reason for the last change is that it seems to be a safe assumption that someone linking a pre-populated object to DOM elements intends for those values to be pushed to the DOM elements.
* * * 
**Note:**

The intention is for that mixing the previous name-level properties with these newer selector wide attributes should work.
For example, given the following code:

```javascript
var model = {};
$("input").link(model, 
{
  __convert: function(value) {return value*2;}, 
  filename: {
      convert:function(value){return value.toLowerCase();}
  }
});
```

All inputs on the page would be linked to model through the multiplication converter except for an input with a name (or failing that, id) attribute equal to "filename", which would use the the toLowerCase converter.  However, this is not yet implemented because it conflicts with the idea that specifying specific attributes, like "filename" above, would cause only that mapping to actually be created. 
Possible solutions:

1. Simply not allow mixing of the two mapping styles.

2. The presence of selector wide keywords on the mapping object would imply that all elements matching the selector are to be bound, and any specific attribute named mappings would simply take precedence.

3. Specific attribute mappings would still imply that only those elements are to be mapped, and selector wide elements would simply provide additional functionality for those mappings. For example, you could specify a few attributes with name mappings, and have a selector wide __convert function that just applied to all those mappings:

```javascript
var person = {};
$("form").link(person, {
	firstName: {
           name:"first-name",
           twoWay:false
        },
	lastName: "last-name",
        __convert: function(value){return value.toUpperCase();}
});
```
This would imply that first-name is mapped one way to person.firstName, last-name is two-way mapped to person.lastName, and both mappings go through the UpperCase convert function.

## jQuery(..).link() API

The link API allows you to very quickly and easily link fields of a form to an object. Any changes to the form fields are automatically pushed onto the object, saving you from writing retrieval code. By default, changes to the object are also automatically pushed back onto the corresponding form field, saving you from writing even more code. Furthermore, converters lets you modify the format or type of the value as it flows between the two sides (for example, formatting a phone number, or parsing a string to a number).

```javascript
$().ready(function() {
	var person = {};
	$("form").link(person);

	$("[name=name]").val("NewValue"); // Set firstName to a value.
	alert(person.name); // NewValue
	
	$(person).setField("name", "NewValue");
	alert($("[name=name]").val()); // NewValue
	
	// ... user changes value ...
	$("form").change(function() {
		// &lt;user typed value&gt;
		alert(person.name); 
	});	
});
```
```html
<form name="person">
	&lt;label for="name">Name:&lt;/label>
	&lt;input type="text" name="name" id="name" />
</form>
```
The jQuery selector serves as a container for the link. Any change events received by that container are processed. So linking with $("form") for example would hookup all input elements. You may also target a specific element, such as with 

```javascript
$("#name").link(..)
```
## Customizing the Mapping

It is not always that case that the field of an object and the name of a form input are the same. You might want the "first-name" input to set the obj.firstName field, for example. Or you may only want specific fields mapped rather than all inputs.

```javascript
var person = {};
$("form").link(person, {
	firstName: "first-name",
	lastName: "last-name",
});
```

This links only the input with name "first-name" to obj.firstName, and the input with name "last-name" to obj.lastName.

## Converters and jQuery.convertFn

Often times, it is necessary to modify the value as it flows from one side of a link to the other. For example, to convert null to "None", to format or parse a date, or parse a string to a number. The link APIs support specifying a converter function, either as a name of a function defined on jQuery.convertFn, or as a function itself.

The plugin comes with one converter named "!" which negates the value.

```javascript
$().ready(function() {
	var person = {};

	$.convertFn.round = function(value) {
		return Math.round( parseFloat( value ) );
	}

	$("#age").link(person, {
		age: {
			convert: "round"
		}
	});
	
	/* Once the user enters their age, the change event will fire which, in turn, will
	 * cause the round function to be called. This will then round the age up or down, 
	 * set the rounded value on the object which will then cause the input field to be 
	 * updated with the new value.
	 */
	$("#age").change(function() {
		alert(person.age);
	});
});
```
```html
<form name="person">
	<label for="age">Age:</label>
	<input type="text" name="age" id="age" />
</form>
```

It is convenient to reuse converters by naming them this way. But you may also specify the converter directly as a function.

```javascript
var person = {};
$("#age").link(person, {
	age: {
		convert: function(value) {
			return Math.round( Math.parseFloat( value ) );
		}
	}
});

$("#name").val("7.5");
alert(person.age); // 8
```

**Canceling an update and customizing the update**

Converter functions receive the value that came from the source, the source object, and the target object. If a converter does not return a value or it returns undefined, the update does not occur. This allows you to not only be able to convert the value as it is updated, but to customize how the value is assigned.

```javascript
var person = {};
$("#age").link(person, {
	age: {
		convert: function(value, source, target) {
			var age = Math.round( Math.parseFloat( value ) );
			target.age = age;
			target.canVote = age >= 18;
		}
	}
});
$("#name").val("7.5");
alert(person.age); // 8
alert(person.canVote); // false
$("#name").val("18");
alert(person.canVote); // true
```

In this example, the converter sets two fields on the target, and neglects to return a value to cancel the default operation of setting the age field. 

Converters can also be specified for the reverse process of updating the source from a change to the target. You can use this to customize the attribute used to represent the value, rather than the default of setting the 'value'.

```javascript
var product = { };
$("#rank").link(product, {
	salesRank: {
		convertBack: function(value, source, target) {
			$(target).height(value * 2);
		}
	}
});
$(product).setField("salesRank", 12);
alert($("#rank").height()); // 24
```

This example links the height of the element with id "rank" to the salesRank field of the product object. When the salesRank changes, so does the height of the element. Note in this case there is no linking in the opposite direction. Changing the height of the rank element will not update the product.salesRank field.

**Selector-wide converter functions**

As stated in the introduction, it is possible to apply selector-wide convert and convertBack functions. By using the keywords __convert and __convertBack at the highest level of the mapping object, it will apply the functions for all elements matching the selector. For example:

```html
<form>
  <input name="inputa" type = "text"/>
  <input name="inputb" type = "text"/>
</form>
```

``javascript
var model = { };
$("input").link(product, {
    __convertBack: function(value, source, target) {
	return (value * 2);
    }
});

$(product).setField("inputa", 12);
alert($('input[name="inputa"]'); // 24
```
## One-way links
By default all mappings are two-way, but it is possible to specify a link be only one-way. To specify this for all elements matching your selector:

```javascript
var model = {};
$("input").link(model, false);
// or if you need to specify other mapping attributes
$("input").link(model, {
    __twoWay:false,
    __convert:function(value){return value*2;}}
);
```

To do this attribute by attribute, see the documentation on the [jQuery site](http://api.jquery.com/category/plugins/data-link/")

## Updating immediately

Sometimes it is desired that the target of a link reflect the source value immediately, even before the source is changed. In the direction of DOM element to model (JavaScript object) a change event must explicitly be triggered. For the other direction, from model to DOM element, the update happens automatically at link-time.

```javascript
var target = {};
$(source)
	.link(target)
	.trigger("change");

alert(target.input1); // value

// or in reverse
target = {age:25};

$(source)
	.link(target);

alert($("[name=age]").val()); // 25
```

## jQuery(..).unlink() API
This removes a link previously established with link.

```javascript
$(source)
	.link(target) // create link
	.unlink(target); // cancel link
```

**Automatic unlinking**

Links are cleaned up when its target or source is a DOM element that is being destroyed. For example, the following setups a link between an input and a span, then destroys the span by clearing it's parent html. The link is automatically removed.


```javascript
$("#input1").link("#span1", {
	text: "input1"
});
$("#span1").parent().html("");
```
