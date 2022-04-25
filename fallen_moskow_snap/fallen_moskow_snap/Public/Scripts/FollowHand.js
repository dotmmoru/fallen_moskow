// -----JS CODE-----
//@input Component.ScreenTransform hand
//@input float yColisionPos 

//@input Component.Image spriteVisual
//@input SceneObject ship

//@input SceneObject handFoundHint
//@input SceneObject moveDownHint

//@input Component.AudioComponent explosionAudio
//@input Component.AudioComponent fallingAudio

//@input Component.Image[] spriteFire

var isAttacked = true;

var isHintsPlayed = false;

function Start()
{
	delay_PlayIdle.reset(3);
}

var delay_PlayIdle = script.createEvent("DelayedCallbackEvent");
delay_PlayIdle.bind(function (eventData)
{
    global.tweenManager.startTween(script.ship, "idle");

    isAttacked = false;
});

script.createEvent("UpdateEvent").bind(function(){
	
	//print(script.hand.getTransform().getWorldPosition());
	CheckHandPos();
});

function CheckHandPos()
{
	var yPos = script.hand.getTransform().getWorldPosition().y;
	if(yPos < script.yColisionPos && isAttacked === false)
	{
		print(yPos < script.yColisionPos);

		PlayExplosion();

		isAttacked = true;

		delay_PlayFire.reset(0.25);

		delay_GoUnderWater.reset(5);
	}
}

function PlayExplosion()
{
	script.hand.getSceneObject().enabled = false;

	script.spriteVisual.enabled = true;
	var provider = script.spriteVisual.mainPass.baseTex.control;
	provider.play(1, 0);

	script.explosionAudio.play(1);

	global.tweenManager.startTween(script.spriteVisual.getSceneObject(), "hide");
}

var delay_PlayFire = script.createEvent("DelayedCallbackEvent");
delay_PlayFire.bind(function (eventData)
{
	print("delay_PlayFire");
    for (var i = script.spriteFire.length - 1; i >= 0; i--) {
    	script.spriteFire[i].enabled = true;
    }
});

var delay_GoUnderWater = script.createEvent("DelayedCallbackEvent");
delay_GoUnderWater.bind(function (eventData)
{
	script.fallingAudio.play(1);

	global.tweenManager.stopTween(script.ship, "idle");
    global.tweenManager.startTween(script.ship, "down");
    global.tweenManager.startTween(script.ship, "rotate");
});


script.api.HandFound = function () 
{
	if(isHintsPlayed === true) 
		return;

   global.tweenManager.startTween(script.handFoundHint, "hide");
   global.tweenManager.startTween(script.moveDownHint, "play");
   isHintsPlayed = true;
}



Start();