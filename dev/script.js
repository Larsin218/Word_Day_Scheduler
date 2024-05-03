// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  

// });

$(function () {
  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // Add event listener for click events on the save button
  $(".saveBtn").on("click", function() {
    // Get the id of the containing time-block
    var timeBlockId = $(this).closest(".time-block").attr("id");
    // Get the user input from the textarea within this time-block
    var userInput = $(this).siblings(".description").val();
    // Save the user input in local storage using the time-block id as a key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Function to update time-block classes based on current hour
  function updateTimeBlocks() {
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();

    // Loop through each time-block
    $(".time-block").each(function() {
      // Get the hour from the time-block id
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Remove all classes (past, present, future) from the time-block
      $(this).removeClass("past present future");

      // Add past, present, or future class based on comparison with current hour
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Call updateTimeBlocks to initially set time-block classes
  updateTimeBlocks();

  // Retrieve user input from local storage and set textarea values
  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    var storedInput = localStorage.getItem(timeBlockId);
    if (storedInput !== null) {
      $(this).find(".description").val(storedInput);
    }
  });
});
