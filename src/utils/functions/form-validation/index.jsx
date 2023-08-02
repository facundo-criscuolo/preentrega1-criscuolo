const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
const lastRegex = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
const documentRegex = /^[0-9]{8,15}$/;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const addressRegex = /^[a-zA-ZÀ-ÿ0-9\s]{8,80}$/;
const postalcodeRegex = /^[0-9]{3,10}$/;
// const birthdayRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;


export const validateInput = ({ type, value }) => {
    let hasError = false;
    let error = '';
    const formatValue = value.trim();


    switch (type) {
        case 'name':
            if(formatValue === "") {
                hasError = true;
                error = 'Name is required';
            } else if(!nameRegex.test(formatValue)) {
                hasError = true;
                error = 'Name is invalid';
            } else {
                hasError = false;
                error = '';
            }
            break;
        case 'last':
            if(formatValue === "") {
                hasError = true;
                error = 'Last Name is required';
            } else if(!lastRegex.test(formatValue)) {
                hasError = true;
                error = 'Last Name is invalid';
            } else {
                hasError = false;
                error = '';
            }
            break;
        case 'document':
            if(formatValue === "") {
                hasError = true;
                error = 'Document is required';
            } else if(!documentRegex.test(formatValue)) {
                hasError = true;
                error = 'Document is invalid';
            } else {
                hasError = false;
                error = '';
            }
            break;
        case 'email':
            if(formatValue === "") {
                hasError = true;
                error = 'Email is required';
            } else if(!emailRegex.test(formatValue)) {
                hasError = true;
                error = 'Email is invalid';
            } else {
                hasError = false;
                error = '';
            }
            break;
        case 'birthday':
            if(formatValue === "") {
                hasError = true;
                error = 'Birthday is required';
            } else if(!birthdayRegex.test(formatValue)) {
                hasError = true;
                error = 'Birthday is invalid';
            } else {
                hasError = false;
                error = '';
            }
            break;
        case 'address':
            if(formatValue === "") {
                hasError = true;
                error = 'Address is required';
            } else if(!addressRegex.test(formatValue)) {
                hasError = true;
                error = 'Address is invalid';
            } else {
                hasError = false;
                error = '';
            }
            break;
        case 'postalCode':
            if(formatValue === "") {
                hasError = true;
                error = 'Postal Code is required';
            } else if(!postalcodeRegex.test(formatValue)) {
                hasError = true;
                error = 'Postal Code is invalid';
            } else {
                hasError = false;
                error = '';
            }
            break;
        default: 
            hasError = false;
            error = '';
            break;
    }
    
    return { hasError, error }
   
}

