'use strist';

var Unit = function(settings)
{
	this.id       = this.createId();
	this.settings = settings;
	this.element  = jQuery('<div/>', {
		'id'    : 'unit-' + this.id,
		'class' : 'unit ' + (settings.class || ''),
	});
	
	this.element.one('unit.load', this.setSpriteSettings.bind(this));
	this.loadSprite(settings.sprite.src);
}

Unit.prototype = {};

Unit.prototype.createId = (function()
{
	var id = 0;
	return function(){return id++};
})();

Unit.prototype.loadSprite = function(src)
{
	var img = $("<img>", {'src':src});
	img.on('load', function()
	{
		this.element.trigger('unit.load', img);
	}.bind(this));
	img.on('error', function()
	{
		throw new Error('Failed to load sprite image');
	});
	return this;
};

Unit.prototype.setSpriteSettings = function(img)
{
	if(img instanceof jQuery.Event)
	{
		img = arguments[1];
	}
	
	var animationName = 'unit-move-' + this.id;
	var width  = img.width  / this.settings.sprite.frames;
	var height = img.height / this.settings.sprite.order.length;
	var css    = "\n#" + this.element[0].id + " {\n\
		width  : " + width  + "px;\n\
		height : " + height + "px;\n\
		background-image          : url(" + this.settings.sprite.src + ");\n\
		animation-duration        : " + this.settings.sprite.duration + "ms;\n\
		animation-timing-function : steps(" + this.settings.sprite.frames + ");\n\
		animation-direction       : " + this.settings.sprite.direction + ";\n\
		animation-iteration-count : infinite;}\n\
		@keyframes " + animationName + "{100% {background-position-x: -" + img.width + "px;}}\n";
	
	this.settings.sprite.order.forEach(function(dir, i)
	{
		css += "\n#"+this.element[0].id+".move-" + dir +'-'+ this.id + " {background-position-y: -" + height*i + "px!important;animation-name: " + animationName +"}";
	}, this);
	
	$('<style/>', {
		'type' : 'text/css',
		'html' : css + "\n"
	}).appendTo("head");
	
	return this;
};

Unit.prototype.moveTo = function(x, y)
{
	var curPos   = this.element.position();
	var distance = Math.hypot(x - curPos.left - this.element.width() / 2, y - curPos.top - this.element.height());
	
	if(!distance)
	{
		return;
	}
	
	var position = {
		'top'  : y - this.element.height(),
		'left' : x - this.element.width() / 2
	};
	
	this.element.stop(true, false);
	this.element.animate(
		position, 
		distance * this.settings.speed, 
		'linear', 
		this.setDirection.bind(this)
	);
	this.setDirection(this.determineDirection(x, y));
	
	return this;
};

Unit.prototype.getDirectionClass = function(dir)
{
	return 'move-' + dir + '-' + this.id;
};

Unit.prototype.setDirection = function(dir)
{
	this.settings.sprite.order.forEach(function(dir, i)
	{
		this.element.removeClass(this.getDirectionClass(dir));
	}, this);
	
	if(typeof dir == 'string')
	{
		this.element.addClass(this.getDirectionClass(dir));
	}
	
	return this;
};

Unit.prototype.determineDirection = function(x, y)
{
	var pos = this.element.position();
	pos.top  += this.element.height();
	pos.left += this.element.width() / 2;
	
	var atan = Math.atan2(y - pos.top, x - pos.left);
	var k    = this.settings.sprite.order.length / 2; // directions.length should be 4 or 8
	var idx  = Math.trunc(atan / Math.PI * k + k + 0.5);
	
	var directions = ['left','upleft','up','upright','right','downright','down','downleft','left'];
	
	if(k == 2)
	{
		directions = directions.filter(function(val, i){return !(i%2)});
	}
	
	return directions[idx];
};