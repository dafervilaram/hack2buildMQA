(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/Equipment/i18n/i18n.properties":
/*!**********************************************************!*\
  !*** ./build.definitions/Equipment/i18n/i18n.properties ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "Draft_DraftAdministrativeData=Draft_DraftAdministrativeData\nDraft_DraftUUID=Draft_DraftUUID\nDraft_CreationDateTime=Draft_CreationDateTime\nDraft_CreatedByUser=Draft_CreatedByUser\nDraft_DraftIsCreatedByMe=Draft_DraftIsCreatedByMe\nDraft_LastChangeDateTime=Draft_LastChangeDateTime\nDraft_LastChangedByUser=Draft_LastChangedByUser\nDraft_InProcessByUser=Draft_InProcessByUser\nDraft_DraftIsProcessedByMe=Draft_DraftIsProcessedByMe\nemployee=employee\nemployee_Detail=employee Detail\nCreate_employee_Detail=Create employee Detail\nUpdate_employee_Detail=Update employee Detail\nequipment=equipment\nequipment_Detail=equipment Detail\nCreate_equipment_Detail=Create equipment Detail\nUpdate_equipment_Detail=Update equipment Detail\nfailure=failure\nfailure_Detail=failure Detail\nCreate_failure_Detail=Create failure Detail\nUpdate_failure_Detail=Update failure Detail\nitems=items\nitems_Detail=items Detail\nCreate_items_Detail=Create items Detail\nUpdate_items_Detail=Update items Detail\nreport=report\nreport_Detail=report Detail\nCreate_report_Detail=Create report Detail\nUpdate_report_Detail=Update report Detail\ntimeReportProy=timeReportProy\ntimeReportProy_Detail=timeReportProy Detail\nCreate_timeReportProy_Detail=Create timeReportProy Detail\nUpdate_timeReportProy_Detail=Update timeReportProy Detail"

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Application/AppUpdateFailure.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Application/AppUpdateFailure.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/Equipment/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Application/AppUpdateSuccess.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Application/AppUpdateSuccess.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/Equipment/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/Equipment/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Application/ClientIsMultiUserMode.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Application/ClientIsMultiUserMode.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Application/GetClientSupportVersions.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Application/GetClientSupportVersions.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Application/GetClientVersion.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Application/GetClientVersion.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Application/OnWillUpdate.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Application/OnWillUpdate.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/Equipment/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Application/ResetAppSettingsAndLogout.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/Equipment/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Logging/LogLevels.js":
/*!****************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Logging/LogLevels.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Logging/SetTraceCategories.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Logging/SetTraceCategories.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Logging/SetUserLogLevel.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Logging/SetUserLogLevel.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Logging/ToggleLogging.js":
/*!********************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Logging/ToggleLogging.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Logging/TraceCategories.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Logging/TraceCategories.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Logging/UserLogSetting.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Logging/UserLogSetting.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/Service/Initialize.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/Service/Initialize.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Initialize)
/* harmony export */ });
function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _TestService = context.executeAction('/Equipment/Actions/TestService/Service/InitializeOnline.action');

    //You can add more service initialize actions here

    return Promise.all([_TestService]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/Equipment/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/employee/NavToemployee_Edit.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/employee/NavToemployee_Edit.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/employee/employee_Cancel.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/employee/employee_Cancel.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('employee')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'employee'
                },
                'OnSuccess': '/Equipment/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/employee/employee_CreateEntity.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/employee/employee_CreateEntity.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('employee')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/TestService/employee/employee_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/Equipment/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'employee',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/employee/employee_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/employee/employee_DeleteConfirmation.js":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/employee/employee_DeleteConfirmation.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/Equipment/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/Equipment/Actions/TestService/employee/employee_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/employee/employee_UpdateEntity.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/employee/employee_UpdateEntity.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/equipment/NavToequipment_Edit.js":
/*!****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/equipment/NavToequipment_Edit.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/equipment/equipment_Cancel.js":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/equipment/equipment_Cancel.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('equipment')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'equipment'
                },
                'OnSuccess': '/Equipment/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/equipment/equipment_CreateEntity.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/equipment/equipment_CreateEntity.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('equipment')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/TestService/equipment/equipment_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/Equipment/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'equipment',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/equipment/equipment_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/equipment/equipment_DeleteConfirmation.js":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/equipment/equipment_DeleteConfirmation.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/Equipment/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/Equipment/Actions/TestService/equipment/equipment_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/equipment/equipment_UpdateEntity.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/equipment/equipment_UpdateEntity.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('equipment')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/TestService/equipment/equipment_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/Equipment/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'equipment'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/equipment/equipment_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/failure/NavTofailure_Edit.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/failure/NavTofailure_Edit.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('failure')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'failure'
                },
                'OnSuccess': '/Equipment/Actions/TestService/failure/NavTofailure_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/failure/NavTofailure_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/failure/failure_Cancel.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/failure/failure_Cancel.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('failure')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'failure'
                },
                'OnSuccess': '/Equipment/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/failure/failure_CreateEntity.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/failure/failure_CreateEntity.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('failure')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/TestService/failure/failure_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/Equipment/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'failure',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/failure/failure_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/failure/failure_DeleteConfirmation.js":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/failure/failure_DeleteConfirmation.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/Equipment/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/Equipment/Actions/TestService/failure/failure_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/failure/failure_UpdateEntity.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/failure/failure_UpdateEntity.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('failure')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/TestService/failure/failure_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/Equipment/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'failure'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/failure/failure_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/items/NavToitems_Edit.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/items/NavToitems_Edit.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/items/items_Cancel.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/items/items_Cancel.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/items/items_CreateEntity.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/items/items_CreateEntity.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/items/items_DeleteConfirmation.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/items/items_DeleteConfirmation.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/Equipment/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/Equipment/Actions/TestService/items/items_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/items/items_UpdateEntity.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/items/items_UpdateEntity.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/report/NavToreport_Edit.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/report/NavToreport_Edit.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/report/report_Cancel.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/report/report_Cancel.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('report')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'report'
                },
                'OnSuccess': '/Equipment/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/report/report_CreateEntity.js":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/report/report_CreateEntity.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('report')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/TestService/report/report_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/Equipment/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'report',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/report/report_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/report/report_DeleteConfirmation.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/report/report_DeleteConfirmation.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/Equipment/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/Equipment/Actions/TestService/report/report_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/report/report_UpdateEntity.js":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/report/report_UpdateEntity.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('report')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/TestService/report/report_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/Equipment/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'report'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/report/report_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/timeReportProy/NavTotimeReportProy_Edit.js":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/timeReportProy/NavTotimeReportProy_Edit.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/timeReportProy/timeReportProy_Cancel.js":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/timeReportProy/timeReportProy_Cancel.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('timeReportProy')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'timeReportProy'
                },
                'OnSuccess': '/Equipment/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/timeReportProy/timeReportProy_CreateEntity.js":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/timeReportProy/timeReportProy_CreateEntity.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('timeReportProy')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/TestService/timeReportProy/timeReportProy_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/Equipment/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'timeReportProy',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/timeReportProy/timeReportProy_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/timeReportProy/timeReportProy_DeleteConfirmation.js":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/timeReportProy/timeReportProy_DeleteConfirmation.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/Equipment/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/Equipment/Actions/TestService/timeReportProy/timeReportProy_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/Equipment/Rules/TestService/timeReportProy/timeReportProy_UpdateEntity.js":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Rules/TestService/timeReportProy/timeReportProy_UpdateEntity.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Equipment/Services/TestService.service').isDraftEnabled('timeReportProy')) {
        return clientAPI.executeAction({
            'Name': '/Equipment/Actions/TestService/timeReportProy/timeReportProy_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/Equipment/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'timeReportProy'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Equipment/Actions/TestService/timeReportProy/timeReportProy_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let equipment_actions_application_appupdate_action = __webpack_require__(/*! ./Equipment/Actions/Application/AppUpdate.action */ "./build.definitions/Equipment/Actions/Application/AppUpdate.action")
let equipment_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./Equipment/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/Equipment/Actions/Application/AppUpdateFailureMessage.action")
let equipment_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./Equipment/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/Equipment/Actions/Application/AppUpdateProgressBanner.action")
let equipment_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./Equipment/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/Equipment/Actions/Application/AppUpdateSuccessMessage.action")
let equipment_actions_application_logout_action = __webpack_require__(/*! ./Equipment/Actions/Application/Logout.action */ "./build.definitions/Equipment/Actions/Application/Logout.action")
let equipment_actions_application_navtoabout_action = __webpack_require__(/*! ./Equipment/Actions/Application/NavToAbout.action */ "./build.definitions/Equipment/Actions/Application/NavToAbout.action")
let equipment_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./Equipment/Actions/Application/NavToActivityLog.action */ "./build.definitions/Equipment/Actions/Application/NavToActivityLog.action")
let equipment_actions_application_navtosupport_action = __webpack_require__(/*! ./Equipment/Actions/Application/NavToSupport.action */ "./build.definitions/Equipment/Actions/Application/NavToSupport.action")
let equipment_actions_application_onwillupdate_action = __webpack_require__(/*! ./Equipment/Actions/Application/OnWillUpdate.action */ "./build.definitions/Equipment/Actions/Application/OnWillUpdate.action")
let equipment_actions_application_reset_action = __webpack_require__(/*! ./Equipment/Actions/Application/Reset.action */ "./build.definitions/Equipment/Actions/Application/Reset.action")
let equipment_actions_application_resetmessage_action = __webpack_require__(/*! ./Equipment/Actions/Application/ResetMessage.action */ "./build.definitions/Equipment/Actions/Application/ResetMessage.action")
let equipment_actions_application_usermenupopover_action = __webpack_require__(/*! ./Equipment/Actions/Application/UserMenuPopover.action */ "./build.definitions/Equipment/Actions/Application/UserMenuPopover.action")
let equipment_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./Equipment/Actions/CloseModalPage_Cancel.action */ "./build.definitions/Equipment/Actions/CloseModalPage_Cancel.action")
let equipment_actions_closemodalpage_complete_action = __webpack_require__(/*! ./Equipment/Actions/CloseModalPage_Complete.action */ "./build.definitions/Equipment/Actions/CloseModalPage_Complete.action")
let equipment_actions_closepage_action = __webpack_require__(/*! ./Equipment/Actions/ClosePage.action */ "./build.definitions/Equipment/Actions/ClosePage.action")
let equipment_actions_createentityfailuremessage_action = __webpack_require__(/*! ./Equipment/Actions/CreateEntityFailureMessage.action */ "./build.definitions/Equipment/Actions/CreateEntityFailureMessage.action")
let equipment_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./Equipment/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/Equipment/Actions/CreateEntitySuccessMessage.action")
let equipment_actions_deleteconfirmation_action = __webpack_require__(/*! ./Equipment/Actions/DeleteConfirmation.action */ "./build.definitions/Equipment/Actions/DeleteConfirmation.action")
let equipment_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./Equipment/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/Equipment/Actions/DeleteEntityFailureMessage.action")
let equipment_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./Equipment/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/Equipment/Actions/DeleteEntitySuccessMessage.action")
let equipment_actions_draftdiscardentity_action = __webpack_require__(/*! ./Equipment/Actions/DraftDiscardEntity.action */ "./build.definitions/Equipment/Actions/DraftDiscardEntity.action")
let equipment_actions_drafteditentity_action = __webpack_require__(/*! ./Equipment/Actions/DraftEditEntity.action */ "./build.definitions/Equipment/Actions/DraftEditEntity.action")
let equipment_actions_draftsaveentity_action = __webpack_require__(/*! ./Equipment/Actions/DraftSaveEntity.action */ "./build.definitions/Equipment/Actions/DraftSaveEntity.action")
let equipment_actions_genericbannermessage_action = __webpack_require__(/*! ./Equipment/Actions/GenericBannerMessage.action */ "./build.definitions/Equipment/Actions/GenericBannerMessage.action")
let equipment_actions_genericmessagebox_action = __webpack_require__(/*! ./Equipment/Actions/GenericMessageBox.action */ "./build.definitions/Equipment/Actions/GenericMessageBox.action")
let equipment_actions_genericnavigation_action = __webpack_require__(/*! ./Equipment/Actions/GenericNavigation.action */ "./build.definitions/Equipment/Actions/GenericNavigation.action")
let equipment_actions_generictoastmessage_action = __webpack_require__(/*! ./Equipment/Actions/GenericToastMessage.action */ "./build.definitions/Equipment/Actions/GenericToastMessage.action")
let equipment_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./Equipment/Actions/Logging/LogUploadFailure.action */ "./build.definitions/Equipment/Actions/Logging/LogUploadFailure.action")
let equipment_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./Equipment/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/Equipment/Actions/Logging/LogUploadSuccessful.action")
let equipment_actions_logging_uploadlog_action = __webpack_require__(/*! ./Equipment/Actions/Logging/UploadLog.action */ "./build.definitions/Equipment/Actions/Logging/UploadLog.action")
let equipment_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./Equipment/Actions/Logging/UploadLogProgress.action */ "./build.definitions/Equipment/Actions/Logging/UploadLogProgress.action")
let equipment_actions_testservice_employee_employee_createentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/employee/employee_CreateEntity.action */ "./build.definitions/Equipment/Actions/TestService/employee/employee_CreateEntity.action")
let equipment_actions_testservice_employee_employee_deleteentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/employee/employee_DeleteEntity.action */ "./build.definitions/Equipment/Actions/TestService/employee/employee_DeleteEntity.action")
let equipment_actions_testservice_employee_employee_updateentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/employee/employee_UpdateEntity.action */ "./build.definitions/Equipment/Actions/TestService/employee/employee_UpdateEntity.action")
let equipment_actions_testservice_employee_navtoemployee_create_action = __webpack_require__(/*! ./Equipment/Actions/TestService/employee/NavToemployee_Create.action */ "./build.definitions/Equipment/Actions/TestService/employee/NavToemployee_Create.action")
let equipment_actions_testservice_employee_navtoemployee_detail_action = __webpack_require__(/*! ./Equipment/Actions/TestService/employee/NavToemployee_Detail.action */ "./build.definitions/Equipment/Actions/TestService/employee/NavToemployee_Detail.action")
let equipment_actions_testservice_employee_navtoemployee_edit_action = __webpack_require__(/*! ./Equipment/Actions/TestService/employee/NavToemployee_Edit.action */ "./build.definitions/Equipment/Actions/TestService/employee/NavToemployee_Edit.action")
let equipment_actions_testservice_employee_navtoemployee_list_action = __webpack_require__(/*! ./Equipment/Actions/TestService/employee/NavToemployee_List.action */ "./build.definitions/Equipment/Actions/TestService/employee/NavToemployee_List.action")
let equipment_actions_testservice_equipment_equipment_createentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/equipment/equipment_CreateEntity.action */ "./build.definitions/Equipment/Actions/TestService/equipment/equipment_CreateEntity.action")
let equipment_actions_testservice_equipment_equipment_deleteentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/equipment/equipment_DeleteEntity.action */ "./build.definitions/Equipment/Actions/TestService/equipment/equipment_DeleteEntity.action")
let equipment_actions_testservice_equipment_equipment_updateentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/equipment/equipment_UpdateEntity.action */ "./build.definitions/Equipment/Actions/TestService/equipment/equipment_UpdateEntity.action")
let equipment_actions_testservice_equipment_navtoequipment_create_action = __webpack_require__(/*! ./Equipment/Actions/TestService/equipment/NavToequipment_Create.action */ "./build.definitions/Equipment/Actions/TestService/equipment/NavToequipment_Create.action")
let equipment_actions_testservice_equipment_navtoequipment_detail_action = __webpack_require__(/*! ./Equipment/Actions/TestService/equipment/NavToequipment_Detail.action */ "./build.definitions/Equipment/Actions/TestService/equipment/NavToequipment_Detail.action")
let equipment_actions_testservice_equipment_navtoequipment_edit_action = __webpack_require__(/*! ./Equipment/Actions/TestService/equipment/NavToequipment_Edit.action */ "./build.definitions/Equipment/Actions/TestService/equipment/NavToequipment_Edit.action")
let equipment_actions_testservice_equipment_navtoequipment_list_action = __webpack_require__(/*! ./Equipment/Actions/TestService/equipment/NavToequipment_List.action */ "./build.definitions/Equipment/Actions/TestService/equipment/NavToequipment_List.action")
let equipment_actions_testservice_failure_failure_createentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/failure/failure_CreateEntity.action */ "./build.definitions/Equipment/Actions/TestService/failure/failure_CreateEntity.action")
let equipment_actions_testservice_failure_failure_deleteentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/failure/failure_DeleteEntity.action */ "./build.definitions/Equipment/Actions/TestService/failure/failure_DeleteEntity.action")
let equipment_actions_testservice_failure_failure_updateentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/failure/failure_UpdateEntity.action */ "./build.definitions/Equipment/Actions/TestService/failure/failure_UpdateEntity.action")
let equipment_actions_testservice_failure_navtofailure_create_action = __webpack_require__(/*! ./Equipment/Actions/TestService/failure/NavTofailure_Create.action */ "./build.definitions/Equipment/Actions/TestService/failure/NavTofailure_Create.action")
let equipment_actions_testservice_failure_navtofailure_detail_action = __webpack_require__(/*! ./Equipment/Actions/TestService/failure/NavTofailure_Detail.action */ "./build.definitions/Equipment/Actions/TestService/failure/NavTofailure_Detail.action")
let equipment_actions_testservice_failure_navtofailure_edit_action = __webpack_require__(/*! ./Equipment/Actions/TestService/failure/NavTofailure_Edit.action */ "./build.definitions/Equipment/Actions/TestService/failure/NavTofailure_Edit.action")
let equipment_actions_testservice_failure_navtofailure_list_action = __webpack_require__(/*! ./Equipment/Actions/TestService/failure/NavTofailure_List.action */ "./build.definitions/Equipment/Actions/TestService/failure/NavTofailure_List.action")
let equipment_actions_testservice_items_items_createentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/items/items_CreateEntity.action */ "./build.definitions/Equipment/Actions/TestService/items/items_CreateEntity.action")
let equipment_actions_testservice_items_items_deleteentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/items/items_DeleteEntity.action */ "./build.definitions/Equipment/Actions/TestService/items/items_DeleteEntity.action")
let equipment_actions_testservice_items_items_updateentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/items/items_UpdateEntity.action */ "./build.definitions/Equipment/Actions/TestService/items/items_UpdateEntity.action")
let equipment_actions_testservice_items_navtoitems_create_action = __webpack_require__(/*! ./Equipment/Actions/TestService/items/NavToitems_Create.action */ "./build.definitions/Equipment/Actions/TestService/items/NavToitems_Create.action")
let equipment_actions_testservice_items_navtoitems_detail_action = __webpack_require__(/*! ./Equipment/Actions/TestService/items/NavToitems_Detail.action */ "./build.definitions/Equipment/Actions/TestService/items/NavToitems_Detail.action")
let equipment_actions_testservice_items_navtoitems_edit_action = __webpack_require__(/*! ./Equipment/Actions/TestService/items/NavToitems_Edit.action */ "./build.definitions/Equipment/Actions/TestService/items/NavToitems_Edit.action")
let equipment_actions_testservice_items_navtoitems_list_action = __webpack_require__(/*! ./Equipment/Actions/TestService/items/NavToitems_List.action */ "./build.definitions/Equipment/Actions/TestService/items/NavToitems_List.action")
let equipment_actions_testservice_report_navtoreport_create_action = __webpack_require__(/*! ./Equipment/Actions/TestService/report/NavToreport_Create.action */ "./build.definitions/Equipment/Actions/TestService/report/NavToreport_Create.action")
let equipment_actions_testservice_report_navtoreport_detail_action = __webpack_require__(/*! ./Equipment/Actions/TestService/report/NavToreport_Detail.action */ "./build.definitions/Equipment/Actions/TestService/report/NavToreport_Detail.action")
let equipment_actions_testservice_report_navtoreport_edit_action = __webpack_require__(/*! ./Equipment/Actions/TestService/report/NavToreport_Edit.action */ "./build.definitions/Equipment/Actions/TestService/report/NavToreport_Edit.action")
let equipment_actions_testservice_report_navtoreport_list_action = __webpack_require__(/*! ./Equipment/Actions/TestService/report/NavToreport_List.action */ "./build.definitions/Equipment/Actions/TestService/report/NavToreport_List.action")
let equipment_actions_testservice_report_report_createentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/report/report_CreateEntity.action */ "./build.definitions/Equipment/Actions/TestService/report/report_CreateEntity.action")
let equipment_actions_testservice_report_report_deleteentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/report/report_DeleteEntity.action */ "./build.definitions/Equipment/Actions/TestService/report/report_DeleteEntity.action")
let equipment_actions_testservice_report_report_updateentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/report/report_UpdateEntity.action */ "./build.definitions/Equipment/Actions/TestService/report/report_UpdateEntity.action")
let equipment_actions_testservice_service_initializeonline_action = __webpack_require__(/*! ./Equipment/Actions/TestService/Service/InitializeOnline.action */ "./build.definitions/Equipment/Actions/TestService/Service/InitializeOnline.action")
let equipment_actions_testservice_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./Equipment/Actions/TestService/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/Equipment/Actions/TestService/Service/InitializeOnlineFailureMessage.action")
let equipment_actions_testservice_timereportproy_navtotimereportproy_create_action = __webpack_require__(/*! ./Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Create.action */ "./build.definitions/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Create.action")
let equipment_actions_testservice_timereportproy_navtotimereportproy_detail_action = __webpack_require__(/*! ./Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Detail.action */ "./build.definitions/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Detail.action")
let equipment_actions_testservice_timereportproy_navtotimereportproy_edit_action = __webpack_require__(/*! ./Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Edit.action */ "./build.definitions/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Edit.action")
let equipment_actions_testservice_timereportproy_navtotimereportproy_list_action = __webpack_require__(/*! ./Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_List.action */ "./build.definitions/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_List.action")
let equipment_actions_testservice_timereportproy_timereportproy_createentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/timeReportProy/timeReportProy_CreateEntity.action */ "./build.definitions/Equipment/Actions/TestService/timeReportProy/timeReportProy_CreateEntity.action")
let equipment_actions_testservice_timereportproy_timereportproy_deleteentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/timeReportProy/timeReportProy_DeleteEntity.action */ "./build.definitions/Equipment/Actions/TestService/timeReportProy/timeReportProy_DeleteEntity.action")
let equipment_actions_testservice_timereportproy_timereportproy_updateentity_action = __webpack_require__(/*! ./Equipment/Actions/TestService/timeReportProy/timeReportProy_UpdateEntity.action */ "./build.definitions/Equipment/Actions/TestService/timeReportProy/timeReportProy_UpdateEntity.action")
let equipment_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./Equipment/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/Equipment/Actions/UpdateEntityFailureMessage.action")
let equipment_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./Equipment/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/Equipment/Actions/UpdateEntitySuccessMessage.action")
let equipment_globals_application_appdefinition_version_global = __webpack_require__(/*! ./Equipment/Globals/Application/AppDefinition_Version.global */ "./build.definitions/Equipment/Globals/Application/AppDefinition_Version.global")
let equipment_globals_application_applicationname_global = __webpack_require__(/*! ./Equipment/Globals/Application/ApplicationName.global */ "./build.definitions/Equipment/Globals/Application/ApplicationName.global")
let equipment_globals_application_supportemail_global = __webpack_require__(/*! ./Equipment/Globals/Application/SupportEmail.global */ "./build.definitions/Equipment/Globals/Application/SupportEmail.global")
let equipment_globals_application_supportphone_global = __webpack_require__(/*! ./Equipment/Globals/Application/SupportPhone.global */ "./build.definitions/Equipment/Globals/Application/SupportPhone.global")
let equipment_i18n_i18n_properties = __webpack_require__(/*! ./Equipment/i18n/i18n.properties */ "./build.definitions/Equipment/i18n/i18n.properties")
let equipment_jsconfig_json = __webpack_require__(/*! ./Equipment/jsconfig.json */ "./build.definitions/Equipment/jsconfig.json")
let equipment_pages_application_about_page = __webpack_require__(/*! ./Equipment/Pages/Application/About.page */ "./build.definitions/Equipment/Pages/Application/About.page")
let equipment_pages_application_support_page = __webpack_require__(/*! ./Equipment/Pages/Application/Support.page */ "./build.definitions/Equipment/Pages/Application/Support.page")
let equipment_pages_application_useractivitylog_page = __webpack_require__(/*! ./Equipment/Pages/Application/UserActivityLog.page */ "./build.definitions/Equipment/Pages/Application/UserActivityLog.page")
let equipment_pages_main_page = __webpack_require__(/*! ./Equipment/Pages/Main.page */ "./build.definitions/Equipment/Pages/Main.page")
let equipment_pages_testservice_employee_employee_create_page = __webpack_require__(/*! ./Equipment/Pages/TestService_employee/employee_Create.page */ "./build.definitions/Equipment/Pages/TestService_employee/employee_Create.page")
let equipment_pages_testservice_employee_employee_detail_page = __webpack_require__(/*! ./Equipment/Pages/TestService_employee/employee_Detail.page */ "./build.definitions/Equipment/Pages/TestService_employee/employee_Detail.page")
let equipment_pages_testservice_employee_employee_edit_page = __webpack_require__(/*! ./Equipment/Pages/TestService_employee/employee_Edit.page */ "./build.definitions/Equipment/Pages/TestService_employee/employee_Edit.page")
let equipment_pages_testservice_employee_employee_list_page = __webpack_require__(/*! ./Equipment/Pages/TestService_employee/employee_List.page */ "./build.definitions/Equipment/Pages/TestService_employee/employee_List.page")
let equipment_pages_testservice_equipment_equipment_create_page = __webpack_require__(/*! ./Equipment/Pages/TestService_equipment/equipment_Create.page */ "./build.definitions/Equipment/Pages/TestService_equipment/equipment_Create.page")
let equipment_pages_testservice_equipment_equipment_detail_page = __webpack_require__(/*! ./Equipment/Pages/TestService_equipment/equipment_Detail.page */ "./build.definitions/Equipment/Pages/TestService_equipment/equipment_Detail.page")
let equipment_pages_testservice_equipment_equipment_edit_page = __webpack_require__(/*! ./Equipment/Pages/TestService_equipment/equipment_Edit.page */ "./build.definitions/Equipment/Pages/TestService_equipment/equipment_Edit.page")
let equipment_pages_testservice_equipment_equipment_list_page = __webpack_require__(/*! ./Equipment/Pages/TestService_equipment/equipment_List.page */ "./build.definitions/Equipment/Pages/TestService_equipment/equipment_List.page")
let equipment_pages_testservice_failure_failure_create_page = __webpack_require__(/*! ./Equipment/Pages/TestService_failure/failure_Create.page */ "./build.definitions/Equipment/Pages/TestService_failure/failure_Create.page")
let equipment_pages_testservice_failure_failure_detail_page = __webpack_require__(/*! ./Equipment/Pages/TestService_failure/failure_Detail.page */ "./build.definitions/Equipment/Pages/TestService_failure/failure_Detail.page")
let equipment_pages_testservice_failure_failure_edit_page = __webpack_require__(/*! ./Equipment/Pages/TestService_failure/failure_Edit.page */ "./build.definitions/Equipment/Pages/TestService_failure/failure_Edit.page")
let equipment_pages_testservice_failure_failure_list_page = __webpack_require__(/*! ./Equipment/Pages/TestService_failure/failure_List.page */ "./build.definitions/Equipment/Pages/TestService_failure/failure_List.page")
let equipment_pages_testservice_items_items_create_page = __webpack_require__(/*! ./Equipment/Pages/TestService_items/items_Create.page */ "./build.definitions/Equipment/Pages/TestService_items/items_Create.page")
let equipment_pages_testservice_items_items_detail_page = __webpack_require__(/*! ./Equipment/Pages/TestService_items/items_Detail.page */ "./build.definitions/Equipment/Pages/TestService_items/items_Detail.page")
let equipment_pages_testservice_items_items_edit_page = __webpack_require__(/*! ./Equipment/Pages/TestService_items/items_Edit.page */ "./build.definitions/Equipment/Pages/TestService_items/items_Edit.page")
let equipment_pages_testservice_items_items_list_page = __webpack_require__(/*! ./Equipment/Pages/TestService_items/items_List.page */ "./build.definitions/Equipment/Pages/TestService_items/items_List.page")
let equipment_pages_testservice_report_report_create_page = __webpack_require__(/*! ./Equipment/Pages/TestService_report/report_Create.page */ "./build.definitions/Equipment/Pages/TestService_report/report_Create.page")
let equipment_pages_testservice_report_report_detail_page = __webpack_require__(/*! ./Equipment/Pages/TestService_report/report_Detail.page */ "./build.definitions/Equipment/Pages/TestService_report/report_Detail.page")
let equipment_pages_testservice_report_report_edit_page = __webpack_require__(/*! ./Equipment/Pages/TestService_report/report_Edit.page */ "./build.definitions/Equipment/Pages/TestService_report/report_Edit.page")
let equipment_pages_testservice_report_report_list_page = __webpack_require__(/*! ./Equipment/Pages/TestService_report/report_List.page */ "./build.definitions/Equipment/Pages/TestService_report/report_List.page")
let equipment_pages_testservice_timereportproy_timereportproy_create_page = __webpack_require__(/*! ./Equipment/Pages/TestService_timeReportProy/timeReportProy_Create.page */ "./build.definitions/Equipment/Pages/TestService_timeReportProy/timeReportProy_Create.page")
let equipment_pages_testservice_timereportproy_timereportproy_detail_page = __webpack_require__(/*! ./Equipment/Pages/TestService_timeReportProy/timeReportProy_Detail.page */ "./build.definitions/Equipment/Pages/TestService_timeReportProy/timeReportProy_Detail.page")
let equipment_pages_testservice_timereportproy_timereportproy_edit_page = __webpack_require__(/*! ./Equipment/Pages/TestService_timeReportProy/timeReportProy_Edit.page */ "./build.definitions/Equipment/Pages/TestService_timeReportProy/timeReportProy_Edit.page")
let equipment_pages_testservice_timereportproy_timereportproy_list_page = __webpack_require__(/*! ./Equipment/Pages/TestService_timeReportProy/timeReportProy_List.page */ "./build.definitions/Equipment/Pages/TestService_timeReportProy/timeReportProy_List.page")
let equipment_rules_application_appupdatefailure_js = __webpack_require__(/*! ./Equipment/Rules/Application/AppUpdateFailure.js */ "./build.definitions/Equipment/Rules/Application/AppUpdateFailure.js")
let equipment_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./Equipment/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/Equipment/Rules/Application/AppUpdateSuccess.js")
let equipment_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./Equipment/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/Equipment/Rules/Application/ClientIsMultiUserMode.js")
let equipment_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./Equipment/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/Equipment/Rules/Application/GetClientSupportVersions.js")
let equipment_rules_application_getclientversion_js = __webpack_require__(/*! ./Equipment/Rules/Application/GetClientVersion.js */ "./build.definitions/Equipment/Rules/Application/GetClientVersion.js")
let equipment_rules_application_onwillupdate_js = __webpack_require__(/*! ./Equipment/Rules/Application/OnWillUpdate.js */ "./build.definitions/Equipment/Rules/Application/OnWillUpdate.js")
let equipment_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./Equipment/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/Equipment/Rules/Application/ResetAppSettingsAndLogout.js")
let equipment_rules_logging_loglevels_js = __webpack_require__(/*! ./Equipment/Rules/Logging/LogLevels.js */ "./build.definitions/Equipment/Rules/Logging/LogLevels.js")
let equipment_rules_logging_settracecategories_js = __webpack_require__(/*! ./Equipment/Rules/Logging/SetTraceCategories.js */ "./build.definitions/Equipment/Rules/Logging/SetTraceCategories.js")
let equipment_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./Equipment/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/Equipment/Rules/Logging/SetUserLogLevel.js")
let equipment_rules_logging_togglelogging_js = __webpack_require__(/*! ./Equipment/Rules/Logging/ToggleLogging.js */ "./build.definitions/Equipment/Rules/Logging/ToggleLogging.js")
let equipment_rules_logging_tracecategories_js = __webpack_require__(/*! ./Equipment/Rules/Logging/TraceCategories.js */ "./build.definitions/Equipment/Rules/Logging/TraceCategories.js")
let equipment_rules_logging_userlogsetting_js = __webpack_require__(/*! ./Equipment/Rules/Logging/UserLogSetting.js */ "./build.definitions/Equipment/Rules/Logging/UserLogSetting.js")
let equipment_rules_service_initialize_js = __webpack_require__(/*! ./Equipment/Rules/Service/Initialize.js */ "./build.definitions/Equipment/Rules/Service/Initialize.js")
let equipment_rules_testservice_employee_employee_cancel_js = __webpack_require__(/*! ./Equipment/Rules/TestService/employee/employee_Cancel.js */ "./build.definitions/Equipment/Rules/TestService/employee/employee_Cancel.js")
let equipment_rules_testservice_employee_employee_createentity_js = __webpack_require__(/*! ./Equipment/Rules/TestService/employee/employee_CreateEntity.js */ "./build.definitions/Equipment/Rules/TestService/employee/employee_CreateEntity.js")
let equipment_rules_testservice_employee_employee_deleteconfirmation_js = __webpack_require__(/*! ./Equipment/Rules/TestService/employee/employee_DeleteConfirmation.js */ "./build.definitions/Equipment/Rules/TestService/employee/employee_DeleteConfirmation.js")
let equipment_rules_testservice_employee_employee_updateentity_js = __webpack_require__(/*! ./Equipment/Rules/TestService/employee/employee_UpdateEntity.js */ "./build.definitions/Equipment/Rules/TestService/employee/employee_UpdateEntity.js")
let equipment_rules_testservice_employee_navtoemployee_edit_js = __webpack_require__(/*! ./Equipment/Rules/TestService/employee/NavToemployee_Edit.js */ "./build.definitions/Equipment/Rules/TestService/employee/NavToemployee_Edit.js")
let equipment_rules_testservice_equipment_equipment_cancel_js = __webpack_require__(/*! ./Equipment/Rules/TestService/equipment/equipment_Cancel.js */ "./build.definitions/Equipment/Rules/TestService/equipment/equipment_Cancel.js")
let equipment_rules_testservice_equipment_equipment_createentity_js = __webpack_require__(/*! ./Equipment/Rules/TestService/equipment/equipment_CreateEntity.js */ "./build.definitions/Equipment/Rules/TestService/equipment/equipment_CreateEntity.js")
let equipment_rules_testservice_equipment_equipment_deleteconfirmation_js = __webpack_require__(/*! ./Equipment/Rules/TestService/equipment/equipment_DeleteConfirmation.js */ "./build.definitions/Equipment/Rules/TestService/equipment/equipment_DeleteConfirmation.js")
let equipment_rules_testservice_equipment_equipment_updateentity_js = __webpack_require__(/*! ./Equipment/Rules/TestService/equipment/equipment_UpdateEntity.js */ "./build.definitions/Equipment/Rules/TestService/equipment/equipment_UpdateEntity.js")
let equipment_rules_testservice_equipment_navtoequipment_edit_js = __webpack_require__(/*! ./Equipment/Rules/TestService/equipment/NavToequipment_Edit.js */ "./build.definitions/Equipment/Rules/TestService/equipment/NavToequipment_Edit.js")
let equipment_rules_testservice_failure_failure_cancel_js = __webpack_require__(/*! ./Equipment/Rules/TestService/failure/failure_Cancel.js */ "./build.definitions/Equipment/Rules/TestService/failure/failure_Cancel.js")
let equipment_rules_testservice_failure_failure_createentity_js = __webpack_require__(/*! ./Equipment/Rules/TestService/failure/failure_CreateEntity.js */ "./build.definitions/Equipment/Rules/TestService/failure/failure_CreateEntity.js")
let equipment_rules_testservice_failure_failure_deleteconfirmation_js = __webpack_require__(/*! ./Equipment/Rules/TestService/failure/failure_DeleteConfirmation.js */ "./build.definitions/Equipment/Rules/TestService/failure/failure_DeleteConfirmation.js")
let equipment_rules_testservice_failure_failure_updateentity_js = __webpack_require__(/*! ./Equipment/Rules/TestService/failure/failure_UpdateEntity.js */ "./build.definitions/Equipment/Rules/TestService/failure/failure_UpdateEntity.js")
let equipment_rules_testservice_failure_navtofailure_edit_js = __webpack_require__(/*! ./Equipment/Rules/TestService/failure/NavTofailure_Edit.js */ "./build.definitions/Equipment/Rules/TestService/failure/NavTofailure_Edit.js")
let equipment_rules_testservice_items_items_cancel_js = __webpack_require__(/*! ./Equipment/Rules/TestService/items/items_Cancel.js */ "./build.definitions/Equipment/Rules/TestService/items/items_Cancel.js")
let equipment_rules_testservice_items_items_createentity_js = __webpack_require__(/*! ./Equipment/Rules/TestService/items/items_CreateEntity.js */ "./build.definitions/Equipment/Rules/TestService/items/items_CreateEntity.js")
let equipment_rules_testservice_items_items_deleteconfirmation_js = __webpack_require__(/*! ./Equipment/Rules/TestService/items/items_DeleteConfirmation.js */ "./build.definitions/Equipment/Rules/TestService/items/items_DeleteConfirmation.js")
let equipment_rules_testservice_items_items_updateentity_js = __webpack_require__(/*! ./Equipment/Rules/TestService/items/items_UpdateEntity.js */ "./build.definitions/Equipment/Rules/TestService/items/items_UpdateEntity.js")
let equipment_rules_testservice_items_navtoitems_edit_js = __webpack_require__(/*! ./Equipment/Rules/TestService/items/NavToitems_Edit.js */ "./build.definitions/Equipment/Rules/TestService/items/NavToitems_Edit.js")
let equipment_rules_testservice_report_navtoreport_edit_js = __webpack_require__(/*! ./Equipment/Rules/TestService/report/NavToreport_Edit.js */ "./build.definitions/Equipment/Rules/TestService/report/NavToreport_Edit.js")
let equipment_rules_testservice_report_report_cancel_js = __webpack_require__(/*! ./Equipment/Rules/TestService/report/report_Cancel.js */ "./build.definitions/Equipment/Rules/TestService/report/report_Cancel.js")
let equipment_rules_testservice_report_report_createentity_js = __webpack_require__(/*! ./Equipment/Rules/TestService/report/report_CreateEntity.js */ "./build.definitions/Equipment/Rules/TestService/report/report_CreateEntity.js")
let equipment_rules_testservice_report_report_deleteconfirmation_js = __webpack_require__(/*! ./Equipment/Rules/TestService/report/report_DeleteConfirmation.js */ "./build.definitions/Equipment/Rules/TestService/report/report_DeleteConfirmation.js")
let equipment_rules_testservice_report_report_updateentity_js = __webpack_require__(/*! ./Equipment/Rules/TestService/report/report_UpdateEntity.js */ "./build.definitions/Equipment/Rules/TestService/report/report_UpdateEntity.js")
let equipment_rules_testservice_timereportproy_navtotimereportproy_edit_js = __webpack_require__(/*! ./Equipment/Rules/TestService/timeReportProy/NavTotimeReportProy_Edit.js */ "./build.definitions/Equipment/Rules/TestService/timeReportProy/NavTotimeReportProy_Edit.js")
let equipment_rules_testservice_timereportproy_timereportproy_cancel_js = __webpack_require__(/*! ./Equipment/Rules/TestService/timeReportProy/timeReportProy_Cancel.js */ "./build.definitions/Equipment/Rules/TestService/timeReportProy/timeReportProy_Cancel.js")
let equipment_rules_testservice_timereportproy_timereportproy_createentity_js = __webpack_require__(/*! ./Equipment/Rules/TestService/timeReportProy/timeReportProy_CreateEntity.js */ "./build.definitions/Equipment/Rules/TestService/timeReportProy/timeReportProy_CreateEntity.js")
let equipment_rules_testservice_timereportproy_timereportproy_deleteconfirmation_js = __webpack_require__(/*! ./Equipment/Rules/TestService/timeReportProy/timeReportProy_DeleteConfirmation.js */ "./build.definitions/Equipment/Rules/TestService/timeReportProy/timeReportProy_DeleteConfirmation.js")
let equipment_rules_testservice_timereportproy_timereportproy_updateentity_js = __webpack_require__(/*! ./Equipment/Rules/TestService/timeReportProy/timeReportProy_UpdateEntity.js */ "./build.definitions/Equipment/Rules/TestService/timeReportProy/timeReportProy_UpdateEntity.js")
let equipment_services_testservice_service = __webpack_require__(/*! ./Equipment/Services/TestService.service */ "./build.definitions/Equipment/Services/TestService.service")
let equipment_styles_styles_css = __webpack_require__(/*! ./Equipment/Styles/Styles.css */ "./build.definitions/Equipment/Styles/Styles.css")
let equipment_styles_styles_json = __webpack_require__(/*! ./Equipment/Styles/Styles.json */ "./build.definitions/Equipment/Styles/Styles.json")
let equipment_styles_styles_less = __webpack_require__(/*! ./Equipment/Styles/Styles.less */ "./build.definitions/Equipment/Styles/Styles.less")
let equipment_styles_styles_nss = __webpack_require__(/*! ./Equipment/Styles/Styles.nss */ "./build.definitions/Equipment/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	equipment_actions_application_appupdate_action : equipment_actions_application_appupdate_action,
	equipment_actions_application_appupdatefailuremessage_action : equipment_actions_application_appupdatefailuremessage_action,
	equipment_actions_application_appupdateprogressbanner_action : equipment_actions_application_appupdateprogressbanner_action,
	equipment_actions_application_appupdatesuccessmessage_action : equipment_actions_application_appupdatesuccessmessage_action,
	equipment_actions_application_logout_action : equipment_actions_application_logout_action,
	equipment_actions_application_navtoabout_action : equipment_actions_application_navtoabout_action,
	equipment_actions_application_navtoactivitylog_action : equipment_actions_application_navtoactivitylog_action,
	equipment_actions_application_navtosupport_action : equipment_actions_application_navtosupport_action,
	equipment_actions_application_onwillupdate_action : equipment_actions_application_onwillupdate_action,
	equipment_actions_application_reset_action : equipment_actions_application_reset_action,
	equipment_actions_application_resetmessage_action : equipment_actions_application_resetmessage_action,
	equipment_actions_application_usermenupopover_action : equipment_actions_application_usermenupopover_action,
	equipment_actions_closemodalpage_cancel_action : equipment_actions_closemodalpage_cancel_action,
	equipment_actions_closemodalpage_complete_action : equipment_actions_closemodalpage_complete_action,
	equipment_actions_closepage_action : equipment_actions_closepage_action,
	equipment_actions_createentityfailuremessage_action : equipment_actions_createentityfailuremessage_action,
	equipment_actions_createentitysuccessmessage_action : equipment_actions_createentitysuccessmessage_action,
	equipment_actions_deleteconfirmation_action : equipment_actions_deleteconfirmation_action,
	equipment_actions_deleteentityfailuremessage_action : equipment_actions_deleteentityfailuremessage_action,
	equipment_actions_deleteentitysuccessmessage_action : equipment_actions_deleteentitysuccessmessage_action,
	equipment_actions_draftdiscardentity_action : equipment_actions_draftdiscardentity_action,
	equipment_actions_drafteditentity_action : equipment_actions_drafteditentity_action,
	equipment_actions_draftsaveentity_action : equipment_actions_draftsaveentity_action,
	equipment_actions_genericbannermessage_action : equipment_actions_genericbannermessage_action,
	equipment_actions_genericmessagebox_action : equipment_actions_genericmessagebox_action,
	equipment_actions_genericnavigation_action : equipment_actions_genericnavigation_action,
	equipment_actions_generictoastmessage_action : equipment_actions_generictoastmessage_action,
	equipment_actions_logging_loguploadfailure_action : equipment_actions_logging_loguploadfailure_action,
	equipment_actions_logging_loguploadsuccessful_action : equipment_actions_logging_loguploadsuccessful_action,
	equipment_actions_logging_uploadlog_action : equipment_actions_logging_uploadlog_action,
	equipment_actions_logging_uploadlogprogress_action : equipment_actions_logging_uploadlogprogress_action,
	equipment_actions_testservice_employee_employee_createentity_action : equipment_actions_testservice_employee_employee_createentity_action,
	equipment_actions_testservice_employee_employee_deleteentity_action : equipment_actions_testservice_employee_employee_deleteentity_action,
	equipment_actions_testservice_employee_employee_updateentity_action : equipment_actions_testservice_employee_employee_updateentity_action,
	equipment_actions_testservice_employee_navtoemployee_create_action : equipment_actions_testservice_employee_navtoemployee_create_action,
	equipment_actions_testservice_employee_navtoemployee_detail_action : equipment_actions_testservice_employee_navtoemployee_detail_action,
	equipment_actions_testservice_employee_navtoemployee_edit_action : equipment_actions_testservice_employee_navtoemployee_edit_action,
	equipment_actions_testservice_employee_navtoemployee_list_action : equipment_actions_testservice_employee_navtoemployee_list_action,
	equipment_actions_testservice_equipment_equipment_createentity_action : equipment_actions_testservice_equipment_equipment_createentity_action,
	equipment_actions_testservice_equipment_equipment_deleteentity_action : equipment_actions_testservice_equipment_equipment_deleteentity_action,
	equipment_actions_testservice_equipment_equipment_updateentity_action : equipment_actions_testservice_equipment_equipment_updateentity_action,
	equipment_actions_testservice_equipment_navtoequipment_create_action : equipment_actions_testservice_equipment_navtoequipment_create_action,
	equipment_actions_testservice_equipment_navtoequipment_detail_action : equipment_actions_testservice_equipment_navtoequipment_detail_action,
	equipment_actions_testservice_equipment_navtoequipment_edit_action : equipment_actions_testservice_equipment_navtoequipment_edit_action,
	equipment_actions_testservice_equipment_navtoequipment_list_action : equipment_actions_testservice_equipment_navtoequipment_list_action,
	equipment_actions_testservice_failure_failure_createentity_action : equipment_actions_testservice_failure_failure_createentity_action,
	equipment_actions_testservice_failure_failure_deleteentity_action : equipment_actions_testservice_failure_failure_deleteentity_action,
	equipment_actions_testservice_failure_failure_updateentity_action : equipment_actions_testservice_failure_failure_updateentity_action,
	equipment_actions_testservice_failure_navtofailure_create_action : equipment_actions_testservice_failure_navtofailure_create_action,
	equipment_actions_testservice_failure_navtofailure_detail_action : equipment_actions_testservice_failure_navtofailure_detail_action,
	equipment_actions_testservice_failure_navtofailure_edit_action : equipment_actions_testservice_failure_navtofailure_edit_action,
	equipment_actions_testservice_failure_navtofailure_list_action : equipment_actions_testservice_failure_navtofailure_list_action,
	equipment_actions_testservice_items_items_createentity_action : equipment_actions_testservice_items_items_createentity_action,
	equipment_actions_testservice_items_items_deleteentity_action : equipment_actions_testservice_items_items_deleteentity_action,
	equipment_actions_testservice_items_items_updateentity_action : equipment_actions_testservice_items_items_updateentity_action,
	equipment_actions_testservice_items_navtoitems_create_action : equipment_actions_testservice_items_navtoitems_create_action,
	equipment_actions_testservice_items_navtoitems_detail_action : equipment_actions_testservice_items_navtoitems_detail_action,
	equipment_actions_testservice_items_navtoitems_edit_action : equipment_actions_testservice_items_navtoitems_edit_action,
	equipment_actions_testservice_items_navtoitems_list_action : equipment_actions_testservice_items_navtoitems_list_action,
	equipment_actions_testservice_report_navtoreport_create_action : equipment_actions_testservice_report_navtoreport_create_action,
	equipment_actions_testservice_report_navtoreport_detail_action : equipment_actions_testservice_report_navtoreport_detail_action,
	equipment_actions_testservice_report_navtoreport_edit_action : equipment_actions_testservice_report_navtoreport_edit_action,
	equipment_actions_testservice_report_navtoreport_list_action : equipment_actions_testservice_report_navtoreport_list_action,
	equipment_actions_testservice_report_report_createentity_action : equipment_actions_testservice_report_report_createentity_action,
	equipment_actions_testservice_report_report_deleteentity_action : equipment_actions_testservice_report_report_deleteentity_action,
	equipment_actions_testservice_report_report_updateentity_action : equipment_actions_testservice_report_report_updateentity_action,
	equipment_actions_testservice_service_initializeonline_action : equipment_actions_testservice_service_initializeonline_action,
	equipment_actions_testservice_service_initializeonlinefailuremessage_action : equipment_actions_testservice_service_initializeonlinefailuremessage_action,
	equipment_actions_testservice_timereportproy_navtotimereportproy_create_action : equipment_actions_testservice_timereportproy_navtotimereportproy_create_action,
	equipment_actions_testservice_timereportproy_navtotimereportproy_detail_action : equipment_actions_testservice_timereportproy_navtotimereportproy_detail_action,
	equipment_actions_testservice_timereportproy_navtotimereportproy_edit_action : equipment_actions_testservice_timereportproy_navtotimereportproy_edit_action,
	equipment_actions_testservice_timereportproy_navtotimereportproy_list_action : equipment_actions_testservice_timereportproy_navtotimereportproy_list_action,
	equipment_actions_testservice_timereportproy_timereportproy_createentity_action : equipment_actions_testservice_timereportproy_timereportproy_createentity_action,
	equipment_actions_testservice_timereportproy_timereportproy_deleteentity_action : equipment_actions_testservice_timereportproy_timereportproy_deleteentity_action,
	equipment_actions_testservice_timereportproy_timereportproy_updateentity_action : equipment_actions_testservice_timereportproy_timereportproy_updateentity_action,
	equipment_actions_updateentityfailuremessage_action : equipment_actions_updateentityfailuremessage_action,
	equipment_actions_updateentitysuccessmessage_action : equipment_actions_updateentitysuccessmessage_action,
	equipment_globals_application_appdefinition_version_global : equipment_globals_application_appdefinition_version_global,
	equipment_globals_application_applicationname_global : equipment_globals_application_applicationname_global,
	equipment_globals_application_supportemail_global : equipment_globals_application_supportemail_global,
	equipment_globals_application_supportphone_global : equipment_globals_application_supportphone_global,
	equipment_i18n_i18n_properties : equipment_i18n_i18n_properties,
	equipment_jsconfig_json : equipment_jsconfig_json,
	equipment_pages_application_about_page : equipment_pages_application_about_page,
	equipment_pages_application_support_page : equipment_pages_application_support_page,
	equipment_pages_application_useractivitylog_page : equipment_pages_application_useractivitylog_page,
	equipment_pages_main_page : equipment_pages_main_page,
	equipment_pages_testservice_employee_employee_create_page : equipment_pages_testservice_employee_employee_create_page,
	equipment_pages_testservice_employee_employee_detail_page : equipment_pages_testservice_employee_employee_detail_page,
	equipment_pages_testservice_employee_employee_edit_page : equipment_pages_testservice_employee_employee_edit_page,
	equipment_pages_testservice_employee_employee_list_page : equipment_pages_testservice_employee_employee_list_page,
	equipment_pages_testservice_equipment_equipment_create_page : equipment_pages_testservice_equipment_equipment_create_page,
	equipment_pages_testservice_equipment_equipment_detail_page : equipment_pages_testservice_equipment_equipment_detail_page,
	equipment_pages_testservice_equipment_equipment_edit_page : equipment_pages_testservice_equipment_equipment_edit_page,
	equipment_pages_testservice_equipment_equipment_list_page : equipment_pages_testservice_equipment_equipment_list_page,
	equipment_pages_testservice_failure_failure_create_page : equipment_pages_testservice_failure_failure_create_page,
	equipment_pages_testservice_failure_failure_detail_page : equipment_pages_testservice_failure_failure_detail_page,
	equipment_pages_testservice_failure_failure_edit_page : equipment_pages_testservice_failure_failure_edit_page,
	equipment_pages_testservice_failure_failure_list_page : equipment_pages_testservice_failure_failure_list_page,
	equipment_pages_testservice_items_items_create_page : equipment_pages_testservice_items_items_create_page,
	equipment_pages_testservice_items_items_detail_page : equipment_pages_testservice_items_items_detail_page,
	equipment_pages_testservice_items_items_edit_page : equipment_pages_testservice_items_items_edit_page,
	equipment_pages_testservice_items_items_list_page : equipment_pages_testservice_items_items_list_page,
	equipment_pages_testservice_report_report_create_page : equipment_pages_testservice_report_report_create_page,
	equipment_pages_testservice_report_report_detail_page : equipment_pages_testservice_report_report_detail_page,
	equipment_pages_testservice_report_report_edit_page : equipment_pages_testservice_report_report_edit_page,
	equipment_pages_testservice_report_report_list_page : equipment_pages_testservice_report_report_list_page,
	equipment_pages_testservice_timereportproy_timereportproy_create_page : equipment_pages_testservice_timereportproy_timereportproy_create_page,
	equipment_pages_testservice_timereportproy_timereportproy_detail_page : equipment_pages_testservice_timereportproy_timereportproy_detail_page,
	equipment_pages_testservice_timereportproy_timereportproy_edit_page : equipment_pages_testservice_timereportproy_timereportproy_edit_page,
	equipment_pages_testservice_timereportproy_timereportproy_list_page : equipment_pages_testservice_timereportproy_timereportproy_list_page,
	equipment_rules_application_appupdatefailure_js : equipment_rules_application_appupdatefailure_js,
	equipment_rules_application_appupdatesuccess_js : equipment_rules_application_appupdatesuccess_js,
	equipment_rules_application_clientismultiusermode_js : equipment_rules_application_clientismultiusermode_js,
	equipment_rules_application_getclientsupportversions_js : equipment_rules_application_getclientsupportversions_js,
	equipment_rules_application_getclientversion_js : equipment_rules_application_getclientversion_js,
	equipment_rules_application_onwillupdate_js : equipment_rules_application_onwillupdate_js,
	equipment_rules_application_resetappsettingsandlogout_js : equipment_rules_application_resetappsettingsandlogout_js,
	equipment_rules_logging_loglevels_js : equipment_rules_logging_loglevels_js,
	equipment_rules_logging_settracecategories_js : equipment_rules_logging_settracecategories_js,
	equipment_rules_logging_setuserloglevel_js : equipment_rules_logging_setuserloglevel_js,
	equipment_rules_logging_togglelogging_js : equipment_rules_logging_togglelogging_js,
	equipment_rules_logging_tracecategories_js : equipment_rules_logging_tracecategories_js,
	equipment_rules_logging_userlogsetting_js : equipment_rules_logging_userlogsetting_js,
	equipment_rules_service_initialize_js : equipment_rules_service_initialize_js,
	equipment_rules_testservice_employee_employee_cancel_js : equipment_rules_testservice_employee_employee_cancel_js,
	equipment_rules_testservice_employee_employee_createentity_js : equipment_rules_testservice_employee_employee_createentity_js,
	equipment_rules_testservice_employee_employee_deleteconfirmation_js : equipment_rules_testservice_employee_employee_deleteconfirmation_js,
	equipment_rules_testservice_employee_employee_updateentity_js : equipment_rules_testservice_employee_employee_updateentity_js,
	equipment_rules_testservice_employee_navtoemployee_edit_js : equipment_rules_testservice_employee_navtoemployee_edit_js,
	equipment_rules_testservice_equipment_equipment_cancel_js : equipment_rules_testservice_equipment_equipment_cancel_js,
	equipment_rules_testservice_equipment_equipment_createentity_js : equipment_rules_testservice_equipment_equipment_createentity_js,
	equipment_rules_testservice_equipment_equipment_deleteconfirmation_js : equipment_rules_testservice_equipment_equipment_deleteconfirmation_js,
	equipment_rules_testservice_equipment_equipment_updateentity_js : equipment_rules_testservice_equipment_equipment_updateentity_js,
	equipment_rules_testservice_equipment_navtoequipment_edit_js : equipment_rules_testservice_equipment_navtoequipment_edit_js,
	equipment_rules_testservice_failure_failure_cancel_js : equipment_rules_testservice_failure_failure_cancel_js,
	equipment_rules_testservice_failure_failure_createentity_js : equipment_rules_testservice_failure_failure_createentity_js,
	equipment_rules_testservice_failure_failure_deleteconfirmation_js : equipment_rules_testservice_failure_failure_deleteconfirmation_js,
	equipment_rules_testservice_failure_failure_updateentity_js : equipment_rules_testservice_failure_failure_updateentity_js,
	equipment_rules_testservice_failure_navtofailure_edit_js : equipment_rules_testservice_failure_navtofailure_edit_js,
	equipment_rules_testservice_items_items_cancel_js : equipment_rules_testservice_items_items_cancel_js,
	equipment_rules_testservice_items_items_createentity_js : equipment_rules_testservice_items_items_createentity_js,
	equipment_rules_testservice_items_items_deleteconfirmation_js : equipment_rules_testservice_items_items_deleteconfirmation_js,
	equipment_rules_testservice_items_items_updateentity_js : equipment_rules_testservice_items_items_updateentity_js,
	equipment_rules_testservice_items_navtoitems_edit_js : equipment_rules_testservice_items_navtoitems_edit_js,
	equipment_rules_testservice_report_navtoreport_edit_js : equipment_rules_testservice_report_navtoreport_edit_js,
	equipment_rules_testservice_report_report_cancel_js : equipment_rules_testservice_report_report_cancel_js,
	equipment_rules_testservice_report_report_createentity_js : equipment_rules_testservice_report_report_createentity_js,
	equipment_rules_testservice_report_report_deleteconfirmation_js : equipment_rules_testservice_report_report_deleteconfirmation_js,
	equipment_rules_testservice_report_report_updateentity_js : equipment_rules_testservice_report_report_updateentity_js,
	equipment_rules_testservice_timereportproy_navtotimereportproy_edit_js : equipment_rules_testservice_timereportproy_navtotimereportproy_edit_js,
	equipment_rules_testservice_timereportproy_timereportproy_cancel_js : equipment_rules_testservice_timereportproy_timereportproy_cancel_js,
	equipment_rules_testservice_timereportproy_timereportproy_createentity_js : equipment_rules_testservice_timereportproy_timereportproy_createentity_js,
	equipment_rules_testservice_timereportproy_timereportproy_deleteconfirmation_js : equipment_rules_testservice_timereportproy_timereportproy_deleteconfirmation_js,
	equipment_rules_testservice_timereportproy_timereportproy_updateentity_js : equipment_rules_testservice_timereportproy_timereportproy_updateentity_js,
	equipment_services_testservice_service : equipment_services_testservice_service,
	equipment_styles_styles_css : equipment_styles_styles_css,
	equipment_styles_styles_json : equipment_styles_styles_json,
	equipment_styles_styles_less : equipment_styles_styles_less,
	equipment_styles_styles_nss : equipment_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/Equipment/Styles/Styles.css":
/*!*******************************************************!*\
  !*** ./build.definitions/Equipment/Styles/Styles.css ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, "",{"version":3,"sources":["webpack://./build.definitions/Equipment/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Equipment/Styles/Styles.less":
/*!********************************************************!*\
  !*** ./build.definitions/Equipment/Styles/Styles.less ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, "",{"version":3,"sources":["webpack://./build.definitions/Equipment/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Equipment/Styles/Styles.nss":
/*!*******************************************************!*\
  !*** ./build.definitions/Equipment/Styles/Styles.nss ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/Equipment/Pages/Application/About.page":
/*!******************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/Application/About.page ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"/Equipment/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"/Equipment/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true,"_Type":"KeyValue.Type.Item"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/Equipment/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)","_Type":"KeyValue.Type.Item"},{"Value":"/Equipment/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true,"_Type":"KeyValue.Type.Item"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Equipment/Actions/CloseModalPage_Complete.action","_Type":"Control.Type.ActionBarItem"}],"_Name":"ActionBar1","Caption":"About","PrefersLargeCaption":true,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/Application/Support.page":
/*!********************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/Application/Support.page ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/Equipment/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/Equipment/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/Equipment/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/Equipment/Actions/Application/NavToActivityLog.action","_Type":"SimplePropertyCollection.Type.Cell"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Equipment/Actions/CloseModalPage_Complete.action","_Type":"Control.Type.ActionBarItem"}],"_Name":"ActionBar1","Caption":"Settings","PrefersLargeCaption":false,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/Application/UserActivityLog.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/Application/UserActivityLog.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/Equipment/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/Equipment/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/Equipment/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/Equipment/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/Equipment/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/Equipment/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/Equipment/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","ActionBar":{"Caption":"Activity Log","PrefersLargeCaption":false,"_Type":"Control.Type.ActionBar"},"OnLoaded":"/Equipment/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/Main.page":
/*!*****************************************************!*\
  !*** ./build.definitions/Equipment/Pages/Main.page ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[{"Header":{"_Name":"SectionHeader_TestService","AccessoryType":"None","UseTopPadding":true,"Caption":"TestService","_Type":"SectionCommon.Type.Header"},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Buttons":[{"OnPress":"/Equipment/Actions/TestService/employee/NavToemployee_List.action","Alignment":"Center","Title":"employee","ButtonType":"Text","Semantic":"Tint","_Type":"ButtonTable.Type.Button"},{"OnPress":"/Equipment/Actions/TestService/equipment/NavToequipment_List.action","Alignment":"Center","Title":"equipment","ButtonType":"Text","Semantic":"Tint","_Type":"ButtonTable.Type.Button"},{"OnPress":"/Equipment/Actions/TestService/failure/NavTofailure_List.action","Alignment":"Center","Title":"failure","ButtonType":"Text","Semantic":"Tint","_Type":"ButtonTable.Type.Button"},{"OnPress":"/Equipment/Actions/TestService/items/NavToitems_List.action","Alignment":"Center","Title":"items","ButtonType":"Text","Semantic":"Tint","_Type":"ButtonTable.Type.Button"},{"OnPress":"/Equipment/Actions/TestService/report/NavToreport_List.action","Alignment":"Center","Title":"report","ButtonType":"Text","Semantic":"Tint","_Type":"ButtonTable.Type.Button"},{"OnPress":"/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_List.action","Alignment":"Center","Title":"timeReportProy","ButtonType":"Text","Semantic":"Tint","_Type":"ButtonTable.Type.Button"}],"_Name":"SectionButtonTable_TestService","_Type":"Section.Type.ButtonTable"}]}],"_Name":"Main","_Type":"Page","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Equipment/Actions/Application/UserMenuPopover.action","_Type":"Control.Type.ActionBarItem"}],"_Name":"ActionBar1","Caption":"Main","PrefersLargeCaption":true,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_employee/employee_Create.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_employee/employee_Create.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Equipment/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Equipment/Rules/TestService/employee/employee_CreateEntity.js","Position":"Right","SystemItem":"Save","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Create_employee_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"pernr","_Name":"pernr","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"bukrs","_Name":"bukrs","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"werks","_Name":"werks","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"persk","_Name":"persk","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"sname","_Name":"sname","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ename","_Name":"ename","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"puestotrabajo","_Name":"puestotrabajo","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"employee_Create"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_employee/employee_Detail.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_employee/employee_Detail.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Equipment/Services/TestService.service","EntitySet":"employee","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/Equipment/Rules/TestService/employee/NavToemployee_Edit.js","Position":"Right","SystemItem":"Edit","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Equipment/Rules/TestService/employee/employee_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,employee_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{sname}","Subhead":"{pernr}","BodyText":"","Footnote":"{werks}","Description":"{bukrs}","StatusText":"{persk}","StatusImage":"","SubstatusImage":"","SubstatusText":"{ename}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"pernr","Value":"{pernr}","_Type":"KeyValue.Type.Item"},{"KeyName":"bukrs","Value":"{bukrs}","_Type":"KeyValue.Type.Item"},{"KeyName":"werks","Value":"{werks}","_Type":"KeyValue.Type.Item"},{"KeyName":"persk","Value":"{persk}","_Type":"KeyValue.Type.Item"},{"KeyName":"sname","Value":"{sname}","_Type":"KeyValue.Type.Item"},{"KeyName":"ename","Value":"{ename}","_Type":"KeyValue.Type.Item"},{"KeyName":"puestotrabajo","Value":"{puestotrabajo}","_Type":"KeyValue.Type.Item"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"employee_Detail"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_employee/employee_Edit.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_employee/employee_Edit.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Equipment/Services/TestService.service","EntitySet":"employee","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/Equipment/Rules/TestService/employee/employee_Cancel.js","_Type":"Control.Type.ActionBarItem"},{"Position":"Right","SystemItem":"Save","OnPress":"/Equipment/Rules/TestService/employee/employee_UpdateEntity.js","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Update_employee_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"pernr","_Name":"pernr","Value":"{pernr}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"bukrs","_Name":"bukrs","Value":"{bukrs}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"werks","_Name":"werks","Value":"{werks}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"persk","_Name":"persk","Value":"{persk}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"sname","_Name":"sname","Value":"{sname}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ename","_Name":"ename","Value":"{ename}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"puestotrabajo","_Name":"puestotrabajo","Value":"{puestotrabajo}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"employee_Edit"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_employee/employee_List.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_employee/employee_List.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Equipment/Actions/TestService/employee/NavToemployee_Create.action","Position":"Right","SystemItem":"Add","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,employee)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{bukrs}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Equipment/Actions/TestService/employee/NavToemployee_Detail.action","StatusImage":"","Title":"{sname}","Footnote":"{werks}","PreserveIconStackSpacing":false,"StatusText":"{persk}","Subhead":"{pernr}","SubstatusText":"{ename}","_Type":"ObjectTable.Type.ObjectCell"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"employee","Service":"/Equipment/Services/TestService.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"employee_List"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_equipment/equipment_Create.page":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_equipment/equipment_Create.page ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Equipment/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Equipment/Rules/TestService/equipment/equipment_CreateEntity.js","Position":"Right","SystemItem":"Save","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Create_equipment_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"inventoryNumber","_Name":"inventoryNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"assetManufacturerName","_Name":"assetManufacturerName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"manufacturerPartTypeName","_Name":"manufacturerPartTypeName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"functionalLocation","_Name":"functionalLocation","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"equipment","_Name":"equipment","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"technicalObjectType","_Name":"technicalObjectType","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"catalog","_Name":"catalog","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"puestotrabajo","_Name":"puestotrabajo","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"equipment_Create"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_equipment/equipment_Detail.page":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_equipment/equipment_Detail.page ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Equipment/Services/TestService.service","EntitySet":"equipment","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/Equipment/Rules/TestService/equipment/NavToequipment_Edit.js","Position":"Right","SystemItem":"Edit","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Equipment/Rules/TestService/equipment/equipment_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,equipment_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{assetManufacturerName}","Subhead":"{inventoryNumber}","BodyText":"","Footnote":"{functionalLocation}","Description":"{manufacturerPartTypeName}","StatusText":"{equipment}","StatusImage":"","SubstatusImage":"","SubstatusText":"{technicalObjectType}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"inventoryNumber","Value":"{inventoryNumber}","_Type":"KeyValue.Type.Item"},{"KeyName":"assetManufacturerName","Value":"{assetManufacturerName}","_Type":"KeyValue.Type.Item"},{"KeyName":"manufacturerPartTypeName","Value":"{manufacturerPartTypeName}","_Type":"KeyValue.Type.Item"},{"KeyName":"functionalLocation","Value":"{functionalLocation}","_Type":"KeyValue.Type.Item"},{"KeyName":"equipment","Value":"{equipment}","_Type":"KeyValue.Type.Item"},{"KeyName":"technicalObjectType","Value":"{technicalObjectType}","_Type":"KeyValue.Type.Item"},{"KeyName":"catalog","Value":"{catalog}","_Type":"KeyValue.Type.Item"},{"KeyName":"puestotrabajo","Value":"{puestotrabajo}","_Type":"KeyValue.Type.Item"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"equipment_Detail"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_equipment/equipment_Edit.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_equipment/equipment_Edit.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Equipment/Services/TestService.service","EntitySet":"equipment","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/Equipment/Rules/TestService/equipment/equipment_Cancel.js","_Type":"Control.Type.ActionBarItem"},{"Position":"Right","SystemItem":"Save","OnPress":"/Equipment/Rules/TestService/equipment/equipment_UpdateEntity.js","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Update_equipment_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"inventoryNumber","_Name":"inventoryNumber","Value":"{inventoryNumber}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"assetManufacturerName","_Name":"assetManufacturerName","Value":"{assetManufacturerName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"manufacturerPartTypeName","_Name":"manufacturerPartTypeName","Value":"{manufacturerPartTypeName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"functionalLocation","_Name":"functionalLocation","Value":"{functionalLocation}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"equipment","_Name":"equipment","Value":"{equipment}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"technicalObjectType","_Name":"technicalObjectType","Value":"{technicalObjectType}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"catalog","_Name":"catalog","Value":"{catalog}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"puestotrabajo","_Name":"puestotrabajo","Value":"{puestotrabajo}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"equipment_Edit"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_equipment/equipment_List.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_equipment/equipment_List.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Equipment/Actions/TestService/equipment/NavToequipment_Create.action","Position":"Right","SystemItem":"Add","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,equipment)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{manufacturerPartTypeName}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Equipment/Actions/TestService/equipment/NavToequipment_Detail.action","StatusImage":"","Title":"{assetManufacturerName}","Footnote":"{functionalLocation}","PreserveIconStackSpacing":false,"StatusText":"{equipment}","Subhead":"{inventoryNumber}","SubstatusText":"{technicalObjectType}","_Type":"ObjectTable.Type.ObjectCell"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"equipment","Service":"/Equipment/Services/TestService.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"equipment_List"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_failure/failure_Create.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_failure/failure_Create.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Equipment/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Equipment/Rules/TestService/failure/failure_CreateEntity.js","Position":"Right","SystemItem":"Save","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Create_failure_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"fecha","Caption":"fecha","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"comentarios","_Name":"comentarios","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"sistema","_Name":"sistema","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"parte","_Name":"parte","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"falla","_Name":"falla","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"status","Caption":"status","Value":false,"_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"failure_Create"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_failure/failure_Detail.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_failure/failure_Detail.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Equipment/Services/TestService.service","EntitySet":"failure","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/Equipment/Rules/TestService/failure/NavTofailure_Edit.js","Position":"Right","SystemItem":"Edit","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Equipment/Rules/TestService/failure/failure_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,failure_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{fecha}","BodyText":"","Footnote":"{sistema}","Description":"{comentarios}","StatusText":"{parte}","StatusImage":"","SubstatusImage":"","SubstatusText":"{falla}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"fecha","Value":"{fecha}","_Type":"KeyValue.Type.Item"},{"KeyName":"comentarios","Value":"{comentarios}","_Type":"KeyValue.Type.Item"},{"KeyName":"sistema","Value":"{sistema}","_Type":"KeyValue.Type.Item"},{"KeyName":"parte","Value":"{parte}","_Type":"KeyValue.Type.Item"},{"KeyName":"falla","Value":"{falla}","_Type":"KeyValue.Type.Item"},{"KeyName":"status","Value":"{status}","_Type":"KeyValue.Type.Item"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"failure_Detail"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_failure/failure_Edit.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_failure/failure_Edit.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Equipment/Services/TestService.service","EntitySet":"failure","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/Equipment/Rules/TestService/failure/failure_Cancel.js","_Type":"Control.Type.ActionBarItem"},{"Position":"Right","SystemItem":"Save","OnPress":"/Equipment/Rules/TestService/failure/failure_UpdateEntity.js","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Update_failure_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"fecha","Value":"{fecha}","Caption":"fecha","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"comentarios","_Name":"comentarios","Value":"{comentarios}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"sistema","_Name":"sistema","Value":"{sistema}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"parte","_Name":"parte","Value":"{parte}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"falla","_Name":"falla","Value":"{falla}","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"status","Caption":"status","Value":"{status}","_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"failure_Edit"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_failure/failure_List.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_failure/failure_List.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Equipment/Actions/TestService/failure/NavTofailure_Create.action","Position":"Right","SystemItem":"Add","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,failure)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{comentarios}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Equipment/Actions/TestService/failure/NavTofailure_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{sistema}","PreserveIconStackSpacing":false,"StatusText":"{parte}","Subhead":"{fecha}","SubstatusText":"{falla}","_Type":"ObjectTable.Type.ObjectCell"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"failure","Service":"/Equipment/Services/TestService.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"failure_List"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_items/items_Create.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_items/items_Create.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Equipment/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Equipment/Rules/TestService/items/items_CreateEntity.js","Position":"Right","SystemItem":"Save","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Create_items_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"criterio1","_Name":"criterio1","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"criterio2","_Name":"criterio2","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"criterio3","_Name":"criterio3","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"items_Create"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_items/items_Detail.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_items/items_Detail.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Equipment/Services/TestService.service","EntitySet":"items","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/Equipment/Rules/TestService/items/NavToitems_Edit.js","Position":"Right","SystemItem":"Edit","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Equipment/Rules/TestService/items/items_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,items_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{descripcion}","BodyText":"","Footnote":"{criterio2}","Description":"{criterio1}","StatusText":"{criterio3}","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ID","Value":"{ID}","_Type":"KeyValue.Type.Item"},{"KeyName":"descripcion","Value":"{descripcion}","_Type":"KeyValue.Type.Item"},{"KeyName":"criterio1","Value":"{criterio1}","_Type":"KeyValue.Type.Item"},{"KeyName":"criterio2","Value":"{criterio2}","_Type":"KeyValue.Type.Item"},{"KeyName":"criterio3","Value":"{criterio3}","_Type":"KeyValue.Type.Item"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"items_Detail"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_items/items_Edit.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_items/items_Edit.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Equipment/Services/TestService.service","EntitySet":"items","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/Equipment/Rules/TestService/items/items_Cancel.js","_Type":"Control.Type.ActionBarItem"},{"Position":"Right","SystemItem":"Save","OnPress":"/Equipment/Rules/TestService/items/items_UpdateEntity.js","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Update_items_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","Value":"{ID}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"descripcion","_Name":"descripcion","Value":"{descripcion}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"criterio1","_Name":"criterio1","Value":"{criterio1}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"criterio2","_Name":"criterio2","Value":"{criterio2}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"criterio3","_Name":"criterio3","Value":"{criterio3}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"items_Edit"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_items/items_List.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_items/items_List.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Equipment/Actions/TestService/items/NavToitems_Create.action","Position":"Right","SystemItem":"Add","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,items)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{criterio1}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Equipment/Actions/TestService/items/NavToitems_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{criterio2}","PreserveIconStackSpacing":false,"StatusText":"{criterio3}","Subhead":"{descripcion}","SubstatusText":"","_Type":"ObjectTable.Type.ObjectCell"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"items","Service":"/Equipment/Services/TestService.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"items_List"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_report/report_Create.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_report/report_Create.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Equipment/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Equipment/Rules/TestService/report/report_CreateEntity.js","Position":"Right","SystemItem":"Save","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Create_report_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"fecha","Caption":"fecha","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"kilometraje_Horometro","KeyboardType":"Number","_Name":"kilometraje_Horometro","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ubicacion","_Name":"ubicacion","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"aceite_y_combustible","_Name":"aceite_y_combustible","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"liquido_refrigerante","_Name":"liquido_refrigerante","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"nivel_agua","_Name":"nivel_agua","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"liquido_frenos","_Name":"liquido_frenos","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"tapa_radiador_tanque","_Name":"tapa_radiador_tanque","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Cables_correas_mangueras","_Name":"Cables_correas_mangueras","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Bateria_cables_bornes","_Name":"Bateria_cables_bornes","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"suspencion_gatos_muelles_anclajes","_Name":"suspencion_gatos_muelles_anclajes","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"luces_bajas","_Name":"luces_bajas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"luces_altas","_Name":"luces_altas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"luces_internas","_Name":"luces_internas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"direccionales_frente","_Name":"direccionales_frente","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"direccionales_atras","_Name":"direccionales_atras","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"faros_freno","_Name":"faros_freno","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"faros_exploradoras","_Name":"faros_exploradoras","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"luces_parqueo","_Name":"luces_parqueo","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"extintor","_Name":"extintor","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"gato_cruceta_copa_perno","_Name":"gato_cruceta_copa_perno","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"linterna_lamparas","_Name":"linterna_lamparas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"kit_herramientas_completa","_Name":"kit_herramientas_completa","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"kit_derrames_completo","_Name":"kit_derrames_completo","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"cables_arranque","_Name":"cables_arranque","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"senalizacion","_Name":"senalizacion","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"estado_llantas_rines","_Name":"estado_llantas_rines","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"llantas_repuesto_fijas","_Name":"llantas_repuesto_fijas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"labrado_llantas","_Name":"labrado_llantas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"espejos_laterales","_Name":"espejos_laterales","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"parabrisas_escobillas","_Name":"parabrisas_escobillas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"puertas_ventanas","_Name":"puertas_ventanas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"latoneria_pintura","_Name":"latoneria_pintura","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"vidrios","_Name":"vidrios","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"inyectores_agua_parabrisas","_Name":"inyectores_agua_parabrisas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"antena_gps_otros","_Name":"antena_gps_otros","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"identificacion_carga","_Name":"identificacion_carga","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"aire_acondicionado","_Name":"aire_acondicionado","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"asientos_apoya_cabezas_tapiceria","_Name":"asientos_apoya_cabezas_tapiceria","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"elevavidrios_manivelas","_Name":"elevavidrios_manivelas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"cinturones_seguridad","_Name":"cinturones_seguridad","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"puertas","_Name":"puertas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"bocina_pito","_Name":"bocina_pito","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"alarma_retroceso","_Name":"alarma_retroceso","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"botiquin","_Name":"botiquin","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"asa","_Name":"asa","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"placas","_Name":"placas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"cuerpo","_Name":"cuerpo","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"quijadas_laterales","_Name":"quijadas_laterales","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"alineamiento","_Name":"alineamiento","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"mantenimiento","_Name":"mantenimiento","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"comentarios","_Name":"comentarios","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"status","Caption":"status","Value":false,"_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"report_Create"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_report/report_Detail.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_report/report_Detail.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Equipment/Services/TestService.service","EntitySet":"report","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/Equipment/Rules/TestService/report/NavToreport_Edit.js","Position":"Right","SystemItem":"Edit","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Equipment/Rules/TestService/report/report_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,report_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{fecha}","BodyText":"","Footnote":"{ubicacion}","Description":"{kilometraje_Horometro}","StatusText":"{aceite_y_combustible}","StatusImage":"","SubstatusImage":"","SubstatusText":"{liquido_refrigerante}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"fecha","Value":"{fecha}","_Type":"KeyValue.Type.Item"},{"KeyName":"kilometraje_Horometro","Value":"{kilometraje_Horometro}","_Type":"KeyValue.Type.Item"},{"KeyName":"ubicacion","Value":"{ubicacion}","_Type":"KeyValue.Type.Item"},{"KeyName":"aceite_y_combustible","Value":"{aceite_y_combustible}","_Type":"KeyValue.Type.Item"},{"KeyName":"liquido_refrigerante","Value":"{liquido_refrigerante}","_Type":"KeyValue.Type.Item"},{"KeyName":"nivel_agua","Value":"{nivel_agua}","_Type":"KeyValue.Type.Item"},{"KeyName":"liquido_frenos","Value":"{liquido_frenos}","_Type":"KeyValue.Type.Item"},{"KeyName":"tapa_radiador_tanque","Value":"{tapa_radiador_tanque}","_Type":"KeyValue.Type.Item"},{"KeyName":"Cables_correas_mangueras","Value":"{Cables_correas_mangueras}","_Type":"KeyValue.Type.Item"},{"KeyName":"Bateria_cables_bornes","Value":"{Bateria_cables_bornes}","_Type":"KeyValue.Type.Item"},{"KeyName":"suspencion_gatos_muelles_anclajes","Value":"{suspencion_gatos_muelles_anclajes}","_Type":"KeyValue.Type.Item"},{"KeyName":"luces_bajas","Value":"{luces_bajas}","_Type":"KeyValue.Type.Item"},{"KeyName":"luces_altas","Value":"{luces_altas}","_Type":"KeyValue.Type.Item"},{"KeyName":"luces_internas","Value":"{luces_internas}","_Type":"KeyValue.Type.Item"},{"KeyName":"direccionales_frente","Value":"{direccionales_frente}","_Type":"KeyValue.Type.Item"},{"KeyName":"direccionales_atras","Value":"{direccionales_atras}","_Type":"KeyValue.Type.Item"},{"KeyName":"faros_freno","Value":"{faros_freno}","_Type":"KeyValue.Type.Item"},{"KeyName":"faros_exploradoras","Value":"{faros_exploradoras}","_Type":"KeyValue.Type.Item"},{"KeyName":"luces_parqueo","Value":"{luces_parqueo}","_Type":"KeyValue.Type.Item"},{"KeyName":"extintor","Value":"{extintor}","_Type":"KeyValue.Type.Item"},{"KeyName":"gato_cruceta_copa_perno","Value":"{gato_cruceta_copa_perno}","_Type":"KeyValue.Type.Item"},{"KeyName":"linterna_lamparas","Value":"{linterna_lamparas}","_Type":"KeyValue.Type.Item"},{"KeyName":"kit_herramientas_completa","Value":"{kit_herramientas_completa}","_Type":"KeyValue.Type.Item"},{"KeyName":"kit_derrames_completo","Value":"{kit_derrames_completo}","_Type":"KeyValue.Type.Item"},{"KeyName":"cables_arranque","Value":"{cables_arranque}","_Type":"KeyValue.Type.Item"},{"KeyName":"senalizacion","Value":"{senalizacion}","_Type":"KeyValue.Type.Item"},{"KeyName":"estado_llantas_rines","Value":"{estado_llantas_rines}","_Type":"KeyValue.Type.Item"},{"KeyName":"llantas_repuesto_fijas","Value":"{llantas_repuesto_fijas}","_Type":"KeyValue.Type.Item"},{"KeyName":"labrado_llantas","Value":"{labrado_llantas}","_Type":"KeyValue.Type.Item"},{"KeyName":"espejos_laterales","Value":"{espejos_laterales}","_Type":"KeyValue.Type.Item"},{"KeyName":"parabrisas_escobillas","Value":"{parabrisas_escobillas}","_Type":"KeyValue.Type.Item"},{"KeyName":"puertas_ventanas","Value":"{puertas_ventanas}","_Type":"KeyValue.Type.Item"},{"KeyName":"latoneria_pintura","Value":"{latoneria_pintura}","_Type":"KeyValue.Type.Item"},{"KeyName":"vidrios","Value":"{vidrios}","_Type":"KeyValue.Type.Item"},{"KeyName":"inyectores_agua_parabrisas","Value":"{inyectores_agua_parabrisas}","_Type":"KeyValue.Type.Item"},{"KeyName":"antena_gps_otros","Value":"{antena_gps_otros}","_Type":"KeyValue.Type.Item"},{"KeyName":"identificacion_carga","Value":"{identificacion_carga}","_Type":"KeyValue.Type.Item"},{"KeyName":"aire_acondicionado","Value":"{aire_acondicionado}","_Type":"KeyValue.Type.Item"},{"KeyName":"asientos_apoya_cabezas_tapiceria","Value":"{asientos_apoya_cabezas_tapiceria}","_Type":"KeyValue.Type.Item"},{"KeyName":"elevavidrios_manivelas","Value":"{elevavidrios_manivelas}","_Type":"KeyValue.Type.Item"},{"KeyName":"cinturones_seguridad","Value":"{cinturones_seguridad}","_Type":"KeyValue.Type.Item"},{"KeyName":"puertas","Value":"{puertas}","_Type":"KeyValue.Type.Item"},{"KeyName":"bocina_pito","Value":"{bocina_pito}","_Type":"KeyValue.Type.Item"},{"KeyName":"alarma_retroceso","Value":"{alarma_retroceso}","_Type":"KeyValue.Type.Item"},{"KeyName":"botiquin","Value":"{botiquin}","_Type":"KeyValue.Type.Item"},{"KeyName":"asa","Value":"{asa}","_Type":"KeyValue.Type.Item"},{"KeyName":"placas","Value":"{placas}","_Type":"KeyValue.Type.Item"},{"KeyName":"cuerpo","Value":"{cuerpo}","_Type":"KeyValue.Type.Item"},{"KeyName":"quijadas_laterales","Value":"{quijadas_laterales}","_Type":"KeyValue.Type.Item"},{"KeyName":"alineamiento","Value":"{alineamiento}","_Type":"KeyValue.Type.Item"},{"KeyName":"mantenimiento","Value":"{mantenimiento}","_Type":"KeyValue.Type.Item"},{"KeyName":"comentarios","Value":"{comentarios}","_Type":"KeyValue.Type.Item"},{"KeyName":"status","Value":"{status}","_Type":"KeyValue.Type.Item"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"report_Detail"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_report/report_Edit.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_report/report_Edit.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Equipment/Services/TestService.service","EntitySet":"report","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/Equipment/Rules/TestService/report/report_Cancel.js","_Type":"Control.Type.ActionBarItem"},{"Position":"Right","SystemItem":"Save","OnPress":"/Equipment/Rules/TestService/report/report_UpdateEntity.js","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Update_report_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"fecha","Value":"{fecha}","Caption":"fecha","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"kilometraje_Horometro","_Name":"kilometraje_Horometro","Value":"{kilometraje_Horometro}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ubicacion","_Name":"ubicacion","Value":"{ubicacion}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"aceite_y_combustible","_Name":"aceite_y_combustible","Value":"{aceite_y_combustible}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"liquido_refrigerante","_Name":"liquido_refrigerante","Value":"{liquido_refrigerante}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"nivel_agua","_Name":"nivel_agua","Value":"{nivel_agua}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"liquido_frenos","_Name":"liquido_frenos","Value":"{liquido_frenos}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"tapa_radiador_tanque","_Name":"tapa_radiador_tanque","Value":"{tapa_radiador_tanque}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Cables_correas_mangueras","_Name":"Cables_correas_mangueras","Value":"{Cables_correas_mangueras}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Bateria_cables_bornes","_Name":"Bateria_cables_bornes","Value":"{Bateria_cables_bornes}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"suspencion_gatos_muelles_anclajes","_Name":"suspencion_gatos_muelles_anclajes","Value":"{suspencion_gatos_muelles_anclajes}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"luces_bajas","_Name":"luces_bajas","Value":"{luces_bajas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"luces_altas","_Name":"luces_altas","Value":"{luces_altas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"luces_internas","_Name":"luces_internas","Value":"{luces_internas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"direccionales_frente","_Name":"direccionales_frente","Value":"{direccionales_frente}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"direccionales_atras","_Name":"direccionales_atras","Value":"{direccionales_atras}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"faros_freno","_Name":"faros_freno","Value":"{faros_freno}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"faros_exploradoras","_Name":"faros_exploradoras","Value":"{faros_exploradoras}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"luces_parqueo","_Name":"luces_parqueo","Value":"{luces_parqueo}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"extintor","_Name":"extintor","Value":"{extintor}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"gato_cruceta_copa_perno","_Name":"gato_cruceta_copa_perno","Value":"{gato_cruceta_copa_perno}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"linterna_lamparas","_Name":"linterna_lamparas","Value":"{linterna_lamparas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"kit_herramientas_completa","_Name":"kit_herramientas_completa","Value":"{kit_herramientas_completa}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"kit_derrames_completo","_Name":"kit_derrames_completo","Value":"{kit_derrames_completo}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"cables_arranque","_Name":"cables_arranque","Value":"{cables_arranque}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"senalizacion","_Name":"senalizacion","Value":"{senalizacion}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"estado_llantas_rines","_Name":"estado_llantas_rines","Value":"{estado_llantas_rines}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"llantas_repuesto_fijas","_Name":"llantas_repuesto_fijas","Value":"{llantas_repuesto_fijas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"labrado_llantas","_Name":"labrado_llantas","Value":"{labrado_llantas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"espejos_laterales","_Name":"espejos_laterales","Value":"{espejos_laterales}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"parabrisas_escobillas","_Name":"parabrisas_escobillas","Value":"{parabrisas_escobillas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"puertas_ventanas","_Name":"puertas_ventanas","Value":"{puertas_ventanas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"latoneria_pintura","_Name":"latoneria_pintura","Value":"{latoneria_pintura}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"vidrios","_Name":"vidrios","Value":"{vidrios}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"inyectores_agua_parabrisas","_Name":"inyectores_agua_parabrisas","Value":"{inyectores_agua_parabrisas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"antena_gps_otros","_Name":"antena_gps_otros","Value":"{antena_gps_otros}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"identificacion_carga","_Name":"identificacion_carga","Value":"{identificacion_carga}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"aire_acondicionado","_Name":"aire_acondicionado","Value":"{aire_acondicionado}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"asientos_apoya_cabezas_tapiceria","_Name":"asientos_apoya_cabezas_tapiceria","Value":"{asientos_apoya_cabezas_tapiceria}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"elevavidrios_manivelas","_Name":"elevavidrios_manivelas","Value":"{elevavidrios_manivelas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"cinturones_seguridad","_Name":"cinturones_seguridad","Value":"{cinturones_seguridad}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"puertas","_Name":"puertas","Value":"{puertas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"bocina_pito","_Name":"bocina_pito","Value":"{bocina_pito}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"alarma_retroceso","_Name":"alarma_retroceso","Value":"{alarma_retroceso}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"botiquin","_Name":"botiquin","Value":"{botiquin}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"asa","_Name":"asa","Value":"{asa}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"placas","_Name":"placas","Value":"{placas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"cuerpo","_Name":"cuerpo","Value":"{cuerpo}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"quijadas_laterales","_Name":"quijadas_laterales","Value":"{quijadas_laterales}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"alineamiento","_Name":"alineamiento","Value":"{alineamiento}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"mantenimiento","_Name":"mantenimiento","Value":"{mantenimiento}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"comentarios","_Name":"comentarios","Value":"{comentarios}","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"status","Caption":"status","Value":"{status}","_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"report_Edit"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_report/report_List.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_report/report_List.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Equipment/Actions/TestService/report/NavToreport_Create.action","Position":"Right","SystemItem":"Add","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,report)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{kilometraje_Horometro}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Equipment/Actions/TestService/report/NavToreport_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{ubicacion}","PreserveIconStackSpacing":false,"StatusText":"{aceite_y_combustible}","Subhead":"{fecha}","SubstatusText":"{liquido_refrigerante}","_Type":"ObjectTable.Type.ObjectCell"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"report","Service":"/Equipment/Services/TestService.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"report_List"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_timeReportProy/timeReportProy_Create.page":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_timeReportProy/timeReportProy_Create.page ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Equipment/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Equipment/Rules/TestService/timeReportProy/timeReportProy_CreateEntity.js","Position":"Right","SystemItem":"Save","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Create_timeReportProy_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Date","_Name":"date","Caption":"date","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"initialTime","_Name":"initialTime","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"finalTime","_Name":"finalTime","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"personas","_Name":"personas","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"equipos","_Name":"equipos","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"comments","_Name":"comments","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Tiempo","_Name":"Tiempo","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"image","_Name":"image","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"IsFinalConfirmation","Caption":"IsFinalConfirmation","Value":false,"_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"timeReportProy_Create"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_timeReportProy/timeReportProy_Detail.page":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_timeReportProy/timeReportProy_Detail.page ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Equipment/Services/TestService.service","EntitySet":"timeReportProy","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/Equipment/Rules/TestService/timeReportProy/NavTotimeReportProy_Edit.js","Position":"Right","SystemItem":"Edit","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Equipment/Rules/TestService/timeReportProy/timeReportProy_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,timeReportProy_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{date}","BodyText":"","Footnote":"{finalTime}","Description":"{initialTime}","StatusText":"{personas}","StatusImage":"","SubstatusImage":"","SubstatusText":"{equipos}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"date","Value":"{date}","_Type":"KeyValue.Type.Item"},{"KeyName":"initialTime","Value":"{initialTime}","_Type":"KeyValue.Type.Item"},{"KeyName":"finalTime","Value":"{finalTime}","_Type":"KeyValue.Type.Item"},{"KeyName":"personas","Value":"{personas}","_Type":"KeyValue.Type.Item"},{"KeyName":"equipos","Value":"{equipos}","_Type":"KeyValue.Type.Item"},{"KeyName":"comments","Value":"{comments}","_Type":"KeyValue.Type.Item"},{"KeyName":"Tiempo","Value":"{Tiempo}","_Type":"KeyValue.Type.Item"},{"KeyName":"image","Value":"{image}","_Type":"KeyValue.Type.Item"},{"KeyName":"IsFinalConfirmation","Value":"{IsFinalConfirmation}","_Type":"KeyValue.Type.Item"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"timeReportProy_Detail"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_timeReportProy/timeReportProy_Edit.page":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_timeReportProy/timeReportProy_Edit.page ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Equipment/Services/TestService.service","EntitySet":"timeReportProy","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/Equipment/Rules/TestService/timeReportProy/timeReportProy_Cancel.js","_Type":"Control.Type.ActionBarItem"},{"Position":"Right","SystemItem":"Save","OnPress":"/Equipment/Rules/TestService/timeReportProy/timeReportProy_UpdateEntity.js","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Update_timeReportProy_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Date","_Name":"date","Value":"{date}","Caption":"date","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"initialTime","_Name":"initialTime","Value":"{initialTime}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"finalTime","_Name":"finalTime","Value":"{finalTime}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"personas","_Name":"personas","Value":"{personas}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"equipos","_Name":"equipos","Value":"{equipos}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"comments","_Name":"comments","Value":"{comments}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Tiempo","_Name":"Tiempo","Value":"{Tiempo}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"image","_Name":"image","Value":"{image}","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"IsFinalConfirmation","Caption":"IsFinalConfirmation","Value":"{IsFinalConfirmation}","_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"timeReportProy_Edit"}

/***/ }),

/***/ "./build.definitions/Equipment/Pages/TestService_timeReportProy/timeReportProy_List.page":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Pages/TestService_timeReportProy/timeReportProy_List.page ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Create.action","Position":"Right","SystemItem":"Add","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,timeReportProy)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{initialTime}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{finalTime}","PreserveIconStackSpacing":false,"StatusText":"{personas}","Subhead":"{date}","SubstatusText":"{equipos}","_Type":"ObjectTable.Type.ObjectCell"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"timeReportProy","Service":"/Equipment/Services/TestService.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"timeReportProy_List"}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"Equipment","Version":"/Equipment/Globals/Application/AppDefinition_Version.global","MainPage":"/Equipment/Pages/Main.page","OnLaunch":"/Equipment/Rules/Service/Initialize.js","OnWillUpdate":"/Equipment/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/Equipment/Rules/Service/Initialize.js","Styles":"/Equipment/Styles/Styles.less","Localization":"/Equipment/i18n/i18n.properties","_SchemaVersion":"5.2","StyleSheets":{"Styles":{"css":"/Equipment/Styles/Styles.css","ios":"/Equipment/Styles/Styles.nss","android":"/Equipment/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Application/AppUpdate.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Application/AppUpdate.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/Equipment/Rules/Application/AppUpdateFailure.js","OnSuccess":"/Equipment/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Application/AppUpdateFailureMessage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Application/AppUpdateFailureMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Application/AppUpdateProgressBanner.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Application/AppUpdateProgressBanner.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/Equipment/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Application/AppUpdateSuccessMessage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Application/AppUpdateSuccessMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Application/Logout.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Application/Logout.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Application/NavToAbout.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Application/NavToAbout.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/Equipment/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Application/NavToActivityLog.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Application/NavToActivityLog.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/Equipment/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Application/NavToSupport.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Application/NavToSupport.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/Equipment/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Application/OnWillUpdate.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Application/OnWillUpdate.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Application/Reset.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Application/Reset.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Application/ResetMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Application/ResetMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/Equipment/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Application/UserMenuPopover.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Application/UserMenuPopover.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/Equipment/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/Equipment/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/Equipment/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/Equipment/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/Equipment/Actions/Application/Logout.action","Title":"Logout","Visible":"/Equipment/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/CloseModalPage_Cancel.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/CloseModalPage_Cancel.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/CloseModalPage_Complete.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/CloseModalPage_Complete.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/ClosePage.action":
/*!**************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/ClosePage.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/CreateEntityFailureMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/CreateEntityFailureMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/CreateEntitySuccessMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/CreateEntitySuccessMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/Equipment/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/DeleteConfirmation.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/DeleteConfirmation.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/DeleteEntityFailureMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/DeleteEntityFailureMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/DeleteEntitySuccessMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/DeleteEntitySuccessMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/Equipment/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/DraftDiscardEntity.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/DraftDiscardEntity.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Discard","Target":{"Service":"/Equipment/Services/TestService.service","EntitySet":"employee","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/Equipment/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Discarded"}},"OnFailure":"/Equipment/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/DraftEditEntity.action":
/*!********************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/DraftEditEntity.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Edit","Target":{"Service":"/Equipment/Services/TestService.service","EntitySet":"employee","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/Equipment/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Edit"}},"OnFailure":"/Equipment/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/DraftSaveEntity.action":
/*!********************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/DraftSaveEntity.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Save","Target":{"Service":"/Equipment/Services/TestService.service","EntitySet":"employee","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/Equipment/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Saved"}},"OnFailure":"/Equipment/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/GenericBannerMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/GenericBannerMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/GenericMessageBox.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/GenericMessageBox.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/GenericNavigation.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/GenericNavigation.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/Equipment/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/GenericToastMessage.action":
/*!************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/GenericToastMessage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Logging/LogUploadFailure.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Logging/LogUploadFailure.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Logging/LogUploadSuccessful.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Logging/LogUploadSuccessful.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Logging/UploadLog.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Logging/UploadLog.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/Equipment/Actions/Logging/LogUploadFailure.action","OnSuccess":"/Equipment/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/Logging/UploadLogProgress.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/Logging/UploadLogProgress.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/Equipment/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/Service/InitializeOnline.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/Service/InitializeOnline.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/Equipment/Services/TestService.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnFailure":"/Equipment/Actions/TestService/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/Service/InitializeOnlineFailureMessage.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/Service/InitializeOnlineFailureMessage.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/employee/NavToemployee_Create.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/employee/NavToemployee_Create.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Equipment/Pages/TestService_employee/employee_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/employee/NavToemployee_Detail.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/employee/NavToemployee_Detail.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Equipment/Pages/TestService_employee/employee_Detail.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/employee/NavToemployee_Edit.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/employee/NavToemployee_Edit.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Equipment/Pages/TestService_employee/employee_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/employee/NavToemployee_List.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/employee/NavToemployee_List.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Equipment/Pages/TestService_employee/employee_List.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/employee/employee_CreateEntity.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/employee/employee_CreateEntity.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/Equipment/Actions/CreateEntityFailureMessage.action","OnSuccess":"/Equipment/Actions/CreateEntitySuccessMessage.action","Properties":{"pernr":"#Control:pernr/#Value","bukrs":"#Control:bukrs/#Value","werks":"#Control:werks/#Value","persk":"#Control:persk/#Value","sname":"#Control:sname/#Value","ename":"#Control:ename/#Value","puestotrabajo":"#Control:puestotrabajo/#Value"},"Target":{"EntitySet":"employee","Service":"/Equipment/Services/TestService.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/employee/employee_DeleteEntity.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/employee/employee_DeleteEntity.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"employee","Service":"/Equipment/Services/TestService.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/Equipment/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/Equipment/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/employee/employee_UpdateEntity.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/employee/employee_UpdateEntity.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"employee","Service":"/Equipment/Services/TestService.service","ReadLink":"{@odata.readLink}"},"Properties":{"pernr":"#Control:pernr/#Value","bukrs":"#Control:bukrs/#Value","werks":"#Control:werks/#Value","persk":"#Control:persk/#Value","sname":"#Control:sname/#Value","ename":"#Control:ename/#Value","puestotrabajo":"#Control:puestotrabajo/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/Equipment/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/Equipment/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/equipment/NavToequipment_Create.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/equipment/NavToequipment_Create.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Equipment/Pages/TestService_equipment/equipment_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/equipment/NavToequipment_Detail.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/equipment/NavToequipment_Detail.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Equipment/Pages/TestService_equipment/equipment_Detail.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/equipment/NavToequipment_Edit.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/equipment/NavToequipment_Edit.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Equipment/Pages/TestService_equipment/equipment_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/equipment/NavToequipment_List.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/equipment/NavToequipment_List.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Equipment/Pages/TestService_equipment/equipment_List.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/equipment/equipment_CreateEntity.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/equipment/equipment_CreateEntity.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/Equipment/Actions/CreateEntityFailureMessage.action","OnSuccess":"/Equipment/Actions/CreateEntitySuccessMessage.action","Properties":{"inventoryNumber":"#Control:inventoryNumber/#Value","assetManufacturerName":"#Control:assetManufacturerName/#Value","manufacturerPartTypeName":"#Control:manufacturerPartTypeName/#Value","functionalLocation":"#Control:functionalLocation/#Value","equipment":"#Control:equipment/#Value","technicalObjectType":"#Control:technicalObjectType/#Value","catalog":"#Control:catalog/#Value","puestotrabajo":"#Control:puestotrabajo/#Value"},"Target":{"EntitySet":"equipment","Service":"/Equipment/Services/TestService.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/equipment/equipment_DeleteEntity.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/equipment/equipment_DeleteEntity.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"equipment","Service":"/Equipment/Services/TestService.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/Equipment/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/Equipment/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/equipment/equipment_UpdateEntity.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/equipment/equipment_UpdateEntity.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"equipment","Service":"/Equipment/Services/TestService.service","ReadLink":"{@odata.readLink}"},"Properties":{"inventoryNumber":"#Control:inventoryNumber/#Value","assetManufacturerName":"#Control:assetManufacturerName/#Value","manufacturerPartTypeName":"#Control:manufacturerPartTypeName/#Value","functionalLocation":"#Control:functionalLocation/#Value","equipment":"#Control:equipment/#Value","technicalObjectType":"#Control:technicalObjectType/#Value","catalog":"#Control:catalog/#Value","puestotrabajo":"#Control:puestotrabajo/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/Equipment/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/Equipment/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/failure/NavTofailure_Create.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/failure/NavTofailure_Create.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Equipment/Pages/TestService_failure/failure_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/failure/NavTofailure_Detail.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/failure/NavTofailure_Detail.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Equipment/Pages/TestService_failure/failure_Detail.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/failure/NavTofailure_Edit.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/failure/NavTofailure_Edit.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Equipment/Pages/TestService_failure/failure_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/failure/NavTofailure_List.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/failure/NavTofailure_List.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Equipment/Pages/TestService_failure/failure_List.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/failure/failure_CreateEntity.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/failure/failure_CreateEntity.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/Equipment/Actions/CreateEntityFailureMessage.action","OnSuccess":"/Equipment/Actions/CreateEntitySuccessMessage.action","Properties":{"fecha":"#Control:fecha/#Value","comentarios":"#Control:comentarios/#Value","sistema":"#Control:sistema/#Value","parte":"#Control:parte/#Value","falla":"#Control:falla/#Value","status":"#Control:status/#Value"},"Target":{"EntitySet":"failure","Service":"/Equipment/Services/TestService.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/failure/failure_DeleteEntity.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/failure/failure_DeleteEntity.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"failure","Service":"/Equipment/Services/TestService.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/Equipment/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/Equipment/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/failure/failure_UpdateEntity.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/failure/failure_UpdateEntity.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"failure","Service":"/Equipment/Services/TestService.service","ReadLink":"{@odata.readLink}"},"Properties":{"fecha":"#Control:fecha/#Value","comentarios":"#Control:comentarios/#Value","sistema":"#Control:sistema/#Value","parte":"#Control:parte/#Value","falla":"#Control:falla/#Value","status":"#Control:status/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/Equipment/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/Equipment/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/items/NavToitems_Create.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/items/NavToitems_Create.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Equipment/Pages/TestService_items/items_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/items/NavToitems_Detail.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/items/NavToitems_Detail.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Equipment/Pages/TestService_items/items_Detail.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/items/NavToitems_Edit.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/items/NavToitems_Edit.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Equipment/Pages/TestService_items/items_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/items/NavToitems_List.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/items/NavToitems_List.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Equipment/Pages/TestService_items/items_List.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/items/items_CreateEntity.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/items/items_CreateEntity.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/Equipment/Actions/CreateEntityFailureMessage.action","OnSuccess":"/Equipment/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","descripcion":"#Control:descripcion/#Value","criterio1":"#Control:criterio1/#Value","criterio2":"#Control:criterio2/#Value","criterio3":"#Control:criterio3/#Value"},"Target":{"EntitySet":"items","Service":"/Equipment/Services/TestService.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/items/items_DeleteEntity.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/items/items_DeleteEntity.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"items","Service":"/Equipment/Services/TestService.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/Equipment/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/Equipment/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/items/items_UpdateEntity.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/items/items_UpdateEntity.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"items","Service":"/Equipment/Services/TestService.service","ReadLink":"{@odata.readLink}"},"Properties":{"ID":"#Control:ID/#Value","descripcion":"#Control:descripcion/#Value","criterio1":"#Control:criterio1/#Value","criterio2":"#Control:criterio2/#Value","criterio3":"#Control:criterio3/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/Equipment/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/Equipment/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/report/NavToreport_Create.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/report/NavToreport_Create.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Equipment/Pages/TestService_report/report_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/report/NavToreport_Detail.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/report/NavToreport_Detail.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Equipment/Pages/TestService_report/report_Detail.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/report/NavToreport_Edit.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/report/NavToreport_Edit.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Equipment/Pages/TestService_report/report_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/report/NavToreport_List.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/report/NavToreport_List.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Equipment/Pages/TestService_report/report_List.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/report/report_CreateEntity.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/report/report_CreateEntity.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/Equipment/Actions/CreateEntityFailureMessage.action","OnSuccess":"/Equipment/Actions/CreateEntitySuccessMessage.action","Properties":{"fecha":"#Control:fecha/#Value","kilometraje_Horometro":"#Control:kilometraje_Horometro/#Value","ubicacion":"#Control:ubicacion/#Value","aceite_y_combustible":"#Control:aceite_y_combustible/#Value","liquido_refrigerante":"#Control:liquido_refrigerante/#Value","nivel_agua":"#Control:nivel_agua/#Value","liquido_frenos":"#Control:liquido_frenos/#Value","tapa_radiador_tanque":"#Control:tapa_radiador_tanque/#Value","Cables_correas_mangueras":"#Control:Cables_correas_mangueras/#Value","Bateria_cables_bornes":"#Control:Bateria_cables_bornes/#Value","suspencion_gatos_muelles_anclajes":"#Control:suspencion_gatos_muelles_anclajes/#Value","luces_bajas":"#Control:luces_bajas/#Value","luces_altas":"#Control:luces_altas/#Value","luces_internas":"#Control:luces_internas/#Value","direccionales_frente":"#Control:direccionales_frente/#Value","direccionales_atras":"#Control:direccionales_atras/#Value","faros_freno":"#Control:faros_freno/#Value","faros_exploradoras":"#Control:faros_exploradoras/#Value","luces_parqueo":"#Control:luces_parqueo/#Value","extintor":"#Control:extintor/#Value","gato_cruceta_copa_perno":"#Control:gato_cruceta_copa_perno/#Value","linterna_lamparas":"#Control:linterna_lamparas/#Value","kit_herramientas_completa":"#Control:kit_herramientas_completa/#Value","kit_derrames_completo":"#Control:kit_derrames_completo/#Value","cables_arranque":"#Control:cables_arranque/#Value","senalizacion":"#Control:senalizacion/#Value","estado_llantas_rines":"#Control:estado_llantas_rines/#Value","llantas_repuesto_fijas":"#Control:llantas_repuesto_fijas/#Value","labrado_llantas":"#Control:labrado_llantas/#Value","espejos_laterales":"#Control:espejos_laterales/#Value","parabrisas_escobillas":"#Control:parabrisas_escobillas/#Value","puertas_ventanas":"#Control:puertas_ventanas/#Value","latoneria_pintura":"#Control:latoneria_pintura/#Value","vidrios":"#Control:vidrios/#Value","inyectores_agua_parabrisas":"#Control:inyectores_agua_parabrisas/#Value","antena_gps_otros":"#Control:antena_gps_otros/#Value","identificacion_carga":"#Control:identificacion_carga/#Value","aire_acondicionado":"#Control:aire_acondicionado/#Value","asientos_apoya_cabezas_tapiceria":"#Control:asientos_apoya_cabezas_tapiceria/#Value","elevavidrios_manivelas":"#Control:elevavidrios_manivelas/#Value","cinturones_seguridad":"#Control:cinturones_seguridad/#Value","puertas":"#Control:puertas/#Value","bocina_pito":"#Control:bocina_pito/#Value","alarma_retroceso":"#Control:alarma_retroceso/#Value","botiquin":"#Control:botiquin/#Value","asa":"#Control:asa/#Value","placas":"#Control:placas/#Value","cuerpo":"#Control:cuerpo/#Value","quijadas_laterales":"#Control:quijadas_laterales/#Value","alineamiento":"#Control:alineamiento/#Value","mantenimiento":"#Control:mantenimiento/#Value","comentarios":"#Control:comentarios/#Value","status":"#Control:status/#Value"},"Target":{"EntitySet":"report","Service":"/Equipment/Services/TestService.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/report/report_DeleteEntity.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/report/report_DeleteEntity.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"report","Service":"/Equipment/Services/TestService.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/Equipment/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/Equipment/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/report/report_UpdateEntity.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/report/report_UpdateEntity.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"report","Service":"/Equipment/Services/TestService.service","ReadLink":"{@odata.readLink}"},"Properties":{"fecha":"#Control:fecha/#Value","kilometraje_Horometro":"#Control:kilometraje_Horometro/#Value","ubicacion":"#Control:ubicacion/#Value","aceite_y_combustible":"#Control:aceite_y_combustible/#Value","liquido_refrigerante":"#Control:liquido_refrigerante/#Value","nivel_agua":"#Control:nivel_agua/#Value","liquido_frenos":"#Control:liquido_frenos/#Value","tapa_radiador_tanque":"#Control:tapa_radiador_tanque/#Value","Cables_correas_mangueras":"#Control:Cables_correas_mangueras/#Value","Bateria_cables_bornes":"#Control:Bateria_cables_bornes/#Value","suspencion_gatos_muelles_anclajes":"#Control:suspencion_gatos_muelles_anclajes/#Value","luces_bajas":"#Control:luces_bajas/#Value","luces_altas":"#Control:luces_altas/#Value","luces_internas":"#Control:luces_internas/#Value","direccionales_frente":"#Control:direccionales_frente/#Value","direccionales_atras":"#Control:direccionales_atras/#Value","faros_freno":"#Control:faros_freno/#Value","faros_exploradoras":"#Control:faros_exploradoras/#Value","luces_parqueo":"#Control:luces_parqueo/#Value","extintor":"#Control:extintor/#Value","gato_cruceta_copa_perno":"#Control:gato_cruceta_copa_perno/#Value","linterna_lamparas":"#Control:linterna_lamparas/#Value","kit_herramientas_completa":"#Control:kit_herramientas_completa/#Value","kit_derrames_completo":"#Control:kit_derrames_completo/#Value","cables_arranque":"#Control:cables_arranque/#Value","senalizacion":"#Control:senalizacion/#Value","estado_llantas_rines":"#Control:estado_llantas_rines/#Value","llantas_repuesto_fijas":"#Control:llantas_repuesto_fijas/#Value","labrado_llantas":"#Control:labrado_llantas/#Value","espejos_laterales":"#Control:espejos_laterales/#Value","parabrisas_escobillas":"#Control:parabrisas_escobillas/#Value","puertas_ventanas":"#Control:puertas_ventanas/#Value","latoneria_pintura":"#Control:latoneria_pintura/#Value","vidrios":"#Control:vidrios/#Value","inyectores_agua_parabrisas":"#Control:inyectores_agua_parabrisas/#Value","antena_gps_otros":"#Control:antena_gps_otros/#Value","identificacion_carga":"#Control:identificacion_carga/#Value","aire_acondicionado":"#Control:aire_acondicionado/#Value","asientos_apoya_cabezas_tapiceria":"#Control:asientos_apoya_cabezas_tapiceria/#Value","elevavidrios_manivelas":"#Control:elevavidrios_manivelas/#Value","cinturones_seguridad":"#Control:cinturones_seguridad/#Value","puertas":"#Control:puertas/#Value","bocina_pito":"#Control:bocina_pito/#Value","alarma_retroceso":"#Control:alarma_retroceso/#Value","botiquin":"#Control:botiquin/#Value","asa":"#Control:asa/#Value","placas":"#Control:placas/#Value","cuerpo":"#Control:cuerpo/#Value","quijadas_laterales":"#Control:quijadas_laterales/#Value","alineamiento":"#Control:alineamiento/#Value","mantenimiento":"#Control:mantenimiento/#Value","comentarios":"#Control:comentarios/#Value","status":"#Control:status/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/Equipment/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/Equipment/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Create.action":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Create.action ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Equipment/Pages/TestService_timeReportProy/timeReportProy_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Detail.action":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Detail.action ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Equipment/Pages/TestService_timeReportProy/timeReportProy_Detail.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Edit.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_Edit.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Equipment/Pages/TestService_timeReportProy/timeReportProy_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_List.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/timeReportProy/NavTotimeReportProy_List.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Equipment/Pages/TestService_timeReportProy/timeReportProy_List.page"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/timeReportProy/timeReportProy_CreateEntity.action":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/timeReportProy/timeReportProy_CreateEntity.action ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/Equipment/Actions/CreateEntityFailureMessage.action","OnSuccess":"/Equipment/Actions/CreateEntitySuccessMessage.action","Properties":{"date":"#Control:date/#Value","initialTime":"#Control:initialTime/#Value","finalTime":"#Control:finalTime/#Value","personas":"#Control:personas/#Value","equipos":"#Control:equipos/#Value","comments":"#Control:comments/#Value","Tiempo":"#Control:Tiempo/#Value","image":"#Control:image/#Value","IsFinalConfirmation":"#Control:IsFinalConfirmation/#Value"},"Target":{"EntitySet":"timeReportProy","Service":"/Equipment/Services/TestService.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/timeReportProy/timeReportProy_DeleteEntity.action":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/timeReportProy/timeReportProy_DeleteEntity.action ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"timeReportProy","Service":"/Equipment/Services/TestService.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/Equipment/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/Equipment/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/TestService/timeReportProy/timeReportProy_UpdateEntity.action":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/TestService/timeReportProy/timeReportProy_UpdateEntity.action ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"timeReportProy","Service":"/Equipment/Services/TestService.service","ReadLink":"{@odata.readLink}"},"Properties":{"date":"#Control:date/#Value","initialTime":"#Control:initialTime/#Value","finalTime":"#Control:finalTime/#Value","personas":"#Control:personas/#Value","equipos":"#Control:equipos/#Value","comments":"#Control:comments/#Value","Tiempo":"#Control:Tiempo/#Value","image":"#Control:image/#Value","IsFinalConfirmation":"#Control:IsFinalConfirmation/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/Equipment/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/Equipment/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/UpdateEntityFailureMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/UpdateEntityFailureMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Equipment/Actions/UpdateEntitySuccessMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Equipment/Actions/UpdateEntitySuccessMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/Equipment/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Equipment/Globals/Application/AppDefinition_Version.global":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Equipment/Globals/Application/AppDefinition_Version.global ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Equipment/Globals/Application/ApplicationName.global":
/*!********************************************************************************!*\
  !*** ./build.definitions/Equipment/Globals/Application/ApplicationName.global ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Equipment/Globals/Application/SupportEmail.global":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Equipment/Globals/Application/SupportEmail.global ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Equipment/Globals/Application/SupportPhone.global":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Equipment/Globals/Application/SupportPhone.global ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Equipment/Services/TestService.service":
/*!******************************************************************!*\
  !*** ./build.definitions/Equipment/Services/TestService.service ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"../service/TestService/","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"OfflineOptions":{},"PathSuffix":"","SourceType":"Cloud","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/Equipment/Styles/Styles.json":
/*!********************************************************!*\
  !*** ./build.definitions/Equipment/Styles/Styles.json ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/Equipment/jsconfig.json":
/*!***************************************************!*\
  !*** ./build.definitions/Equipment/jsconfig.json ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"compilerOptions":{"module":"esnext","target":"es2019","moduleResolution":"node","lib":["esnext","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map