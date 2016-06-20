function f_intersects(obj) {
    camera.updateMatrixWorld(); // make sure the camera matrix is updated
    camera.matrixWorldInverse.getInverse( camera.matrixWorld );
    cameraViewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
    frustum.setFromMatrix( cameraViewProjectionMatrix );
    frustum.intersectsObject( obj ); 
}
function removeEntity(object,array,i) {
    var selectedObject = scene.getObjectByName(object.name);
    scene.remove( selectedObject );
    //array.splice(i,1);
    toEnd(array,i);
    animate();
}
function toEnd(list, position) {
    list.push(list.splice(position, 1));
    return list;
}
