var main_view;
var ob = new Array();
var ob_urls = new Array();
svg = document.getElementById("main_view");


window.onload = function () {
    setViewbox();
    get_urls();
    //setInterval(update, 1);
}
window.onresize = setViewbox;

window.addEventListener("deviceorientation", setViewbox, true);

function setViewbox() {
    var _vb = xLeft + " " + yUpper + " " + vWidth + " " + vHeight;
    document.getElementById("main_view").setAttribute("viewBox", _vb);

    app.height = window.innerHeight;
    app.width = window.innerWidth;
    //adjust the object location
    for (i in ob) {
        ob[i].resize();
    }
    window.app.lastheight = window.app.height;
    window.app.lastwidth = window.app.width;

}


{
    var elem = document.documentElement;
    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }
}

window.addEventListener("keypress", keypressHandler, false)
function keypressHandler(e) {
    if (e.key == " ") {
        openFullscreen();
    }
}


xLeft = 0
yUpper = 0;
vWidth = window.innerWidth;
vHeight = window.innerHeight;
var isPanning = false;


//zoom/drag
{
    mouseX = 0;
    mouseY = 0;
    var scale = 1;


    const svgImage = svg;
    const svgContainer = window;

    var viewBox = { x: 0, y: 0, w: svgImage.clientWidth, h: svgImage.clientHeight };
    svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    const svgSize = { w: svgImage.clientWidth, h: svgImage.clientHeight };
    var lastPoint = { x: 0, y: 0 };
    var endPoint = { x: 0, y: 0 };;
    var dragged = false;

    var _firstcalldrag = true;
    var _firstcallzoom = true;

    (function () {
        var targetWasImage = false;
        window.addEventListener("wheel", e => {
            e.preventDefault();//prevent zoom
        }, { passive: false });

        window.onwheel = function (e) {
            var w = viewBox.w;
            var h = viewBox.h;
            var mx = mouseX;//mouse x  
            var my = mouseY;
            var dw = w * e.deltaY * 0.005;
            var dh = h * e.deltaY * 0.005;
            var dx = dw * mx / svgSize.w;
            var dy = dh * my / svgSize.h;
            viewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w - dw, h: viewBox.h - dh };
            xLeft = viewBox.x
            yUpper = viewBox.y
            vWidth = viewBox.w
            vHeight = viewBox.h
            scale = svgSize.w / viewBox.w;
            svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        }


        svg.onmousedown = function (e) {
            isPanning = true;
            lastPoint = { x: e.x, y: e.y };
            _firstcallzoom = true;
            _firstcalldrag = true;
            if(e.target.tagName == "image"){
                targetWasImage = true;
            }else{
                targetWasImage = false;
            }
        }

        svg.onmousemove = function (e) {
            if (isPanning && !targetWasImage) {
                endPoint = { x: e.x, y: e.y };
                if (!_firstcalldrag) {
                    var dx = (lastPoint.x - endPoint.x) / scale;
                    var dy = (lastPoint.y - endPoint.y) / scale;
                    if (dx != 0 || dy != 0) {
                        dragged = true;
                    }
                    viewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h };
                    xLeft = viewBox.x
                    yUpper = viewBox.y
                    vWidth = viewBox.w
                    vHeight = viewBox.h
                    svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
                }
                lastPoint = endPoint;
                _firstcalldrag = false;
                _firstcallzoom = true;
            }
        }

        svg.onmouseup = function (e) {
            if (isPanning) {
                endPoint = { x: e.x, y: e.y };
                if (!_firstcalldrag) {
                    var dx = (lastPoint.x - endPoint.x) / scale;
                    var dy = (lastPoint.y - endPoint.y) / scale;
                    if (dx != 0 || dy != 0) {
                        dragged = true;
                    }
                    viewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h };
                    xLeft = viewBox.x
                    yUpper = viewBox.y
                    vWidth = viewBox.w
                    vHeight = viewBox.h
                    svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
                }
                lastPoint = endPoint;
                _firstcalldrag = false;
                _firstcallzoom = true;
                isPanning = false;
                setTimeout(function (){dragged = false}, 10);
            }
        }

        svg.onmouseleave = function (e) {
            if (isPanning) {
                endPoint = { x: e.x, y: e.y };
                if (!_firstcalldrag) {
                    var dx = (lastPoint.x - endPoint.x) / scale;
                    var dy = (lastPoint.y - endPoint.y) / scale;
                    if (dx != 0 || dy != 0) {
                        dragged = true;
                    }
                    viewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h };
                    xLeft = viewBox.x
                    yUpper = viewBox.y
                    vWidth = viewBox.w
                    vHeight = viewBox.h
                    svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
                }
                lastPoint = endPoint;
                _firstcalldrag = false;
                _firstcallzoom = true;
                isPanning = false;
                setTimeout(function (){dragged = false}, 10);
            }
        }

    })();

    /*ondrag: null
    ondragend: null
    ondragenter: null
    ondragexit: null
    ondragleave: null
    ondragover: null
    ondragstart: null
    ondrop: null*/
    svg.childNodes.forEach(function (element) {
        if (element.nodeName == "image") {
            element.addEventListener("drag", function (e) { e.preventDefault }, { passive: false })
        }
    });

    svg.childNodes.forEach(function (element) {
        if (element.nodeName == "image") {
            element.addEventListener("dragend", function (e) { e.preventDefault }, { passive: false })
        }
    });
    svg.childNodes.forEach(function (element) {
        if (element.nodeName == "image") {
            element.addEventListener("dragenter", function (e) { e.preventDefault }, { passive: false })
        }
    });
    svg.childNodes.forEach(function (element) {
        if (element.nodeName == "image") {
            element.addEventListener("dragstart", function (e) { e.preventDefault }, { passive: false })
        }
    });
    (function () {
        document.onmousemove = handleMouseMove;
        function handleMouseMove(event) {
            var eventDoc, doc, body;

            event = event || window.event; // IE-ism

            // If pageX/Y aren't available and clientX/Y are,
            // calculate pageX/Y - logic taken from jQuery.
            // (This is to support old IE)
            if (event.pageX == null && event.clientX != null) {
                eventDoc = (event.target && event.target.ownerDocument) || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;

                event.pageX = event.clientX +
                    (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                    (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY +
                    (doc && doc.scrollTop || body && body.scrollTop || 0) -
                    (doc && doc.clientTop || body && body.clientTop || 0);
            }

            // Use event.pageX / event.pageY here
            mouseX = event.pageX;
            mouseY = event.pageY;
        }


    })();

    (function () {


        svg.ontouchstart = function (e) {
            lastPoint = { x: e.touches.item(0).clientX, y: e.touches.item(0).clientY };
            _firstcallzoom = true;
            _firstcalldrag = true;
        }
        svg.ontouchmove = function (e) {
            e.preventDefault();
            if (e.touches.length == 1) {
                endPoint = { x: e.touches.item(0).clientX, y: e.touches.item(0).clientY };
                if (!_firstcalldrag) {
                    var dx = (lastPoint.x - endPoint.x) / scale;
                    var dy = (lastPoint.y - endPoint.y) / scale;
                    viewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h };
                    xLeft = viewBox.x
                    yUpper = viewBox.y
                    vWidth = viewBox.w
                    vHeight = viewBox.h
                    svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
                }
                lastPoint = endPoint;
                _firstcalldrag = false;
                _firstcallzoom = true;
            }
            else if (e.touches.length == 2) {
                var deltaX1, deltaX2, deltaY1, deltaY2;

                var leftX, rightX, upperY, lowerY;
                if (e.touches.item(0).clientX < e.touches.item(1).clientX) {
                    leftX = e.touches.item(0).clientX;
                    rightX = e.touches.item(1).clientX;
                } else {
                    rightX = e.touches.item(0).clientX;
                    leftX = e.touches.item(1).clientX;
                }
                if (e.touches.item(0).clientY < e.touches.item(1).clientY) {
                    upperY = e.touches.item(0).clientY;
                    lowerY = e.touches.item(1).clientY;
                } else {
                    lowerY = e.touches.item(0).clientY;
                    upperY = e.touches.item(1).clientY;
                }

                if (!_firstcallzoom) {
                    deltaX1 = _lastxleft - leftX;
                    deltaY1 = _lastyupper - upperY;

                    deltaX2 = _lastxright - rightX;
                    deltaY2 = _lastylower - lowerY;
                    var delta = ((deltaX1 - deltaX2) + (deltaY1 - deltaY2)) * .01;

                    var midX, midY;
                    midX = leftX + ((rightX - leftX) / 2);
                    midY = upperY + ((lowerY - upperY) / 2);

                    var w = viewBox.w;
                    var h = viewBox.h;
                    var mx = midX;//mouse x  
                    var my = midY;
                    var dw = w * delta;
                    var dh = h * delta;
                    var dx = dw * mx / svgSize.w;
                    var dy = dh * my / svgSize.h;
                    viewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w - dw, h: viewBox.h - dh };
                    xLeft = viewBox.x
                    yUpper = viewBox.y
                    vWidth = viewBox.w
                    vHeight = viewBox.h
                    scale = svgSize.w / viewBox.w;
                    svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
                }
                _lastxleft = leftX;
                _lastyupper = upperY;

                _lastxright = rightX;
                _lastylower = lowerY;
                _firstcallzoom = false;
                _firstcalldrag = true;
            }
        }



        svg.ontouchend = function (e) {

        }

        svg.ontouchcancel = function (e) {

        }
    })();


}
function handleClick(event) {
    if (!dragged && !isPanning) {
        var targeturl = event.target.href.baseVal;
        var p = document.location.href;
        while (p.slice(-1) != "/") {
            p = p.slice(0, -1);
        }
        document.location = p + "exhibitview.php?target=" + targeturl;
    }
}


function update() {
    for (i in ob) {
        ob[i].update();
        document.getElementsByTagName("image")[i].setAttribute("x", ob[i].x + "px");
        document.getElementsByTagName("image")[i].setAttribute("y", ob[i].y + "px");
        document.getElementsByTagName("image")[i].setAttribute("width", ob[i].scaledStandardWidth + "px");
    }
    var _vbn = xLeft + " " + yUpper + " " + vWidth + " " + vHeight;
    document.getElementById("main_view").setAttribute("viewBox", _vbn);

}

function get_urls() {
    //dynamic, if on server
    if (window.location.href == "http://johannes-esklony.de/Ausstellung/") //TODO: change URL on deploy
    {
        $.ajax({
            url: "img/",
            dataType: 'text',
            success: function (data) {
                var elements = $("<pre>").html(data)[0].getElementsByTagName("a");
                for (var i = 1; i < elements.length; i++) {
                    var theText = elements[i].firstChild.nodeValue;
                    // Do something here
                    ob_urls.push(theText);
                    //$("body").prepend(theText);
                }
                load_objects();
            }
        });
    }
    //static, if on local machine (due to missing(differently formatted) autoindex)
    else {
        ob_urls = ["1.png"];
        load_objects();
    }
}

function load_objects() {
    //fill array
    for (i in ob_urls) {
        ob.push(new App_Object(ob_urls[i], i));
        var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        svgimg.setAttributeNS(null, 'height', ob[i].scaledStandardHeight);
        svgimg.setAttributeNS(null, 'width', ob[i].scaledStandardWidth);
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', ob[i].path);
        svgimg.setAttributeNS(null, 'x', ob[i].x);
        svgimg.setAttributeNS(null, 'y', ob[i].y);
        svgimg.setAttributeNS(null, 'visibility', 'visible');
        svgimg.setAttributeNS(null, 'onclick', "handleClick(event)")
        document.getElementById('main_view').append(svgimg);
    }

}

class App {
    constructor() {
        this.height = window.innerHeight;
        this.width = window.innerWidth;

        this.lastheight = this.height;
        this.lastwidth = this.width;

        //this.bg = new Image();

        //this.bg.src = "room.jpg";

    }



    //----------------------------------------------------------------------------------------------------------------//needs window.app (use in app.onload)

    //TODO: animate position
    app_update() {
    }
};

var app = new App();




class App_Object {
    constructor(path, id) {
        this.id = id;
        this.path = "img/" + path;
        this.img = new Image();
        this.img.src = this.path;
        this.width;
        this.getWidth(
            this.path,
            function (width) { ob[id].width = width; }
        );
        this.height;
        this.getHeight(
            this.path,
            function (height) { ob[id].height = height; }
        );

        this.x = Math.floor(Math.random() * window.app.width);
        this.y = Math.floor(Math.random() * window.app.height);


        this.scaledStandardWidth = 100;
        this.scaledStandardHeight = 100;

        this.rotation = 0.1;
    }
    getHeight(url, callback) {
        var img = new Image();
        img.onload = function () { callback(this.height); }
        img.src = url;
    }
    getWidth(url, callback) {
        var img = new Image();
        img.onload = function () { callback(this.width); }
        img.src = url;
    }


    update() {

    }

    resize() {
        this.x = this.x * (window.app.width / window.app.lastwidth);
        this.y = this.y * (window.app.height / window.app.lastheight);
    }

    //Position is center
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }


};


