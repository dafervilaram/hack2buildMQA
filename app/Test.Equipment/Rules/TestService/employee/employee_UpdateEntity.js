export default function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('employee')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/TestService/employee/employee_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/Equipment/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'employee'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/employee/employee_UpdateEntity.action');
    }
}