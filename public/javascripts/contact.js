//get the form by its id
const form = document.getElementById("contact-form"); 

if (form){
    const formEvent = form.addEventListener("submit", (event) => {
      event.preventDefault();

      let mail = new FormData(form);
      sendMail(mail);
})

}