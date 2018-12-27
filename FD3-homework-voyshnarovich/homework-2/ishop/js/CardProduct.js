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
      listProduct: this.props.products,
    };
  },

  changeActiveProduct: function(code) {
    this.setState({activeProducts:code})
  },

  deleteProduct: function(code) {
    var list = this.state.listProduct.filter( element => element.keyid!=code );
    this.setState({listProduct:list})
  },

  message: function(name){
    var answer = confirm(`Вы действительно хотите удалить ${name}`);

    return answer;
  },

  render: function() {

    var tableProducts=this.state.listProduct.map( product =>
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