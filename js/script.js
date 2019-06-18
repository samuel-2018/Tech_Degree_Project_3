/* eslint-env jquery */

// Gives the 'name' input element focus.
$('#name').focus();

// Hides the text field for job role
$('#other-title').hide();

// Hides the color select menu
$('#colors-js-puns').hide();

// get value of design selection
$('#design').on('change', themeSelected);

$('#title').on('change', titleSelected);

// Shows 'other' job role text field when needed
function titleSelected(event) {
  if ($('#title').val() === 'other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
}

function themeSelected(event) {
  /**
   * NOTES ON WORKING WITH SELECT > OPTION
   * The style attribute 'selected' only does anything on page load. It selects what is shown.
   *    The first item is automaticly selected.
   *    What is selected cannot be hidden. (?)
   *    To hide what would otherwise be the first item,
   *    first make another item the selection.
   *    Example:
   *    $("#payment option[value='credit card'").attr('selected', 'selected');
   *    $('#payment option[value="select_method"').hide();
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
const $totalDiv = $('<div id="activities_total" class="activities_total"></div>');
// Inserts the 'total' div into the dom
$('.activities').append($totalDiv);
// Global variable for total
let total = 0;

// **************ACTIVITIES****************************
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
    return text;
  }

  // GET PRICE
  function getPrice(text) {
    // Gets the index of the '$' in the string
    const priceIndex = text.indexOf('$');
    // Gets the price
    const price = text.slice(priceIndex + 1);
    // Converts string to number
    const priceInt = parseInt(price, 10);
    return priceInt;
  }

  // UPDATE DISPLAY (call only if a change)
  function updateDisplay(input, priceInt) {
    // Updates the total
    if (input.checked) {
      total += priceInt;
    } else {
      total -= priceInt;
    }
    // Displays updated total to screen
    $('#activities_total').text(`Total: $${total}`);
  }
  // this is for updating values based on the item that initiated the callback...
  updateDisplay($eventInput, getPrice(getText($eventInput)));

  // GET DATE
  function getDate(text) {
    // Gets the index of the '—' in the string
    const dateStartIndex = text.indexOf('—');
    // Gets the index of the ',' in the string
    const dateEndIndex = text.indexOf(',');
    // Gets the day and time
    const dayTime = text.slice(dateStartIndex + 1, dateEndIndex);
    return dayTime;
  }

  // For comparison in loop
  const eventDayTime = getDate(getText($eventInput));
  const eventText = getText($eventInput);

  $.each($('.activities input'), (i, input) => {
    const isScheduleConflict = eventDayTime === getDate(getText(input));
    const isNotSameActivity = eventText !== getText(input);

    if (isScheduleConflict && isNotSameActivity) {
      if ($eventInput.checked) {
        input.disabled = true;
      } else {
        input.disabled = false;
      }
    }
  });

  // TO DO Refactor above, convert functions to obj
});

// **************PAYMENT INFO****************************
// Selects 'credit'
$("#payment option[value='credit card'").attr('selected', 'selected');
// Hides the 'select a payment method'
$('#payment option[value="select_method"').hide();
// Hides info about paypal and bitcoin on page load
$('#credit-card')
  .nextAll()
  .hide();
// Hides or reveals payment info as needed
$('#payment').on('change', (event) => {
  switch (event.target.value) {
    case 'credit card':
      $('#credit-card').show();
      $('#credit-card')
        .nextAll()
        .hide();
      break;
    case 'paypal':
      $('#credit-card').hide();
      $('#credit-card')
        .next()
        .next()
        .hide();
      $('#credit-card')
        .next()
        .show();
      break;
    case 'bitcoin':
      $('#credit-card').hide();
      $('#credit-card')
        .next()
        .hide();
      $('#credit-card')
        .next()
        .next()
        .show();
      break;
    default:
      break;
  }
});

// **************FORM VALIDATION************************

// All of these need to ba able to be called at form submission time
// Some will be called when a field loses focus
// Others will also be called in real time

// Creates hidden validation messages
// <div id=""></div> *

// For creating error handlers: hidden div with msg, event listener
function createErrHandler(domTarget, errName, isValid, errMsg = null) {
  if (errMsg) {
    const $msg = $(`<div id=${errName} class="err-msg" style="display: none">${errMsg}</div>`);
    $(domTarget).after($msg);
  }
  $(domTarget).on('blur change', () => {
    controlMsg(errName, isValid);
  });
}
// Used by event listeners and by submit function for master validation
function controlMsg(errName, isValid) {
  if (isValid()) {
    $(`#${errName}`).hide();
  } else {
    $(`#${errName}`).show();
  }
}
createErrHandler('#name', 'nameErr', isNameValid, 'Please provide your name.');

// const nameErr = $(
//   '<div id="nameErr" class="err-msg" style="display: none">Please provide your name.</div>',
// );
// $('#name').after(nameErr);

// $('#name').on('blur change', () => {
//   if (isNameValid()) {
//     $('#nameErr').hide();
//   } else {
//     $('#nameErr').show();
//   }
// });

const emailErr = $(
  '<div id="emailErr" class="err-msg" style="display: none">Please provide a valid email address.</div>',
);
$('#mail').after(emailErr);

$('#mail').on('blur change', () => {
  if (isEmailValid()) {
    $('#emailErr').hide();
  } else {
    $('#emailErr').show();
  }
});

const activitiesErr = $(
  '<div id="activitiesErr" class="err-msg" style="display: none">Please choose an activity.</div>',
);
$('.activities').after(activitiesErr);

$('.activities').on('change', () => {
  if (isActivityValid()) {
    $('#activities_total').show();
    $('#activitiesErr').hide();
  } else {
    $('#activitiesErr').show();
    $('#activities_total').hide();
  }
});
// ********************************

const $cardNumErr = $(
  '<div id="cardNumErr" class="err-msg" style="display: none">Please provide a 13 to 16 digit number.</div>',
);
$('#cc-num').after($cardNumErr);

$('#cc-num').on('blur change', () => {
  if (isCreditValid.isCardValid()) {
    $('#cardNumErr').hide();
  } else {
    $('#cardNumErr').show();
  }
});

const $zipErr = $(
  '<div id="zipErr" class="err-msg" style="display: none">Please provide a 5-digit number.</div>',
);
$('#zip').after($zipErr);

$('#zip').on('blur change', () => {
  if (isCreditValid.isZipValid()) {
    $('#zipErr').hide();
  } else {
    $('#zipErr').show();
  }
});

const cvvErr = $(
  '<div id="cvvErr" class="err-msg" style="display: none">Please provide a 3-digit number.</div>',
);
$('#cvv').after(cvvErr);

$('#cvv').on('blur change', () => {
  if (isCreditValid.isCvvValid()) {
    $('#cvvErr').hide();
  } else {
    $('#cvvErr').show();
  }
});

const expErr = $(
  '<div id="expErr" class="err-msg" style="display: none">Credit card has expired.</div>',
);
$('#exp-year').after(expErr);

$('#exp-year').on('blur change', () => {
  if (isCreditValid.isExpValid()) {
    $('#expErr').hide();
  } else {
    $('#expErr').show();
  }
});
$('#exp-month').on('blur change', () => {
  if (isCreditValid.isExpValid()) {
    $('#expErr').hide();
  } else {
    $('#expErr').show();
  }
});
// ERROR CHECKING***********************************
const isValid = {};
function isNameValid() {
  return $('#name').val() !== '';
}
function isEmailValid() {
  return /^[^@]{1,253}@[a-zA-Z0-9\-.]{1,253}\.[a-zA-Z]{2,6}$/.test($('#mail').val());
}
function isActivityValid() {
  const checkedItems = $('.activities').find(':checked');
  return checkedItems.length;
}

//* ******************************************* */
// Checks whether credit card info is valid
const isCreditValid = {
  isCreditAll() {
    if (
      isCreditValid.isCardValid()
      && isCreditValid.isZipValid()
      && isCreditValid.isCvvValid()
      && isCreditValid.isExpValid()
    ) {
      return true;
    }
    return false;
  },
  isCardValid() {
    return /\d{13,16}/.test($('#cc-num').val());
  },

  isZipValid() {
    return /\d{5}/.test($('#zip').val());
  },

  isCvvValid() {
    return /\d{3}/.test($('#cvv').val());
  },

  isExpValid() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    // Gets value of user selected month
    const month = $('#exp-month > option:selected').val();
    // Gets value of user selected year
    const year = $('#exp-year > option:selected').val();
    // Check whether card date is >= to current date
    if (year >= currentYear) {
      if (year > currentYear) {
        return true;
      }
      if (month >= currentMonth) {
        return true;
      }
      return false;
    }
    return false;
  },
};

function isFormValid() {
  console.log('isformValid');
  // TO DO only check card if card is selected as payment method
  if (isNameValid() && isEmailValid() && isActivityValid() && isCreditAll()) {
    console.log('all are valid is true');
    return true;
  }
  return false;
}

$('form').on('submit', (event) => {
  if (!isFormValid()) {
    event.preventDefault();

    const formErr = $(
      '<div id="formErr" class="err-msg" style="display: none">Form can not be submitted. Please check details.</div>',
    );
    $('form').append(formErr);
    $('#formErr').show();

    // $('form').on('change', () => {
    //   if (isformValid) {
    //     $('#formErr').hide();
    //   } else {
    //     $('#formErr').show();
    //   }
    // });
  } else {
    $('#formErr').hide();
  }

  // prevent default ?
  // no page reload?
  // but also, if it doesn't pass tests...
  //
  console.log('submit ran');

  // create a master validator function
});
