const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const btnSignup = document.getElementById('signup_button');
const emailinput = document.getElementById('email_signup');
const passwordinput = document.getElementById('password_signup');
const email = document.getElementById('email_signin');
const password = document.getElementById('password_signin');
const btnSignin = document.getElementById('signin_button');
let apiUser = 'https://d7gcxr-3000.csb.app/user';

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    document.getElementById('email_signin').value = '';
    document.getElementById('password_signin').value = '';

});
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    document.getElementById('email_signup').value = '';
    document.getElementById('password_signup').value = '';
    document.getElementById('name_signup').value = '';
    document.getElementById('check_email').innerText = "";
    document.getElementById('create_account_text').innerText = "";


});

const getUser = async () => {
    const response = await fetch(apiUser + '?email=' + emailinput.value);
    const data = await response.json();
    return data;
};
const getUserSignin = async () => {
    const response = await fetch(apiUser + '?email=' + email.value);
    const data = await response.json();
    return data;
};

emailinput.addEventListener('blur' , async ()=> {
    getUser().then((data)=>{
        if (data != '')
    {
        document.getElementById('check_email').innerText = "Tai khoan da ton tai!";
        document.getElementById('signup_button').setAttribute('disabled', true);
    }
    else
    {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!filter.test(emailinput.value))
        {
            document.getElementById('check_email').innerText = "Incorrect input!";
            document.getElementById('signup_button').setAttribute('disabled', true);
            
        }   else{
            document.getElementById('check_email').innerText = "";
            document.getElementById('signup_button').removeAttribute('disabled');

        }
    }
    });
    
});

btnSignup.addEventListener("click",(e) => {
    e.preventDefault();
    if( emailinput.value != "" && passwordinput.value != "")
    {
        getUser().then( (data) => {
            document.getElementById('create_account_text').innerText = "Successful account creation!";
            postUser().then(() => container.classList.remove("active"))
            
        })
    }

})

const postUser =  async () =>
{
            const res = await fetch(apiUser,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: document.getElementById('name_signup').value,
                email : document.getElementById('email_signup').value,
                password: document.getElementById('password_signup').value,
                money: 0,
                cart : []
            })
        });
        console.log(res);
}

// ---- sign in ----


var user;


btnSignin.addEventListener("click", (e) => {
    e.preventDefault();
    if ( email.value == "" || password.value == "" ) {
        document.getElementById('login_text').innerText ="Please enter your username and password";
    } else {
        getUserSignin().then((data) => {
        if (data != "" && data[0].password == password.value) {
            user = data[0];
            document.getElementById('login_text').innerText ="Login successfully";
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = "https://hango2k4.github.io/shop/shop.html";
        } else {
            document.getElementById('login_text').innerText ="Login failed";
        }
    });
    }
});