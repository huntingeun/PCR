// Function to extract query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the code from the query parameters and display it
const code = getQueryParam('code');

// Display the code dynamically
if (code) {
    document.getElementById('userCode').textContent = code;
} else {
    document.getElementById('userCode').textContent = 'No code provided';
}