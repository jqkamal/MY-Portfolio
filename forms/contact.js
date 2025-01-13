fetch('forms/contact.js')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    console.log(data); // Do something with the JS file content
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    emailjs.sendForm('your_service_id', 'your_template_id', this)
      .then(() => {
        alert('Message sent successfully!');
      })
      .catch((error) => {
        alert('Failed to send message:', error);
      });
  });
  