
var mapS = new Image();
var mapM = new Image();
var mapL = new Image();
var mapXL = new Image();
mapS.src = "map-s.gif";
mapM.src = "map-m.gif";
mapL.src = "map-l.gif";
mapXL.src = "map-xl.gif";
var zoomArray = [mapS, mapM, mapL, mapXL];

var mapFrame = document.getElementById('mapframe');
var controlSec = document.getElementById('controlSec');
var map = document.getElementById('map');
var zoomIn = document.getElementById('zoomIn');
var zoomOut = document.getElementById('zoomOut');
var north = document.getElementById('north');
var west = document.getElementById('west');
var east = document.getElementById('east');
var south = document.getElementById('south');

// RESIZE
function handleResize() {
	mapFrame.style.position = 'absolute';
	mapFrame.style.top = 30 + 'px';
	mapFrame.style.left = 30 + 'px';
	mapFrame.style.height = (window.innerHeight - 100) + 'px';
    mapFrame.style.width = (window.innerWidth - 400) + 'px';
    controlSec.style.position = 'absolute';
    controlSec.style.width = 150 + 'px';
    controlSec.style.left = (window.innerWidth - 250) +'px';
    controlSec.style.top = 30 + 'px';
}
window.addEventListener('resize', handleResize, false);
window.addEventListener('load', handleResize, false);

// ZOOM
map.style.position = 'absolute';
var index = 0;
function zoom(event) {
    var previousX = parseFloat(window.getComputedStyle(map).getPropertyValue("left")) - parseFloat(mapFrame.style.width) / 2;
    var previousY = parseFloat(window.getComputedStyle(map).getPropertyValue("top")) - parseFloat(mapFrame.style.height) / 2;
    var previousWidth = zoomArray[index].width;
    var previousHeight = zoomArray[index].height;
    if (event.target.id == 'zoomIn') {
        index += 1;
        index = index % zoomArray.length;
    }
    if (event.target.id == 'zoomOut') {
        index -= 1;
        index = (index + zoomArray.length) % zoomArray.length;
    }
    map.style.left = parseFloat(mapFrame.style.width) / 2 + zoomArray[index].width * previousX / previousWidth + "px";
    map.style.top = parseFloat(mapFrame.style.height) / 2 + zoomArray[index].height * previousY / previousHeight + "px";
    map.src = zoomArray[index].src;
}
zoomIn.addEventListener('click', zoom, false);
zoomOut.addEventListener('click', zoom, false);

// SET CENTER
function handleDblClick(event) {
    var previousX = event.clientX
    var previousY = event.clientY
    map.style.left = parseFloat(window.getComputedStyle(map).getPropertyValue("left")) + parseFloat(parseFloat(mapFrame.style.width) / 2 - previousX) + "px";
    map.style.top = parseFloat(window.getComputedStyle(map).getPropertyValue("top")) + parseFloat(parseFloat(mapFrame.style.height) / 2 - previousY) + "px";
}
document.addEventListener("dblclick",handleDblClick);

// MOVE
function move(event) {
    var halfWidth = parseFloat(mapFrame.style.width) / 2;
    var halfHeight = parseFloat(mapFrame.style.height) / 2;
    if (event.target.id == 'north') {
        map.style.top = parseFloat(window.getComputedStyle(map).getPropertyValue("top")) - halfHeight + 'px';
    }
    if (event.target.id == 'west') {
        map.style.left = parseFloat(window.getComputedStyle(map).getPropertyValue("left")) - halfWidth + 'px';
    }
    if (event.target.id == 'east') {
        map.style.left = parseFloat(window.getComputedStyle(map).getPropertyValue("left")) + halfWidth + 'px';
    }
    if (event.target.id == 'south') {
        map.style.top = parseFloat(window.getComputedStyle(map).getPropertyValue("top")) + halfHeight + 'px';
    }
}
north.addEventListener('click', move, false);
west.addEventListener('click', move, false);
east.addEventListener('click', move, false);
south.addEventListener('click', move, false);

// drag
var drag = false;
var mouseDownX = 0;
var mouseDownY = 0;
var originalTop = 0;
var originalleft = 0;
function handleMouseDown(event) {
    event.preventDefault();
    drag = true;
    mouseDownX = event.clientX;
    mouseDownY = event.clientY;
    originalTop = parseFloat(window.getComputedStyle(map).getPropertyValue("top"));
    originalleft = parseFloat(window.getComputedStyle(map).getPropertyValue("left"));

}
document.addEventListener("mousedown",handleMouseDown); 

function dragMap(event) {
    if (drag == true) {
        event.preventDefault();
        mapFrame.style.cursor = "move";
        map.style.left = originalleft - mouseDownX + event.clientX + "px";
        map.style.top = originalTop - mouseDownY + event.clientY  + "px";
    }
}
document.addEventListener("mousemove", dragMap, false);

function dropMap(event) {
    drag = false;
    mapFrame.style.cursor = "default";
}
document.addEventListener("mouseup", dropMap, false);