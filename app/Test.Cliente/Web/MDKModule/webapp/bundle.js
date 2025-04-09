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

/***/ "./build.definitions/Cliente/i18n/i18n.properties":
/*!********************************************************!*\
  !*** ./build.definitions/Cliente/i18n/i18n.properties ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "Draft_DraftAdministrativeData=Draft_DraftAdministrativeData\nDraft_DraftUUID=Draft_DraftUUID\nDraft_CreationDateTime=Draft_CreationDateTime\nDraft_CreatedByUser=Draft_CreatedByUser\nDraft_DraftIsCreatedByMe=Draft_DraftIsCreatedByMe\nDraft_LastChangeDateTime=Draft_LastChangeDateTime\nDraft_LastChangedByUser=Draft_LastChangedByUser\nDraft_InProcessByUser=Draft_InProcessByUser\nDraft_DraftIsProcessedByMe=Draft_DraftIsProcessedByMe\nCliente=Cliente\nCliente_Detail=Cliente Detail\nCreate_Cliente_Detail=Create Cliente Detail\nUpdate_Cliente_Detail=Update Cliente Detail"

/***/ }),

/***/ "./build.definitions/Cliente/Rules/Application/AppUpdateFailure.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Application/AppUpdateFailure.js ***!
  \*************************************************************************/
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
        "Name": "/Cliente/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/Cliente/Rules/Application/AppUpdateSuccess.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Application/AppUpdateSuccess.js ***!
  \*************************************************************************/
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
                "Name": "/Cliente/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/Cliente/Actions/Application/AppUpdateSuccessMessage.action",
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

/***/ "./build.definitions/Cliente/Rules/Application/ClientIsMultiUserMode.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Application/ClientIsMultiUserMode.js ***!
  \******************************************************************************/
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

/***/ "./build.definitions/Cliente/Rules/Application/GetClientSupportVersions.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Application/GetClientSupportVersions.js ***!
  \*********************************************************************************/
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

/***/ "./build.definitions/Cliente/Rules/Application/GetClientVersion.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Application/GetClientVersion.js ***!
  \*************************************************************************/
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

/***/ "./build.definitions/Cliente/Rules/Application/OnWillUpdate.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Application/OnWillUpdate.js ***!
  \*********************************************************************/
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
    return clientAPI.executeAction('/Cliente/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/Cliente/Rules/Application/ResetAppSettingsAndLogout.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \**********************************************************************************/
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
        return clientAPI.getPageProxy().executeAction('/Cliente/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/Cliente/Rules/Logging/LogLevels.js":
/*!**************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Logging/LogLevels.js ***!
  \**************************************************************/
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

/***/ "./build.definitions/Cliente/Rules/Logging/SetTraceCategories.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Logging/SetTraceCategories.js ***!
  \***********************************************************************/
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

/***/ "./build.definitions/Cliente/Rules/Logging/SetUserLogLevel.js":
/*!********************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Logging/SetUserLogLevel.js ***!
  \********************************************************************/
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

/***/ "./build.definitions/Cliente/Rules/Logging/ToggleLogging.js":
/*!******************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Logging/ToggleLogging.js ***!
  \******************************************************************/
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

/***/ "./build.definitions/Cliente/Rules/Logging/TraceCategories.js":
/*!********************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Logging/TraceCategories.js ***!
  \********************************************************************/
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

/***/ "./build.definitions/Cliente/Rules/Logging/UserLogSetting.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Logging/UserLogSetting.js ***!
  \*******************************************************************/
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

/***/ "./build.definitions/Cliente/Rules/Service/Initialize.js":
/*!***************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/Service/Initialize.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Initialize)
/* harmony export */ });
function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _TestService = context.executeAction('/Cliente/Actions/TestService/Service/InitializeOnline.action');

    //You can add more service initialize actions here

    return Promise.all([_TestService]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/Cliente/Actions/GenericToastMessage.action",
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

/***/ "./build.definitions/Cliente/Rules/TestService/Cliente/Cliente_Cancel.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/TestService/Cliente/Cliente_Cancel.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/Cliente/Services/TestService.service').isDraftEnabled('Cliente')) {
        return clientAPI.executeAction({
            'Name': '/Cliente/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Cliente'
                },
                'OnSuccess': '/Cliente/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Cliente/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/Cliente/Rules/TestService/Cliente/Cliente_CreateEntity.js":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/TestService/Cliente/Cliente_CreateEntity.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/Cliente/Rules/TestService/Cliente/Cliente_DeleteConfirmation.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/TestService/Cliente/Cliente_DeleteConfirmation.js ***!
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
    return clientAPI.executeAction('/Cliente/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/Cliente/Actions/TestService/Cliente/Cliente_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/Cliente/Rules/TestService/Cliente/Cliente_UpdateEntity.js":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/TestService/Cliente/Cliente_UpdateEntity.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/Cliente/Services/TestService.service').isDraftEnabled('Cliente')) {
        return clientAPI.executeAction({
            'Name': '/Cliente/Actions/TestService/Cliente/Cliente_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/Cliente/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Cliente'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/Cliente/Actions/TestService/Cliente/Cliente_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/Cliente/Rules/TestService/Cliente/NavToCliente_Edit.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/Cliente/Rules/TestService/Cliente/NavToCliente_Edit.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/Cliente/Services/TestService.service').isDraftEnabled('Cliente')) {
        return clientAPI.executeAction({
            'Name': '/Cliente/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Cliente'
                },
                'OnSuccess': '/Cliente/Actions/TestService/Cliente/NavToCliente_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/Cliente/Actions/TestService/Cliente/NavToCliente_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let cliente_actions_application_appupdate_action = __webpack_require__(/*! ./Cliente/Actions/Application/AppUpdate.action */ "./build.definitions/Cliente/Actions/Application/AppUpdate.action")
let cliente_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./Cliente/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/Cliente/Actions/Application/AppUpdateFailureMessage.action")
let cliente_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./Cliente/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/Cliente/Actions/Application/AppUpdateProgressBanner.action")
let cliente_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./Cliente/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/Cliente/Actions/Application/AppUpdateSuccessMessage.action")
let cliente_actions_application_logout_action = __webpack_require__(/*! ./Cliente/Actions/Application/Logout.action */ "./build.definitions/Cliente/Actions/Application/Logout.action")
let cliente_actions_application_navtoabout_action = __webpack_require__(/*! ./Cliente/Actions/Application/NavToAbout.action */ "./build.definitions/Cliente/Actions/Application/NavToAbout.action")
let cliente_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./Cliente/Actions/Application/NavToActivityLog.action */ "./build.definitions/Cliente/Actions/Application/NavToActivityLog.action")
let cliente_actions_application_navtosupport_action = __webpack_require__(/*! ./Cliente/Actions/Application/NavToSupport.action */ "./build.definitions/Cliente/Actions/Application/NavToSupport.action")
let cliente_actions_application_onwillupdate_action = __webpack_require__(/*! ./Cliente/Actions/Application/OnWillUpdate.action */ "./build.definitions/Cliente/Actions/Application/OnWillUpdate.action")
let cliente_actions_application_reset_action = __webpack_require__(/*! ./Cliente/Actions/Application/Reset.action */ "./build.definitions/Cliente/Actions/Application/Reset.action")
let cliente_actions_application_resetmessage_action = __webpack_require__(/*! ./Cliente/Actions/Application/ResetMessage.action */ "./build.definitions/Cliente/Actions/Application/ResetMessage.action")
let cliente_actions_application_usermenupopover_action = __webpack_require__(/*! ./Cliente/Actions/Application/UserMenuPopover.action */ "./build.definitions/Cliente/Actions/Application/UserMenuPopover.action")
let cliente_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./Cliente/Actions/CloseModalPage_Cancel.action */ "./build.definitions/Cliente/Actions/CloseModalPage_Cancel.action")
let cliente_actions_closemodalpage_complete_action = __webpack_require__(/*! ./Cliente/Actions/CloseModalPage_Complete.action */ "./build.definitions/Cliente/Actions/CloseModalPage_Complete.action")
let cliente_actions_closepage_action = __webpack_require__(/*! ./Cliente/Actions/ClosePage.action */ "./build.definitions/Cliente/Actions/ClosePage.action")
let cliente_actions_createentityfailuremessage_action = __webpack_require__(/*! ./Cliente/Actions/CreateEntityFailureMessage.action */ "./build.definitions/Cliente/Actions/CreateEntityFailureMessage.action")
let cliente_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./Cliente/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/Cliente/Actions/CreateEntitySuccessMessage.action")
let cliente_actions_deleteconfirmation_action = __webpack_require__(/*! ./Cliente/Actions/DeleteConfirmation.action */ "./build.definitions/Cliente/Actions/DeleteConfirmation.action")
let cliente_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./Cliente/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/Cliente/Actions/DeleteEntityFailureMessage.action")
let cliente_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./Cliente/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/Cliente/Actions/DeleteEntitySuccessMessage.action")
let cliente_actions_draftdiscardentity_action = __webpack_require__(/*! ./Cliente/Actions/DraftDiscardEntity.action */ "./build.definitions/Cliente/Actions/DraftDiscardEntity.action")
let cliente_actions_drafteditentity_action = __webpack_require__(/*! ./Cliente/Actions/DraftEditEntity.action */ "./build.definitions/Cliente/Actions/DraftEditEntity.action")
let cliente_actions_draftsaveentity_action = __webpack_require__(/*! ./Cliente/Actions/DraftSaveEntity.action */ "./build.definitions/Cliente/Actions/DraftSaveEntity.action")
let cliente_actions_genericbannermessage_action = __webpack_require__(/*! ./Cliente/Actions/GenericBannerMessage.action */ "./build.definitions/Cliente/Actions/GenericBannerMessage.action")
let cliente_actions_genericmessagebox_action = __webpack_require__(/*! ./Cliente/Actions/GenericMessageBox.action */ "./build.definitions/Cliente/Actions/GenericMessageBox.action")
let cliente_actions_genericnavigation_action = __webpack_require__(/*! ./Cliente/Actions/GenericNavigation.action */ "./build.definitions/Cliente/Actions/GenericNavigation.action")
let cliente_actions_generictoastmessage_action = __webpack_require__(/*! ./Cliente/Actions/GenericToastMessage.action */ "./build.definitions/Cliente/Actions/GenericToastMessage.action")
let cliente_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./Cliente/Actions/Logging/LogUploadFailure.action */ "./build.definitions/Cliente/Actions/Logging/LogUploadFailure.action")
let cliente_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./Cliente/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/Cliente/Actions/Logging/LogUploadSuccessful.action")
let cliente_actions_logging_uploadlog_action = __webpack_require__(/*! ./Cliente/Actions/Logging/UploadLog.action */ "./build.definitions/Cliente/Actions/Logging/UploadLog.action")
let cliente_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./Cliente/Actions/Logging/UploadLogProgress.action */ "./build.definitions/Cliente/Actions/Logging/UploadLogProgress.action")
let cliente_actions_testservice_cliente_cliente_createentity_action = __webpack_require__(/*! ./Cliente/Actions/TestService/Cliente/Cliente_CreateEntity.action */ "./build.definitions/Cliente/Actions/TestService/Cliente/Cliente_CreateEntity.action")
let cliente_actions_testservice_cliente_cliente_deleteentity_action = __webpack_require__(/*! ./Cliente/Actions/TestService/Cliente/Cliente_DeleteEntity.action */ "./build.definitions/Cliente/Actions/TestService/Cliente/Cliente_DeleteEntity.action")
let cliente_actions_testservice_cliente_cliente_updateentity_action = __webpack_require__(/*! ./Cliente/Actions/TestService/Cliente/Cliente_UpdateEntity.action */ "./build.definitions/Cliente/Actions/TestService/Cliente/Cliente_UpdateEntity.action")
let cliente_actions_testservice_cliente_navtocliente_create_action = __webpack_require__(/*! ./Cliente/Actions/TestService/Cliente/NavToCliente_Create.action */ "./build.definitions/Cliente/Actions/TestService/Cliente/NavToCliente_Create.action")
let cliente_actions_testservice_cliente_navtocliente_detail_action = __webpack_require__(/*! ./Cliente/Actions/TestService/Cliente/NavToCliente_Detail.action */ "./build.definitions/Cliente/Actions/TestService/Cliente/NavToCliente_Detail.action")
let cliente_actions_testservice_cliente_navtocliente_edit_action = __webpack_require__(/*! ./Cliente/Actions/TestService/Cliente/NavToCliente_Edit.action */ "./build.definitions/Cliente/Actions/TestService/Cliente/NavToCliente_Edit.action")
let cliente_actions_testservice_cliente_navtocliente_list_action = __webpack_require__(/*! ./Cliente/Actions/TestService/Cliente/NavToCliente_List.action */ "./build.definitions/Cliente/Actions/TestService/Cliente/NavToCliente_List.action")
let cliente_actions_testservice_service_initializeonline_action = __webpack_require__(/*! ./Cliente/Actions/TestService/Service/InitializeOnline.action */ "./build.definitions/Cliente/Actions/TestService/Service/InitializeOnline.action")
let cliente_actions_testservice_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./Cliente/Actions/TestService/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/Cliente/Actions/TestService/Service/InitializeOnlineFailureMessage.action")
let cliente_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./Cliente/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/Cliente/Actions/UpdateEntityFailureMessage.action")
let cliente_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./Cliente/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/Cliente/Actions/UpdateEntitySuccessMessage.action")
let cliente_globals_application_appdefinition_version_global = __webpack_require__(/*! ./Cliente/Globals/Application/AppDefinition_Version.global */ "./build.definitions/Cliente/Globals/Application/AppDefinition_Version.global")
let cliente_globals_application_applicationname_global = __webpack_require__(/*! ./Cliente/Globals/Application/ApplicationName.global */ "./build.definitions/Cliente/Globals/Application/ApplicationName.global")
let cliente_globals_application_supportemail_global = __webpack_require__(/*! ./Cliente/Globals/Application/SupportEmail.global */ "./build.definitions/Cliente/Globals/Application/SupportEmail.global")
let cliente_globals_application_supportphone_global = __webpack_require__(/*! ./Cliente/Globals/Application/SupportPhone.global */ "./build.definitions/Cliente/Globals/Application/SupportPhone.global")
let cliente_i18n_i18n_properties = __webpack_require__(/*! ./Cliente/i18n/i18n.properties */ "./build.definitions/Cliente/i18n/i18n.properties")
let cliente_jsconfig_json = __webpack_require__(/*! ./Cliente/jsconfig.json */ "./build.definitions/Cliente/jsconfig.json")
let cliente_pages_application_about_page = __webpack_require__(/*! ./Cliente/Pages/Application/About.page */ "./build.definitions/Cliente/Pages/Application/About.page")
let cliente_pages_application_support_page = __webpack_require__(/*! ./Cliente/Pages/Application/Support.page */ "./build.definitions/Cliente/Pages/Application/Support.page")
let cliente_pages_application_useractivitylog_page = __webpack_require__(/*! ./Cliente/Pages/Application/UserActivityLog.page */ "./build.definitions/Cliente/Pages/Application/UserActivityLog.page")
let cliente_pages_testservice_cliente_cliente_create_page = __webpack_require__(/*! ./Cliente/Pages/TestService_Cliente/Cliente_Create.page */ "./build.definitions/Cliente/Pages/TestService_Cliente/Cliente_Create.page")
let cliente_pages_testservice_cliente_cliente_detail_page = __webpack_require__(/*! ./Cliente/Pages/TestService_Cliente/Cliente_Detail.page */ "./build.definitions/Cliente/Pages/TestService_Cliente/Cliente_Detail.page")
let cliente_pages_testservice_cliente_cliente_edit_page = __webpack_require__(/*! ./Cliente/Pages/TestService_Cliente/Cliente_Edit.page */ "./build.definitions/Cliente/Pages/TestService_Cliente/Cliente_Edit.page")
let cliente_pages_testservice_cliente_cliente_list_page = __webpack_require__(/*! ./Cliente/Pages/TestService_Cliente/Cliente_List.page */ "./build.definitions/Cliente/Pages/TestService_Cliente/Cliente_List.page")
let cliente_rules_application_appupdatefailure_js = __webpack_require__(/*! ./Cliente/Rules/Application/AppUpdateFailure.js */ "./build.definitions/Cliente/Rules/Application/AppUpdateFailure.js")
let cliente_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./Cliente/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/Cliente/Rules/Application/AppUpdateSuccess.js")
let cliente_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./Cliente/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/Cliente/Rules/Application/ClientIsMultiUserMode.js")
let cliente_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./Cliente/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/Cliente/Rules/Application/GetClientSupportVersions.js")
let cliente_rules_application_getclientversion_js = __webpack_require__(/*! ./Cliente/Rules/Application/GetClientVersion.js */ "./build.definitions/Cliente/Rules/Application/GetClientVersion.js")
let cliente_rules_application_onwillupdate_js = __webpack_require__(/*! ./Cliente/Rules/Application/OnWillUpdate.js */ "./build.definitions/Cliente/Rules/Application/OnWillUpdate.js")
let cliente_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./Cliente/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/Cliente/Rules/Application/ResetAppSettingsAndLogout.js")
let cliente_rules_logging_loglevels_js = __webpack_require__(/*! ./Cliente/Rules/Logging/LogLevels.js */ "./build.definitions/Cliente/Rules/Logging/LogLevels.js")
let cliente_rules_logging_settracecategories_js = __webpack_require__(/*! ./Cliente/Rules/Logging/SetTraceCategories.js */ "./build.definitions/Cliente/Rules/Logging/SetTraceCategories.js")
let cliente_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./Cliente/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/Cliente/Rules/Logging/SetUserLogLevel.js")
let cliente_rules_logging_togglelogging_js = __webpack_require__(/*! ./Cliente/Rules/Logging/ToggleLogging.js */ "./build.definitions/Cliente/Rules/Logging/ToggleLogging.js")
let cliente_rules_logging_tracecategories_js = __webpack_require__(/*! ./Cliente/Rules/Logging/TraceCategories.js */ "./build.definitions/Cliente/Rules/Logging/TraceCategories.js")
let cliente_rules_logging_userlogsetting_js = __webpack_require__(/*! ./Cliente/Rules/Logging/UserLogSetting.js */ "./build.definitions/Cliente/Rules/Logging/UserLogSetting.js")
let cliente_rules_service_initialize_js = __webpack_require__(/*! ./Cliente/Rules/Service/Initialize.js */ "./build.definitions/Cliente/Rules/Service/Initialize.js")
let cliente_rules_testservice_cliente_cliente_cancel_js = __webpack_require__(/*! ./Cliente/Rules/TestService/Cliente/Cliente_Cancel.js */ "./build.definitions/Cliente/Rules/TestService/Cliente/Cliente_Cancel.js")
let cliente_rules_testservice_cliente_cliente_createentity_js = __webpack_require__(/*! ./Cliente/Rules/TestService/Cliente/Cliente_CreateEntity.js */ "./build.definitions/Cliente/Rules/TestService/Cliente/Cliente_CreateEntity.js")
let cliente_rules_testservice_cliente_cliente_deleteconfirmation_js = __webpack_require__(/*! ./Cliente/Rules/TestService/Cliente/Cliente_DeleteConfirmation.js */ "./build.definitions/Cliente/Rules/TestService/Cliente/Cliente_DeleteConfirmation.js")
let cliente_rules_testservice_cliente_cliente_updateentity_js = __webpack_require__(/*! ./Cliente/Rules/TestService/Cliente/Cliente_UpdateEntity.js */ "./build.definitions/Cliente/Rules/TestService/Cliente/Cliente_UpdateEntity.js")
let cliente_rules_testservice_cliente_navtocliente_edit_js = __webpack_require__(/*! ./Cliente/Rules/TestService/Cliente/NavToCliente_Edit.js */ "./build.definitions/Cliente/Rules/TestService/Cliente/NavToCliente_Edit.js")
let cliente_services_testservice_service = __webpack_require__(/*! ./Cliente/Services/TestService.service */ "./build.definitions/Cliente/Services/TestService.service")
let cliente_styles_styles_css = __webpack_require__(/*! ./Cliente/Styles/Styles.css */ "./build.definitions/Cliente/Styles/Styles.css")
let cliente_styles_styles_json = __webpack_require__(/*! ./Cliente/Styles/Styles.json */ "./build.definitions/Cliente/Styles/Styles.json")
let cliente_styles_styles_less = __webpack_require__(/*! ./Cliente/Styles/Styles.less */ "./build.definitions/Cliente/Styles/Styles.less")
let cliente_styles_styles_nss = __webpack_require__(/*! ./Cliente/Styles/Styles.nss */ "./build.definitions/Cliente/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	cliente_actions_application_appupdate_action : cliente_actions_application_appupdate_action,
	cliente_actions_application_appupdatefailuremessage_action : cliente_actions_application_appupdatefailuremessage_action,
	cliente_actions_application_appupdateprogressbanner_action : cliente_actions_application_appupdateprogressbanner_action,
	cliente_actions_application_appupdatesuccessmessage_action : cliente_actions_application_appupdatesuccessmessage_action,
	cliente_actions_application_logout_action : cliente_actions_application_logout_action,
	cliente_actions_application_navtoabout_action : cliente_actions_application_navtoabout_action,
	cliente_actions_application_navtoactivitylog_action : cliente_actions_application_navtoactivitylog_action,
	cliente_actions_application_navtosupport_action : cliente_actions_application_navtosupport_action,
	cliente_actions_application_onwillupdate_action : cliente_actions_application_onwillupdate_action,
	cliente_actions_application_reset_action : cliente_actions_application_reset_action,
	cliente_actions_application_resetmessage_action : cliente_actions_application_resetmessage_action,
	cliente_actions_application_usermenupopover_action : cliente_actions_application_usermenupopover_action,
	cliente_actions_closemodalpage_cancel_action : cliente_actions_closemodalpage_cancel_action,
	cliente_actions_closemodalpage_complete_action : cliente_actions_closemodalpage_complete_action,
	cliente_actions_closepage_action : cliente_actions_closepage_action,
	cliente_actions_createentityfailuremessage_action : cliente_actions_createentityfailuremessage_action,
	cliente_actions_createentitysuccessmessage_action : cliente_actions_createentitysuccessmessage_action,
	cliente_actions_deleteconfirmation_action : cliente_actions_deleteconfirmation_action,
	cliente_actions_deleteentityfailuremessage_action : cliente_actions_deleteentityfailuremessage_action,
	cliente_actions_deleteentitysuccessmessage_action : cliente_actions_deleteentitysuccessmessage_action,
	cliente_actions_draftdiscardentity_action : cliente_actions_draftdiscardentity_action,
	cliente_actions_drafteditentity_action : cliente_actions_drafteditentity_action,
	cliente_actions_draftsaveentity_action : cliente_actions_draftsaveentity_action,
	cliente_actions_genericbannermessage_action : cliente_actions_genericbannermessage_action,
	cliente_actions_genericmessagebox_action : cliente_actions_genericmessagebox_action,
	cliente_actions_genericnavigation_action : cliente_actions_genericnavigation_action,
	cliente_actions_generictoastmessage_action : cliente_actions_generictoastmessage_action,
	cliente_actions_logging_loguploadfailure_action : cliente_actions_logging_loguploadfailure_action,
	cliente_actions_logging_loguploadsuccessful_action : cliente_actions_logging_loguploadsuccessful_action,
	cliente_actions_logging_uploadlog_action : cliente_actions_logging_uploadlog_action,
	cliente_actions_logging_uploadlogprogress_action : cliente_actions_logging_uploadlogprogress_action,
	cliente_actions_testservice_cliente_cliente_createentity_action : cliente_actions_testservice_cliente_cliente_createentity_action,
	cliente_actions_testservice_cliente_cliente_deleteentity_action : cliente_actions_testservice_cliente_cliente_deleteentity_action,
	cliente_actions_testservice_cliente_cliente_updateentity_action : cliente_actions_testservice_cliente_cliente_updateentity_action,
	cliente_actions_testservice_cliente_navtocliente_create_action : cliente_actions_testservice_cliente_navtocliente_create_action,
	cliente_actions_testservice_cliente_navtocliente_detail_action : cliente_actions_testservice_cliente_navtocliente_detail_action,
	cliente_actions_testservice_cliente_navtocliente_edit_action : cliente_actions_testservice_cliente_navtocliente_edit_action,
	cliente_actions_testservice_cliente_navtocliente_list_action : cliente_actions_testservice_cliente_navtocliente_list_action,
	cliente_actions_testservice_service_initializeonline_action : cliente_actions_testservice_service_initializeonline_action,
	cliente_actions_testservice_service_initializeonlinefailuremessage_action : cliente_actions_testservice_service_initializeonlinefailuremessage_action,
	cliente_actions_updateentityfailuremessage_action : cliente_actions_updateentityfailuremessage_action,
	cliente_actions_updateentitysuccessmessage_action : cliente_actions_updateentitysuccessmessage_action,
	cliente_globals_application_appdefinition_version_global : cliente_globals_application_appdefinition_version_global,
	cliente_globals_application_applicationname_global : cliente_globals_application_applicationname_global,
	cliente_globals_application_supportemail_global : cliente_globals_application_supportemail_global,
	cliente_globals_application_supportphone_global : cliente_globals_application_supportphone_global,
	cliente_i18n_i18n_properties : cliente_i18n_i18n_properties,
	cliente_jsconfig_json : cliente_jsconfig_json,
	cliente_pages_application_about_page : cliente_pages_application_about_page,
	cliente_pages_application_support_page : cliente_pages_application_support_page,
	cliente_pages_application_useractivitylog_page : cliente_pages_application_useractivitylog_page,
	cliente_pages_testservice_cliente_cliente_create_page : cliente_pages_testservice_cliente_cliente_create_page,
	cliente_pages_testservice_cliente_cliente_detail_page : cliente_pages_testservice_cliente_cliente_detail_page,
	cliente_pages_testservice_cliente_cliente_edit_page : cliente_pages_testservice_cliente_cliente_edit_page,
	cliente_pages_testservice_cliente_cliente_list_page : cliente_pages_testservice_cliente_cliente_list_page,
	cliente_rules_application_appupdatefailure_js : cliente_rules_application_appupdatefailure_js,
	cliente_rules_application_appupdatesuccess_js : cliente_rules_application_appupdatesuccess_js,
	cliente_rules_application_clientismultiusermode_js : cliente_rules_application_clientismultiusermode_js,
	cliente_rules_application_getclientsupportversions_js : cliente_rules_application_getclientsupportversions_js,
	cliente_rules_application_getclientversion_js : cliente_rules_application_getclientversion_js,
	cliente_rules_application_onwillupdate_js : cliente_rules_application_onwillupdate_js,
	cliente_rules_application_resetappsettingsandlogout_js : cliente_rules_application_resetappsettingsandlogout_js,
	cliente_rules_logging_loglevels_js : cliente_rules_logging_loglevels_js,
	cliente_rules_logging_settracecategories_js : cliente_rules_logging_settracecategories_js,
	cliente_rules_logging_setuserloglevel_js : cliente_rules_logging_setuserloglevel_js,
	cliente_rules_logging_togglelogging_js : cliente_rules_logging_togglelogging_js,
	cliente_rules_logging_tracecategories_js : cliente_rules_logging_tracecategories_js,
	cliente_rules_logging_userlogsetting_js : cliente_rules_logging_userlogsetting_js,
	cliente_rules_service_initialize_js : cliente_rules_service_initialize_js,
	cliente_rules_testservice_cliente_cliente_cancel_js : cliente_rules_testservice_cliente_cliente_cancel_js,
	cliente_rules_testservice_cliente_cliente_createentity_js : cliente_rules_testservice_cliente_cliente_createentity_js,
	cliente_rules_testservice_cliente_cliente_deleteconfirmation_js : cliente_rules_testservice_cliente_cliente_deleteconfirmation_js,
	cliente_rules_testservice_cliente_cliente_updateentity_js : cliente_rules_testservice_cliente_cliente_updateentity_js,
	cliente_rules_testservice_cliente_navtocliente_edit_js : cliente_rules_testservice_cliente_navtocliente_edit_js,
	cliente_services_testservice_service : cliente_services_testservice_service,
	cliente_styles_styles_css : cliente_styles_styles_css,
	cliente_styles_styles_json : cliente_styles_styles_json,
	cliente_styles_styles_less : cliente_styles_styles_less,
	cliente_styles_styles_nss : cliente_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/Cliente/Styles/Styles.css":
/*!*****************************************************!*\
  !*** ./build.definitions/Cliente/Styles/Styles.css ***!
  \*****************************************************/
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
`, "",{"version":3,"sources":["webpack://./build.definitions/Cliente/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Cliente/Styles/Styles.less":
/*!******************************************************!*\
  !*** ./build.definitions/Cliente/Styles/Styles.less ***!
  \******************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./build.definitions/Cliente/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Cliente/Styles/Styles.nss":
/*!*****************************************************!*\
  !*** ./build.definitions/Cliente/Styles/Styles.nss ***!
  \*****************************************************/
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

/***/ "./build.definitions/Cliente/Pages/Application/About.page":
/*!****************************************************************!*\
  !*** ./build.definitions/Cliente/Pages/Application/About.page ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"/Cliente/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"/Cliente/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true,"_Type":"KeyValue.Type.Item"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/Cliente/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)","_Type":"KeyValue.Type.Item"},{"Value":"/Cliente/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true,"_Type":"KeyValue.Type.Item"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Cliente/Actions/CloseModalPage_Complete.action","_Type":"Control.Type.ActionBarItem"}],"_Name":"ActionBar1","Caption":"About","PrefersLargeCaption":true,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Cliente/Pages/Application/Support.page":
/*!******************************************************************!*\
  !*** ./build.definitions/Cliente/Pages/Application/Support.page ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/Cliente/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/Cliente/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/Cliente/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/Cliente/Actions/Application/NavToActivityLog.action","_Type":"SimplePropertyCollection.Type.Cell"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Cliente/Actions/CloseModalPage_Complete.action","_Type":"Control.Type.ActionBarItem"}],"_Name":"ActionBar1","Caption":"Settings","PrefersLargeCaption":false,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Cliente/Pages/Application/UserActivityLog.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/Cliente/Pages/Application/UserActivityLog.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/Cliente/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/Cliente/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/Cliente/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/Cliente/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/Cliente/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/Cliente/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/Cliente/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","ActionBar":{"Caption":"Activity Log","PrefersLargeCaption":false,"_Type":"Control.Type.ActionBar"},"OnLoaded":"/Cliente/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/Cliente/Pages/TestService_Cliente/Cliente_Create.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Cliente/Pages/TestService_Cliente/Cliente_Create.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Cliente/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Cliente/Rules/TestService/Cliente/Cliente_CreateEntity.js","Position":"Right","SystemItem":"Save","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Create_Cliente_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"nombre","_Name":"nombre","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"apellido","_Name":"apellido","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"correo","_Name":"correo","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Cliente_Create"}

/***/ }),

/***/ "./build.definitions/Cliente/Pages/TestService_Cliente/Cliente_Detail.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Cliente/Pages/TestService_Cliente/Cliente_Detail.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Cliente/Services/TestService.service","EntitySet":"Cliente","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/Cliente/Rules/TestService/Cliente/NavToCliente_Edit.js","Position":"Right","SystemItem":"Edit","_Type":"Control.Type.ActionBarItem"},{"OnPress":"/Cliente/Rules/TestService/Cliente/Cliente_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Cliente_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{nombre}","BodyText":"","Footnote":"{correo}","Description":"{apellido}","StatusText":"","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"nombre","Value":"{nombre}","_Type":"KeyValue.Type.Item"},{"KeyName":"apellido","Value":"{apellido}","_Type":"KeyValue.Type.Item"},{"KeyName":"correo","Value":"{correo}","_Type":"KeyValue.Type.Item"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Cliente_Detail"}

/***/ }),

/***/ "./build.definitions/Cliente/Pages/TestService_Cliente/Cliente_Edit.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Cliente/Pages/TestService_Cliente/Cliente_Edit.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/Cliente/Services/TestService.service","EntitySet":"Cliente","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/Cliente/Rules/TestService/Cliente/Cliente_Cancel.js","_Type":"Control.Type.ActionBarItem"},{"Position":"Right","SystemItem":"Save","OnPress":"/Cliente/Rules/TestService/Cliente/Cliente_UpdateEntity.js","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Update_Cliente_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"nombre","_Name":"nombre","Value":"{nombre}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"apellido","_Name":"apellido","Value":"{apellido}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"correo","_Name":"correo","Value":"{correo}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Cliente_Edit"}

/***/ }),

/***/ "./build.definitions/Cliente/Pages/TestService_Cliente/Cliente_List.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Cliente/Pages/TestService_Cliente/Cliente_List.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/Cliente/Actions/TestService/Cliente/NavToCliente_Create.action","Position":"Right","SystemItem":"Add","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,Cliente)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{apellido}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Cliente/Actions/TestService/Cliente/NavToCliente_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{correo}","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"{nombre}","SubstatusText":"","_Type":"ObjectTable.Type.ObjectCell"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Cliente","Service":"/Cliente/Services/TestService.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","FioriToolbar":{"_Name":"FioriToolbar","_Type":"Control.Type.FioriToolbar","Items":[{"_Type":"FioriToolbarItem.Type.Button","_Name":"LogoutToolbarItem","Title":"Logout","OnPress":"/Cliente/Actions/Application/Logout.action"}]},"_Name":"Cliente_List"}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"Cliente","Version":"/Cliente/Globals/Application/AppDefinition_Version.global","MainPage":"/Cliente/Pages/TestService_Cliente/Cliente_List.page","OnLaunch":"/Cliente/Rules/Service/Initialize.js","OnWillUpdate":"/Cliente/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/Cliente/Rules/Service/Initialize.js","Styles":"/Cliente/Styles/Styles.less","Localization":"/Cliente/i18n/i18n.properties","_SchemaVersion":"5.2","StyleSheets":{"Styles":{"css":"/Cliente/Styles/Styles.css","ios":"/Cliente/Styles/Styles.nss","android":"/Cliente/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Application/AppUpdate.action":
/*!************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Application/AppUpdate.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/Cliente/Rules/Application/AppUpdateFailure.js","OnSuccess":"/Cliente/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Application/AppUpdateFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Application/AppUpdateFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Application/AppUpdateProgressBanner.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Application/AppUpdateProgressBanner.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/Cliente/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Application/AppUpdateSuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Application/AppUpdateSuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Application/Logout.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Application/Logout.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Application/NavToAbout.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Application/NavToAbout.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/Cliente/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Application/NavToActivityLog.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Application/NavToActivityLog.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/Cliente/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Application/NavToSupport.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Application/NavToSupport.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/Cliente/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Application/OnWillUpdate.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Application/OnWillUpdate.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Application/Reset.action":
/*!********************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Application/Reset.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Application/ResetMessage.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Application/ResetMessage.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/Cliente/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Application/UserMenuPopover.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Application/UserMenuPopover.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/Cliente/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/Cliente/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/Cliente/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/Cliente/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/Cliente/Actions/Application/Logout.action","Title":"Logout","Visible":"/Cliente/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/CloseModalPage_Cancel.action":
/*!************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/CloseModalPage_Cancel.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/CloseModalPage_Complete.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/CloseModalPage_Complete.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/ClosePage.action":
/*!************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/ClosePage.action ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/CreateEntityFailureMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/CreateEntityFailureMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/CreateEntitySuccessMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/CreateEntitySuccessMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/Cliente/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/DeleteConfirmation.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/DeleteConfirmation.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/DeleteEntityFailureMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/DeleteEntityFailureMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/DeleteEntitySuccessMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/DeleteEntitySuccessMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/Cliente/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/DraftDiscardEntity.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/DraftDiscardEntity.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Discard","Target":{"Service":"/Cliente/Services/TestService.service","EntitySet":"Cliente","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/Cliente/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Discarded"}},"OnFailure":"/Cliente/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/DraftEditEntity.action":
/*!******************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/DraftEditEntity.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Edit","Target":{"Service":"/Cliente/Services/TestService.service","EntitySet":"Cliente","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/Cliente/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Edit"}},"OnFailure":"/Cliente/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/DraftSaveEntity.action":
/*!******************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/DraftSaveEntity.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Save","Target":{"Service":"/Cliente/Services/TestService.service","EntitySet":"Cliente","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/Cliente/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Saved"}},"OnFailure":"/Cliente/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/GenericBannerMessage.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/GenericBannerMessage.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/GenericMessageBox.action":
/*!********************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/GenericMessageBox.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/GenericNavigation.action":
/*!********************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/GenericNavigation.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/Cliente/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/GenericToastMessage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/GenericToastMessage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Logging/LogUploadFailure.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Logging/LogUploadFailure.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Logging/LogUploadSuccessful.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Logging/LogUploadSuccessful.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Logging/UploadLog.action":
/*!********************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Logging/UploadLog.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/Cliente/Actions/Logging/LogUploadFailure.action","OnSuccess":"/Cliente/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/Logging/UploadLogProgress.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/Logging/UploadLogProgress.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/Cliente/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/TestService/Cliente/Cliente_CreateEntity.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/TestService/Cliente/Cliente_CreateEntity.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/Cliente/Actions/CreateEntityFailureMessage.action","OnSuccess":"/Cliente/Actions/CreateEntitySuccessMessage.action","Properties":{"nombre":"#Control:nombre/#Value","apellido":"#Control:apellido/#Value","correo":"#Control:correo/#Value"},"Target":{"EntitySet":"Cliente","Service":"/Cliente/Services/TestService.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/TestService/Cliente/Cliente_DeleteEntity.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/TestService/Cliente/Cliente_DeleteEntity.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Cliente","Service":"/Cliente/Services/TestService.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/Cliente/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/Cliente/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/TestService/Cliente/Cliente_UpdateEntity.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/TestService/Cliente/Cliente_UpdateEntity.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Cliente","Service":"/Cliente/Services/TestService.service","ReadLink":"{@odata.readLink}"},"Properties":{"nombre":"#Control:nombre/#Value","apellido":"#Control:apellido/#Value","correo":"#Control:correo/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/Cliente/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/Cliente/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/TestService/Cliente/NavToCliente_Create.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/TestService/Cliente/NavToCliente_Create.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Cliente/Pages/TestService_Cliente/Cliente_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/TestService/Cliente/NavToCliente_Detail.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/TestService/Cliente/NavToCliente_Detail.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Cliente/Pages/TestService_Cliente/Cliente_Detail.page"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/TestService/Cliente/NavToCliente_Edit.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/TestService/Cliente/NavToCliente_Edit.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/Cliente/Pages/TestService_Cliente/Cliente_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/TestService/Cliente/NavToCliente_List.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/TestService/Cliente/NavToCliente_List.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Cliente/Pages/TestService_Cliente/Cliente_List.page"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/TestService/Service/InitializeOnline.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/TestService/Service/InitializeOnline.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/Cliente/Services/TestService.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnFailure":"/Cliente/Actions/TestService/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/TestService/Service/InitializeOnlineFailureMessage.action":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/TestService/Service/InitializeOnlineFailureMessage.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/UpdateEntityFailureMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/UpdateEntityFailureMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Cliente/Actions/UpdateEntitySuccessMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Cliente/Actions/UpdateEntitySuccessMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/Cliente/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Cliente/Globals/Application/AppDefinition_Version.global":
/*!************************************************************************************!*\
  !*** ./build.definitions/Cliente/Globals/Application/AppDefinition_Version.global ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Cliente/Globals/Application/ApplicationName.global":
/*!******************************************************************************!*\
  !*** ./build.definitions/Cliente/Globals/Application/ApplicationName.global ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Cliente/Globals/Application/SupportEmail.global":
/*!***************************************************************************!*\
  !*** ./build.definitions/Cliente/Globals/Application/SupportEmail.global ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Cliente/Globals/Application/SupportPhone.global":
/*!***************************************************************************!*\
  !*** ./build.definitions/Cliente/Globals/Application/SupportPhone.global ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Cliente/Services/TestService.service":
/*!****************************************************************!*\
  !*** ./build.definitions/Cliente/Services/TestService.service ***!
  \****************************************************************/
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

/***/ "./build.definitions/Cliente/Styles/Styles.json":
/*!******************************************************!*\
  !*** ./build.definitions/Cliente/Styles/Styles.json ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/Cliente/jsconfig.json":
/*!*************************************************!*\
  !*** ./build.definitions/Cliente/jsconfig.json ***!
  \*************************************************/
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