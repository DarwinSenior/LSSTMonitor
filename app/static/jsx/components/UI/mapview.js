define([
	'react', 'jquery', 'leaflet'
], function(React, $, L){
	// The elements that layers1 have but layers1 doesn't layers1-layers2
	function difference(layers1, layers2){
		var diff = {};
		for (var id in layers1){
			if (!layers2[id]){
				diff[id] = layers1[id];
			}
		}
		return diff;
	}
	var MapView = React.createClass({
		propTypes : {
			height : React.PropTypes.number.isRequired,
			width : React.PropTypes.number.isRequired,
			//center : React.PropTypes.arrayOf(React.PropTypes.number),
			zoom : React.PropTypes.number,
			changed : React.PropTypes.func,
			changing : React.PropTypes.func,
			layers : React.PropTypes.object.isRequired,
			version : React.PropTypes.number
		},
		init : function(props){
			var node = React.findDOMNode(this.refs.view);
			this.Map = L.map(node).setView(props.center, props.zoom);
			this.layers = {};
			this.addLayers(props.layers);

			// adding event listener
			if (this.props.changed){
				this.Map.addEventListener('dragend', (function(event){
					this.props.changed(this.getCoord());
				}).bind(this));
				this.Map.addEventListener('zoomend', (function(event){
					this.props.changed(this.getCoord());
				}).bind(this));
			}
			if (this.props.changing){
				this.Map.addEventListener('drag', (function(event){
					this.props.changing(this.getCoord());
				}).bind(this));
				this.Map.addEventListener('zoomend', (function(event){
					this.props.changing(this.getCoord());
				}).bind(this));
			}
		},
		addLayers : function(layers){
			for (var id in layers){
				layer = layers[id];
				this.layers[id] = L.tileLayer(layer.src, layer.spec).addTo(this.Map);
			}
		},
		removeLayers : function(layers){
			for (var id in layers){
				this.Map.removeLayer(this.layers[id]);
				this.layers[id] = undefined;
			}
		},
		setView : function(center, zoom){
			this.Map.setView(center, zoom);
		},
		getCoord : function(){
			return {zoom: this.Map.getZoom(), center : this.Map.getCenter()};
		},
		componentDidMount : function(){
			this.init(this.props);
		},
		componentWillUnmount : function(){
			this.Map.removeEventListener();
			var node = React.findDOMNode(this.refs.view);
			$(node).html("");
		},
		shouldComponentUpdate : function(props){
			if (this.props.version != props.version){
				this.setView(props.center, props.zoom);
			}
			this.addLayers(difference(this.props.layers, this.props.layers));
			this.removeLayers(difference(this.props.layers, this.props.layers));
			return false;
		},
		render : function(){
			return (<div className="map" ref="view" style={{height: this.props.height, width: this.props.width}}></div>)
		}
	});
	return MapView;
});