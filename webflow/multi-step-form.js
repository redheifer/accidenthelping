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

  // Add click handlers for accident type cards
  document.querySelectorAll('.accident-type-card').forEach(card => {
    card.addEventListener('click', function() {
      // Remove selected class from all cards
      document.querySelectorAll('.accident-type-card').forEach(c => {
        c.classList.remove('selected');
      });
      
      // Add selected class to clicked card
      this.classList.add('selected');
      
      // Store the selected type
      formData.accidentType = this.dataset.type;
      
      // Proceed to next step after a short delay
      setTimeout(() => {
        currentStep++;
        showStep(currentStep);
      }, 300);
    });
  });

  function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
      step.classList.add('hidden');
    });
    
    // Show current step
    const currentStepElement = document.getElementById(`step${stepNumber}`);
    if (currentStepElement) {
      currentStepElement.classList.remove('hidden');
    }
    
    // Update progress bar
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
    
    const progressBar = document.querySelector('.progress-indicator');
    if (progressBar) {
      progressBar.style.width = `${progressValues[step]}%`;
    }
  }

  // Initialize the form
  showStep(1);
});