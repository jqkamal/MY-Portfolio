<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'ramkamal5886@gmail.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);

  echo $contact->send();
?>
// Email Form Configuration and Submission
const receivingEmailAddress = 'contact@example.com';

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
