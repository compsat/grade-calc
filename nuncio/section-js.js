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

	let closeRowBtn = document.createElement("BTN");
	closeRowBtn.className = "close_row_btn";

	let closeRowBtnImg = document.createElement("IMG");
	closeRowBtnImg.src = "delete_row_icon.svg";
	closeRowBtnImg.className = "close_row_img";

	closeRowBtn.appendChild(closeRowBtnImg);

	/* Add all inputs to row */
	componentRow.appendChild(componentNameWrapper);
	componentRow.appendChild(componentPercentageWrapper);
	componentRow.appendChild(componentNumericalResultWrapper);
	componentRow.appendChild(componentLetterResultWrapper);
	componentRow.appendChild(closeRowBtn);


	return componentRow;
}

function appendComponentRow() {
	const lastComponentRow = document.getElementById(`row_${numberOfMinorAssesments}`);
	const newComponentRow = componentRow();
	console.log(`row_${numberOfMinorAssesments}`);
	lastComponentRow.after(newComponentRow);
}

function displayAssessmentModal() {
	const modalDiv = document.getElementById("modal");
	modalDiv.style.visibility = "visible";

	document.getElementById("modal_content").classList.remove("modal_inactive");
}

function closeModal() {
	const modalDiv = document.getElementById("modal");
	modalDiv.style.visibility = "hidden";

	document.getElementById("modal_content").classList.add("modal_inactive");
}

function validateNumericalResultField() {
	const field = this;

	//check if valid
	let value = field.value;

	if (value.match("[a-zA-Z]+") || parseInt(value.split("/")[0], 10) > parseInt(value.split("/")[1], 10)) {
		field.style.borderColor = "#E06666";

		const errorText = field.parentNode.querySelector(".error_text");
		errorText.innerHTML = "Invalid!"
	} else {
		field.style.borderColor = "#67647E";
		const errorText = field.parentNode.querySelector(".error_text");
		errorText.innerHTML = "";
	}
}

function updateAutoCompletePlaceholder() {
	const correspondingPlaceholder = this.parentNode.querySelector(".input_autocomplete");

	if (!this.value || this.value.length == 0) {
		correspondingPlaceholder.placeholder = "";
	} else if (!this.value.match("^[0-9]+ */.*$")) {
		correspondingPlaceholder.placeholder = `${this.value} /`;
	} else if (this.value.match("^[0-9]+ */.*$")) {
		correspondingPlaceholder.placeholder = "";
	}

	if (this.value.match("^[0-9a-zA-Z^/]+$") && this.value.length > 9) {
		correspondingPlaceholder.placeholder = "";
	}

}
window.onload = () => {
	const addAssessmentBtn = document.getElementById("main-add-assessment-btn");
	addAssessmentBtn.addEventListener("click", displayAssessmentModal);

	numberOfMinorAssesments = 1;
	letterGrades = ["A", "B+", "B", "C+", "C", "D", "F"];

	let addComponentButton = document.getElementById("add_minor_assessment_btn");
	addComponentButton.addEventListener("click", (event) => appendComponentRow());

	document.addEventListener("click", (event) => {
		if (event.target.parentNode.className == "main-form" && event.target.className.match("btn") == null) {
			closeModal();
		}
	}); 

	let numericalResultRow = document.getElementsByClassName("input_component numerical_result")[0];
	numericalResultRow.addEventListener("input", (event) => {
		updateAutoCompletePlaceholder.call(event.target);
	})

	numericalResultRow.addEventListener("blur", validateNumericalResultField.bind(numericalResultRow));

}