import React from 'react';
import PropTypes from 'prop-types';

import './CardProduct.css'

import ProductItem from './Product.js'

import CardEditor from './CardEditor.js'


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
      workMode:0,
      activeProducts:null,
      clickedButton:null,
      listProduct: this.props.products,
      index:0
  }

  changeActiveProduct = (code) => {
    return (this.state.workMode == 2) || (this.state.workMode == 3) 
      ? null : this.setState({activeProducts:code, workMode:1}), this.setState({index:2});
  }
 
  changeCard = (code) => {
    this.setState({workMode:2, activeProducts: code})
  }

  cbchangeAddCard = (keyid, name, price, url, number, description) => {

    if(this.state.workMode == 2) {

      let changedProduct = this.state.listProduct.filter(element => {
        return element.keyid == this.state.activeProducts;
      })
      changedProduct[0].name = name;
      changedProduct[0].price = parseFloat(price);
      changedProduct[0].url = url;
      changedProduct[0].number = parseFloat(number);
      changedProduct[0].description = description;
      
      this.setState({activeProducts:null, workMode: 0})
    } else if(this.state.workMode == 3) {
      let newListProduct = this.state.listProduct

      newListProduct.push({"keyid": keyid, "name": name, "price": parseFloat(price), "imageURL": url, 
      "number":parseFloat(number), "description": description})

      this.setState({activeProducts:null, workMode: 0, listProduct:newListProduct})
    }

  }

  newProduct = (e) => {
    this.setState({activeProducts:0, workMode:3})
  }

  deleteProduct = (code) => {
    var list = this.state.listProduct.filter( element => element.keyid!=code );
    this.setState({listProduct:list})
  }

  message = (name) => {
    var answer = confirm(`Вы действительно хотите удалить ${name}`);
    return answer;
  }

  cbcancelChange = (value) => {
    this.setState({activeProducts:null, workMode:value})
  }
  
  render() {

    var tableProducts=this.state.listProduct.map( product =>
      <ProductItem key={product.keyid}
        code={product.keyid} imageURL={product.imageURL} workMode={this.state.workMode} name={product.name} price={product.price} number={product.number}
        cdchangeActiveProduct={this.changeActiveProduct} activeProducts={this.state.activeProducts} cddeleteProduct={this.deleteProduct}
        clickedButton={this.state.clickedButton} className={this.state} changeClassProduct={this.changeClassProduct} 
        cbchangeCard={this.changeCard}/>
    );

    if(this.state.activeProducts) {
      var editorProduct = this.state.listProduct.filter( (element) => {
        return this.state.activeProducts == element.keyid
      })
  
      editorProduct = editorProduct.map((element) =>
        <CardEditor key={element.keyid} code={element.keyid} workMode={this.state.workMode} price={element.price}
        name={element.name} imageUrl={element.imageURL} number={element.number} description={element.description} 
        cbchangeCard={this.cbchangeAddCard} cbcancelChange={this.cbcancelChange}/>
      )
    } else if(this.state.activeProducts == 0) {
      editorProduct = <CardEditor imageURL={false} name={false}  price={false} number={false} code={this.state.listProduct.length + 1} workMode={this.state.workMode} cbchangeCard={this.cbchangeAddCard} cbcancelChange={this.cbcancelChange}/>
    }

      return (
        <div className='product-table'>
          <h1 className='product-table__name-shop'>{this.props.name}</h1>
          <div className='product-table__table'>{tableProducts}</div>
          <div className='product-card'>{editorProduct}</div>
          <button className='product-table__new-product' onClick={this.newProduct}>New product</button>
        </div>
      );
  }

};

export default CardProduct;