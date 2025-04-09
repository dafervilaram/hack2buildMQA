export default function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('items')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'items'
                },
                'OnSuccess': '/Equipment/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/CloseModalPage_Cancel.action');
    }
}