// script.js
document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll(".code-input");

    // Add event listeners to each input field
    inputs.forEach((input, index) => {
        // Move to the next input when a character is entered
        input.addEventListener("input", () => {
            // If a single character is entered, move to the next input
            if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();  // Move to the next input
            }
        });

        // Handle backspace to move to the previous input
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && input.value.length === 0 && index > 0) {
                inputs[index - 1].focus();  // Move to the previous input
            }
        });

        // Allow only alphanumeric characters (both letters and numbers)
        input.addEventListener("input", (e) => {
            // Regular expression to allow only alphanumeric characters (A-Z, a-z, 0-9)
            input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
        });
    });
});


// Function to get the code entered by the user
function getCode() {
    // Combine the values from each input into a single string
    const code = [
        document.getElementById('digit-1').value,
        document.getElementById('digit-2').value,
        document.getElementById('digit-3').value,
        document.getElementById('digit-4').value,
        document.getElementById('digit-5').value,
        document.getElementById('digit-6').value,
        document.getElementById('digit-7').value
    ].join('');

    // Call function to validate the code
    validateCode(code);
}

// Fetch the JSON file with valid codes
async function fetchValidCodes() {
    try {
        const response = await fetch('data.json'); // Path to the JSON file
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading the JSON file:', error);
        return [];
    }
}

// Function to validate the code
async function validateCode(inputCode) {
    const validCodes = await fetchValidCodes(); // Fetch valid codes from JSON

    // Check if the input code matches any valid code
    const codeFound = validCodes.some(entry => entry.code === inputCode);

    if (codeFound) {
        // Code is valid, proceed to result.html
        window.location.href = `result.html?code=${inputCode}`;
    } else {
        // Code is invalid, show error message
        document.getElementById('errorMessage').style.display = 'block';
    }
}

// Function to adjust the height of the container dynamically
function setContainerHeight() {
// Get the height of the viewport
const viewportHeight = window.innerHeight;
// Get the height of the header (60px in this case)
const headerHeight = document.querySelector('header').offsetHeight;
// Set the container height to fill the remaining space
const containerHeight = viewportHeight - headerHeight;

// Apply the calculated height to the container
document.querySelector('.container').style.height = `${containerHeight}px`;
}

// Set the height on page load
setContainerHeight();

// Update the height on resize (for keyboard appearance, screen rotation, etc.)
window.addEventListener('resize', setContainerHeight);