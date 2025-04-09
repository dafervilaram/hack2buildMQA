export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('items')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'items'
                },
                'OnSuccess': '/Equipment/Actions/TestService/items/NavToitems_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/items/NavToitems_Edit.action');
    }
}