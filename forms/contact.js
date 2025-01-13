// Email Form Configuration and Submission

const receivingEmailAddress = 'ramkamal5886@gmail.com';

// Load PHP Email Form library
const loadEmailFormLibrary = () => {
  const phpEmailForm = '../assets/vendor/php-email-form/php-email-form.php';
  if (!fileExists(phpEmailForm)) {
    throw new Error('Unable to load the "PHP Email Form" Library!');
  }
  return require(phpEmailForm);
}

class Contact {
  constructor() {
    this.ajax = true;
    this.to = receivingEmailAddress;
    this.fromName = '';
    this.fromEmail = '';
    this.subject = '';
    this.messages = [];
  }

  addMessage(content, label, length = null) {
    this.messages.push({
      content,
      label,
      length
    });
  }

  // SMTP configuration if needed
  /*
  smtp: {
    host: 'example.com',
    username: 'example',
    password: 'pass', 
    port: '587'
  }
  */

  async send() {
    // Form submission logic here
    const formData = {
      name: this.fromName,
      email: this.fromEmail,
      subject: this.subject,
      messages: this.messages
    };

    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

// Initialize contact form
const contact = new Contact();
contact.fromName = document.querySelector('[name="name"]').value;
contact.fromEmail = document.querySelector('[name="email"]').value; 
contact.subject = document.querySelector('[name="subject"]').value;

// Add form messages
contact.addMessage(contact.fromName, 'From');
contact.addMessage(contact.fromEmail, 'Email');
contact.addMessage(document.querySelector('[name="message"]').value, 'Message', 10);

// Send the form
contact.send().then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});


(function() {
  emailjs.init("ramkamal5886@gmail.com");
})();

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  emailjs.sendForm('your-service-id', 'your-template-id', this)
      .then(() => alert('Message sent successfully!'))
      .catch(err => alert('Failed to send message: ' + err));
});