export default function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('items')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/TestService/items/items_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/Equipment/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'items'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/items/items_UpdateEntity.action');
    }
}