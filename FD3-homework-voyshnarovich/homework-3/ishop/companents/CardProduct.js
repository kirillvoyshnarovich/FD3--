import React from 'react';
import PropTypes from 'prop-types';

import './CardProduct.css'

import ProductItem from './Product.js'


class CardProduct extends React.Component{

  static propTypes = {
    name: PropTypes.string.isRequired,

    products:PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        number: PropTypes.number.isRequired,
        imageURL: PropTypes.string.isRequired,
        keyid:PropTypes.number,
      })
    )
  }

  state =  {
      activeProducts:null,
      clickedButton:null,
      listProduct: this.props.products,
  }

  changeActiveProduct = (code) => {
    this.setState({activeProducts:code})
  }

  deleteProduct = (code) => {
    var list = this.state.listProduct.filter( element => element.keyid!=code );
    this.setState({listProduct:list})
  }

  message = (name) => {
    var answer = confirm(`Вы действительно хотите удалить ${name}`);
    return answer;
  }

  render() {

    var tableProducts=this.state.listProduct.map( product =>
      <ProductItem key={product.keyid}
        code={product.keyid} imageURL={product.imageURL} name={product.name} price={product.price} number={product.number}
        cdchangeActiveProduct={this.changeActiveProduct} activeProducts={this.state.activeProducts} cddeleteProduct={this.deleteProduct}
        clickedButton={this.state.clickedButton} className={this.state} changeClassProduct={this.changeClassProduct}
      />
    );

    // var tableProducts=this.state.listProduct.map( product =>
    //   React.createElement(ProductItem, {key:product.keyid,
    //     code:product.keyid, imageURL:product.imageURL, name:product.name, price:product.price, number:product.number,
    //     cdchangeActiveProduct:this.changeActiveProduct, activeProducts:this.state.activeProducts, cddeleteProduct:this.deleteProduct,
    //     clickedButton:this.state.clickedButton, className:this.state, changeClassProduct:this.changeClassProduct
    //   })
    // );

      return (
        <div className='product-table'>
          <h1 className='product-table__name-shop'>{this.props.name}</h1>
          <div className='product-table__table'>{tableProducts}</div>
        </div>
      );

    // return React.DOM.div( {className:'product-table'},
    //   React.DOM.h1({className:'product-table__name-shop'}, this.props.name),
    //   React.DOM.div({className:'product-table__table'}, tableProducts),
    // );
  }

};

export default CardProduct;