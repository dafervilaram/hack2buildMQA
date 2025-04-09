export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('report')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'report'
                },
                'OnSuccess': '/Equipment/Actions/TestService/report/NavToreport_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/report/NavToreport_Edit.action');
    }
}