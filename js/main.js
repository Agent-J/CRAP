'use strist';

/**
 * Math.hypot polyfill
 * Returns the square root of the sum of squares of its arguments
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot
 * @returns {Number}
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

/**
 * Math.trunc polyfill
 * Returns the integral part of a number by removing any fractional digits
 * @link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
 * @returns {Number}
 */
Math.trunc = Math.trunc || function(x)
{
	return x - x % 1;
}

function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min)) + min;
}

try
{
	if(!CSS.supports || !CSS.supports('background-position-y', '0'))
	{
		throw new Error('Old browser');
	}
	
	$(function()
	{
		var playground = $('#playground');
		var pos = $('<img>', {'src' : 'images/pos.png'})
			.appendTo(playground)
			.css({'position' : 'absolute','display':'none'});
		var speech     = new Speech(playground);
		var character  = new Unit({
			'speed'  : 4, // ms per pixel
			'sprite' : {
				'src'      : 'http://orig07.deviantart.net/1b67/f/2016/075/6/f/_req__2p_liechtenstein_xp_sprite_by_angel_of_britannia-d9n8e36.png',
				'frames'   : 4,
				'duration' : 800,
				'order'    : ['down', 'left', 'right', 'up'] // 'downleft', 'downright', 'upleft', 'upright'
			}
			/*,'sprite' : {
				'src'       : 'http://media.tumblr.com/5927504cea37822c6b0c41fdc1f598b2/tumblr_inline_mgfa0kncp21rb6zcv.png',
				'frames'    : 9,
				'duration'  : 800,
				'order'     : ['upleft', 'up', 'upright', 'right', 'left', 'downleft', 'down', 'downright'],
				'direction' : 'reverse',//'normal'
				'default'   : [3, 6] // @todo add default (unactive) bg position
			}*/
		});
		character.setSpeech(speech);
		character.appendTo(playground);
		character.onLoad(function()
		{
			character.teleport(playground.width()/2, playground.height()/2);
			//setTimeout(function(){character.say('Oh, crap!')}, 1000);
		});
		
		var turn = function(e)
		{
			pos.css({
				//'left' : getRandomInt(playground.offset().left, playground.width() - pos.outerWidth()),
				//'top'  : getRandomInt(playground.offset().top, playground.outerHeight())
				'left' : e.pageX - playground.offset().left - pos[0].width  / 2,
				'top'  : e.pageY - playground.offset().top  - pos[0].height / 2
			}).fadeIn();
			var x = pos.position().left + pos[0].width  / 2;
			var y = pos.position().top  + pos[0].height;
			
			var phrases = [
				'Oh, crap!',
				'It looks like crap',
				'Whose this crap?!',
				'#*%&#@% crap!',
			];
			
			character.say(phrases[getRandomInt(0, phrases.length)]);
			setTimeout(function()
			{
				character.moveTo(x, y, function(event)
				{
					pos.fadeOut('fast');
					playground.one('click', turn);
				});
			}, 1500);
		};

		playground.one('click', turn);

		playground.click(function(e)
		{
			//character.moveTo(e.pageX - playground.offset().left, e.pageY - playground.offset().top);
		});
	});
} catch(e)
{
	alert(e.message);
}