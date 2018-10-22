function readForm() {
	
	let formData = {};
	
	//read each element's value from the DOM
	//put it all into the formData object
	
	formData.name = document.getElementById('nameSuffix').value;
	formData.title = document.getElementById('title').value;
	formData.content = document.getElementById('content').value;
	
	formData.options = [];
	
	let options = document.getElementsByClassName('option');
	
	for (let i = 0; i < options.length; i++) {
		
		let optionObject = {};
		
		optionObject.choice = document.getElementById('option_' + i).value;
		optionObject.diceRoll = document.getElementById('diceRoll_' + i).checked;
		optionObject.winChance = parseFloat(document.getElementById('winChance_' + i).value);
		
		//The parseInt calls here were to fix the error where user submitted stories have a blank final panel
		//it didn't work - maybe the error is in play.js where the effect text is parsed?
		
		optionObject.win = {};
		optionObject.win.response = document.getElementById('winResponse_' + i).value;
		optionObject.win.effect = {};
		optionObject.win.effect.resource_happiness = parseInt(document.getElementById('winEffect_happ_' + i).value);
		optionObject.win.effect.resource_crew = parseInt(document.getElementById('winEffect_crew_' + i).value);
		optionObject.win.effect.resource_fuel = parseInt(document.getElementById('winEffect_fuel_' + i).value);
		optionObject.win.effect.resource_hull = parseInt(document.getElementById('winEffect_hull_' + i).value);
		
		optionObject.fail = {};
		optionObject.fail.response = document.getElementById('failResponse_' + i).value;
		optionObject.fail.effect = {};
		optionObject.fail.effect.resource_happiness = parseInt(document.getElementById('failEffect_happ_' + i).value);
		optionObject.fail.effect.resource_crew = parseInt(document.getElementById('failEffect_crew_' + i).value);
		optionObject.fail.effect.resource_fuel = parseInt(document.getElementById('failEffect_fuel_' + i).value);
		optionObject.fail.effect.resource_hull = parseInt(document.getElementById('failEffect_hull_' + i).value);
		
		if (optionObject.choice != undefined && optionObject.choice != null && optionObject.choice != "") {
			formData.options.push(optionObject);
		}
		
	}
	
	let data = JSON.stringify(formData);
	
	var xhr = new XMLHttpRequest();
	var url = "https://www.niallslater.com/games/mls5/submit.php";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			if (alert('Submission successful!')) 
				{}
			else {
				window.location.reload(true);
				window.scrollTo(0, 0);
			}
		}
	};
	
	xhr.send(data);	
}