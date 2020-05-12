/* 
	This script will be used to make all bottom 
	cells of component row of equal width. I expect
	this script to be reworked once the component is integrated
	into the modal.
*/

componentRow = document.getElementsByClassName("component_row")[0];
basisWidth = parseInt(window.getComputedStyle(componentRow)['width'], 10);

var componentPercentageCell = document.getElementsByClassName("wrapper_component percentage")[0];
var componentResultCell = document.getElementsByClassName("wrapper_component result")[0];
var componentLetterCell = document.getElementsByClassName("wrapper_component letter")[0];

componentPercentageCell.style.width = String(basisWidth/3) + "px";
componentResultCell.style.width = String(basisWidth/3) + "px";
componentLetterCell.style.width = String(basisWidth/3) + "px";
