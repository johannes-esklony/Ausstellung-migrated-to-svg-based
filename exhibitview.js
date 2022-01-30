const target = new URLSearchParams(window.location.search).get('target');
    
var img = document.createElement("img");
    img.setAttribute('src', target);
    document.getElementById('picture').prepend(img);


{
    var isFullscreen = false;
    {
        var elem = document.documentElement;
        function handleFullscreenToggle() {
            if (isFullscreen) {
                isFullscreen = false;
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
            } else {
                isFullscreen = true;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) { /* Safari */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE11 */
                    elem.msRequestFullscreen();
                }
            }
        }
        function handleFullscreen() {
            if (!isFullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
            } else {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) { /* Safari */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE11 */
                    elem.msRequestFullscreen();
                }
            }
        }
    }
    
    window.addEventListener("keypress", keypressHandler, false)
    function keypressHandler(e) {
        if (e.key == " ") {
            e.preventDefault();
            handleFullscreenToggle();
        }
    }
    
}
