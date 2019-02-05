import React from 'react';
import PropTypes from 'prop-types';

import {eventClient} from './events';

import './EditClient.css'


class EditClient extends React.PureComponent {

    static defaultProps = {
        data:'',
    }
    
    static propTypes = {
        data:PropTypes.oneOfType([
            PropTypes.shape({
                id:PropTypes.number,
                surname:PropTypes.string,
                name:PropTypes.string,
                patronymic:PropTypes.string,
                balance:PropTypes.number,
            }),
            PropTypes.string
        ]),
        workMode:PropTypes.oneOfType ([
            PropTypes.number,
            PropTypes.bool
        ])
    };

    constructor (props, context) {
        super(props, context)

        this.state = {
            workMode:this.props.workMode,
            id:this.props.data.id,
            name:this.props.data.name,
            surname:this.props.data.surname,
            patronymic:this.props.data.patronymic,
            balance:this.props.data.balance
        }
    };

    linkForInputId = null;
    linkForInputName = null;
    linkForInputSurname = null;
    linkForInputPatronymic = null;
    linkForInputBalance = null;

    //Start Block - Set Value For Link
    setValueLink = (input, mode) => {
        if(mode == 0) {
            switch(input.name) {
                case 'id':this.setState({id:input.value});
                    break;
                case 'name': this.setState({name: input.value});
                    break;
                case 'surname': this.setState({surname: input.value});
                    break;
                case 'patronymic' : this.setState({patronymic: input.value});
                    break;
                case 'balance' : this.setState({balance: input.value});
                    break;
            }
        } else if(mode == 1) {
            switch(input.name) {
                case 'id': this.linkForInputId = input;
                    break;
                case 'name': this.linkForInputName = input;
                    break;
                case 'surname': this.linkForInputSurname = input;
                    break;
                case 'patronymic':this.linkForInputPatronymic = input;
                    break;
                case 'balance':this.linkForInputBalance = input;
                    break;
            }
        }
    }

    setInputRef = (ref) => {
        if(ref) {
            this.setValueLink(ref, 1)
        }
        
    };
    
    setNewText = (e) => {
        if(this.linkForInputSurname && this.linkForInputBalance) {
            this.setValueLink(e.target, 0)
        }
    }
    //Finish Block - Set Value For Link

    //Start Block - Events
    cancelEdit = () => {
        let cancelEdit = "cancelEdit"
        eventClient.emit(cancelEdit, 0)
    }

    saveClient = () => {
        let newClient;
        let saveClient = 'saveClient';
        if(this.state.workMode == 1) {
            newClient = {id:parseFloat(this.state.id), surname:this.state.surname, balance:parseFloat(this.state.balance)}
        } else{
            newClient = {id:parseFloat(this.state.id), name:this.state.name, surname:this.state.surname, patronymic:this.state.patronymic, balance:parseFloat(this.state.balance)}
        }
        eventClient.emit(saveClient, newClient)
    }
    //Finish Block - Events

    componentWillReceiveProps = (newProps) => {
        
        if(this.props.workMode !== newProps.workMode || this.props.data !== newProps.data) {

            this.setState({workMode:newProps.workMode,
                            id:newProps.data.id,
                            name:newProps.data.name,
                            surname:newProps.data.surname,
                            patronymic:newProps.data.patronymic,
                            balance:newProps.data.balance,
                        })
        }
    }
    // componentWillMount =(oldProps, oldState)=> {
    //     console.log('componentWillMount - EditClient')
    // }
    // componentDidMount =(oldProps, oldState)=> {
    //     console.log('componentDidMount - EditClient')
    // }
    // componentWillUpdate =(oldProps, oldState)=> {
    //     console.log('componentWillUpdate - EditClient')
    // }
    // componentDidUpdate =(oldProps, oldState)=> {
    //     console.log('componentDidUpdate - EditClient')
    // }
    // componentWillUnmount =(oldProps, oldState)=> {
    //     console.log('componentWillUnmount - EditClient')
    // }

    render () {
        console.log('render - EditClient')

        if(this.state.workMode == 0 ) {
            return null
        } else if(this.state.workMode == 1) {
            return(
                <div className="">
                    <p className="editor__client-heading">Edit client information</p>
                    <p className="edit__client-lable">SURNAME</p>
                    <input type="text" name="surname" className="editor__client-input editor__client-surname" defaultValue={this.state.surname} ref={this.setInputRef} onBlur={this.setNewText}/>
                    <p className="edit__client-lable">BALANCE</p>
                    <input type="number" name="balance" className="editor__client-input editor__client-balance" defaultValue={this.state.balance} ref={this.setInputRef} onBlur={this.setNewText}/>
                    <input type="button" name="button-cancel" className="input-button editor__client-button-cancel" value="Cancel" onClick={this.cancelEdit}/><input type="button" name="button-save" className="input-button editor__client-button-save" value="Save" onClick={this.saveClient}/>
                </div>
            )
        } else if(this.state.workMode == 2) {
            return (
                <div className="">
                    <p className="editor__client-heading">Create new client</p>
                    <p className="edit__client-lable">ID</p>
                    <input type="number" name="id" className="editor__client-input editor__client-id" ref={this.setInputRef} onBlur={this.setNewText}/>
                    <p className="edit__client-lable">NAME</p>
                    <input type="text" name="name" className="editor__client-input editor__client-name" ref={this.setInputRef} onBlur={this.setNewText}/>
                    <p className="edit__client-lable">SURNAME</p>
                    <input type="text" name="surname" className="editor__client-input editor__client-surname" ref={this.setInputRef} onBlur={this.setNewText}/>
                    <p className="edit__client-lable">PATRONYMIC</p>
                    <input type="text" name="patronymic" className="editor__client-input editor__client-patronymic" ref={this.setInputRef} onBlur={this.setNewText}/>
                    <p className="edit__client-lable">BALANCE</p>
                    <input type="number" name="balance" className="editor__client-input editor__client-balance" ref={this.setInputRef} onBlur={this.setNewText}/>
                    <input type="button" name="button-cancel" className="input-button editor__client-button-cancel" value="Cancel" onClick={this.cancelEdit}/><input type="button" name="button-save" className="input-button editor__client-button-save" value="Save" onClick={this.saveClient}/>
                </div>
            )
        }   
    }
}

export default EditClient;