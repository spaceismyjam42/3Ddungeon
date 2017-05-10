console.log("jqueryglow hooked up");
function glow(){
    var glower = $('#myGlower');
    window.setInterval(function() {  
        console.log("glow is being called");
        glower.toggleClass('active');
    }, 1000);
}
glow();