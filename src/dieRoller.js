$(document).ready(function () {

	function rollDie(sides) {
		var randomNumber = Math.floor(Math.random() * sides) + 1;
		return randomNumber
	}

	function rollD10() {
		return rollDie(10);
	}

	function checkSuccess(dieRoll, targetNumber) {
		return dieRoll >= targetNumber;
	}


	function makeCheck(diePool = 1, targetNumber = 5, derby = 0) {
		if(diePool <= 0) {
			return 0;
		}
		
		var numSuccesses = 0;
		for(var i = 0; i < diePool; i++) {
			var result = roll(targetNumber, derby);
			if(checkSuccess(result[0], targetNumber)) {
				numSuccesses++;
			}
		}
		return numSuccesses;
	}

	function roll(targetNumber, derby = 0) {

		var result = rollD10();

		// a derby of zero means just keep the roll
		if(derby == 0) {
			return [result, -1];
		}
		
		
		if(derby > 0) {
			// only reroll when it is not already a success and it is less then or equal to the derby
			if(!checkSuccess(result, targetNumber) && result <= derby) {
				return [rollD10(), result];
			}
			// if already a success, or roll is greater than derby, keep the roll
			return [result, -1];
		}
		
		if(derby < 0) {
			// a -1 means reroll a 10, -2 means reroll 9 or 10, etc.
			var reRollNum = 11 + derby <= 1 ? 1 : 11 + derby;
			// for negative derby, reroll when it is a success and greater than or equal to the 11 + derby
			if(checkSuccess(result, targetNumber) && result >= reRollNum ) {
				return [rollD10(), result];
			}
			// if already a failure or roll if lower than 10 + derby, keep the roll
			return [result, -1];
		}
		
	}

	function rollInit() {
		return rollD10() + rollD10();
	}



	// setup button listeners
	
	// multiple rolls
	$("#rollMultiple").click(function() {
		
		// get the number to roll from the input
		var numDice = parseInt($("#multipleDieChooser").val());
		
		var displayText = "";
		for(var i = 0; i < numDice; i++) {
			var dieResult = rollD10();
			displayText += dieResult + ", ";
		}
		
		// remove the trailing ,
		displayText = displayText.substring(0, displayText.length - 2);
		
		$("#resultTextMultiple").text(displayText);
		$(this).blur();
	});
	
	// check roll
	$("#rollChoice").click(function() {
		
		// get the number to roll from the input
		var numDice = parseInt($("#choiceDieChooser").val());
		var targetNumber = parseInt($("#choiceTargetNumber").val());
		var derby = parseInt($("#choiceDerbyChooser").val());
	
		// remove the trailing ,
		var numSuccesses = 0;
		var displayText = "";
		for(var i = 0; i < numDice; i++) {
			var result = roll(targetNumber, derby);
			if(result[1] != -1) {
				displayText += result[0] + " (" + result[1] + "), ";
			} else {
				displayText += result[0] + ", ";
			}
			if(checkSuccess(result[0], targetNumber)) {
				numSuccesses++;
			}
		}
		
		// remove the trailing ,
		displayText = displayText.substring(0, displayText.length - 2);
		
		$("#resultTextCheck").text(displayText);
		$("#resultTextSuccess").text(numSuccesses);
		$(this).blur();
	});
	
	// roll init
	$("#rollInit").click(function() {
		var initResult = rollD10() + rollD10();
		$("#resultTextInit").text(initResult);
		$(this).blur();
	});
	
	
	//setup spinner
	$("input[type='number']").inputSpinner();

});