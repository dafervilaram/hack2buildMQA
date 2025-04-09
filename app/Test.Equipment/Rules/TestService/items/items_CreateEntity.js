export default function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('items')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/TestService/items/items_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/Equipment/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'items',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/items/items_CreateEntity.action');
    }
}