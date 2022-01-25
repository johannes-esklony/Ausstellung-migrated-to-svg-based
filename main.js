var main_view;
var ob = new Array();
var ob_urls = new Array();
window.onload = function () {
    setViewbox();
    get_urls();
    setInterval(update, 1);
}
window.onresize = setViewbox;

window.addEventListener("deviceorientation", setViewbox, true);

function setViewbox() {
    _vb = "0 0 " + window.innerWidth + " " + window.innerHeight;
    document.getElementById("main_view").setAttribute("viewBox", _vb);


    //adjust the object location
    for (i in ob) {
        ob[i].resize();
    }
    window.app.lastheight = window.app.height;
    window.app.lastwidth = window.app.width;

}


{var elem = document.documentElement;
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}}

window.addEventListener("keypress", keypressHandler,false)
function keypressHandler(e){
    if(e.key == " "){
        openFullscreen();
    }
}

function update() {
    for (i in ob) {
        ob[i].update();
        document.getElementsByTagName("image")[i].setAttribute("x", ob[i].x);
        document.getElementsByTagName("image")[i].setAttribute("y", ob[i].y);
    }

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
function handleClick(event) {
    var targeturl = event.target.href.baseVal;
    var p = document.location.href;
    while (p.slice(-1) != "/") {
        p = p.slice(0, -1);
    }
    document.location = p + "exhibitview.php?target=" + targeturl;
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


        this.scaledStandardWidth = 500;
        this.scaledStandardHeight = 500;

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


