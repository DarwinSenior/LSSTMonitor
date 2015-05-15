// For a historgram, we need the following infomation
// data is an array [value1, value2, value3, ...]
// label is an array [label1, label2, label3, ...]
// we also need to set the maximum value.
// shall never call forceUpdate or it will crush!
define([
	'react',
	'd3',
	'./D3Mixin'
	], function(React, d3, d3mixin) {
	var Histogram = React.createClass({
	mixins : [d3mixin],
	type : "histogram",
	init : function(props, canvas){
		var data = props.data;
		var height = props.height;
		var width = props.width;
		var maxheight = props.maxheight || d3.max(data)*1.5; //it is an arbitrary number
		var barwidth = props.width/data.length;
		var canvas = d3.select(React.findDOMNode(canvas));
		var x = d3.scale.linear().domain([0, maxheight]).range([0, height]);
		var bar = canvas.selectAll('g')
					.data(data)
					.enter().append('g')
					.attr("transform", function(d, i){return "translate("+i*barwidth+","+(height-x(d))+")"});
		bar.append("rect")
			.attr("width", barwidth-1)
			.attr("height", x);
	},
	update : function(props, canvas){
		var data = props.data;
		var height = props.height;
		var width = props.width;
		var maxheight = props.maxheight || d3.max(data)*1.5; //it is an arbitrary number
		var barwidth = props.width/data.length;
		var canvas = d3.select(React.findDOMNode(canvas));
		var x = d3.scale.linear().domain([0, maxheight]).range([0, height]);
		var bar = canvas.selectAll('g')
					.data(data)
					.transition().attr("transform", function(d, i){return "translate("+i*barwidth+","+(height-x(d))+")"})
					.select("rect")
					.attr("width", barwidth-1)
					.attr("height", x);
		}
	});
	return Histogram;
});