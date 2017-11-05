import * as domLoaded from "dom-loaded"
import { myoManager } from "myo"
//import $ from "jquery"
import "flot"
declare var $: any

//This tells myoManager.js to create the web sockets needed to communnicate with myoManager Connect
myoManager.connect('com.myojs.deviceGraphs')

myoManager.on('gyroscope', (quant: any) => {
	updateGraph(quant)
})

var range = 500
var resolution = 100
var graph : any

var arrayOfZeros = Array.apply(null, Array(resolution)).map(Number.prototype.valueOf,0);

var graphData : any = {
	x : arrayOfZeros.slice(0),
	y : arrayOfZeros.slice(0),
	z : arrayOfZeros.slice(0),
//	w : Array.apply(null, Array(resolution)).map(Number.prototype.valueOf,0)
}

var formatFlotData = () => {
	return Object.keys(graphData).map((axis) => {
		return {
			label : axis + ' axis',
			data : graphData[axis].map((val: any, index: number) => {
				return [index, val]
			})
		}
	});
}

var updateGraph = (orientationData: any) => {
	Object.keys(orientationData).map((axis) => {
		graphData[axis] = graphData[axis].slice(1);
		graphData[axis].push(orientationData[axis]);
	});

	graph.setData(formatFlotData());
	graph.draw();
}

;(async () => {
  await domLoaded

  graph = $('.orientationGraph').plot(formatFlotData(), {
		colors: [ '#04fbec', '#ebf1be', '#c14b2a', '#8aceb5'],
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

  console.log("# Ready")
})()
