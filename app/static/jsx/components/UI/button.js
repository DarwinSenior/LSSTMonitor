define([
	'react', 'jquery', 'className'
], function(React, $, className){
	style = {};
	React.createClass({
		onClick : function(target){
			
		},
		render : function(){
			var classes = className({
				"btn" : true,
				"btn-large" : this.props.large,
				"btn-flat" : this.props.flat,
				"disable" : this.props.disable,
				"btn-floating" : this.props.floating,
				"disabled" : this.props.disabled
			}, this.props["color"], this.props["text-color"]);
			return (<div className={classes} onClick={this.handleClick} ref="button">
						{this.props.children}
					</div>)
		}
	})
});