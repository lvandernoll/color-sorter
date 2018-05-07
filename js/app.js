let nameInput = document.querySelector('#nameInput');
let valueInput = document.querySelector('#valueInput');
let addButton = document.querySelector('#addButton');
let colorPalette = document.querySelector('#colorPalette');

let hexArray = [];

addButton.addEventListener('click', () => {
	colorPalette.classList.remove('hidden');
	hexArray.push({
		color: valueInput.value,
		name: nameInput.value,
	});
	outputColors(hexArray, '.hex__wrapper');	
})

let brand = [
	{color: "#004892", name: "Porter"},
	{color: "#EBDFD3", name: "Ongefilterd"},
	{color: "#66322F", name: "Dubbelbock"},
	{color: "#0E5C67", name: "Imperator"},
	{color: "#E14D0C", name: "IPA"},
	{color: "#B65C8F", name: "Session IPA"},
	{color: "#3E873D", name: "Lente Bock"},
	{color: "#7A4F34", name: "Oud Bruin"},
	{color: "#053830", name: "Pilsner"},
	{color: "#41395F", name: "Sylvester"},
	{color: "#8F752F", name: "UP"},
	{color: "#5D8DB5", name: "Weizen"},
	{color: "#CF8F00", name: "Blond"},
	{color: "#FFFFFF", name: "Acoholvrij Weizen"},
	{color: "#EEAA01", name: "Saison"},
];

brand.forEach( (bier) => {
	hexArray.push({
		color: bier.color,
		name: bier.name,
	});
});
	
var Color = function Color(hexVal) { //define a Color class for the color objects
	this.hex = hexVal.color;
	this.name = hexVal.name;
};

constructColor = function(colorObj){
	var hex = colorObj.hex.substring(1);
	/* Get the RGB values to calculate the Hue. */
	var r = parseInt(hex.substring(0, 2), 16) / 255;
	var g = parseInt(hex.substring(2, 4), 16) / 255;
	var b = parseInt(hex.substring(4, 6), 16) / 255;
	
	/* Getting the Max and Min values for Chroma. */
	var max = Math.max.apply(Math, [r, g, b]);
	var min = Math.min.apply(Math, [r, g, b]);
	
	
	/* Variables for HSV value of hex color. */
	var chr = max - min;
	var hue = 0;
	var val = max;
	var sat = 0;

	
	if (val > 0) {
		/* Calculate Saturation only if Value isn't 0. */
		sat = chr / val;
		if (sat > 0) {
			if (r == max) {
				hue = 60 * (((g - min) - (b - min)) / chr);
				if (hue < 0) {
					hue += 360;
				}
			} else if (g == max) {
				hue = 120 + 60 * (((b - min) - (r - min)) / chr);
			} else if (b == max) {
				hue = 240 + 60 * (((r - min) - (g - min)) / chr);
			}
		}
	}
	colorObj.chroma = chr;
	colorObj.hue = hue;
	colorObj.sat = sat;
	colorObj.val = val;
	colorObj.luma = 0.3 * r + 0.59 * g + 0.11 * b;
	colorObj.red = parseInt(hex.substring(0, 2), 16);
	colorObj.green = parseInt(hex.substring(2, 4), 16);
	colorObj.blue = parseInt(hex.substring(4, 6), 16);
	return colorObj;
};

sortColorsByHue = function (colors) {
	return colors.sort(function (a, b) {
		return a.hue - b.hue;
	});
};

outputColors = function(hexArray, domClass) { 
	let domElement = document.querySelector(domClass);
	domElement.innerHTML = '';
	var colors = [];
	hexArray.forEach( (i, v) => {
		var color = new Color(i);
		constructColor(color);
		colors.push(color);
	});
	
	sortColorsByHue(colors);

	for (i = 0; i < colors.length; i++){
		let colorBlock = document.createElement('div');
		colorBlock.setAttribute('id', i);
		colorBlock.classList.add('block');
		colorBlock.style.backgroundColor = colors[i].hex;
		let colorBlockHover = document.createElement('div');
		colorBlockHover.classList.toggle('hidden');
		colorBlockHover.innerText = colors[i].name;
		colorBlockHover.classList.add('color__hover');
		colorBlock.appendChild(colorBlockHover);
		domElement.appendChild(colorBlock);

		colorBlock.addEventListener('mouseover', () => {
			colorBlockHover.classList.toggle('hidden');
		});

		colorBlock.addEventListener('mouseout', () => {
			colorBlockHover.classList.toggle('hidden');
		});
	}
};
