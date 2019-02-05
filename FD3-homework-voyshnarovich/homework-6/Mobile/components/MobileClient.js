import React from 'react';
import PropTypes from 'prop-types';

import {eventClient} from './events';

import './MobileClient.css'

class MobileClient extends React.PureComponent {

    static propTypes = {
        dataClient:PropTypes.shape({
            surname:PropTypes.string.isRequired,
            name:PropTypes.string.isRequired,
            patronymic:PropTypes.string.isRequired,
            balance:PropTypes.number.isRequired,
        }),
    };


    constructor (props, context) {
        super(props, context);
        let statusClient = (this.props.dataClient.balance < 0) ? 'blocked' : 'active'; 

        this.state = {
            workMode:this.props.workMode,
            surname:this.props.dataClient.surname,
            name:this.props.dataClient.name,
            patronymic:this.props.dataClient.patronymic,
            balance:this.props.dataClient.balance,
            status: statusClient,
        }
    }

    //Start Block - Events
    deleteClient = () => {
        let deleteClient = 'deleteClient'
        eventClient.emit(deleteClient,this.props.dataClient.id)
    }

    editClient = () => {
        let editClient = 'editClient'
        let data = {id:this.props.dataClient.id, name:this.state.name, surname:this.state.surname, 
        balance:this.state.balance, patronymic:this.state.patronymic}
        eventClient.emit(editClient, data)
    }
    //Finish Block - Events

    componentWillReceiveProps = (newProps) => {
        // console.log('componentWillReceiveProps - MobileClient')
        // console.log(this.props.workMode == newProps.workMode)
        // console.log(this.props.dataClient == newProps.dataClient)
        // console.log(newProps.dataClient)
        if(this.props.dataClient != newProps.dataClient) {

            let statusClient = (newProps.dataClient.balance < 0) ? 'blocked' : 'active';

            this.setState({surname:newProps.dataClient.surname, 
                            balance:newProps.dataClient.balance,
                            status: statusClient,
                            workMode:newProps.workMode
            })

        } else if(this.state.workMode != newProps.workMode) {
            this.setState({workMode:newProps.workMode})
        }

    }
    // componentWillMount =(oldProps, oldState)=> {
    //     console.log('componentWillMount - MobileClient')
    // }
    // componentDidMount =(oldProps, oldState)=> {
    //     console.log('componentDidMount - MobileClient')
    // }
    // componentWillUpdate =(oldProps, oldState)=> {
    //     console.log('componentWillUpdate - MobileClient')
    // }
    // componentDidUpdate =(oldProps, oldState)=> {
    //     console.log('componentDidUpdate - MobileClient')
    // }
    // componentWillUnmount =(oldProps, oldState)=> {
    //     console.log('componentWillUnmount - MobileClient')
    // }

    render() {

        console.log('render - MobileClient')

            return(
                <div>
                    <div className="table__client">
                        <span className="table__client-surname">{this.state.surname}</span>
                        <span className="table__client-name">{this.state.name}</span>
                        <span className="table__client-patronymic">{this.state.patronymic}</span>
                        <span className="table__client-balance">{this.state.balance}</span>
                        {
                            <span className={(this.state.status == "blocked") ? "table__client-status-blocked" : "table__client-status"}>
                                {this.state.status}
                            </span>
                        }
    
                        <span className="table__client-edit">
                            <input className="table__client-edit-button button" type="button" value="Редактировать" onClick={this.editClient} disabled={(this.state.workMode != 0) ? true : false}/>
                        </span>
                        <span className="table__client-delet">
                            <input className="table__client-delet-button button" type="button" value="Удалить" onClick={this.deleteClient} disabled={(this.state.workMode != 0) ? true : false}/>
                        </span>
                    </div>
                    
                </div>
                
            )

    };

}


export default MobileClient;