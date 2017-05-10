
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


/*
var loader = new THREE.CubeTextureLoader();
loader.setPath( 'pics/' );

var textureCube = loader.load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );
    var materials = [
       new THREE.MeshLambertMaterial({
           map: THREE.TextureLoader('/pics/px.png')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.TextureLoader('/pics/nx.png')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.TextureLoader('/pics/py.png')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.TextureLoader('/pics/ny.png')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.TextureLoader('/pics/pz.png')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.TextureLoader('/pics/nz.png')
       })
    ];
    
    
cube = new THREE.Mesh(
    new THREE.BoxGeometry( 562, 562, 562, 1, 1, 1 ),
    new THREE.MultiMaterial( materials ) );
*/
    
    
    
    
var textureLoader = new THREE.TextureLoader();

var texture0 = textureLoader.load( '/pics/dungeonwall.jpg' );
var texture1 = textureLoader.load( '/pics/dungeonwall.jpg' );
var texture2 = textureLoader.load( '/pics/dungeonwall.jpg' );
var texture3 = textureLoader.load( '/pics/dungeonwall.jpg' );
var texture4 = textureLoader.load( '/pics/dungeonwall.jpg' );
var texture5 = textureLoader.load( '/pics/dungeonwall.jpg' );

var materials = [
    new THREE.MeshBasicMaterial( { map: texture0 } ),
    new THREE.MeshBasicMaterial( { map: texture1, side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: texture2, side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: texture3, side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: texture4, side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: texture5, side: THREE.BackSide } )
];
var faceMaterial = new THREE.MultiMaterial( materials );

var geometry = new THREE.BoxGeometry( 512, 512, 512 );
var cube = new THREE.Mesh( geometry, faceMaterial );
    
    
    
    
    

scene.add( cube );

camera.position.z = 800;




function render(){
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}
render();





