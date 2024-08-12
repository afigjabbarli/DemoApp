class ValidationUtils 
{
    static isRequired(value)
    {
        return value && value.trim() !== '';
    }
    
    static isTextLengthInRange(text = "", min_length, max_length)
    {
        return min_length < text.length && text.length < max_length;
    }

    static isExactLength(text = "", exact_length)
    {
       return text.length === exact_length;
    }

    static isMatch(value = "")
    {
        const regex = /^[A-Z][a-z]*$/;
        return regex.test(value);
    }

    static isValidEmail(value = "")
    {
        const regex = /^[a-zA-Z0-9.]+@gmail\.com$/;
        return regex.test(value);
    }

    static isValidPassword(value = "")
    {
        const regex = /^[A-Za-z0-9]+$/;
        return regex.test(value);
    }

    static isValidPhoneNumber(value = "") {
        const PREFIX = "+994";
        const numberCodes = ["50", "51", "55", "70", "77"];
        let errorMessages = [];
    
        if (value.length !== 13) {
            errorMessages.push("The phone number must be exactly 13 characters long.");
        }
    
        const firstPartOfPhoneNumberInputValue = value.slice(0, 4);
        const secondPartOfPhoneNumberInputValue = value.slice(4, 6);
        const thirdPartOfNumberInputValue = value.slice(6);
    
        if (firstPartOfPhoneNumberInputValue !== PREFIX) {
            errorMessages.push("The phone number must start with +994.");
        }
    
        if (!numberCodes.includes(secondPartOfPhoneNumberInputValue)) {
            errorMessages.push("Invalid area code. Valid codes are: 50, 51, 55, 70, 77.");
        }
    
        if (!/^\d+$/.test(thirdPartOfNumberInputValue)) {
            errorMessages.push("The last part of the phone number must contain only digits.");
        }
    
        return {
            isValid: errorMessages.length === 0,
            errorMessages
        };
    }
    
    
}
export default ValidationUtils;