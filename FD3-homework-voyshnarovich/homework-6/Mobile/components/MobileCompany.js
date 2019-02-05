import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';

import EditClient from './EditClient';

import {eventClient} from './events';

import memoize from 'memoizee'

import './MobileCompany.css';


class MobileCompany extends React.PureComponent {


    static propTypes = {
        clients:PropTypes.arrayOf(
            PropTypes.shape({
                id:PropTypes.number.isRequired,
                surname:PropTypes.string.isRequired,
                name:PropTypes.string.isRequired,
                patronymic:PropTypes.string.isRequired,
                balance:PropTypes.number.isRequired,
            })
        ),
    };

    constructor (props, context) {
        super(props, context)

        this.state = {
            clients:this.props.listClients,
            companyName: 'Velcom',
            workMode:0,
            editClient:0,
            code:0,
            filter:0
        }
    };

    staticCopyclients = this.props.listClients

    //Start Block - Memor Data
    memoizeData = (idClient, nameClient, surnameClient, patronymicClient, balanceClient) => {
        return {id:idClient, name:nameClient, surname:surnameClient, patronymic:patronymicClient, balance:balanceClient}
    };

    dataClient = memoize(this.memoizeData)
    //Finish Block - Memor Data

    //Start Block - Events
    saveClient = (newClient) => {
        let newList

        if(this.state.workMode == 1) {
            newList = [...this.staticCopyclients]   //-здесь строчку поменял с this.state.client на staticCopyclients

            newList.forEach((element, index, arr) => {
                let newElement = {...element}
                if(newElement.id == newClient.id && (newElement.balance != newClient.balance || newElement.surname != newClient.surname)) {
                    newElement.balance = newClient.balance
                    newElement.surname = newClient.surname
                    newList[index] = newElement
                }
            })

        } else {
            newList = [...this.staticCopyclients, newClient]
        }

        this.staticCopyclients = newList
        this.setState({workMode:0, filter:0, clients:this.staticCopyclients})

        // if(this.state.filter == 1 && newClient.balance < 0) {          //The Add Client Page Remains In The Same Mode
        //     this.setState({clients:newList, workMode:0})
        // }else if(this.state.filter == 2 && newClient.balance > 0) {
        //     this.setState({clients:newList, workMode:0})
        // } else if(this.state.filter == 0)  {
        //     this.setState({clients:newList, workMode:0})
        // } else if(this.state.filter == 1 && newClient.balance > 0) {
        //     this.setState({workMode:0, filter:0})
        // } else {
        //     this.setState({workMode:0, filter:0})
        // }
            
    }
    
    cancelEdit = (workMode) => {
        this.setState({workMode:workMode, editClient:0})
    }

    addClient = () => {
        this.setState({workMode:2})
    }

    editClient = (data) => {
        let indexRender = (this.state.code == 1) ? 0 : 1;
        this.setState({workMode:1, editClient:data.id, code:indexRender});
    }

    deleteClient = (code) => {
        let newList = this.state.clients.filter(element => element.id != code);
        this.staticCopyclients = this.staticCopyclients.filter (element => {
            if(element.id != code) {
                return element
            }
        })

        this.setState({clients:newList})
    }
    //Finish Block - Events

    //Start Block - add Listeners for Events
    componentDidMount = () => {
            let deleteClient = 'deleteClient'
            let addClient = 'addClient'
            let editClient = 'editClient'
            let cancelEdit = 'cancelEdit'
            let saveClient = 'saveClient'
            eventClient.addListener(deleteClient, this.deleteClient)
            eventClient.addListener(addClient, this.addClient)
            eventClient.addListener(editClient, this.editClient)
            eventClient.addListener(cancelEdit, this.cancelEdit)
            eventClient.addListener(saveClient, this.saveClient)
    }
    componentWillUnmount = () => {
            let deleteClient = 'deleteClient'
            let addClient = 'addClient'
            let editClient = 'editClient'
            let cancelEdit = 'cancelEdit'
            let saveClient = 'saveClient'
            eventClient.removeListener(deleteClient, this.deleteClient)
            eventClient.removeListener(addClient, this.addClient)
            eventClient.removeListener(editClient, this.editClient)
            eventClient.removeListener(cancelEdit, this.cancelEdit)
            eventClient.removeListener(saveClient, this.saveClient)
    }
    //Finish Block - add Listeners for Events

    //Start Block - Set Name Company Methods
    setCompanyNameVelcom = () => {
        this.setState({companyName: 'Velcom'})
    };

    setCompanyNameMTS = () => {
        this.setState({companyName: 'МТС'})
    };
    //Finish Block - Set Name Company Methods

    //Start Block - Filtering Methods
    filterClientsAll = () => {
        let staticCopyclients = this.staticCopyclients
        this.setState({clients:staticCopyclients, filter:0})
    }

    filterClientsActive = () => {
        let newList = this.staticCopyclients.filter(client => {
            if(client.balance > 0) {
                return client
            }
        })
        this.setState({clients: newList, filter:2})
    }

    filterClientsBlocked = () =>{
        let newList = this.staticCopyclients.filter(client => {
            if(client.balance < 0) {
                return client
            }
        })
        this.setState({clients: newList, filter:1})
    } 
    //Finish Block - Filtering Methods


    // componentWillMount =(oldProps, oldState)=> {
    //     console.log('componentWillMount - MobileCompany')
    // }
    // componentDidMount =(oldProps, oldState)=> {
    //     console.log('componentDidMount - MobileCompany')
    // }
    // componentWillUpdate =(oldProps, oldState)=> {
    //     console.log('componentWillUpdate - MobileCompany')
    // }
    // componentDidUpdate =(oldProps, oldState)=> {
    //     console.log('componentDidUpdate - MobileCompany')
    // }
    // componentWillUnmount =(oldProps, oldState)=> {
    //     console.log('componentWillUnmount - MobileCompany')
    // }

    render () {
        console.log('render - MobileCompany')

        var listClients =  this.state.clients.map(client =>  {
                let data = this.dataClient(client.id, client.name, client.surname, client.patronymic, client.balance)

                return <MobileClient key={client.id} workMode={this.state.workMode} dataClient={data}/>
            }        
        )

        let editClient = this.state.clients.filter(client => {
                if(client.id == this.state.editClient) {
                    return {'id':client.id, 'name':client.name, 'surname':client.surname, 'patronymic':client.patronymic, 'balance':client.balance}
                }
            }
        )

        var Client = (this.state.workMode == 1) ? <EditClient key={this.state.code} workMode={this.state.workMode} data={editClient[0]}/> : <EditClient workMode={this.state.workMode}/>

        return (
            <div>
                <input className="button" type="button" value="МТС" onClick={this.setCompanyNameMTS} disabled={(this.state.workMode != 0) ? true : false}/>
                <input className="button" type="button" value="Velcom" onClick={this.setCompanyNameVelcom} disabled={(this.state.workMode != 0) ? true : false}/>
                <p className="name-company">Компания:{this.state.companyName}</p>
                <div className="control-button">
                    <input className="button" type="button" value="Все" onClick={this.filterClientsAll} disabled={(this.state.workMode != 0) ? true : false}/>
                    <input className="button" type="button" value="Активные" onClick={this.filterClientsActive} disabled={(this.state.workMode != 0) ? true : false}/>
                    <input className="button" type="button" value="Заблокированные" onClick={this.filterClientsBlocked} disabled={(this.state.workMode != 0) ? true : false}/>
                </div>
                <div className="table">
                    <div className="table__heading">
                        <span>Фамилия</span>
                        <span>Имя</span>
                        <span>Отчество</span>
                        <span>Баланс</span>
                        <span>Статус</span>
                        <span>Редактировать</span>
                        <span>Удалить</span>
                    </div>
                    <div className="table__list">
                        {listClients}
                    </div>
                    <div className="editor__client">
                        {Client}
                    </div>
                </div>
                <input className="button button-add-client" type="button" value="Добавить клиента" onClick={this.addClient} disabled={(this.state.workMode != 0) ? true : false}/>
            </div>
        )
    }

}

export default MobileCompany