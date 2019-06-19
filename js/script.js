/* eslint-env jquery */

// =======================================
//                SETUP
// =======================================
// Gives the 'name' input element focus.
$('#name').focus();

// Hides the text field for job role.
$('#other-title').hide();

// Hides the color select menu.
$('#colors-js-puns').hide();

// =======================================
//              JOB ROLE
// =======================================
// Shows 'other' job role text field when needed.
function titleSelected(event) {
  if ($('#title').val() === 'other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
}
$('#title').on('change', titleSelected);

// =======================================
//              T-SHIRT
// =======================================
function themeSelected(event) {
  function showOptions(options) {
    options.forEach((option) => {
      $(`#color option[value=${option}]`).show();
    });
  }

  (function hideColorMenu() {
    // Hides the color select menu
    $('#colors-js-puns').hide();

    // Hides all the colors
    $('#color option').hide();
  }());

  if (event.target.value === 'js puns') {
    // JS PUNS:
    // Shows the color select menu
    $('#colors-js-puns').show();

    // Shows the matching colors
    showOptions(['cornflowerblue', 'darkslategrey', 'gold']);

    // Selects the first available color.
    $('#color').prop('selectedIndex', 0);

    // HEARTS JS:
  } else if (event.target.value === 'heart js') {
    // Shows the color select menu.
    $('#colors-js-puns').show();

    // Shows the matching colors.
    showOptions(['tomato', 'steelblue', 'dimgrey']);

    // Selects the first available color.
    $('#color').prop('selectedIndex', 3);
  }
}
$('#design').on('change', themeSelected);

// =======================================
//              ACTIVITIES
// =======================================
// SETUP FOR DISPLAYING TOTAL
const $totalDiv = $('<div id="activities_total" class="activities_total"></div>');
$('.activities').after($totalDiv);
let total = 0;

// CLICK HANDLING
$('.activities').on('change', (event) => {
  const $eventInput = event.target;

  // GETS TEXT
  function getText(input) {
    // Gets text of item user selected
    const text = $(input)
      .parent()
      .text();
    return text;
  }

  // GETS PRICE
  function getPrice(text) {
    // Gets the index of the '$' in the string.
    const priceIndex = text.indexOf('$');
    // Gets the price.
    const price = text.slice(priceIndex + 1);
    // Converts string to number.
    const priceInt = parseInt(price, 10);
    return priceInt;
  }

  // UPDATES DISPLAY
  function updateDisplay(input, priceInt) {
    // Updates the total.
    if (input.checked) {
      total += priceInt;
    } else {
      total -= priceInt;
    }
    // Displays updated total to screen.
    $('#activities_total').text(`Total: $${total}`);
  }

  // Updates values based on the item that initiated the callback.
  updateDisplay($eventInput, getPrice(getText($eventInput)));

  // GETS DATE
  function getDate(text) {
    const dateStartIndex = text.indexOf('—');
    const dateEndIndex = text.indexOf(',');
    const dayTime = text.slice(dateStartIndex + 1, dateEndIndex);
    return dayTime;
  }

  // Gets event info for comparison in loop below.
  const eventDayTime = getDate(getText($eventInput));
  const eventText = getText($eventInput);

  // Checks for schedule conflict.
  // (Note: If not working, check formatting of data in html file.)
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
});

// =======================================
//                PAYMENT
// =======================================
// Selects 'credit'
$("#payment option[value='credit card']").attr('selected', 'selected');

// Hides select payment message.
$('#payment option[value="select_method"]').hide();

// Hides PayPal and Bitcoin info.
$('#credit-card')
  .nextAll()
  .hide();

// Hides or reveals payment info as needed.
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

// =======================================
// FORM VALIDATION AND VALIDATION MESSAGES
// =======================================

// FORM VALIDATION
const isValid = {
  name() {
    return $('#name').val() !== '';
  },
  email() {
    return /^[^@]{1,253}@[a-zA-Z0-9\-.]{1,253}\.[a-zA-Z]{2,6}$/.test($('#mail').val());
  },
  activities() {
    const checkedItems = $('.activities').find(':checked');
    return checkedItems.length;
  },
  cardAll() {
    // Displays credit card error messages.
    controlMsg('num');
    controlMsg('numMissing');
    controlMsg('zip');
    controlMsg('cvv');
    controlMsg('exp');
    // Checks credit card info.
    if (isValid.num() && isValid.zip() && isValid.cvv() && isValid.exp()) {
      return true;
    }
    return false;
  },
  num() {
    // Is value not empty?
    if ($('#cc-num').val() !== '') {
      // Shows msg if invalid.
      return /^\d{13,16}$/.test($('#cc-num').val());
    }
    // Hides msg if value is empty.
    return true;
  },
  numMissing() {
    // Empty: show msg.
    // Not empty: hide msg.
    return $('#cc-num').val() !== '';
  },
  zip() {
    return /^\d{5}$/.test($('#zip').val());
  },
  cvv() {
    return /^\d{3}$/.test($('#cvv').val());
  },
  exp() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    // Gets value of user selected month.
    const month = $('#exp-month > option:selected').val();
    // Gets value of user selected year.
    const year = $('#exp-year > option:selected').val();
    // Check whether card date is >= to current date.
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
  form() {
    // Displays errors messages.
    controlMsg('name');
    controlMsg('email');
    controlMsg('activities');

    // Is card selected?
    if ($('#payment').prop('selectedIndex') === 1) {
      // Checks all fields.
      if (isValid.cardAll() && isValid.name() && isValid.email() && isValid.activities()) {
        return true;
      }
      // Checks all non-card fields.
    } else if (isValid.name() && isValid.email() && isValid.activities()) {
      return true;
    }
    return false;
  },
};

// VALIDATION MESSAGES
// (Used by event listeners and by submit via 'isValid.form')
function controlMsg(errName, elementToToggle = null) {
  // Hides error message.
  if (isValid[errName]()) {
    $(`#${errName}Err`).hide();
    // Option: Show an element when primary element is hidden.
    elementToToggle ? $(elementToToggle).show() : '';
  } else {
    // Shows error message.
    $(`#${errName}Err`).show();
    // Option: Hide an element when primary element is shown.
    elementToToggle ? $(elementToToggle).hide() : '';
  }
}

// VALIDATION SETUP
function createErrHandler(domTarget, errName, errMsg = null, elementToToggle = null) {
  // Option: Leaving out 'errMsg' will result in no DOM element being created.
  // Option: 'elementToToggle' is for hiding an element when primary element is shown and vice versa.
  if (errMsg) {
    const $msg = $(
      `<div id=${`${errName}Err`} class="err-msg" style="display: none">${errMsg}</div>`,
    );
    $(domTarget).after($msg);
  }
  $(domTarget).on('blur change keyup', () => {
    controlMsg(errName, elementToToggle);
  });
}

// Create Error Handler: domTarget, errName, errMsg = null, elementToToggle = null
createErrHandler('#name', 'name', 'Please provide your name.');
createErrHandler('#mail', 'email', 'Please provide a valid email address.');
createErrHandler('.activities', 'activities', 'Please choose an activity.', '#activities_total');
createErrHandler('#cc-num', 'num', 'Please enter a 13 to 16 digit number.');
createErrHandler('#cc-num', 'numMissing', 'Please provide a credit card number');
createErrHandler('#zip', 'zip', 'Please provide a 5-digit number.');
createErrHandler('#cvv', 'cvv', 'Please provide a 3-digit number.');
// The two expiration date handlers work together. Either one can hide or show same msg.
createErrHandler('#exp-year', 'exp', 'Credit card has expired.');
createErrHandler('#exp-month', 'exp');

// Submit
const formErr = $(
  '<div id="formErr" class="err-msg submit" style="display: none">Form cannot be submitted. See error message(s) for details.</div>',
);
$('form').append(formErr);

$('form').on('submit', (event) => {
  if (!isValid.form()) {
    event.preventDefault();
    $('#formErr').show();
  } else {
    $('#formErr').hide();
  }
});
