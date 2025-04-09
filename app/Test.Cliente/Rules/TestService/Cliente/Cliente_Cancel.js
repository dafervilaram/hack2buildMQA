export default function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/Cliente/Services/TestService.service').isDraftEnabled('Cliente')) {
        return clientAPI.executeAction({
            'Name': '/Cliente/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Cliente'
                },
                'OnSuccess': '/Cliente/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Cliente/Actions/CloseModalPage_Cancel.action');
    }
}