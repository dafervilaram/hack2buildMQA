export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('employee')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'employee'
                },
                'OnSuccess': '/Equipment/Actions/TestService/employee/NavToemployee_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/employee/NavToemployee_Edit.action');
    }
}