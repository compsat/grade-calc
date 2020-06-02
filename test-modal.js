function generatePlaceHolderSelectOption() {
	let option = document.createElement("OPTION");
	option.disabled = true;

	return option;
}

function componentRow() {

	/* Construction of row container */
	let componentRow = document.createElement("DIV");
	componentRow.className = "component_row";
	componentRow.id = `row_${++numberOfMinorAssesments}`;


	/* Construction of minor assesment name input */
	let componentNameWrapper = document.createElement("DIV");
	componentNameWrapper.className = "input_wrapper";

	let componentNameInput = document.createElement("INPUT");
	componentNameInput.className = "input_component name";
	componentNameInput.type = "text";
	componentNameInput.name = "name";
	componentNameInput.required = true;

	let componentNamePlaceholder = document.createElement("SPAN");
	componentNamePlaceholder.className = "placeholder name";
	componentNamePlaceholder.innerHTML = "Minor Assessment Name";

	componentNameWrapper.appendChild(componentNameInput);
	componentNameWrapper.appendChild(componentNamePlaceholder);


	/* Construction of minor assessment percentage */
	let componentPercentageWrapper = document.createElement("DIV");
	componentPercentageWrapper.className = "input_wrapper percentage";

	let componentPercentageInput = document.createElement("INPUT");
	componentPercentageInput.className = "input_component percentage";
	componentPercentageInput.type = "text";
	componentPercentageInput.name = "percentage";
	componentPercentageInput.required = true;

	let componentPercentagePlaceholder = document.createElement("SPAN");
	componentPercentagePlaceholder.className = "placeholder percentage";
	componentPercentagePlaceholder.innerHTML = "Percentage";

	let componentPercentageSuffix = document.createElement("DIV");
	componentPercentageSuffix.className = "input_suffix percentage";

	componentPercentageWrapper.appendChild(componentPercentageInput);
	componentPercentageWrapper.appendChild(componentPercentageSuffix);
	componentPercentageWrapper.appendChild(componentPercentagePlaceholder);


	/* Construction of minor assessment numerical result */
	let componentNumericalResultWrapper = document.createElement("DIV");
	componentNumericalResultWrapper.className = "input_wrapper";

	let componentNumericalResultInput = document.createElement("INPUT");

	componentNumericalResultInput.className = "input_component numerical_result";
	componentNumericalResultInput.type = "text";
	componentNumericalResultInput.name ="numerical_result";
	componentNumericalResultInput.required = true;

	let componentNumericalResultPlaceholder = document.createElement("SPAN");
	componentNumericalResultPlaceholder.className = "placeholder numerical_result";
	componentNumericalResultPlaceholder.innerHTML = "Numerical Result";

	componentNumericalResultWrapper.appendChild(componentNumericalResultInput);
	componentNumericalResultWrapper.appendChild(componentNumericalResultPlaceholder);


	/* Construction of minor assessment letter result */
	let componentLetterResultWrapper = document.createElement("DIV");
	componentLetterResultWrapper.className = "input_wrapper";

	let componentLetterResultDropDown = document.createElement("SELECT");
	componentLetterResultDropDown.className = "input_component letter";
	componentLetterResultDropDown.required = true;

	componentLetterResultDropDown.appendChild(generatePlaceHolderSelectOption());

	/* Generate list of option nodes for all letter grades */
	dropDownOptions = letterGrades.map((grade) => {
		const option = document.createElement("OPTION");
		option.innerHTML = grade;
		option.value = grade;
		return option;
	});


	dropDownOptions.forEach((option) => componentLetterResultDropDown.appendChild(option));

	componentLetterResultDropDown.selectedIndex = 0;

	let componentLetterResultPlaceholder = document.createElement("SPAN");
	componentLetterResultPlaceholder.className = "placeholder letter";
	componentLetterResultPlaceholder.innerHTML = "Letter Result";

	componentLetterResultWrapper.appendChild(componentLetterResultDropDown);
	componentLetterResultWrapper.appendChild(componentLetterResultPlaceholder);

	/* Add all inputs to row */
	componentRow.appendChild(componentNameWrapper);
	componentRow.appendChild(componentPercentageWrapper);
	componentRow.appendChild(componentNumericalResultWrapper);
	componentRow.appendChild(componentLetterResultWrapper);


	return componentRow;
}

window.onload = () => {
	numberOfMinorAssesments = 3;
	letterGrades = ["A", "B+", "B", "C+", "C", "D", "F"];
}