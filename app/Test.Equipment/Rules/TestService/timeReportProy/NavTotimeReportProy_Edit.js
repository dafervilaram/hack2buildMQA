export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('timeReportProy')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'timeReportProy'
                },
                'OnSuccess': '/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Edit.action');
    }
}