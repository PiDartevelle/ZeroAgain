// giving the feedback button some life //


const submitBtn = document.getElementById('submit-btn');
const userFirstName = document.getElementById('userFirstName');
const userLastName = document.getElementById('userLastName');
const userMail = document.getElementById('userMail');
const userMessage = document.getElementById('sendMessage');

submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log(userFirstName.value, userMail.value);
    alert('Thank you for taking the time, we will be in touch!');
    userFirstName.value = "";
    userLastName.value = "";
    userMail.value = "";
    userMessage.value = "";
});
