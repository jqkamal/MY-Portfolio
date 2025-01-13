function sendEmail(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const serviceID = "service_daj4f48"; // Your EmailJS service ID
  const templateID = "template_0v0epa2"; // Your EmailJS template ID

  emailjs.sendForm(serviceID, templateID, event.target)
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        // Show a custom success message
        document.querySelector('.sent-message').style.display = 'block';
        document.querySelector('.loading').style.display = 'none'; // Hide the loading spinner
      },
      (error) => {
        console.log('FAILED...', error);
        // Show error message
        document.querySelector('.error-message').style.display = 'block';
      }
    );
}

