'use strist';

/*
 * Math.hypot polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot
*/
Math.hypot = Math.hypot || function()
{
	var i, y = 0;
	
	for (i = 0; i < arguments.length; i++)
	{
		if(arguments[i] === Infinity || arguments[i] === -Infinity)
		{
			return Infinity;
		}
		y += arguments[i] * arguments[i];
	}
	
	return Math.sqrt(y);
};


$(function()
{

});