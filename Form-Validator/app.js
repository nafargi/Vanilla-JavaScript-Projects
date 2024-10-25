const form = document.querySelector('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');


let user= {
    name: 'nafargi',
    age : 22,
    isLogin: true,
    isMarried: false,
    blogs : [
        {title: 'why mac & cheese rules', likes: 30, numComments: 15},
        {title: '10 things to make with marmite', likes: 50, numComments: 20}
    ],
    loggin : function(){
        this.isLogin= true;
      return `user ${this.name} is logged in `
    },
    logOut : function(){
        this.isLogin = false;
        return `user ${this.name} is logged out`
    }
};

  console.log(user.blogs.forEach( (blogs) =>{
       console.log(blogs.title, blogs.likes);
  }

  ));
//  let user = 
//     [
//         {
//             id: 1,
//             name: 'John Doe',
//             email: 'johndoe@example.com',
//             login: function(){
//                 console.log('User logged in is john doe');
//             }
//         },
//         {
//             id: 2,
//             name: 'nafargi',
//             email: 'nafi@example.com',
//             login: function(){
//                 console.log('User logged in is nafargi');
//             }
//         },
//         {
//             id: 3,
//             name: 'sinahawa',
//             email: 'sini@example.com',
//             login: function(){
//                 console.log('User logged in is sinhawa');
//             }
//         },
//         {
//             id: 4,
//             name: 'nahemiya',
//             email: 'nahi@example.com',
//             login: function(){
//                 console.log('User logged in is nahemiya');
//             }
//         }
//     ];
//  console.log(user.forEach((user)=> user.login()));


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
 function getFieldName(input){
      return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  function checkLength(input ,min,max){
       if(input.value.length < min){
          showError(input,`${getFieldName(input)} must be at least ${min}
           characters`);
       }else if(input.value.length >max){
           showError(input,`${getFieldName(input)} must be at most ${max} 
           characters`);
       }
  }
  function checkPasswordMatch(input, input2){
      if(input.value === input2.value){
              showSuccess(input2);
      }else{
              showError(input2,`Password do not match `);
      }
   }
form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([username,email,password,confirmPassword]);
    checkLength(username,3,15);
    checkLength(password,6,25);
    checkEmail(email);
    checkPasswordMatch(password,confirmPassword);
});
