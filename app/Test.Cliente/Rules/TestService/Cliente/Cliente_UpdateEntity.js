export default function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Cliente/Services/TestService.service').isDraftEnabled('Cliente')) {
        return clientAPI.executeAction({
            'Name': '/Cliente/Actions/TestService/Cliente/Cliente_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/Cliente/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Cliente'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Cliente/Actions/TestService/Cliente/Cliente_UpdateEntity.action');
    }
}