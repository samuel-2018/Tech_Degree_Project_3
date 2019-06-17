/* eslint-env jquery */

// Gives the 'name' input element focus.
$('#name').focus();

// Hides the text field for job role
$('#other-title').hide();

// Hides the color select menu
$('#colors-js-puns').hide();

// get value of design selection
$('#design').on('change', themeSelected);

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

    // TO DO ... create a function to handle this dynamically
    // or use a selector to get a list of all options with 'show
    // then get the main list index value of the first item from that sub list, and dynamically use it for the selectedIndex
  }
}
// Creates div to hold the total
const $totalDiv = $('<div id="activities_total">???</div>');
// Inserts the 'total' div into the dom
$('.activities').append($totalDiv);
// Global variable for total
let total = 0;

// ******************************************
// Responds to clicks on activities
$('.activities').on('change', (event) => {
  const $eventInput = event.target;
  // NOTE: There is a difference between having a reference to an element
  // and having a reference to a selector of that element.
  // This may because one was not created with a jQuery selector... so it wasn't a jQuery object even though it was saved to something with a '$'

  // GET TEXT
  function getText(input) {
    // Gets text of item user selected
    const text = $(input)
      .parent()
      .text();
    console.log(input, text);
    return text;
  }

  // GET PRICE
  function getPrice(text) {
    // Gets the index of the '$' in the string
    const priceIndex = text.indexOf('$');
    console.log(priceIndex);
    // Gets the price
    const price = text.slice(priceIndex + 1);
    console.log(typeof price);
    console.log(price);
    // Converts string to number
    const priceInt = parseInt(price, 10);
    console.log(typeof priceInt);
    return priceInt;
  }

  // UPDATE DISPLAY (call only if a change)
  function updateDisplay(input, priceInt) {
    // Updates the total
    if (input.checked) {
      console.log('is checked');
      total += priceInt;
    } else {
      console.log('is not checked');
      total -= priceInt;
    }
    console.log('total  ', total);
    // Displays updated total to screen
    $('#activities_total').text(`Total: $${total}`);
  }
  // this is for updating values based on the item that initiated the callback...
  updateDisplay($eventInput, getPrice(getText($eventInput)));

  // GET DATE
  function getDate(text) {
    // Gets the index of the '—' in the string
    const dateStartIndex = text.indexOf('—');
    console.log('dateIndex ', dateStartIndex);
    // Gets the index of the ',' in the string
    const dateEndIndex = text.indexOf(',');
    // Gets the day and time
    const dayTime = text.slice(dateStartIndex + 1, dateEndIndex);
    console.log('dayTime', dayTime);
    return dayTime;
  }

  // For comparison in loop
  const eventDayTime = getDate(getText($eventInput));
  const eventText = getText($eventInput);

  $.each($('.activities input'), (i, input) => {
    console.log(input);
    const isScheduleConflict = eventDayTime === getDate(getText(input));
    const isNotSameActivity = eventText !== getText(input);
    console.log(isScheduleConflict, isNotSameActivity);

    if (isScheduleConflict && isNotSameActivity) {
      if ($eventInput.checked) {
        input.disabled = true;
      } else {
        console.log('input.disabled false RAN ');
        input.disabled = false;
      }
    }
  });
});
