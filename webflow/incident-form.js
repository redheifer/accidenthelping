document.addEventListener('DOMContentLoaded', function() {
  const description = document.getElementById('incidentDescription');
  const zipCode = document.getElementById('zipCode');
  const nextButton = document.getElementById('nextButton');
  const zipError = document.getElementById('zipError');
  const currentLength = document.getElementById('currentLength');
  const compensationAmount = document.getElementById('compensationAmount');

  let currentRange = {
    min: 75000,
    max: 125000
  };

  function validateZipCode(zip) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
  }

  function updateButtonState() {
    const isDescriptionValid = description.value.length >= 20;
    const isZipValid = validateZipCode(zipCode.value);
    nextButton.disabled = !isDescriptionValid || !isZipValid;
  }

  function handleDescriptionChange() {
    const length = description.value.length;
    currentLength.textContent = length;

    if (length >= 100) {
      currentRange = {
        min: 65000,
        max: 105000
      };
      compensationAmount.textContent = `$${currentRange.min.toLocaleString()} - $${currentRange.max.toLocaleString()}`;
    }

    updateButtonState();
  }

  function handleZipCodeChange() {
    const newZip = zipCode.value;
    
    if (newZip && !validateZipCode(newZip)) {
      zipError.textContent = "Please enter a valid US ZIP code (e.g., 12345 or 12345-6789)";
    } else {
      zipError.textContent = "";
    }

    updateButtonState();
  }

  function handleSubmit() {
    if (!validateZipCode(zipCode.value)) {
      zipError.textContent = "Please enter a valid US ZIP code before continuing";
      return;
    }

    // Here you can add your form submission logic
    console.log('Form submitted with:', {
      description: description.value,
      zipCode: zipCode.value
    });
  }

  description.addEventListener('input', handleDescriptionChange);
  zipCode.addEventListener('input', handleZipCodeChange);
  nextButton.addEventListener('click', handleSubmit);

  // Set initial progress bar width
  const progressIndicator = document.querySelector('.progress-indicator');
  progressIndicator.style.width = '55%';
});