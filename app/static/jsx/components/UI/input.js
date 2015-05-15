define([
	'react'
], function(React){
	var Input = React.createClass({
		propTypes : {
			init_value : React.PropTypes.string,
			label : React.PropTypes.string
		},
		getDefaultProps: function() {
			return {
				init_value : '',
				label : ''
			};
		},
		getInitialState: function() {
			return {value: this.props.init_value};
		},
		handleChange: function(event) {
			this.setState({value: event.target.value});
		},
		getValue: function(){
			return this.state.value;
		},
		render: function() {
			var value = this.state.value;
			var active = value ? "active" : "";
			return (
				<div className="row">
					<div className="input-field col s12">
						<label className={active}> {this.props.label || ""} </label>
						<input type="text" value={value} onChange={this.handleChange} />
					</div>
				</div>
				);
	 	}
	});
	return Input;
})