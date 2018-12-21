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

  getInitialState: function() {
    return {
      activeProducts:null,
      clickedButton:null,
      className:'wrapper-products'
    };
  },

  changeActiveProduct: function(code) {
    this.setState({activeProducts:code})
  },

  deleteProduct: function(code) {
    
    this.setState({clickedButton:code})
  },

  changeClassProduct: function(){
    if(this.props.clickedButton==null) {
        return 'wrapper-products'
    }
  },

  render: function() {

    var tableProducts=this.props.products.map( product =>
      React.createElement(ProductItem, {key:product.keyid,
        code:product.keyid, imageURL:product.imageURL, name:product.name, price:product.price, number:product.number,
        cdchangeActiveProduct:this.changeActiveProduct, activeProducts:this.state.activeProducts, cddeleteProduct:this.deleteProduct,
        clickedButton:this.state.clickedButton, className:this.state, changeClassProduct:this.changeClassProduct
      })
    );

    return React.DOM.div( {className:'product-table'},
      React.DOM.h1({className:'product-table__name-shop'}, this.props.name),
      React.DOM.div({className:'product-table__table'}, tableProducts),
    );
  },

});