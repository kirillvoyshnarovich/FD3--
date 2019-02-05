import {EventEmitter} from 'events';

let eventClient = new EventEmitter();

// событие "deleteClient" - удаление клиента из списка;
// событие "editClient" - редактирование существующего клиента;
// событие "addClient" - добавление нового клиента;
// событие "cancelEdit" - отмена редактирование и создание клиента;
// событие "saveClient" - сохраняет данные нового клиента или редактированные данные существующего клиента;

export {eventClient};


