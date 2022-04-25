//	@input SceneObject rotationTarget
//	@input SceneObject obj
//	@input vec3 offset

// Execute in LateUpdate to make sure the other object's been rotated this frame
script.createEvent("LateUpdateEvent").bind(function(){
 // Get the forward vector of rotationTarget
 var forward = script.rotationTarget.getTransform().forward;

 // Flip the forward vector
 forward.z *= 1;

 // Zero out the vertical offset to constrain rotation to Y axis
 forward.y = 0;

 // Normalize the vector
 forward = forward.normalize();

 // Create new rotation using the vector
 var rot = quat.lookAt(forward, vec3.up());
 var pos = script.rotationTarget.getTransform().getWorldPosition();
 pos.x += script.offset.x;
 pos.y += script.offset.y;
 pos.z += script.offset.z;

 // Apply the rotation to this SceneObject
 //script.obj.getTransform().setWorldRotation(rot);
 script.obj.getTransform().setWorldPosition(pos);

});