/* eslint-env jquery */

// Gives the 'name' input element focus.
$('#name').focus();

// Hides the text field for job role
$('#other-title').hide();

// Hides the color select menu
$('#colors-js-puns').hide();


// get value of design selection

// if then statement to select how to display color options
// display color menu


/**
 * NOTES ON WORKING WITH SELECT > OPTION
 * The first item is automaticly selected.
 * The first item cannot be hidden.
 * To hide what would otherwise be the first item,
 * first make another item the selection.
 * */

// 'js puns': Selects the first available color
$('#color option[value="cornflowerblue"]').attr("selected", "selected");
// Hides the non-matching colors
$('#color option[value="tomato"]').hide();
$('#color option[value="steelblue"]').hide();
$('#color option[value="dimgrey"]').hide();


// 'hearts js': Selects the first available color
$('#color option[value="tomato"]').attr("selected", "selected");
// Hides the non-matching colors
$('#color option[value="cornflowerblue"]').hide();
$('#color option[value="darkslategrey"]').hide();
$('#color option[value="gold"]').hide();
