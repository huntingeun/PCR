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

// Function to get the full code from the inputs
function getCode() {
    const code = Array.from(document.querySelectorAll(".code-input"))
                      .map(input => input.value)
                      .join('');
    console.log("Entered 7-character code:", code);
}
