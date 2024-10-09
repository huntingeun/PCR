// Function to update the HTML dynamically with the data from JSON
async function loadUserData() {
    const code = getQueryParam('code'); // Get the code from the URL
    const data = await fetchData(); // Fetch data from JSON

    if (!code) {
        document.getElementById('userCode').textContent = 'No code provided';
        return;
    }

    // Find the user by matching the code from the JSON data
    const userData = data.find(entry => entry.code === code);

    if (userData) {
        // If user data is found, update the page content
        document.getElementById('userCode').textContent = userData.code;
        document.getElementById('dynamicName').textContent = userData.name;
        document.getElementById('dynamicImage').src = userData.image;
    } else {
        // If no matching user is found, show an error message
        document.getElementById('userCode').textContent = 'No matching data found';
        document.getElementById('dynamicName').textContent = 'Unknown';
        document.getElementById('dynamicImage').src = '/images/default-image.jpg'; // Optional fallback image
    }
}

// Load the user data on page load
loadUserData();