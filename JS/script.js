var context;
var canvas;

var timeVar;

var count;
var totalCount = 10;

var startDataArray;

var img;

window.onload = function() {
	canvas = document.getElementById("ImgCanvas");
	context = canvas.getContext("2d");
	img = new Image();
	img.src = "img/material.png";
	img.addEventListener("load", eventImageLoaded, false);

	//set the startDataArray;
	startDataArray = new Array();

	function eventImageLoaded() {
		context.drawImage(img, 0, 0);
		// console.log(context);
		var ImgData = context.getImageData(0, 0, canvas.width, canvas.height);
		for( n = 0; n < ImgData.width * ImgData.height; n++) {
			var index = n * 4;
			var r = ImgData.data[index] * 0.21 + ImgData.data[index + 1] * 0.71 + ImgData.data[index + 2] * 0.09;

			startDataArray[n] = r;

			ImgData.data[index] = startDataArray[n];
			ImgData.data[index + 1] = startDataArray[n];
			ImgData.data[index + 2] = startDataArray[n];

		}

		context.putImageData(ImgData, 0, 0);
	}

}
mouseOver = function() {
	count = 0;
	timeVar = setInterval(function() {
		myTimer()
	}, 33);
}
myTimer = function() {
	context.drawImage(img, 0, 0);

	var overImageData = context.getImageData(0, 0, canvas.width, canvas.height);
	for(var n = 0; n < overImageData.width * overImageData.height; n++) {
		var index = n * 4;

		overImageData.data[index] = easingFunc(overImageData.data[index], startDataArray[n], count / totalCount);
		overImageData.data[index + 1] = easingFunc(overImageData.data[index + 1], startDataArray[n], count / totalCount);
		overImageData.data[index + 2] = easingFunc(overImageData.data[index + 2], startDataArray[n], count / totalCount);

	}
	context.putImageData(overImageData, 0, 0);
	count++;

	// console.log("myTimer: "+count);
	if(count > totalCount) {
		console.log("count > totalCount");
		clearInterval(timeVar);
	}
}
mouseOut = function() {
	// alert("mousOut");
	clearInterval(timeVar);

	var ImgData = context.getImageData(0, 0, canvas.width, canvas.height);
	for( n = 0; n < ImgData.width * ImgData.height; n++) {
		var index = n * 4;
		
		ImgData.data[index] = startDataArray[n];
		ImgData.data[index + 1] = startDataArray[n];
		ImgData.data[index + 2] = startDataArray[n];
	}

	context.putImageData(ImgData, 0, 0);
}
easingFunc = function(desVal, startVal, rate) {
	var returnVal = startVal + (desVal - startVal) * Math.pow(rate, 2);
	return returnVal;
}