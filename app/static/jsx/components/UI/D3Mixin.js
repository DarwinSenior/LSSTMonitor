define([
	"react", "d3"
], function(React, d3){
	var D3Mixin = {
		propTypes : {
			height : React.PropTypes.number,
			width : React.PropTypes.number,
			data : React.PropTypes.array
		},
		render: function() {
				return (
					<svg width={this.props.width} height={this.props.height} className={this.type} ref="canvas">
					</svg>)
		},
		componentDidMount : function(){
			this.init(this.props, this.refs.canvas);
		},
		shouldComponentUpdate : function(props){
			this.update(props, this.refs.canvas);
			return false;
		},
		componentWillUnmount : function(){
			var node = React.findDOMNode(this.refs.canvas);
			d3.select(node).selectAll("*").remove();
		}
	};
	return D3Mixin;
})