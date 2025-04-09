export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('equipment')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'equipment'
                },
                'OnSuccess': '/Equipment/Actions/TestService/equipment/NavToequipment_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/equipment/NavToequipment_Edit.action');
    }
}