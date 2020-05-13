const gradeDropDownControl = document.getElementsByClassName("letter_grade_dropdown")[0];
const dropDownArrow = gradeDropDownControl.parentNode.querySelector(".dropdown_arrow");

window.dropDownIsShown = false;

gradeDropDownControl.addEventListener('focus', (event) => {
	dropDownArrow.setAttribute("style", "transform: rotate(180deg);")
	window.dropDownIsShown = true;
});

gradeDropDownControl.addEventListener('blur', (event) => {
	dropDownArrow.setAttribute("style", "transform:");
	window.dropDownIsShown = false;
})

document.addEventListener('click', (event) => {
	if (event.target.parentNode.className === "letter_grade_dropdown") {
		console.log("FOO");
		dropDownArrow.setAttribute("style", "transform:");
		window.dropDownIsShown = false;
	} else if (event.target.className === "letter_grade_dropdown") {
		dropDownArrow.setAttribute("style", "transform: rotate(180deg);");
		window.dropDownIsShown = true;
	}
});

const componentPercentageInput = document.getElementsByClassName("input_component percentage")[0];

componentPercentageInput.addEventListener('focus', (event) => {
	componentPercentageInput.setAttribute("placeholder", "");
});

componentPercentageInput.addEventListener('blur', (event) => {
	componentPercentageInput.setAttribute("placeholder", "Percentage of Component");
});