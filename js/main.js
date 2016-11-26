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
	var playground = $('#playground');
	var character  = $('#character');
	
	$('#playground').click(function(e)
	{
		var moveTo = {
			'top'  : e.pageY - playground.offset().top,
			'left' : e.pageX - playground.offset().left
		};
		
		moveCharacter(character, moveTo);
	});
	
	var getCharacterShift = function(character, coords, negative=false)
	{
		var k = negative ? -1 : 1;
		coords.top  -= k * (character.height());
		coords.left -= k * (character.width() / 2);
		return coords;
	};
	
	var moveCharacter = function(character, moveTo)
	{
		setCharacterDirection();
		var a = moveTo;
		var b = getCharacterShift(character, character.position(), true);
		var g = Math.atan2(a.top-b.top, a.left-b.left);
		var position;
		if(g < -2.36 || g > 2.36) position = 'left';
		else if(g < -0.79 )  position = 'up';
		else if(g < 0.79 )  position = 'right';
		else  position = 'down';
		character.addClass('move');
		character.addClass(position);
		
		
		
		
		
		
		moveTo = getCharacterShift(character, moveTo);
		
		var curPos   = character.position();
		var distance = Math.hypot(moveTo.left - curPos.left, moveTo.top - curPos.top);
		
		character.animate(moveTo, distance*4, 'linear', function(){character.removeClass('move up down left right')});
	};
	
	var setCharacterDirection = function()
	{
	};
});