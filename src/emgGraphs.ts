import * as domLoaded from "dom-loaded"
import { Myo } from "myo/dist/Myo"
import { myoManager } from "myo"
//import $ from "jquery"
import "flot"
declare var $: any

//This tells myoManager.js to create the web sockets needed to communnicate with myoManager Connect


myoManager.on('connected', function(this: Myo){
	console.log('connected');
	this.streamEMG(true);

	setInterval(function(){
		updateGraph(rawData);
	}, 25)
})

myoManager.connect('com.myojs.emgGraphs');


var rawData = [0,0,0,0,0,0,0,0];
myoManager.on('emg', (data: any) => {
	rawData = data;
})


var range = 150;
var resolution = 50;
var emgGraphs: any

var graphData= [
	Array.apply(null, Array(resolution)).map(Number.prototype.valueOf,0),
	Array.apply(null, Array(resolution)).map(Number.prototype.valueOf,0),
	Array.apply(null, Array(resolution)).map(Number.prototype.valueOf,0),
	Array.apply(null, Array(resolution)).map(Number.prototype.valueOf,0),
	Array.apply(null, Array(resolution)).map(Number.prototype.valueOf,0),
	Array.apply(null, Array(resolution)).map(Number.prototype.valueOf,0),
	Array.apply(null, Array(resolution)).map(Number.prototype.valueOf,0),
	Array.apply(null, Array(resolution)).map(Number.prototype.valueOf,0)
]

var formatFlotData = (data: any) => {
  return [data.map((val: any, index: number) => {
    return [index, val]
  })]
}


var updateGraph = (emgData: any) => {

	graphData.map(function(data, index){
		graphData[index] = graphData[index].slice(1);
		graphData[index].push(emgData[index]);

		emgGraphs[index].setData(formatFlotData(graphData[index]));
		emgGraphs[index].draw();


	})

}

;(async () => {
  await domLoaded

  emgGraphs = graphData.map(function(podData, podIndex){
		return $('#pod' + podIndex).plot(formatFlotData(podData), {
			colors: ['#8aceb5'],
			xaxis: {
				show: false,
				min : 0,
				max : resolution
			},
			yaxis : {
				min : -range,
				max : range,
			},
			grid : {
				borderColor : "#427F78",
				borderWidth : 1
			}
		}).data("plot");
	})
})()
