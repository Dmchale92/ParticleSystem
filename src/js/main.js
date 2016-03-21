var svg = d3.select("#svgContainer").append("svg:svg").style("pointer-events", "all");
var colors = d3.scale.category20b();
var ci=0;
var debug = false;
function log(msg) {if (debug) {console.log(msg);}}

function Player() {
    var self = this;
    if (this == window) {throw('Can only be called to create new instance, i.e., with `new`.');}
    this.callbacks = {};
    this.bind = function(eventName, func) {this.callbacks[eventName] = func;};
    this.reset = function() {
        this.segmentStartHead = 0;
        this.index = -1;
        log('Simulation reset!');
        var callback = this.callbacks['reset']; if (callback) {callback();}
    };
    this.start = function(timeScale) {
        if (!timeScale) {timeScale = 1;}
        this.timeScale = timeScale;
        if (this.timeout) {clearTimeout(this.timeout);}
        if (!this.segmentStartTime) {this.segmentStartTime = new Date();}
        log('Simulation playing...');
        var callback = this.callbacks['start']; if (callback) {callback();}
    };
    this.pause = function() {
        clearTimeout(this.timeout);
        this.segmentStartHead = this.getHead();
        this.segmentStartTime = undefined;
        log('Simulation paused.');
        var callback = this.callbacks['stop']; if (callback) {callback();}
    };
    this.getHead = function() {
        return this.segmentStartHead + (new Date() - this.segmentStartTime)/this.timeScale;
    };
    this.getTimeUntilHeadOfEntry = function(index) {
        return this.entries[index][0] - this.getHead();
    };
}

stringConverter = {};

function mouseHandler(visualName) {
    return function() {
        var m = d3.mouse(svg[0][0]);
        var w = window.innerWidth, h = window.innerHeight;
        var fmx = m[0]/w, fmy = m[1]/h;
        return doVisual(visualName, fmx, fmy);
    };
}

$('#button-play-start').click(function() {player.start();});
$('#button-play-pause').click(function() {player.pause();});
$('#button-play-reset').click(function() {player.reset();});

var playerButtonSelectors = ['#button-play-start', '#button-play-pause', '#button-play-reset'];
function setButtonState(buttonSelectors, enableState) {
    for (var i = 0; i < buttonSelectors.length; i++) {
        if (enableState[i]===true) {$(buttonSelectors[i]).removeAttr('disabled');}
        else if (enableState[i]===false) {$(buttonSelectors[i]).attr('disabled', '');}
    }
}
player = new Player();
player.bind('start', function() {$('body').addClass('playing'); setButtonState(playerButtonSelectors, [false, true, true]);} );
player.bind('pause' , function() {$('body').removeClass('playing'); setButtonState(playerButtonSelectors, [true, false, true]);} );
player.bind('reset', function() {$('body').removeClass('playing'); setButtonState(playerButtonSelectors, [true, false, false]);} );
player.reset();


function doVisual(visualName, fmx, fmy, timeScale) {
    if (!timeScale) {timeScale=1;}
    var w = window.innerWidth, h = window.innerHeight;
    var particle = particles[visualName];
    return particle(w*fmx, h*fmy, w, h, timeScale);
}

function setEventHandler(visualName, eventName) {
    // log(visualName, eventName);
    svg.on(eventName, mouseHandler(visualName));
}

function setEventHandlerFromMenuOption(element, eventName) {
    var visualName = element.value;
    setEventHandler(visualName, eventName);
}

keyAliases = {
    "1": "#mousemove-leaves",
    "2": "#mousemove-snow",
    "3": "#mousemove-insects",

    "4": "#mousedown-leaves",
    "5": "#mousedown-snow",
    "6": "#mousedown-insects",

    "z": "#button-play-start",
    "x": "#button-play-pause",
    "c": "#button-play-reset",
};

function keystrokes(event) {
    if ($('textarea:focus, input:focus, select:focus').length>0) {return;}
    var k = event.charCode;
    s = String.fromCharCode(k);
    var $e = $(keyAliases[s]);
    if ($e.is('option')) {
        $e.parent().val($e.val());
        $e.change();
    }
    else if ($e.attr('disabled') === undefined) {
        $e.click();
    }
}
$(document).keypress(keystrokes);

$(document).ready(function() {
    setEventHandler('leaves', 'mousemove');
    setEventHandler('leaves', 'mousedown');
    $("#mousemoveSelector").change(function() {
        setEventHandlerFromMenuOption(this, 'mousemove');
    });
    $("#mousedownSelector").change(function() {
        setEventHandlerFromMenuOption(this, 'mousedown');
    });
    // importFromHash();
});
