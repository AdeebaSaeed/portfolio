document.addEventListener('DOMContentLoaded', () => {

 // Function to fetch data from the server and update the webpage
function fetchDataAndDisplay() {
  fetch('http://127.0.0.1:4000/get-data')
    .then((response) => response.json())
    .then((data) => {
      // Handle the data here, e.g., display it in the data-container div
      const dataContainer = document.getElementById('data-container');
      dataContainer.innerHTML = '';

      data.forEach((item) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `<strong>Name:</strong> ${item.full_name}<br>
                              <strong>Email:</strong> ${item.email_address}<br>
                              <strong>Mobile:</strong> ${item.mobile_number}<br>
                              <strong>Subject:</strong> ${item.email_subject}<br>
                              <strong>Message:</strong> ${item.message}<br><br>`;
        dataContainer.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Call the fetchDataAndDisplay function when the page loads
window.addEventListener('load', fetchDataAndDisplay);

  // Handle contact form submission
  document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form data from the contact form
    const contactFormData = {
      full_name: document.getElementById('full_name').value,
      email_address: document.getElementById('email_address').value,
      mobile_number: document.getElementById('mobile_number').value,
      email_subject: document.getElementById('email_subject').value,
      message: document.getElementById('message').value
    };

    // Send form data to the server
    fetch('http://127.0.0.1:4000/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactFormData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        console.log(result);
        console.log('Server response:', result);

        // Display a success message
        const successMessageDiv = document.getElementById('contact-success-message');
        console.log(successMessageDiv); //  log statement
        console.log('Setting success message content:', 'Form submitted successfully!');

        successMessageDiv.textContent = 'Form submitted successfully!';
        successMessageDiv.style.display = 'block';

        // Reset the form fields
        document.getElementById('contact-form').reset();

        // Hide the success message after a few seconds (optional)
        setTimeout(() => {
          successMessageDiv.style.display = 'none';
        }, 5000); // Display for 5 seconds
      })
      .catch(error => {
        console.error('Error submitting contact form:', error);
        console.log('Server response:', error.response);
        // You can display an error message to the user if form submission fails
      });
  });



 
    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', (event) => {
      event.preventDefault();
      
      // Get form data from the login form
      const admin_name = document.getElementById('admin_name').value;
      const admin_pass = document.getElementById('admin_pass').value;
      
      // Send login data to the server
      fetch('http://127.0.0.1:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ admin_name, admin_pass })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Login failed.');
          }
          return response.json();
        })
        .then(data => {
          // Redirect to page2.html on successful login
          window.location.href = '/page2.html';
        })
        .catch(error => {
          console.error('Error:', error);
          // Show error message to the user (optional)
          alert('Login failed. Please check your credentials.');
        });
    });

   
    


});


  
 

  