'use strist';

if(!CSS.supports || !CSS.supports('background-position-y', '0'))
{
	throw new Error('Old browser');
}

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

/*
 * Math.hypot polyfill
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
 */
Math.trunc = Math.trunc || function(x)
{
	return x - x % 1;
}


$(function()
{
	var playground = $('#playground');
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
	character.element.appendTo(playground);

	playground.click(function(e)
	{	
		character.moveTo(e.pageX - playground.offset().left, e.pageY - playground.offset().top);
	});
});

