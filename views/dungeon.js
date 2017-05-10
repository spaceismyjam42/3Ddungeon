console.log("dungeon.js hooked up");

var FloorLayout = function(){
    var _numRoomsX; //width
    var _numRoomsY; //height
    var _totalRooms;
    
    var _rooms = [];
    
    this.setRoomsX = function(numRoomsXInput){
        _numRoomsX = numRoomsXInput;
        _allocateRooms();
    }
    this.setRoomsY = function(numRoomsYInput){
        _numRoomsY = numRoomsYInput;
        _allocateRooms();
    }
    
    function _allocateRooms(){
        _totalRooms = _numRoomsX * _numRoomsY;
        
        for(i = 0; i < _totalRooms.length; i++){
            var room = new Room();
            _rooms[i] = room;
            
            if((i & 1) > 0){
                room.color = "green";
            }else{
                room.color = "blue";
            }
        }
    }
}//end of FloorLayout

function TileMapUtil(width, height){
    this.width = width;
    this.height = height;
    this.index_to_xy;
    this.xy_to_index;
    this.test;
    
    

    function xy_to_index(x, y){
        var y_blocks = y * width;
        var x_blocks = x;
        var index = y_blocks + x_blocks;
        console.log(index);
    }

    function index_to_xy(i){
        var y = Math.floor(i/width);
        var x = i - (y * width);
        console.log(x + "," + y);
    }
    
    function test(){
        xy_to_index(1, 2);
        index_to_xy(7);
    }
    
    test();
}//end TileMapUtil
TileMapUtil(6, 7);

var RoomLocation = function(){
    this.x = 0;
    this.y = 0;
    this.z = 0;
}

var Room = function(){
    this.color = "pink";
}

var DungeonShit = function(){
    var loc = new RoomLocation();

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


    function initDungeon(){
        var geometry = new THREE.BoxGeometry( 1, 1, .3, 5, 5, 5);
        
        var textureLoader = new THREE.TextureLoader();

        var texture0 = textureLoader.load( '/pics/dungeonwall.jpg' );
        var texture1 = textureLoader.load( '/pics/dungeonwall.jpg' );
        var texture2 = textureLoader.load( '/pics/dungeonwall.jpg' );
        var texture3 = textureLoader.load( '/pics/dungeonwall.jpg' );
        var texture4 = textureLoader.load( '/pics/dungeonwall.jpg' );
        var texture5 = textureLoader.load( '/pics/dungeonwall.jpg' );

        var materials = [
            new THREE.MeshBasicMaterial( { map: texture0, side: THREE.BackSide } ),
            new THREE.MeshBasicMaterial( { map: texture1, side: THREE.BackSide } ),
            new THREE.MeshBasicMaterial( { map: texture2, side: THREE.BackSide } ),
            new THREE.MeshBasicMaterial( { map: texture3, side: THREE.BackSide } ),
            new THREE.MeshBasicMaterial( { map: texture4, side: THREE.BackSide } ),
            new THREE.MeshBasicMaterial( { map: texture5, side: THREE.BackSide } )
        ];
        var faceMaterial = new THREE.MultiMaterial( materials );

        
        var numRoomsX = 6;
        var numRoomsY = 7;
        var layout1 = new FloorLayout();
        layout1.setRoomsX(numRoomsX);
        layout1.setRoomsY(numRoomsY);
        
        var tUtil   = new TileMapUtil(numRoomsX, numRoomsY);
        
        for(ix = 0; ix < numRoomsX; ix++){
            for(iy = 0; iy < numRoomsY; iy++){
                var cube = new THREE.Mesh( geometry, faceMaterial );
                scene.add( cube );
                
                cube.position.x = ix;
                cube.position.y = iy;
                
                /*
                if(cube.position.x == 1 && cube.position.y == 1){
                    testtext.innerHTML = "IT WORKED!";
                }else{
                    testtext.innerHTML = "default";
                }
                */
            }
        }
        
        camera.position.z = 5;
        //camera.position.y = 2;
        //camera.position.x = 2;
        
        _adjustCamera();
        
    }

    function render(){
        requestAnimationFrame( render );
        renderer.render( scene, camera );
    }
    render();

    initDungeon();
    
    
    function _tweenToRoom(dx, dy, dz){
        //var coords = { x: 0, y: 0 };
        var tween = new TWEEN.Tween(loc)
            //    x loc  y loc  z loc    time
            .to({ x: dx, y: dy, z: dz }, 250)
            .onUpdate(function() {
                //console.log(this.x, this.y);
                _adjustCamera();
            })
            .start();
            
        requestAnimationFrame(animate);

        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
    }
    
    
    
    
    
    var xcheck = 0;
    var ycheck = 0;
    var textbody = document.getElementById("textbody");
    function newText(){
        if(xcheck == 0 && ycheck == 0){
            textbody.innerHTML = "IT WORKS!";
        }else if(xcheck == 1 && ycheck == 0){
            textbody.innerHTML = "YOU WENT EAST";
        }else if(xcheck == 0 && ycheck == 1){
            textbody.innerHTML = "YOU WENT NORTH";
        }else if(xcheck == 1 && ycheck == 1){
            textbody.innerHTML = "YOU WENT NORTHEAST!";
        }
    }
    
    this.goNorth = function(){
        var destNorth = loc.y + 1;
        _tweenToRoom(loc.x, destNorth, loc.z);
        ycheck++;
        newText();
        console.log("x: " + xcheck + ", y: " + ycheck);
    }
    this.goEast  = function(){
        var destEast = loc.x + 1;
        _tweenToRoom(destEast, loc.y, loc.z);
        xcheck++;
        newText();
        console.log("x: " + xcheck + ", y: " + ycheck);
    }
    this.goSouth = function(){
        //camera.position.y--;
        var destSouth = loc.y - 1;
        _tweenToRoom(loc.x, destSouth, loc.z);
        ycheck--;
        newText();
        console.log("x: " + xcheck + ", y: " + ycheck);
    }
    this.goWest  = function(){
        //camera.position.x--;
        var destWest = loc.x - 1;
        _tweenToRoom(destWest, loc.y, loc.z);
        xcheck--;
        newText();
        console.log("x: " + xcheck + ", y: " + ycheck);
    }
    
    function _adjustCamera(){
        camera.position.x = loc.x;
        camera.position.y = loc.y;
    }
}//end DungeonShit

var DunWithYou = new DungeonShit();




//-----------------------------------------------------------------------//
//THE PART THAT LETS YOU MOVE WITH WASD
function upArrow(event){
    if(event.key == "w" || event.key == "W"){
        console.log("up key pressed");
        DunWithYou.goNorth();
    }
}
function leftArrow(event){
    if(event.key == "a" || event.key == "A"){
        console.log("left key pressed");
        DunWithYou.goWest();
    }
}
function downArrow(event){
    if(event.key == "s" || event.key == "S"){
        console.log("down key pressed");
        DunWithYou.goSouth();
    }
}
function rightArrow(event){
    if(event.key == "d" || event.key == "D"){
        console.log("right key pressed");
        DunWithYou.goEast();
    }
}