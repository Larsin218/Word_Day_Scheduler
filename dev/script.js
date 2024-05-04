$(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  $(".saveBtn").on("click", function() {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  updateTimeBlocks();

  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    var storedInput = localStorage.getItem(timeBlockId);
    if (storedInput !== null) {
      $(this).find(".description").val(storedInput);
    }
  });
});
