var mainDispCont = document.getElementById("main-display");
var helpDispCont = document.getElementById("help-display");
var numCount = 0;
var numButsColl = document.getElementsByClassName('numBut');
var numButs = [];
for (var i = 0; i < numButsColl.length; i++) {
	numButs.push(numButsColl[i]);
}
var zeroBut = document.getElementById('zero');
var acBut = document.getElementById('ac');
var ceBut = document.getElementById('ce');
var periodBut = document.getElementById('period');
var periodCount = 0;
var maxDigits = 8;
var maxHelp = 18;
var opButsColl = document.getElementsByClassName('opBut');
var opButs = [];
for (var i = 0; i < opButsColl.length; i++) {
	opButs.push(opButsColl[i]);
}
var opCount = 0;
var ceCount = 0;
var eqBut = document.getElementById('equals');
var eqCount = 0;

// adding event listeners for numerical buttons (except 0)
function createEvLisNum(item) {
	item.addEventListener('click', function() {
		if (mainDispCont.innerHTML.length < maxDigits && helpDispCont.innerHTML.length < maxHelp){
			if (eqCount > 0) {
				$('#main-display').html('');
				$('#help-display').html('');
				eqCount = 0;
			} else if (numCount == 0 && opCount == 0  && helpDispCont.innerHTML.length < 2) {
				$('#main-display').html('');
				$('#help-display').html('');
			} else if (opCount != 0) {
				$('#main-display').html('');
			}
			$('#main-display').append(item.value);
			$('#help-display').append(item.value);
			numCount++;
			opCount = 0;
			ceCount = 0;
		}
	})
}

// adding event listeners for operation buttons
function createEvLisOp(item) {
	item.addEventListener('click', function () {
		if (isNaN(mainDispCont.innerHTML[mainDispCont.innerHTML.length -1]) == false) {
			if (eqCount > 0) {
				$('#help-display').html(mainDispCont.innerHTML + item.value);
				$('#main-display').html(item.value);
				eqCount = 0;
				opCount++;
			} else if (opCount == 0) {
				$('#help-display').append(item.value);
				$('#main-display').html(item.value);
				numCount = 0;
				opCount++;
				ceCount++;
			}
		}
	})
}

window.onload = function() {
	opButs.forEach(createEvLisOp);
	numButs.forEach(createEvLisNum);
}

// adding event listener for "zero" button
zeroBut.addEventListener('click', function() {
	if (mainDispCont.innerHTML.length < maxDigits && helpDispCont.innerHTML.length < maxHelp){
		if (isNaN(mainDispCont.innerHTML) == true) {
			$('#help-display').append(0);
		}
		if (eqCount > 0) {
			$('#main-display').html(0);
			$('#help-display').html(0);
			eqCount = 0;
		} else if (numCount == 0 && opCount == 0 && helpDispCont.innerHTML.length < 2) {
			$('#main-display').html(0);
			$('#help-display').html(0);
		} else if (opCount != 0) {
			$('#main-display').html(0);
			numCount++;
		} else {
			$('#main-display').append(zeroBut.value);
			$('#help-display').append(zeroBut.value);
			numCount++;
			opCount = 0;
			ceCount = 0;
		}
	}
})

// adding event listener for "period" button
periodBut.addEventListener('click', function() {
	if (mainDispCont.innerHTML.indexOf('.') == -1) {
		if (eqCount > 0) {
			$('#main-display').html('');
			$('#main-display').append(0);
			$('#help-display').html('');
			$('#help-display').append(0);
			eqCount = 0;
		}
		if (isNaN(mainDispCont.innerHTML) == true) {
			$('#main-display').html('');
			$('#main-display').append(0);
			$('#help-display').append(0);
		}
		$('#main-display').append(periodBut.value);
		$('#help-display').append(periodBut.value);
		numCount++;
		opCount = 0;
	}
})

// adding event listener for "equals" button
eqBut.addEventListener('click', function() {
	if (eqCount == 0 && isNaN(mainDispCont.innerHTML) == false) {
		var result = eval(helpDispCont.innerHTML);
		if (result == Infinity) {
			$('#main-display').html('error');
		} else {
			result = Math.floor(result * 100) / 100;
			var strRes = result.toString();
			if (strRes.length > maxDigits) {
				$('#help-display').html('number too big');
			} else {
				$('#main-display').html(result);
			}
		}
		numCount = 0;
		opCount = 0;
		eqCount++;
	}
})

// adding event listener for AC button
acBut.addEventListener('click', function() {
	$('#main-display').html(0);
	$('#help-display').html(0);
	numCount = 0;
	periodCount = 0;
	opCount = 0;
})