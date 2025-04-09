export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/Cliente/Services/TestService.service').isDraftEnabled('Cliente')) {
        return clientAPI.executeAction({
            'Name': '/Cliente/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Cliente'
                },
                'OnSuccess': '/Cliente/Actions/TestService/Cliente/NavToCliente_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Cliente/Actions/TestService/Cliente/NavToCliente_Edit.action');
    }
}