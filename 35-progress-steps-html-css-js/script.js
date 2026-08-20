const steps = Array.from(document.querySelectorAll('.step'));
const panels = Array.from(document.querySelectorAll('.panel'));
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentStep = 1;
const totalSteps = steps.length;

function update() {
  const activeIndex = currentStep - 1;

  steps.forEach((step, i) => {
    step.classList.toggle('done', i < activeIndex);
    step.classList.toggle('active', i === activeIndex);
  });

  panels.forEach((panel, i) => {
    panel.classList.toggle('active', i === activeIndex);
  });

  const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
  progressFill.style.width = percent + '%';

  prevBtn.disabled = currentStep === 1;
  nextBtn.textContent = currentStep === totalSteps ? 'Finish' : 'Next';
  nextBtn.disabled = currentStep === totalSteps;
}

prevBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep -= 1;
    update();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentStep < totalSteps) {
    currentStep += 1;
    update();
  }
});

update();