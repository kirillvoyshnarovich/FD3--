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
    var list = this.state.listProduct.slice();
    // console.log(list);
    list.forEach(function(element, index, arr) {

      if(element.keyid==code) {
          arr.splice(index, 1)
      }
      // console.log(index);
      // console.log(element);
    });
    console.log(this.state.listProduct)
    console.log(this.props.products)
    console.log(list)
    

    // this.setState({listProduct:list});
    this.setState( (prevState, props) => { return {listProduct:prevState.listProduct}; } );
    this.setState({listProduct:list})
    this.render()
    console.log(this.state.listProduct)
    shouldComponentUpdate({listProduct:list})
  },

  message: function(name){
    var answer = confirm(`Вы действительно хотите удалить ${name}`);

    return answer;
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