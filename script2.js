// Function to extract query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fetch data from the JSON file
async function fetchData() {
    try {
        const response = await fetch('data.json'); // Ensure this path is correct
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON data. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
        return [];
    }
}

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
        document.getElementById('userCode').textContent = 'NO MATCHING DATA FOUND...';
        document.getElementById('dynamicName').textContent = 'UNKNOWN';
        document.getElementById('dynamicImage').src = '/images/default-image.png'; // Optional fallback image
    }
}

// Load the user data on page load
loadUserData();