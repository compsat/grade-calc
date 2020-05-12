const gradeDropDownControl = document.getElementsByClassName("letter_grade_dropdown")[0];
const dropDownArrow = gradeDropDownControl.parentNode.querySelector(".dropdown_arrow");

gradeDropDownControl.addEventListener('focus', (event) => {
	dropDownArrow.setAttribute("style", "transform: rotate(180deg);")
});

gradeDropDownControl.addEventListener('blur', (event) => {
	dropDownArrow.setAttribute("style", "transform:");
})

const componentPercentageInput = document.getElementsByClassName("input_component percentage")[0];

componentPercentageInput.addEventListener('focus', (event) => {
	componentPercentageInput.setAttribute("placeholder", "");
});

componentPercentageInput.addEventListener('blur', (event) => {
	componentPercentageInput.setAttribute("placeholder", "Percentage of Component");
});