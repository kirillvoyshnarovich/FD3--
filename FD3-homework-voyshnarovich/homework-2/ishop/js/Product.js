
var ProductItem = React.createClass({

    display:'product-item',

    propTypes: {
        code:React.PropTypes.number.isRequired,
        number:React.PropTypes.number.isRequired,
        price:React.PropTypes.number.isRequired,
        name:React.PropTypes.string.isRequired,
        imageURL:React.PropTypes.string.isRequired,
        cdchangeActiveProduct:React.PropTypes.func,
        cddeleteProduct:React.PropTypes.func,
        activeProducts:React.PropTypes.number,
        clickedButton:React.PropTypes.number,
        changeClassProduct:React.PropTypes.func
    },


    changeActiveProduct: function(e) {
        this.props.cdchangeActiveProduct(this.props.code);
    },

    deleteProduct: function(e) {
        this.props.cddeleteProduct(this.props.code);
    },



    render: function() {
        return  React.DOM.div({key:this.props.code, className:(this.props.clickedButton==this.props.code) ? 'wrapper-products_delete' : 'wrapper-products'},
                    React.DOM.div({className:(this.props.activeProducts==this.props.code)?'product-table__table-product_active' : 'product-table__table-product', onClick:this.changeActiveProduct},
                        React.DOM.img({className:'product-attribute product-table__table-product--image', src:this.props.imageURL, alt:'picture in card'}),
                        React.DOM.div({className:'product-attribute product-table__table-product--name'}, 
                            React.DOM.p({className:'column-name'}, 'Name Product'),
                            React.DOM.p({className:'text'}, this.props.name),
                        ),
                        React.DOM.div({className:'product-attribute product-table__table-product--price'}, 
                            React.DOM.p({className:'column-name'}, 'Price Product'),
                            React.DOM.p({className:'text'}, this.props.price)
                        ),
                        React.DOM.div({className:'product-attribute product-table__table-product--number'},
                            React.DOM.p({className:'column-name'}, 'Number Product'),
                            React.DOM.p({className:'text'}, this.props.number)
                        ),
                    ),
                React.DOM.button({key:this.props.code, className:'button-delete', onClick:this.deleteProduct},'Delete')
        )
    },
})