var CardProduct = React.createClass({

  displayName: 'ishop',

  propTypes: {
    name: React.PropTypes.string.isRequired,
    
    products:React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        number: React.PropTypes.number.isRequired,
        imageURL:React.PropTypes.string.isRequired,
        keyid:React.PropTypes.number,
      })
    )
    
  },

  render: function() {

    var tableProducts=this.props.products.map( product =>
        React.DOM.div({key:product.keyid, className:"product-table__table-product"},
          React.DOM.img({className:'product-attribute product-table__table-product--image', src:product.imageURL, alt:'picture in card'}),
          React.DOM.div({className:'product-attribute product-table__table-product--name'}, 
            React.DOM.p({className:'column-name'}, 'Name Product'),
            React.DOM.p({className:'text'}, product.name),
          ),
          React.DOM.div({className:'product-attribute product-table__table-product--price'}, 
            React.DOM.p({className:'column-name'}, 'Price Product'),
            React.DOM.p({className:'text'}, product.price)
          ),
          React.DOM.div({className:'product-attribute product-table__table-product--number'},
            React.DOM.p({className:'column-name'}, 'Number Product'),
            React.DOM.p({className:'text'}, product.number)
          ),
        )
      );

    return React.DOM.div( {className:'product-table'},
      React.DOM.h1({className:'product-table__name-shop'}, this.props.name),
      React.DOM.div({className:'product-table__table'}, tableProducts),
    );
  },

});