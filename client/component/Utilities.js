import validation from 'validate.js/validate.js'

export default function validate(fieldName, value) {
  var constraints = {
    firstName: {
      presence: false,
      length: {
        minimum: 3,
        message: 'At least 3 characters'
      }
    },
    lastName: {
      presence: false,
      length: {
        minimum: 3,
        message: 'At least 3 characters'
      }
    },
    userName: {
      presence: true,
      length: {
        minimum: 5,
        message: 'At least 5 characters'
      }
    },
    email: {
      presence: true,
      format: {
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalid email address',
      }
    },
    password: {
      presence: true,
      length: {
        minimum: 3,
        message: 'Invalid Password',
      }
    },
    confirmPassword: {
      presence: true,
      equality: 'password'
    },
    phoneNo: {
      presence: true,
      format: {
        pattern: "^[0-9]{10}$",
        message: 'Invalid phone number',
      },
    },
  };

  var formValues = {};
  formValues[fieldName] = value;

  var formFields = {};
  formFields[fieldName] = constraints[fieldName];


  const result = validation(formValues, formFields);

  if (result) {
	  return result[fieldName][0];
  }
    
  return null;
}