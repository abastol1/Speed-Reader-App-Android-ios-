$(function(){

	// Declare variables
	var wordArray;
	var arrayLength; 		// length of the array
	var reading = false;
	var counter;		// positon of the reading word (0-length-1)
	var action;
	var frequency = 200; 		// frequency of reading

	// on page load hide elements we dont need, leave only text area and start button
	// only show textarea and start reading
	$("#new").hide();
	$("#resume").hide();
	$("#pause").hide();
	$("#controller").hide();
	$("#result").hide();
	$("#error").hide();


	// Click on start reading
	$("#start").click(function(){
		// get text from textare and split it to words
		wordArray = $("#userInput").val().split(/\s+/);
		arrayLength = wordArray.length;

		if (arrayLength > 1){
			// move to reading mode
			reading = true;

			$("#start").hide();
			$("#error").hide();
			$("#userInput").hide();

			$("#controller").show();
			$("#new").show();
			$("#pause").show();


			// Set progress slider to MAX
			$("#progressslider").attr("max", arrayLength - 1);

			// set the counter at zero
			counter = 0;
			$("#result").show();
			$("#result").text(wordArray[counter]);

			// Start reading fromm the first word
			action = setInterval(read, frequency);


		} else {
			$("#error").show();
		}
	});

	// click on New
	$("#new").click(function(){
		// reload the page
		location.reload();
	});

	// Click on Pause
	$("#pause").click(function(){
		// stop reading and switch to non-reading mode
		clearInterval(action);
		reading = false;

		$("#pause").hide();
		$("#resume").show();
	});

	// Click on Resume
	$("#resume").click(function(){
		action = setInterval(read, frequency);
		reading = true;
		$("#resume").hide();
		$("#pause").show();
	});

	// Change fontSize
	$("#fontsizeslider").on("slidestop", function(event, ui){
		// refresh the slider to get the new value
		$("#fontsizeslider").slider('refresh');

		// get the font size from the font size slider
		var sliderValue = parseInt($("#fontsizeslider").val());

		// change the fontsize in the result box
		$("#result").css("fontSize", sliderValue);
		// change the font size span
		$("#fontsize").text(sliderValue);
	});


	// Change speed



	// progress slider



	// Functions
	function read(){
		// If the counter hits last word
		if (counter == wordArray.length - 1){
			clearInterval(action);
			reading = false;
			$("#pause").hide();
		} else{
			// increase counter up by one
			counter++;
			$("#result").text(wordArray[counter]);	

			// set the progress slider value to counter and refresh the slider
			$("#progressslider").val(counter);
			$("#progressslider").slider('refresh');

			// change the percentage in progress Slider
			$("#percentage").text(Math.floor((counter/(arrayLength - 1)) * 100));
			
		}		
	}
})