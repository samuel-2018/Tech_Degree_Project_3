/* eslint-env jquery */

// Gives the 'name' input element focus.
$('#name').focus();

// Hides the text field for job role
$('#other-title').hide();

// Hides the color select menu
$('#colors-js-puns').hide();

// get value of design selection
$('#design').on('change', themeSelected);

// // get value of color selection
// $('#color').on('change', colorSelected);

// function colorSelected(event) {
//   console.log('colorSelected  ');
// }

function themeSelected(event) {
  /**
   * NOTES ON WORKING WITH SELECT > OPTION
   * The style attribute 'selected' only does anything on page load. It selects what is shown.
   *    The first item is automaticly selected.
   *    What is selected cannot be hidden. (?)
   *    To hide what would otherwise be the first item,
   *    first make another item the selection.
   * There is also a property 'selectedIndex'.
   * It affects things during run time.
   * Example: $('#color').prop('selectedIndex', 0);
   * */

  function hideAllColors() {
    // Hides the color select menu
    $('#colors-js-puns').hide();

    // Hides all the colors
    $('#color option[value="tomato"]').hide();
    $('#color option[value="steelblue"]').hide();
    $('#color option[value="dimgrey"]').hide();
    $('#color option[value="cornflowerblue"]').hide();
    $('#color option[value="darkslategrey"]').hide();
    $('#color option[value="gold"]').hide();
  }
  hideAllColors();

  if (event.target.value === 'js puns') {
    // Shows the color select menu
    $('#colors-js-puns').show();

    // Shows the matching colors
    $('#color option[value="cornflowerblue"]').show();
    $('#color option[value="darkslategrey"]').show();
    $('#color option[value="gold"]').show();

    // 'js puns': Selects the first available color
    // Sets which item is selected at first
    $('#color').prop('selectedIndex', 0);
  } else if (event.target.value === 'heart js') {
    // Shows the color select menu
    $('#colors-js-puns').show();

    // Shows the matching colors
    $('#color option[value="tomato"]').show();
    $('#color option[value="steelblue"]').show();
    $('#color option[value="dimgrey"]').show();

    // 'hearts js': Selects the first available color
    // Sets which item is selected at first
    $('#color').prop('selectedIndex', 3);

    // or use a selector to get a list of all options with 'show
    // then get the main list index value of the first item from that sub list, and dynamically use it for the selectedIndex
  }
}
