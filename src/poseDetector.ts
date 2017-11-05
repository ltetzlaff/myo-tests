import * as domLoaded from "dom-loaded"
import { myoManager } from "myo"
//import $ from "jquery"
import "flot"
declare var $: any

myoManager.connect('com.myojs.poseDetector');

myoManager.on('status', (data: any) =>{
	$('.events').prepend(JSON.stringify(data, null, 2));
})

//Whenever we get a pose event, we'll update the image sources with the active version of the image
myoManager.on('pose', (pose: any) => {
	$('img.' + pose).attr('src', 'img/' + pose + '_active.png');
	$('.mainPose img').attr('src', 'img/' + pose + '_active.png');
})

//Opposite of above. We also revert the main img to the unlocked state
myoManager.on('pose_off', (pose: any) => {
	$('img.' + pose).attr('src', 'img/' + pose + '.png');
	$('.mainPose img').attr('src', 'img/unlocked.png');
});


//Whenever a myo locks we'll switch the main image to a lock image
myoManager.on('locked', () => {
	$('.mainPose img').attr('src', 'img/locked.png');
});

//Whenever a myo unlocks we'll switch the main image to a unlock image
myoManager.on('unlocked', () => {
	$('.mainPose img').attr('src', 'img/unlocked.png');
});
