const form = document.querySelector('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');


function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerHTML= message;
}
  function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }
  function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(input.value.trim())){
        showSuccess(input);
    }else{
        showError(input, 'Email is not valid');
    }
  }

  function checkRequired(inputArr){
      inputArr.forEach((input) => {
           if(input.value.trim() === ''){
              showError(input, `${getFieldName(input)} is required`);
           }else{
               showSuccess(input);
           }
      });
  }
   
  //--------get fiel name ------------------------
  function getFieldName(input){
      return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  //----check lengthof inout field------
  function checkLength(input ,min,max){
       if(input.value.length < min){
          showError(input,`${getFieldName(input)} must be less than ${min}
           characters`);
       }else if(input.value.length >max){
           showError(input,`${getFieldName(input)} must be at least ${max} 
           characters`);
       }

  }

  //---------check password match--------------------
   function checkPasswordMatch(input, input2){
      if(input.value === input2.value){
              showSuccess(input2);
      }else{
              showError(input2,`Password do not match `);
      }
   }

  //--------Event listener---------------
form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([username,email,password,confirmPassword]);
    checkLength(username,3,15);
    checkLength(password,6,25);
    checkEmail(email);
    checkPasswordMatch(password,confirmPassword);
    // let usernameString = username.value.length;
    // console.log(typeof usernameString);
    //    if(usernameString <= 3){
    //     showError(username, 'Username must be at least 3 characters');

    // }else{
    //     showSuccess(username);
    // }

    // if(email.value === ''){
    //     showError(email, 'Email is required');

    // }else if(!isEmailValid(email.value)){
    //     showError(email, 'Emailis not Valid');
    // }
    // else{
    //     showSuccess(email);
    // }

});
