// userpool.js

export function NodeCallback(err, result) {}

export function UpdateAttributesNodeCallback(err, result, details) {}

export const CodeDeliveryDetails = {
    AttributeName: '',
    DeliveryMedium: '',
    Destination: ''
};

export const ClientMetadata = {};

export const IAuthenticationCallback = {
    onSuccess: function (session, userConfirmationNecessary) {},
    onFailure: function (err) {},
    newPasswordRequired: function (userAttributes, requiredAttributes) {},
    mfaRequired: function (challengeName, challengeParameters) {},
    totpRequired: function (challengeName, challengeParameters) {},
    customChallenge: function (challengeParameters) {},
    mfaSetup: function (challengeName, challengeParameters) {},
    selectMFAType: function (challengeName, challengeParameters) {}
};

export const IMfaSettings = {
    PreferredMfa: false,
    Enabled: false
};

export const IAuthenticationDetailsData = {
    Username: '',
    Password: '',
    ValidationData: {},
    ClientMetadata: {}
};

export class AuthenticationDetails {
    constructor(data) {
        this.Username = data.Username;
        this.Password = data.Password;
        this.ValidationData = data.ValidationData;
        this.ClientMetadata = data.ClientMetadata;
    }

    getUsername() {
        return this.Username;
    }

    getPassword() {
        return this.Password;
    }

    getValidationData() {
        return this.ValidationData;
    }
}

export const ICognitoStorage = {
    setItem: function (key, value) {},
    getItem: function (key) {},
    removeItem: function (key) {},
    clear: function () {}
};

export const ICognitoUserData = {
    Username: '',
    Pool: {},
    Storage: ICognitoStorage
};

export const GetSessionOptions = {
    clientMetadata: {}
};

export const ChallengeName = [
    'CUSTOM_CHALLENGE',
    'MFA_SETUP',
    'NEW_PASSWORD_REQUIRED',
    'SELECT_MFA_TYPE',
    'SMS_MFA',
    'SOFTWARE_TOKEN_MFA'
];

export class CognitoUser {
    constructor(data) {
        this.Username = data.Username;
        this.Pool = data.Pool;
        this.Storage = data.Storage;
    }

    setSignInUserSession(signInUserSession) {}
    getSignInUserSession() {
        return null;
    }
    getUsername() {
        return this.Username;
    }

    getAuthenticationFlowType() {}
    setAuthenticationFlowType(authenticationFlowType) {}
    getCachedDeviceKeyAndPassword() {}

    getSession(callback, options) {}
    refreshSession(refreshToken, callback, clientMetadata) {}
    authenticateUser(authenticationDetails, callbacks) {}
    initiateAuth(authenticationDetails, callbacks) {}
    confirmRegistration(code, forceAliasCreation, callback, clientMetadata) {}
    sendCustomChallengeAnswer(answerChallenge, callback, clientMetaData) {}
    resendConfirmationCode(callback, clientMetaData) {}
    changePassword(oldPassword, newPassword, callback, clientMetadata) {}
    forgotPassword(callbacks, clientMetaData) {}
    confirmPassword(verificationCode, newPassword, callbacks, clientMetaData) {}
    setDeviceStatusRemembered(callbacks) {}
    setDeviceStatusNotRemembered(callbacks) {}
    getDevice(callbacks) {}
    forgetDevice(callbacks) {}
    forgetSpecificDevice(deviceKey, callbacks) {}
    sendMFACode(confirmationCode, callbacks, mfaType, clientMetadata) {}
    listDevices(limit, paginationToken, callbacks) {}
    completeNewPasswordChallenge(newPassword, requiredAttributeData, callbacks, clientMetadata) {}
    signOut(callback) {}
    globalSignOut(callbacks) {}
    verifyAttribute(attributeName, confirmationCode, callbacks) {}
    getUserAttributes(callback) {}
    updateAttributes(attributes, callback, clientMetadata) {}
    deleteAttributes(attributeList, callback) {}
    getAttributeVerificationCode(name, callback, clientMetadata) {}
    deleteUser(callback) {}
    enableMFA(callback) {}
    disableMFA(callback) {}
    getMFAOptions(callback) {}
    getUserData(callback, params) {}
    associateSoftwareToken(callbacks) {}
    verifySoftwareToken(totpCode, friendlyDeviceName, callbacks) {}
    setUserMfaPreference(smsMfaSettings, softwareTokenMfaSettings, callback) {}
    sendMFASelectionAnswer(answerChallenge, callbacks) {}
}

export const MFAOption = {
    DeliveryMedium: '',
    AttributeName: ''
};

export const UserData = {
    MFAOptions: [MFAOption],
    PreferredMfaSetting: '',
    UserAttributes: [],
    UserMFASettingList: [],
    Username: ''
};

export const ICognitoUserAttributeData = {
    Name: '',
    Value: ''
};

export class CognitoUserAttribute {
    constructor(data) {
        this.Name = data.Name;
        this.Value = data.Value;
    }

    getValue() {
        return this.Value;
    }

    setValue(value) {
        this.Value = value;
        return this;
    }

    getName() {
        return this.Name;
    }

    setName(name) {
        this.Name = name;
        return this;
    }

    toString() {
        return `${this.Name}=${this.Value}`;
    }

    toJSON() {
        return {
            Name: this.Name,
            Value: this.Value
        };
    }
}

export const ISignUpResult = {
    user: CognitoUser,
    userConfirmed: false,
    userSub: '',
    codeDeliveryDetails: CodeDeliveryDetails
};

export const ICognitoUserPoolData = {
    UserPoolId: '',
    ClientId: '',
    endpoint: '',
    Storage: ICognitoStorage,
    AdvancedSecurityDataCollectionFlag: false
};

export class CognitoUserPool {
    constructor(data, wrapRefreshSessionCallback) {
        this.UserPoolId = data.UserPoolId;
        this.ClientId = data.ClientId;
        this.endpoint = data.endpoint;
        this.Storage = data.Storage;
        this.AdvancedSecurityDataCollectionFlag = data.AdvancedSecurityDataCollectionFlag;
        this.wrapRefreshSessionCallback = wrapRefreshSessionCallback;
    }

    getUserPoolId() {
        return this.UserPoolId;
    }

    getUserPoolName() {
        return this.UserPoolName;
    }

    getClientId() {
        return this.ClientId;
    }

    signUp(username, password, userAttributes, validationData, callback, clientMetadata) {}
    getCurrentUser() {
        return null;
    }
}

export const ICognitoUserSessionData = {
    IdToken: {},
    AccessToken: {},
    RefreshToken: {}
};

export class CognitoUserSession {
    constructor(data) {
        this.IdToken = data.IdToken;
        this.AccessToken = data.AccessToken;
        this.RefreshToken = data.RefreshToken;
    }

    getIdToken() {
        return this.IdToken;
    }

    getRefreshToken() {
        return this.RefreshToken;
    }

    getAccessToken() {
        return this.AccessToken;
    }

    isValid() {
        return true;
    }
}

export class CognitoAccessToken {
    constructor({ AccessToken }) {
        this.payload = {};
        this.AccessToken = AccessToken;
    }

    getJwtToken() {
        return this.AccessToken;
    }

    getExpiration() {
        return 0;
    }

    getIssuedAt() {
        return 0;
    }

    decodePayload() {
        return this.payload;
    }
}

export class CognitoIdToken {
    constructor({ IdToken }) {
        this.payload = {};
        this.IdToken = IdToken;
    }

    getJwtToken() {
        return this.IdToken;
    }

    getExpiration() {
        return 0;
    }

    getIssuedAt() {
        return 0;
    }

    decodePayload() {
        return this.payload;
    }
}

export class CognitoRefreshToken {
    constructor({ RefreshToken }) {
        this.RefreshToken = RefreshToken;
    }

    getToken() {
        return this.RefreshToken;
    }
}

export const ICookieStorageData = {
    domain: '',
    path: '',
    expires: 0,
    secure: false,
    sameSite: 'strict'
};

export class CookieStorage {
    constructor(data) {
        this.data = data;
    }

    setItem(key, value) {}
    getItem(key) {
        return '';
    }
    removeItem(key) {}
    clear() {}
}

export class UserAgent {
    constructor() {}
}

export const appendToCognitoUserAgent = function (content) {}

export class WordArray {
    constructor(words, sigBytes) {
        this.words = words || [];
        this.sigBytes = sigBytes || 0;
    }

    random(nBytes) {
        return new WordArray([], nBytes);
    }

    toString() {
        return '';
    }
}
