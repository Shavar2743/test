import dotenv from 'dotenv';
import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';

dotenv.config();

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_APP_CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const registerUser = (username, password, email, givenName, familyName, birthdate, callback) => {
  const attributeList = [];
  const dataEmail = {
    Name: 'email',
    Value: email
  };
  const dataGivenName = {
    Name: 'given_name',
    Value: givenName
  };
  const dataFamilyName = {
    Name: 'family_name',
    Value: familyName
  };
  const dataBirthdate = {
    Name: 'birthdate',
    Value: birthdate
  };

  const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  const attributeGivenName = new AmazonCognitoIdentity.CognitoUserAttribute(dataGivenName);
  const attributeFamilyName = new AmazonCognitoIdentity.CognitoUserAttribute(dataFamilyName);
  const attributeBirthdate = new AmazonCognitoIdentity.CognitoUserAttribute(dataBirthdate);

  attributeList.push(attributeEmail);
  attributeList.push(attributeGivenName);
  attributeList.push(attributeFamilyName);
  attributeList.push(attributeBirthdate);

  console.log('Attempting to sign up user with:', username, password); // Log the request details

  userPool.signUp(username, password, attributeList, null, (err, result) => {
    if (err) {
      console.error('Error during sign up:', err); // Log the error details
      return callback(err);
    }
    const cognitoUser = result.user;
    console.log('User signed up successfully:', cognitoUser); // Log the successful signup
    callback(null, cognitoUser);
  });
};

const authenticateUser = (username, password, callback) => {
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      callback(null, result);
    },
    onFailure: (err) => {
      callback(err);
    },
  });
};

const confirmUser = (email, code, callback) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

export {
  registerUser,
  authenticateUser,
  confirmUser
};
