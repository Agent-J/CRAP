'use strist';

var Speech = function(container)
{
	this.container = $(container);
}

Speech.prototype = {};

Speech.prototype.add = function(text, unit, autoRemove)
{
	var bubble = $('<div/>', {
		'class'   : 'speech-bubble',
		'html'    : text,
		'css'     : {'display' : 'none'}
	}).appendTo(this.container);
	
	var dir = this.determineDirection(unit, bubble);
	var pos = this.determinePosition(unit, bubble, dir);
	bubble
		.css(pos)
		.addClass('speech-bubble-'+dir)
		.fadeIn('slow');
		
	if(autoRemove) setTimeout(function()
	{
		this.remove(bubble);
	}.bind(this), autoRemove);
		
	return bubble;
};

Speech.prototype.remove = function(bubble)
{
	bubble = bubble || $('.speech-bubble', this.container);
	bubble.fadeOut('fast', 'swing', function()
	{
		bubble.remove();
	});
};

Speech.prototype.determineDirection = function(unit, bubble)
{
	var dir = '';
	dir += unit.position().top - 20 > bubble.outerHeight() ? 'b' : 't'
	dir += this.container.width() - unit.position().left - unit.outerWidth() - 50 > bubble.outerWidth() ? 'l' : 'r'
	return dir;
};

Speech.prototype.determinePosition = function(unit, bubble, dir)
{
	var position = {};
	
	position.top = dir[0] == 'b'
		? unit.position().top - bubble.outerHeight()
		: unit.position().top + unit.outerHeight();
		
	position.left = dir[1] == 'l' 
		? unit.position().left + unit.outerWidth()
		: unit.position().left - bubble.outerWidth();
		
	return position;
};