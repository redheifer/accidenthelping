document.addEventListener('DOMContentLoaded', function() {
  let currentStep = 1;
  const formData = {
    accidentType: null,
    hadMedicalVisit: null,
    hasAttorney: null,
    atFault: null,
    timing: null,
    description: '',
    zipCode: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  function showStep(stepNumber) {
    document.querySelectorAll('.form-step').forEach(step => {
      step.classList.add('hidden');
    });
    document.getElementById(`step${stepNumber}`).classList.remove('hidden');
    updateProgress(stepNumber);
  }

  function updateProgress(step) {
    const progressValues = {
      1: 11,
      2: 22,
      3: 33,
      4: 44,
      5: 55,
      6: 66,
      7: 77,
      8: 88,
      9: 99
    };
    
    const progressBar = document.querySelector(`#step${step} .progress-indicator`);
    if (progressBar) {
      progressBar.style.width = `${progressValues[step]}%`;
    }
  }

  function validateZipCode(zip) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }

  // Event Listeners for Step 1: Accident Type Selection
  document.querySelectorAll('.accident-type-card').forEach(card => {
    card.addEventListener('click', function() {
      formData.accidentType = this.dataset.type;
      document.querySelectorAll('.accident-type-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      setTimeout(() => {
        currentStep++;
        showStep(currentStep);
      }, 300);
    });
  });

  // Event Listeners for Step 2: Medical Visit
  document.querySelectorAll('#step2 .option-card').forEach(card => {
    card.addEventListener('click', function() {
      formData.hadMedicalVisit = this.dataset.value === 'yes';
      document.querySelectorAll('#step2 .option-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      setTimeout(() => {
        currentStep++;
        showStep(currentStep);
      }, 300);
    });
  });

  // ... Additional event listeners for other steps

  // Handle form submission
  function handleSubmit() {
    console.log('Form submitted with data:', formData);
    // Add your form submission logic here
  }

  // Initialize the form
  showStep(1);
});