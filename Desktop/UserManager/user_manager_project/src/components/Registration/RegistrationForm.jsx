import React, { useState } from 'react';
import './Registration.css';
import ValidationUtils from '../../utils/ValidationUtils';
import { useAuth } from '../../contexts/AuthContext'; 
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const { currentUser, login, logout, Post, GetAllUsers } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    Name: "",
    Surname: "",
    Email: "",
    Password: "",
    Phone: "",
    Address: "",
    BirthDate: "",
    ProfilImage: null
  });

  const [errors, setErrors] = useState({
    NameErrors: [],
    SurnameErrors: [],
    EmailErrors: [],
    PasswordErrors: [],
    ConfirmPasswordErrors: [],
    PhoneErrors: [],
    AddressErrors: [],
    BirthDateErrors: [],
    ProfilImageErrors: []
  })

  const ResetHandler = () =>
  {
    setUserInfo({...userInfo,
    Name:"",
    Surname:"",
    Email:"",
    Password:"",
    Phone:"",
    Address:"",
    BirthDate:"",
    ProfilImage: null
  });
  setErrors({
    ...errors, NameErrors:[],
    SurnameErrors: [],
    EmailErrors: [],
    PasswordErrors: [],
    ConfirmPasswordErrors: [],
    PhoneErrors: [],
    AddressErrors: [],
    BirthDateErrors: [],
    ProfilImageErrors: []
  });
  setConfirmPassword("");
  }
  const ProfileImageHandler = (e) =>
  { 
    const { name, value, type, files } = e.target;
    setUserInfo({
      ...userInfo,
      ProfilImage: files[0]
    });
  }

  function GetAndValidateUserProfileImage(input, fieldName = "")
  {
    let profileImageErrors = [];
    let errorStatus = true;
    const imageMimeTypes = [
      "image/png",    
      "image/jpeg",   
      "image/webp"
  ];
  

    if(input === null)
    {
      profileImageErrors.push(`${fieldName} cannot be empty!`);
      setErrors(prevErrors => ({
        ...prevErrors,
        ProfilImageErrors: profileImageErrors
      }));
      errorStatus = false;
      return errorStatus;
    }

    if(!imageMimeTypes.includes(input.type))
    {
      profileImageErrors.push("Unsupported file type. Please upload an image in PNG, JPEG, or WebP format.");
      errorStatus = false;
    }
    
    let profileImageSize = input.size;
    const sizeInMB = profileImageSize / (1024 * 1024);
    
    if(sizeInMB > 5)
    {
      profileImageErrors.push("The profile image size exceeds the maximum limit of 5 MB. Please upload a smaller image.");
      errorStatus = false;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      ProfilImageErrors: profileImageErrors
    }));
    return errorStatus;
  }
  
  function GetAndValidateUserName(input, fieldName = "", min_length, max_length) {
    let nameErrors = [];
    let errorStatus = true;
  
    if (!ValidationUtils.isRequired(input)) {
      nameErrors.push(`${fieldName} cannot be empty!`);
      setErrors(prevErrors => ({
        ...prevErrors,
        NameErrors: nameErrors
      }));
      errorStatus = false;
      return errorStatus;
    }
    
    if (!ValidationUtils.isTextLengthInRange(input, min_length, max_length)) {
      nameErrors.push(`${fieldName} must be between 2 and 20 characters long. Please enter a valid ${fieldName.toLowerCase()}!`);
      errorStatus = false;
    }
    
    if (!ValidationUtils.isMatch(input)) {
      nameErrors.push(`The ${fieldName} must start with an uppercase letter followed by lowercase letters only.`);
      errorStatus = false;
    }
  
    setErrors(prevErrors => ({
      ...prevErrors,
      NameErrors: nameErrors
    }));
    
    return errorStatus;
  }

  function GetAndValidateUserSurname(input, fieldName = "", min_length, max_length)
  {
    let surnameErrors = [];
    let errorStatus = true;
  
    if (!ValidationUtils.isRequired(input)) {
      surnameErrors.push(`${fieldName} cannot be empty!`);
      setErrors(prevErrors => ({
        ...prevErrors,
        SurnameErrors: surnameErrors
      }));
      errorStatus = false;
      return errorStatus;
    }
    
    if (!ValidationUtils.isTextLengthInRange(input, min_length, max_length)) {
      surnameErrors.push(`${fieldName} must be between ${min_length} and ${max_length} characters long. Please enter a valid ${fieldName.toLowerCase()}!`);
      errorStatus = false;
    }
    
    if (!ValidationUtils.isMatch(input)) {
      surnameErrors.push(`The ${fieldName} must start with an uppercase letter followed by lowercase letters only.`);
      errorStatus = false;
    }
  
    setErrors(prevErrors => ({
      ...prevErrors,
      SurnameErrors: surnameErrors
    }));
    
    return errorStatus;
  }
  
  function GetAndValidateEmail(input, fieldName = "", min_length, max_length)
  {
    let emailErrors = [];
    let errorStatus = true;
  
    if (!ValidationUtils.isRequired(input)) {
      emailErrors.push(`${fieldName} cannot be empty!`);
      setErrors(prevErrors => ({
        ...prevErrors,
        EmailErrors: emailErrors
      }));
      errorStatus = false;
      return errorStatus;
    }
    
    if (!ValidationUtils.isTextLengthInRange(input, min_length, max_length)) {
      emailErrors.push(`${fieldName} must be between ${min_length} and ${max_length} characters long. Please enter a valid ${fieldName.toLowerCase()}!`);
      errorStatus = false;
    }
    
    if (!ValidationUtils.isValidEmail(input)) {
      emailErrors.push(`Invalid ${fieldName} address! It must be in the format 'username@gmail.com' and can only contain letters, numbers, and dots before '@gmail.com'.`);
      errorStatus = false;
    }

    let isExistEmailAddress = false;

    GetAllUsers().forEach((user) =>{
      if(user.email === input)
      {
        isExistEmailAddress = true;
      }
    });

    if(isExistEmailAddress)
    {
      emailErrors.push(`This email address already exists in our database!`);
      errorStatus = false;
    }
  
    setErrors(prevErrors => ({
      ...prevErrors,
      EmailErrors: emailErrors
    }));
    
    return errorStatus;
  }

  function GetAndValidatePassword(input, fieldName = "", exact_length)
  {
    let passwordErrors = [];
    let errorStatus = true;
  
    if (!ValidationUtils.isRequired(input)) {
      passwordErrors.push(`${fieldName} cannot be empty!`);
      setErrors(prevErrors => ({
        ...prevErrors,
        PasswordErrors: passwordErrors
      }));
      
      errorStatus = false;
      return errorStatus;
    }
    
    if (!ValidationUtils.isExactLength(input, 10)) {
      passwordErrors.push(`The length of the ${fieldName} must be exactly ${exact_length} characters.`);
      errorStatus = false;
    }
    
    if (!ValidationUtils.isValidPassword(input)) {
      passwordErrors.push(`Invalid ${fieldName}! ${fieldName} must contain only uppercase letters, lowercase letters, and numbers.`);
      errorStatus = false;
    }
  
    setErrors(prevErrors => ({
      ...prevErrors,
      PasswordErrors: passwordErrors
    }));
    
    return errorStatus;
  }

  function GetAndValidateConfirmPassword(input, fieldName = "")
  {
    let confirmPasswordErrors = [];
    let errorStatus = true;
    
    if (!ValidationUtils.isRequired(input)) {
      confirmPasswordErrors.push(`${fieldName} cannot be empty!`);
      setErrors(prevErrors => ({
        ...prevErrors,
        ConfirmPasswordErrors: confirmPasswordErrors
      }));
      errorStatus = false;
      return errorStatus;
    }
    if(input !== userInfo.Password)
    {
      confirmPasswordErrors.push(`The ${fieldName} must match the original password.`);
      errorStatus = false;
    }
  
    setErrors(prevErrors => ({
      ...prevErrors,
      ConfirmPasswordErrors: confirmPasswordErrors
    }));
    
    return errorStatus;
  }

  function GetAndValidatePhoneNumber(input, fieldName = "")
  {
    let phoneNumberErrors = [];
    let errorStatus = true;
    if (!ValidationUtils.isRequired(input)) {
      phoneNumberErrors.push(`${fieldName} cannot be empty!`);
      setErrors(prevErrors => ({
        ...prevErrors,
        PhoneErrors: phoneNumberErrors
      }));
      errorStatus = false;
      return errorStatus;
    }
    if(ValidationUtils.isValidPhoneNumber(input).isValid === false)
    {
      ValidationUtils.isValidPhoneNumber(input).errorMessages.forEach((errorMessage) =>
      {
        phoneNumberErrors.push(errorMessage);
      })
      errorStatus = false;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      PhoneErrors: phoneNumberErrors
    }));

    return errorStatus;
  }

  function GetAndValidateUserAddress(input, fieldName = "", min_length, max_length)
  {
    let addressErrors = [];
    let errorStatus = true;
    if (!ValidationUtils.isRequired(input)) {
      addressErrors.push(`${fieldName} cannot be empty!`);
      setErrors(prevErrors => ({
        ...prevErrors, AddressErrors: addressErrors
      }));
      errorStatus = false;
      return errorStatus;
    }
    if(!ValidationUtils.isTextLengthInRange(input, min_length, max_length))
    {
      addressErrors.push(`${fieldName} must be between ${min_length} and ${max_length} characters long. Please enter a valid ${fieldName.toLowerCase()}!`);
      errorStatus = false;
    }

    setErrors(prevErrors => ({
      ...prevErrors, AddressErrors: addressErrors
    }));

    return errorStatus;
  }

  function GetAndValidateUserBirthDate(input, fieldName = "")
  {
    let birthDateErrors = [];
    let errorStatus = true;
    if (!ValidationUtils.isRequired(input)) {
      birthDateErrors.push(`${fieldName} cannot be empty!`);
      setErrors(prevErrors => ({
        ...prevErrors, BirthDateErrors: birthDateErrors
      }));
      errorStatus = false;
      return errorStatus;
    }
     
    const dateTime = new Date(input);
    const now = new Date();
    
    if (dateTime > now) {
      birthDateErrors.push("The date must be in the future. Please enter a date that is later than the current year.");
      errorStatus = false;
  }
  setErrors(prevErrors => ({
    ...prevErrors, BirthDateErrors: birthDateErrors
  }));
  return errorStatus;
  }

  const FormDataHandler = (e) =>
  {
    e.preventDefault();

    let isSuccess = true;
    if(!GetAndValidateUserName(userInfo.Name, "Name", 2, 20))
    {
      isSuccess = false;
    }
    if(!GetAndValidateUserSurname(userInfo.Surname, "Surname", 4, 30))
    {
      isSuccess = false;
    }
    if(!GetAndValidateEmail(userInfo.Email, "Email", 10, 30))
    {
      isSuccess = false;
    }
    if(!GetAndValidatePassword(userInfo.Password, "Password", 10))
    {
      isSuccess = false;
    }
    if(!GetAndValidateConfirmPassword(confirmPassword, "Confirm Password"))
    {
      isSuccess = false;
    }
    if(!GetAndValidatePhoneNumber(userInfo.Phone, "Phone Number"))
    {
      isSuccess = false;
    }
    if(!GetAndValidateUserAddress(userInfo.Address, "Address", 10, 60))
    {
      isSuccess = false;
    }
    if(!GetAndValidateUserBirthDate(userInfo.BirthDate, "Birth Date"))
    {
      isSuccess = false;
    }
    if(!GetAndValidateUserProfileImage(userInfo.ProfilImage, "Profile image"))
    {
      isSuccess = false;
    }
    if(isSuccess)
    {
      Post(userInfo);
      navigate("/client/auth/login");
    }
  }

  return (
    <form action="" onSubmit={FormDataHandler} method="post" id="registrationForm">
      
    <div className="container">


      <div id="registrationFormHead">
        <h1 id="title">Registration Form</h1>
      </div>

      {/*=============================================== User name input start! ============================================*/}
      <div className="formGroup">
        <label id='userNameLabel' className='registrationLabel' htmlFor="userNameInput">User name: </label><input type="text" value={userInfo.Name} onChange={(e) => setUserInfo({...userInfo, Name: e.target.value})} className='registrationInput' name="userNameInput" id="userNameInput" />
      </div>
      <div className="errorGroup" style={{display:errors.NameErrors.length > 0 ? "flex" : "none"}}>
        {
          errors.NameErrors.map((NameError, index) => 
            <span key={index} className="errorItem">{NameError}</span>
          )
        }
      </div>
      {/*=============================================== User name input end! ============================================*/}


      {/*============================================= User surname input start! =========================================*/}
      <div className="formGroup">
        <label id='userSurnameLabel' className='registrationLabel' htmlFor="userSurnameInput">User surname: </label><input type="text" value={userInfo.Surname} onChange={(e) => setUserInfo({...userInfo, Surname: e.target.value})} className='registrationInput' name="userSurnameInput" id="userSurnameInput" />
      </div>
      <div className="errorGroup" style={{display:errors.SurnameErrors.length > 0 ? "flex" : "none"}}>
        {
          errors.SurnameErrors.map((SurnameError, index) => 
            <span key={index} className="errorItem">{SurnameError}</span>
          )
        }
      </div>
      {/*============================================= User surname input end! =========================================*/}

      
      {/*============================================ User email input start! ===========================================*/}
      <div className="formGroup">
        <label id='userEmailLabel' className='registrationLabel' htmlFor="userEmailInput">Email: </label><input type="email" value={userInfo.Email} onChange={(e) => setUserInfo({...userInfo, Email: e.target.value})} className='registrationInput' name="userEmailInput" id="userEmailInput"/>
      </div>
      <div className="errorGroup" style={{display:errors.EmailErrors.length > 0 ? "flex" : "none"}}>
        {
          errors.EmailErrors.map((EmailError, index) => 
            <span key={index} className="errorItem">{EmailError}</span>
          )
        }
      </div>
      {/*============================================ User email input end! ===========================================*/}


      {/*======================================= User password input start! ===========================================*/}
      <div className="formGroup">
        <label id='userPasswordLabel' className='registrationLabel' htmlFor="userPasswordInput">Password: </label><input type="password" value={userInfo.Password} onChange={(e) => setUserInfo({...userInfo, Password: e.target.value})} className='registrationInput' name="userPasswordInput" id="userPasswordInput"/>
      </div>
      <div className="errorGroup" style={{display:errors.PasswordErrors.length > 0 ? "flex" : "none"}}>
        {
          errors.PasswordErrors.map((PasswordError, index) => 
            <span key={index} className="errorItem">{PasswordError}</span>
          )
        }
      </div>
      {/*======================================= User password input end! ===========================================*/}


      {/*=================================== User confirm password input start! =======================================*/}
      <div className="formGroup">
        <label id='userConfirmPasswordLabel' className='registrationLabel' htmlFor="userConfirmPasswordInput">Confirm password: </label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='registrationInput' name="userConfirmPasswordInput" id="userConfirmPasswordInput"/>
      </div>
      <div className="errorGroup" style={{display:errors.ConfirmPasswordErrors.length > 0 ? "flex" : "none"}}>
        {
          errors.ConfirmPasswordErrors.map((ConfirmPasswordError, index) => 
            <span key={index} className="errorItem">{ConfirmPasswordError}</span>
          )
        }
      </div>
      {/*=================================== User confirm password input end! =======================================*/}

      
      {/*=================================== User phone number input start! =======================================*/}
      <div className="formGroup">
        <label id='userPhoneNumberLabel' className='registrationLabel' htmlFor="userPhoneNumberInput">Phone number: </label><input type="tel" value={userInfo.Phone} onChange={(e) => setUserInfo({...userInfo, Phone: e.target.value})} className='registrationInput' name="userPhoneNumberInput" id="userPhoneNumberInput"/>
      </div>
      <div className="errorGroup" style={{display:errors.PhoneErrors.length > 0 ? "flex" : "none"}}>
        {
          errors.PhoneErrors.map((PhoneError, index) => 
            <span key={index} className="errorItem">{PhoneError}</span>
          )
        }
      </div>
      {/*=================================== User phone number input end! =======================================*/}

      {/*=================================== User address input start! =======================================*/}
      <div className="formGroup">
        <label id='userAddressLabel' className='registrationLabel' htmlFor="userAddressInput">Address: </label><input type="text" value={userInfo.Address} onChange={(e) => setUserInfo({...userInfo, Address: e.target.value})} className='registrationInput' name="userAddressInput" id="userAddressInput"/>
      </div>
      <div className="errorGroup" style={{display:errors.AddressErrors.length > 0 ? "flex" : "none"}}>
        {
          errors.AddressErrors.map((AddressError, index) => 
            <span key={index} className="errorItem">{AddressError}</span>
          )
        }
      </div>
      {/*=================================== User address input end! =======================================*/}


      {/*=================================== User birth date input start! =======================================*/}
      <div className="formGroup">
        <label id='userBirthDateLabel' className='registrationLabel' htmlFor="userBirthDateInput">Birth date: </label><input type="date" value={userInfo.BirthDate} onChange={(e) =>setUserInfo({...userInfo, BirthDate: e.target.value})} className='registrationInput' name="userBirthDateInput" id="userBirthDateInput"/>
      </div>
       <div className="errorGroup" style={{display:errors.BirthDateErrors.length > 0 ? "flex" : "none"}}>
        {
          errors.BirthDateErrors.map((BirthDateError, index) => 
            <span key={index} className="errorItem">{BirthDateError}</span>
          )
        }
      </div>
      {/*=================================== User birth date input end! =======================================*/}


      {/*=================================== User profile image input start! =======================================*/}
      <div className="formGroup">
        <label id='userProfileImageLabel' className='registrationLabel' htmlFor="userProfileImageInput">Profile image: </label><input type="file" onChange={ProfileImageHandler} accept="image/*" className='registrationInput' name="userProfileImageInput" id="userProfileImageInput"/>
      </div>
      
      <div className="errorGroup" style={{display:errors.ProfilImageErrors.length > 0 ? "flex" : "none"}}>
        {
          errors.ProfilImageErrors.map((ProfilImageError, index) => 
            <span key={index} className="errorItem">{ProfilImageError}</span>
          )
        }
      </div>
      
      {/*=================================== User profile image input end! =======================================*/}


      {/*=============================== User registration button group start! =====================================*/}
      <div className="buttonGroup">
        <button onClick={ResetHandler} type="button" id="resetFormButton">Reset</button>
        <button type="submit" id="submitFormButton">Submit</button>
      </div>
      {/*=============================== User registration button group end! =====================================*/}


    </div>
      
    </form>
  )
}

export default RegistrationForm