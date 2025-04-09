export default function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Cliente/Services/TestService.service').isDraftEnabled('Cliente')) {
        return clientAPI.executeAction({
            'Name': '/Cliente/Actions/TestService/Cliente/Cliente_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/Cliente/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Cliente',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Cliente/Actions/TestService/Cliente/Cliente_CreateEntity.action');
    }
}