// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATa1uDqTlJq6Pl-4wPAW_xOzIKUaJjlYw",
  authDomain: "rapid-d73f9.firebaseapp.com",
  projectId: "rapid-d73f9",
  storageBucket: "rapid-d73f9.appspot.com",
  messagingSenderId: "722202937446",
  appId: "1:722202937446:web:08caae55eb717b1c8f85a7",
  measurementId: "G-EJMGG6Q6B5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    
    // Get form values
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    // Save to Firebase
    db.collection('submissions').add({
        name: name,
        email: email,
        message: message
    }).then(() => {
        alert('Message sent!');
        document.getElementById('contactForm').reset();
    }).catch(err => {
        console.error('Error saving document: ', err);
    });
}

// Display submissions on submissions.html
const submissionsList = document.getElementById('submissionsList');
if (submissionsList) {
    db.collection('submissions').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            let data = doc.data();
            submissionsList.innerHTML += `<p><strong>${data.name}</strong> (${data.email}): ${data.message}</p>`;
        });
    });
}
