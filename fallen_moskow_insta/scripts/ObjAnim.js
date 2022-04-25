
const Audio = require('Audio');
const TouchGestures = require('TouchGestures');
const Diagnostics = require('Diagnostics');
const Random = require('Random');
const Scene = require('Scene');
const Time = require('Time');
const Animation = require('Animation');

(async function () {  

  // Store references to multiple scene objects 
  const [ship,rocket, fire_1,fire_2,fire_3,fire_4, explosion, move_hand] = await Promise.all([
      Scene.root.findFirst('Ship'),
      Scene.root.findFirst('handTracker0'),
      Scene.root.findFirst('Fire_1'),
      Scene.root.findFirst('Fire_2'),
      Scene.root.findFirst('Fire_3'),
      Scene.root.findFirst('Fire_4'),
      Scene.root.findFirst('Explosion'),
      Scene.root.findFirst('move_hand')
  ]);

  const explosion_APC = await Audio.getAudioPlaybackController('explsoion_APC');
  const falling_APC = await Audio.getAudioPlaybackController('falling_APC');

  var isAttacked = true;

  var isHintsPlayed = false;

  let durationMS = 3000;
  const timeDriverParametersX = 
  {
      durationMilliseconds: durationMS,
      loopCount: 1,
      mirror: false
  };

  const timeDriverParametersY = 
  {
      durationMilliseconds: 1,
      loopCount: 1,
      mirror: false
  };

function IncomeOnScreen(obj)
{
    let timeDriverX = Animation.timeDriver(timeDriverParametersX);
    let linearSamplerX = Animation.samplers.linear(-400,0);
    let translationAnimationX = Animation.animate(timeDriverX, linearSamplerX);
    // Move object 
    obj.transform.x = translationAnimationX;

    timeDriverX.start();

    let timeDriverY = Animation.timeDriver(timeDriverParametersY);
    let linearSamplerY = Animation.samplers.linear(325,325);
    let translationAnimationY = Animation.animate(timeDriverY, linearSamplerY);
    // Move object 
    obj.transform.y = translationAnimationY;

    timeDriverY.start();
}

function AwayFromScreen(obj)
{
    let timeDriver = Animation.timeDriver(timeDriverParametersX);
    let linearSampler = Animation.samplers.linear(325,1000);
    let translationAnimation = Animation.animate(timeDriver, linearSampler);
    // Move object 
    obj.transform.y = translationAnimation;

    timeDriver.start();
}

function CheckRocketPosision()
{
    rocket.worldTransform.y.monitor().subscribe(function (value) 
    {   
     // Diagnostics.log("y - " + value.oldValue );
      if( value.oldValue < 0 && isAttacked === false)
      {
          PlayExplosion();
          isAttacked = true;
      }
    });
}
    
function PlayExplosion()
{
  rocket.hidden = true;
  explosion.hidden = false;

  explosion_APC.reset();
  explosion_APC.setPlaying(true);
  explosion_APC.setLooping(false);

  const timeoutFireTimer = Time.setTimeout(function()
   {
      explosion.hidden = true;
      fire_1.hidden = false;
      fire_2.hidden = false;
      fire_3.hidden = false;
      fire_4.hidden = false;
   }, 350);

  const timeoutFallDownTimer = Time.setTimeout(function()
   {
      AwayFromScreen(ship);

        falling_APC.reset();
        falling_APC.setPlaying(true);
        falling_APC.setLooping(false);
   }, 3000);
}

function Start()
{
  move_hand.hidden = true;

  explosion.hidden = true;
  const timeoutIsAttackedTimer = Time.setTimeout(function()
   {
      isAttacked = false;
      move_hand.hidden = false;
   }, durationMS);

  const timeoutHideHandFoundTimer = Time.setTimeout(function()
   {
      move_hand.hidden = false;
   }, 3000);

  const timeoutHideMoveHandTimer = Time.setTimeout(function()
   {
      move_hand.hidden = true;
   }, 6000);
}

Start();

IncomeOnScreen(ship);

//Diagnostics.watch("Y", rocket.worldTransform.y);

CheckRocketPosision();
 


})();
