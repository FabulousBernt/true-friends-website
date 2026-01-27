/**
 * Utility functions for testing tools
 * Consolidates common functionality to reduce code duplication
 */

/**
 * Copy text to clipboard with visual feedback
 * @param {string} text - Text to copy
 * @param {HTMLElement} button - Button element to show feedback on
 * @param {string} successMessage - Message to show on success (default: "Copied to clipboard!")
 * @param {number} duration - Duration to show feedback in ms (default: 1500)
 */
export function copyToClipboard(
  text,
  button,
  successMessage = "Copied to clipboard!",
  duration = 1500
) {
  if (!text) {
    showButtonFeedback(button, "Nothing to copy!", "#F05BB5", duration);
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      showButtonFeedback(button, successMessage, "#02F5D4", duration);
    })
    .catch(() => {
      showButtonFeedback(button, "Failed to copy!", "#F05BB5", duration);
    });
}

/**
 * Show temporary feedback on button
 * @param {HTMLElement} button - Button element
 * @param {string} message - Message to display
 * @param {string} color - Color for the message
 * @param {number} duration - Duration to show message in ms
 */
export function showButtonFeedback(button, message, color, duration = 1500) {
  const originalText = button.textContent;
  const originalColor = button.style.color;

  button.textContent = message;
  button.style.color = color;

  setTimeout(() => {
    button.textContent = originalText;
    button.style.color = originalColor;
  }, duration);
}

/**
 * Create a label-input pair
 * @param {string} labelText - Label text
 * @param {object} inputConfig - Input configuration (type, value, min, max, etc.)
 * @returns {HTMLElement} Label element with appended input
 */
export function createLabeledInput(labelText, inputConfig = {}) {
  const label = document.createElement("label");
  label.classList.add("tool-label");
  label.textContent = labelText;

  const input = document.createElement("input");
  Object.assign(input, inputConfig);
  input.classList.add("tool-input");

  label.appendChild(input);
  return { label, input };
}

/**
 * Create a button with optional classes
 * @param {string} text - Button text
 * @param {string[]} classes - CSS classes to apply
 * @returns {HTMLElement} Button element
 */
export function createButton(text, classes = []) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(...classes);
  return button;
}

/**
 * Create a button group container
 * @param {HTMLElement[]} buttons - Button elements
 * @returns {HTMLElement} Container div with buttons
 */
export function createButtonGroup(buttons) {
  const container = document.createElement("div");
  container.classList.add("btn-group");
  buttons.forEach((btn) => container.appendChild(btn));
  return container;
}

/**
 * Create a status message element
 * @param {string} message - Message text
 * @param {string} type - Message type: 'success', 'error', or 'info'
 * @returns {HTMLElement} Status div
 */
export function createStatusMessage(message, type = "info") {
  const status = document.createElement("div");
  status.classList.add("status-message", type);
  status.textContent = message;
  return status;
}

/**
 * Validate number input within range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {object} { isValid, error }
 */
export function validateNumberInput(value, min = 1, max = Infinity) {
  const num = Number(value);

  if (isNaN(num) || num < min) {
    return {
      isValid: false,
      error: `Please enter a valid number greater than ${min - 1}.`,
    };
  }

  if (num > max) {
    return {
      isValid: false,
      error: `Maximum ${max.toLocaleString()} characters allowed.`,
    };
  }

  return { isValid: true, error: null };
}

/**
 * Create a pre-formatted output element
 * @param {string} content - Content to display
 * @returns {HTMLElement} Pre element
 */
export function createOutput(content = "") {
  const output = document.createElement("pre");
  output.classList.add("tool-output");
  output.textContent = content;
  return output;
}

/**
 * Throttle function execution
 * @param {function} func - Function to throttle
 * @param {number} delay - Delay in ms
 * @returns {function} Throttled function
 */
export function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  };
}

/**
 * Debounce function execution
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in ms
 * @returns {function} Debounced function
 */
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
