'use strist';

var appendToBody = function(text, tag)
{
	tag = tag || 'p';
	var p = document.createElement(tag);
	p.innerHTML = text;
	document.body.appendChild(p);
};

document.addEventListener("DOMContentLoaded", function()
{
	appendToBody('hello');
	setTimeout(function()
	{
		appendToBody('Don\'t be a crap', 'h3');
	}, 2000);
});