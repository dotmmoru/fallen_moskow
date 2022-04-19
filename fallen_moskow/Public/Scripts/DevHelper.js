global.UpdateSelectedIndexInList = function(index, listCount,isNext)
{
    if (isNext===true)
        index = index + 1 < listCount ? index + 1 : 0;
    else
        index = index - 1 >= 0 ? index - 1 : listCount - 1;

    return index;
}


global.UpdateTweenState = function (enable_obj,enable_name,disable_obj,disable_name)
{
    global.tweenManager.stopTween( disable_obj, disable_name);
    global.tweenManager.startTween( enable_obj, enable_name);
}
global.UpdateTweenStateFunc = function (enable_obj,enable_name,disable_obj,disable_name, func)
{
    global.tweenManager.stopTween( disable_obj, disable_name);
    global.tweenManager.startTween( enable_obj, enable_name, func());
}

global.LerpFloat = function(start, end, t) {
    return start * (1 - t) + end * t;
}

global.LerpVec3 = function(startV3, endV3, t) 
{
    return new vec3(LerpFloat(startV3.x,endV3.x,t),LerpFloat(startV3.y,endV3.y,t),LerpFloat(startV3.z,endV3.z,t));
}

global.getRandomInt = function(max) {
  return Math.floor(Math.random() * max);
}

global.NotEqual = function(amount,num)
{
	return global.getRandomInt(amount) != num;
}
global.IsEqual = function(amount,num)
{
	return global.getRandomInt(amount) === num;
}