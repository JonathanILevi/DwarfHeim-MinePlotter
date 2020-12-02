import {div,Div} from "/modules/Div.m.js";

function main() {
	document.body.appendChild(
		div(	"h1",
			Div.attribute("style","text-align:center;"),
			Div.text("DwarfHeim MinePlotter!"),
		)
	);
}

document.addEventListener("load", main, true);


