
import React from 'react';
import PropTypes from 'prop-types';

import './CardEditor.css'

class CardEditor extends React.Component {

    static propTypes = {
        cbchangeCard:PropTypes.func,
        cbcancelChange:PropTypes.func,
        workMode:PropTypes.number,
        code:PropTypes.number,
        name:PropTypes.string,
        price:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        imageURL:PropTypes.string,
        number:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        description:PropTypes.string
    }

    constructor (props, context) {
        super(props, context)

        this.validationForm = (props.workMode == 2) ? true : false;
        console.log('Отработал конструктор')

        this.state = {
            workMode: this.props.workMode,
            code: this.props.code,
            valueName: this.props.name,
            valuePrice: this.props.price,
            valueImageURL: this.props.imageUrl,
            valueNumber: this.props.number,
            valueDescription: this.props.description,
            checkValidationInputName: this.validationForm,
            checkValidationInputPrice: this.validationForm,
            checkValidationInputImageURL: this.validationForm,
            checkValidationInputNumber: this.validationForm,
            checkValidationInputDescription: this.validationForm,
            validationForm: this.validationForm
        }
    }

    changeCard = (e) => {
        this.props.cbchangeCard(this.state.code, this.state.valueName, this.state.valuePrice, 
            this.state.valueImageURL, this.state.valueNumber, this.state.valueDescription
        )
    }
    
    changeField = (e) => {
        (e.target.name == 'id') ? this.setState({code:e.target.value}) :
        (e.target.name == 'name') ? this.setState({valueName:e.target.value}) : 
        (e.target.name == 'price') ? this.setState({valuePrice:e.target.value}) :
        (e.target.name == 'url') ? this.setState({valueImageURL:e.target.value}) :
        (e.target.name == 'number') ? this.setState({valueNumber:e.target.value}) : this.setState({valueDescription:e.target.value})
    }

    cancelChange = () => {
        this.props.cbcancelChange(0)
    }

    componentWillReceiveProps (nextProps) {
        
        this.setState({workMode:2, checkValidationInputName: true, checkValidationInputPrice:true, checkValidationInputImageURL:true,
            checkValidationInputNumber:true, checkValidationInputDescription:true, validationForm:true
        })
    }

    validation = (e) => {

        let setValidationValue = (input, validityValue) => {
            switch(input.name) {
                case 'name': this.setState({checkValidationInputName: validityValue}, checkValidationForm);
                    break;
                case 'price': this.setState({checkValidationInputPrice: validityValue}, checkValidationForm);
                    break;
                case 'url' : this.setState({checkValidationInputImageURL: validityValue}, checkValidationForm);
                    break;
                case 'number' : this.setState({checkValidationInputNumber: validityValue}, checkValidationForm);
                    break;
                case 'textarea' : this.setState({checkValidationInputDescription: validityValue}, checkValidationForm);
                    break;
            }
        }

        let checkValidationForm = () => {
            (this.state.checkValidationInputName && this.state.checkValidationInputPrice && 
                this.state.checkValidationInputImageURL && this.state.checkValidationInputNumber &&
                this.state.checkValidationInputDescription) ? this.setState({validationForm: true}) : this.setState({validationForm: false});                  
        }

        function Validation() {}
        

        Validation.prototype = {
            invalidMessage: [],
            
            validation: function(input) {

                var validity = input.validity;


                if(validity.patternMismatch) {
                    this.addInvalidity('This is the wrong pattern for this field');
                }

                if(validity.tooShort) {
                    if(input.name == 'textarea') {
                        this.addInvalidity('The value in the field must be longer than 20 characters')
                    } else {
                        this.addInvalidity('The value in the field must be longer than 3 characters')
                    } 
                }

                if (validity.rangeOverflow) {
                    var max = input.getAttribute('max');
                    this.addInvalidity('The maximum value should be ' + max);
                }

                if (validity.rangeUnderflow) {
                    var min = input.getAttribute('min');
                    this.addInvalidity('The minimum value should be ' + min);
                }

                if (validity.stepMismatch) {
                    var step = input.getAttribute('step');
                    this.addInvalidity('This number needs to be a multiple of ' + step);
                }

                if(validity.tooLong) {
                    this.addInvalidity('Must not exceed 20 characters')
                }

                if(validity.valueMissing) {
                    
                    if(input.type == 'number') {
                        this.addInvalidity('This field must contain some numeric value')
                    } else {
                        this.addInvalidity('This field must contain some value')
                    }        
                }


            },

            addInvalidity: function(message) {
                this.invalidMessage.push(message);
            },

            getInvalidities: function() {
                return this.invalidMessage.join('. \n');
            },

            getValidMessageForHTML: function() {
                return this.invalidMessage.join('. <br>');
            }
        }


        if(e.target.checkValidity() == false) {
            let errorMessage = e.target.nextElementSibling;
            if(errorMessage) {
                let parent = e.target.parentElement;
                parent.removeChild(errorMessage)
            }

            let inputValidation = new Validation();
            inputValidation.validation(e.target);
            let message = inputValidation.getValidMessageForHTML();
            e.target.insertAdjacentHTML('afterend', '<p class="error-message">' + message + '</p>')
            setValidationValue(e.target, false);


        } else {
            let inputValidation = new Validation();//-эти строки удалить
            inputValidation.validation(e.target);//-эти строки удалить
            setValidationValue(e.target, true);
            let errorMessage = e.target.nextElementSibling;
            if(errorMessage) {
                let parent = e.target.parentElement;
                parent.removeChild(errorMessage)
            }

        }

    }

    render() {

        if(this.state.workMode == 1) {
            return (
                <div className="product-card__view" /*key={this.props.code}*/>
                    <h3 className='product-card__item product-card__view-name'>{this.state.valueName}</h3>
                    <p className='product-card__item product-card__view-number'>
                        <span className="product-card__category">Quantity:</span>
                        {this.state.valueNumber}
                    </p>
                    <p className='product-card__item product-card__view-price'>
                        <span className="product-card__category">Price:</span>
                        {this.state.valuePrice}
                    </p>
                    <p className="product-card__item product-cad__description">
                        <span className="product-card__category">Description:</span>
                        {this.state.valueDescription}
                    </p>
                </div>
            )
        } else if(this.state.workMode == 2) {
            return (
                <div className="product-card__edit" /*key={this.props.code}*/>
                    <h3 className="product-card__edit-heading">Edit Existing Product</h3>
                    <p className="product-card__edit-id"><span className="product-card__edit-id-text">ID</span>{this.props.code}</p>
                    <p><span>Name</span><input type="text" name="name" className="product-card__edit-field product-card__edit-name"  pattern="[\w'-]+" minLength="3" maxLength="20" value={this.state.valueName} onChange={this.changeField} onBlur={this.validation} required></input></p>
                    <p><span>Price</span><input type="number" name="price" className="product-card__edit-field product-card__edit-price" max="10000" min="1" step="0.01" value={this.state.valuePrice} onChange={this.changeField} onBlur={this.validation} required></input></p>
                    <p><span>Url</span><input type="text" name="url" className="product-card__edit-field product-card__edit-url" value={this.state.valueImageURL} onChange={this.changeField} onBlur={this.validation} required></input></p>
                    <p><span>Quantity</span><input type="number" name="number" className="product-card__edit-field product-card__edit-number" max="10000" min="0" step="1" value={this.state.valueNumber} onChange={this.changeField} onBlur={this.validation} required></input></p>
                    <p><span>Description</span><textarea name="textarea" className="product-card__edit-field textareafiald product-card__edit-description" minLength="20" value={this.state.valueDescription} onChange={this.changeField} onBlur={this.validation} required></textarea></p>
                    {(this.state.validationForm && this.state.workMode == 2) ? <button className="product-card-button product-card__edit-save" onClick={this.changeCard}>Save</button> : <button className="product-card-button product-card__edit-save" disabled>Save</button>}
                    <button className="product-card-button product-card__edit-cancel" onClick={this.cancelChange}>Cancel</button>
                </div>
            )
        } else if(this.state.workMode == 3) {
            return (
                <div className="product-card__edit" /*key={this.props.code}*/>
                    <h3 className="product-card__edit-heading">Add new product</h3>
                    <p className="product-card__edit-id"><span className="product-card__edit-id-text">ID</span><input type="text" name="id" className="product-card__edit-field product-card__edit-id" pattern="[\w-]+" maxLength="3" onBlur={this.validation} onChange={this.changeField} required></input></p>
                    <p><span>Name</span><input type="text" name="name" className="product-card__edit-field product-card__edit-name"  pattern="[\w'-]+" minLength="3" maxLength="20" onChange={this.changeField} onBlur={this.validation} required></input></p>
                    <p><span>Price</span><input type="number" name="price" className="product-card__edit-field product-card__edit-price" max="10000" min="1" step="0.01" onChange={this.changeField} onBlur={this.validation} required></input></p>
                    <p><span>Url</span><input type="text" name="url" className="product-card__edit-field product-card__edit-url" onChange={this.changeField} onBlur={this.validation} required></input></p>
                    <p><span>Quantity</span><input type="number" name="number" className="product-card__edit-field product-card__edit-number" max="10000" min="0" step="1" onChange={this.changeField} onBlur={this.validation} required></input></p>
                    <p><span>Description</span><textarea name="textarea" className="product-card__edit-field textareafiald product-card__edit-description" minLength="20" onChange={this.changeField} onBlur={this.validation} required></textarea></p>
                    {(this.state.validationForm) ? <button className="product-card-button product-card__edit-save" onClick={this.changeCard}>Save</button> : <button className="product-card-button product-card__edit-save" disabled>Save</button>}
                    <button className="product-card-button product-card__edit-cancel" onClick={this.cancelChange}>Cancel</button>
                </div>
            )
        }
    }
}

export default CardEditor;