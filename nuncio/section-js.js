//polyfill for epsilon used in percentage rounding
if (Number.EPSILON === undefined) {
    Number.EPSILON = Math.pow(2, -52);
}


gradeDictionary = {
	"A" : "92-100",
	"B+" : "87-91",
	"B" : "80-86",
	"C+" : "75-79",
	"C" : "68-74",
	"D" : "60-67",
	"F" : "<60"
}

function generatePlaceHolderSelectOption() {
	let option = document.createElement("OPTION");
	option.disabled = true;

	return option;
}

function getErrorText() {
	let errorText = document.createElement("P");
	errorText.className = "error_text";
	return errorText;
}

function componentRow() {

	/* Construction of row container */
	let componentRow = document.createElement("DIV");
	componentRow.className = "component_row";
	componentRow.id = `row_${++numberOfMinorAssesments}`;


	/* Construction of minor assesment name input */
	let componentNameWrapper = document.createElement("DIV");
	componentNameWrapper.className = "input_wrapper name";

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
	componentNameWrapper.appendChild(getErrorText());


	/* Construction of minor assessment percentage */
	let componentPercentageWrapper = document.createElement("DIV");
	componentPercentageWrapper.className = "input_wrapper percentage";

	let componentPercentageInput = document.createElement("INPUT");
	componentPercentageInput.className = "input_component percentage";
	componentPercentageInput.type = "text";
	componentPercentageInput.name = "percentage";
	componentPercentageInput.required = true;
	componentPercentageInput.addEventListener("input", validatePercentageField.bind(componentPercentageInput));

	let componentPercentagePlaceholder = document.createElement("SPAN");
	componentPercentagePlaceholder.className = "placeholder percentage";
	componentPercentagePlaceholder.innerHTML = "Percentage";

	let componentPercentageSuffix = document.createElement("DIV");
	componentPercentageSuffix.className = "input_suffix percentage";

	componentPercentageWrapper.appendChild(componentPercentageInput);
	componentPercentageWrapper.appendChild(componentPercentageSuffix);
	componentPercentageWrapper.appendChild(componentPercentagePlaceholder);
	componentPercentageWrapper.appendChild(getErrorText());


	/* Construction of minor assessment numerical result */
	let componentNumericalResultWrapper = document.createElement("DIV");
	componentNumericalResultWrapper.className = "input_wrapper";

	let componentNumericalResultInput = document.createElement("INPUT");

	componentNumericalResultInput.className = "input_component numerical_result";
	componentNumericalResultInput.type = "text";
	componentNumericalResultInput.name ="numerical_result";
	componentNumericalResultInput.required = true;
	componentNumericalResultInput.addEventListener("input", validateNumericalResultField.bind(componentNumericalResultInput));

	let componentNumericalResultPlaceholder = document.createElement("SPAN");
	componentNumericalResultPlaceholder.className = "placeholder numerical_result";
	componentNumericalResultPlaceholder.innerHTML = "Numerical Result";

	componentNumericalResultWrapper.appendChild(componentNumericalResultInput);
	componentNumericalResultWrapper.appendChild(componentNumericalResultPlaceholder);
	componentNumericalResultWrapper.appendChild(getErrorText());


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

	componentLetterResultDropDown.addEventListener("change", emptyOtherInputs.bind(componentLetterResultDropDown));


	let componentLetterResultPlaceholder = document.createElement("SPAN");
	componentLetterResultPlaceholder.className = "placeholder letter";
	componentLetterResultPlaceholder.innerHTML = "Letter Result";

	componentLetterResultWrapper.appendChild(componentLetterResultDropDown);
	componentLetterResultWrapper.appendChild(componentLetterResultPlaceholder);
	componentLetterResultWrapper.appendChild(getErrorText());

	let closeRowBtn = document.createElement("BTN");
	closeRowBtn.className = "close_row_btn";

	let closeRowBtnImg = document.createElement("IMG");
	closeRowBtnImg.src = "delete_row_icon.svg";
	closeRowBtnImg.className = "close_row_img";

	closeRowBtn.appendChild(closeRowBtnImg);
	closeRowBtn.addEventListener("click", deleteCorrespondingRow.bind(closeRowBtn));

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

function invalidateField() {
	field = this;
	field.style.borderColor = "#E06666";

	const errorText = field.parentNode.querySelector(".error_text");
	errorText.innerHTML = "Invalid!"
}

function deleteCorrespondingRow() {
	const row = this.parentNode;
	row.parentNode.removeChild(row);
	numberOfMinorAssesments--;
}

function validateNumericalResultField() {
	const field = this;

	//check if valid
	let value = field.value;

	//format check
	if (value.match("[a-zA-Z]+") || !value.match("[0-9]+/[0-9]+")) {
		invalidateField.call(this);
	//value check 
	} else if (parseInt(value.split("/")[0]) > parseInt(value.split("/")[1])) { 
		invalidateField.call(this);
	} else {
		field.style.borderColor = "#67647E";
		const errorText = field.parentNode.querySelector(".error_text");
		errorText.innerHTML = "";
		emptyOtherInputs.call(this);
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

function updatePercentageInput() {
	const percentageInput = this.parentNode.parentNode.querySelector(".input_component.percentage");
	if (this.tagName === "INPUT") {
		if (this.value.match("/")) {
			const scoreOfStudent = parseInt(this.value.split("/")[0]);
			const totalScore = parseInt(this.value.split("/")[1]);

			let rawPercentage = scoreOfStudent / totalScore;
			let roundedPercentage = Math.round((rawPercentage + Number.EPSILON) * 10000) / 100;
			percentageInput.value = roundedPercentage;
		} 
	} else if (this.tagName == "SELECT") {
		const letterGrade = this[this.selectedIndex].value;
		const gradeInterval = gradeDictionary[letterGrade];
		percentageInput.value = gradeInterval;
	}
}

function emptyOtherInputs() {
	const lastInput = this;

	const inputsToClear = Array.from(this.parentNode.parentNode.querySelectorAll(".input_component:not(.name)"));
	
	inputsToClear.forEach((input) => {
		if (input === this) {
			return;
		}

		if (input.tagName == "INPUT") {
			input.value = "";
		} else if (input.tagName == "SELECT") {
			input.selectedIndex = 0;
		}
	});

	updatePercentageInput.call(this);
}

function validatePercentageField() {
	const field = this;

	if (field.value.match("[^0-9]+") && !field.value.match("[0-9]+ *- *0-9]+") && !(field.value.match("< *[0-9]+"))) {
		invalidateField.call(this);
	} else if (parseInt(field.value, 10) > 100) {
		invalidateField.call(this);
	} else {
		field.style.borderColor = "#67647E";
		const errorText = field.parentNode.querySelector(".error_text");
		errorText.innerHTML = "";
		emptyOtherInputs.call(this);
	}
}

window.onload = () => {
	const addAssessmentBtn = document.getElementById("main-add-assessment-btn");
	addAssessmentBtn.addEventListener("click", displayAssessmentModal);

	numberOfMinorAssesments = 1;
	letterGrades = Object.keys(gradeDictionary);

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

	numericalResultRow.addEventListener("input", validateNumericalResultField.bind(numericalResultRow));

	let percentageInput = document.querySelector(".input_component.percentage:not(.primary)");
	percentageInput.addEventListener("input", validatePercentageField.bind(percentageInput));

	let gradeLetterInput = document.querySelector(".input_component.letter");
	gradeLetterInput.addEventListener("change", emptyOtherInputs.bind(gradeLetterInput));
	
}