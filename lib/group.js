"use strict";
/* -------------------------------------------------------------------
 * Require Statements << Keep in alphabetical order >>
 * ---------------------------------------------------------------- */

var ChildProcess = require('child_process');
var FlexEvents = require('flex-events');
var Child = require('./child');

/* =============================================================================
 * 
 * Oshi.Group
 *  
 * ========================================================================== */

module.exports = Group;

function Group (groupConfig)
{
	/* -------------------------------------------------------------------
	 * Public Members Declaration << no methods >>
	 * ---------------------------------------------------------------- */
	
	var _events = FlexEvents.setup(this);
	
	/* -------------------------------------------------------------------
	 * Public Members Declaration << no methods >>
	 * ---------------------------------------------------------------- */

	/** @member {GroupConfig} */
	this.config = groupConfig;
	/** @member {object<number, Child>} */
	this.children = {};

	/* -------------------------------------------------------------------
	 * Public Methods << Keep in alphabetical order >>
	 * ---------------------------------------------------------------- */
	
	this.destroy = function ()
	{
		for (var i in this.children)
			this.children[i].destroy();
		
		_events.destroy();
	};
}

/* -------------------------------------------------------------------
 * Public Methods << Keep in alphabetical order >>
 * ---------------------------------------------------------------- */

/**
 * @param childConfig {ChildConfig}
 * @param callback {function(Error, StartResponse)}
 */
Group.prototype.start = function (childConfig, callback)
{
	var child = this.children[childConfig.port];
	if (!child)
		child = this.children[childConfig.port] = new Child(this, childConfig);
	
	child.start(childConfig, callback);
};

/**
 * @param childConfig {ChildConfig}
 * @param callback {function(Error, StopResponse)}
 */
Group.prototype.stop = function (childConfig, callback)
{
	var child = this.children[childConfig.port];
	if (!child)
		child = this.children[childConfig.port] = new Child(this, childConfig);

	child.stop(childConfig, callback);
};
