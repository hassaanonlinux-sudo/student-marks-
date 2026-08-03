const STORAGE_KEY = 'studentMarksCalculator';

const classSelect = document.getElementById('Class');
const calculateBtn = document.getElementById('calculateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const infoPage = document.querySelector('.info-page');

const subjectDefinitions = {
  Science: [
    { id: 'english', label: 'English' },
    { id: 'math', label: 'Math' },
    { id: 'urdu', label: 'Urdu' },
    { id: 'islamiat', label: 'Islamiat / Pak Studies' },
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'biology', label: 'Biology' },
    { id: 'Tarjama-tul-quran', label: 'Tarjama-tul-quran' }
  ],
  Arts: [
    { id: 'english', label: 'English' },
    { id: 'math', label: 'Math' },
    { id: 'urdu', label: 'Urdu' },
    { id: 'islamiat', label: 'Islamiat' },
    { id: 'physics', label: 'Science' },
    { id: 'chemistry', label: 'Civics' },
    { id: 'biology', label: 'History' },
    { id: 'Tarjama-tul-quran', label: 'Tarjama-tul-quran' }
  ],
  ICS: [
    { id: 'english', label: 'English' },
    { id: 'math', label: 'Math' },
    { id: 'urdu', label: 'Urdu' },
    { id: 'islamiat', label: 'Islamiat / Pak Studies' },
    { id: 'physics', label: 'Physics / Statistics' },
    { id: 'biology', label: 'Computer Science' },
    { id: 'Tarjama-tul-quran', label: 'Tarjama-tul-Quran' }
  ],
  'PRE-MEDICAL': [
    { id: 'english', label: 'English' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'urdu', label: 'Urdu' },
    { id: 'islamiat', label: 'Islamiat / Pak Studies' },
    { id: 'physics', label: 'Physics' },
    { id: 'biology', label: 'Biology' },
    { id: 'Tarjama-tul-quran', label: 'Tarjama-tul-Quran' }
  ],
  'PRE-ENG': [
    { id: 'english', label: 'English' },
    { id: 'math', label: 'Math' },
    { id: 'urdu', label: 'Urdu' },
    { id: 'islamiat', label: 'Islamiat / Pak Studies' },
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'biology', label: 'Biology' },
    { id: 'Tarjama-tul-quran', label: 'Tarjama-tul-Quran' }
  ]
};

const classGroups = {
  '9th': ['Science', 'Arts'],
  '10th': ['Science', 'Arts'],
  Matric: ['Science', 'Arts'],
  '11th': ['ICS', 'PRE-MEDICAL', 'PRE-ENG'],
  '12th': ['ICS', 'PRE-MEDICAL', 'PRE-ENG'],
  Intermediate: ['ICS', 'PRE-MEDICAL', 'PRE-ENG']
};

function getSavedData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    return {};
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getCurrentInputs() {
  const name = document.querySelector('#name')?.value || '';
  const roll = document.querySelector('#rollno')?.value || '';
  const classVal = classSelect?.value || '';
  const group = document.querySelector('#group')?.value || '';

  const marks = {};
  const subjectList = group ? subjectDefinitions[group] || [] : [];
  subjectList.forEach((subject) => {
    const input = document.querySelector(`#${subject.id}`);
    if (input) {
      marks[subject.id] = input.value || '';
    }
  });

  return { name, roll, classVal, group, marks };
}

function saveInputs() {
  const data = getSavedData();
  data.inputs = getCurrentInputs();
  saveData(data);
}

function saveResult(result) {
  const data = getSavedData();
  data.result = result;
  saveData(data);
}

function loadSavedInputs() {
  const saved = getSavedData();
  if (!saved.inputs) {
    return;
  }

  document.querySelector('#name').value = saved.inputs.name || '';
  document.querySelector('#rollno').value = saved.inputs.roll || '';

  if (saved.inputs.classVal) {
    classSelect.value = saved.inputs.classVal;
    buildGroupSelect(saved.inputs.classVal);
  }

  if (saved.inputs.group) {
    const groupSelect = document.querySelector('#group');
    if (groupSelect) {
      groupSelect.value = saved.inputs.group;
      buildSubjectInputs(saved.inputs.group);
    }
  }

  const marks = saved.inputs.marks || {};
  Object.keys(marks).forEach((id) => {
    const input = document.querySelector(`#${id}`);
    if (input) {
      input.value = marks[id];
    }
  });
}

function buildGroupSelect(classVal) {
  const existingGroup = document.querySelector('.groups');
  if (existingGroup) {
    existingGroup.remove();
  }

  const groups = classGroups[classVal] || [];
  if (groups.length === 0) {
    removeSubjectInputs();
    return;
  }

  const groupsDiv = document.createElement('div');
  groupsDiv.className = 'groups';

  const select = document.createElement('select');
  select.name = 'groups';
  select.id = 'group';

  const option = document.createElement('option');
  option.value = '';
  option.disabled = true;
  option.selected = true;
  option.textContent = 'Select Group';
  select.appendChild(option);

  groups.forEach((group) => {
    const optionElement = document.createElement('option');
    optionElement.value = group;
    optionElement.textContent = group;
    select.appendChild(optionElement);
  });

  groupsDiv.appendChild(select);
  document.querySelector('.selections').appendChild(groupsDiv);
  removeSubjectInputs();
}

function removeSubjectInputs() {
  const subjectSection = document.querySelector('.subjects');
  if (subjectSection) {
    subjectSection.remove();
  }
}

function buildSubjectInputs(groupVal) {
  removeSubjectInputs();
  const subjects = subjectDefinitions[groupVal];
  if (!subjects) {
    return;
  }

  const subjectsDiv = document.createElement('div');
  subjectsDiv.className = 'subjects';

  subjects.forEach((subject) => {
    const group = document.createElement('div');
    group.className = 'input-group';

    const label = document.createElement('label');
    label.setAttribute('for', subject.id);
    label.textContent = subject.label;

    const input = document.createElement('input');
    input.type = 'number';
    input.id = subject.id;
    input.placeholder = 'Marks';
    input.min = '0';
    input.step = 'any';
    input.addEventListener('input', saveInputs);

    group.append(label, input);
    subjectsDiv.appendChild(group);
  });

  const btnDiv = document.querySelector('.btn');
  infoPage.insertBefore(subjectsDiv, btnDiv);
}

function validateForm({ name, roll, classVal, group, marks }) {
  if (!name.trim() || !roll.trim() || !classVal || !group) {
    alert('Please fill in all student information fields!');
    return false;
  }

  const required = subjectDefinitions[group] || [];
  for (const subject of required) {
    const value = marks[subject.id];
    if (value === undefined || value === '' || isNaN(Number(value))) {
      alert('Please fill in all marks fields with valid numbers!');
      return false;
    }
    if (Number(value) < 0) {
      alert('Marks cannot be negative.');
      return false;
    }
  }

  return true;
}

function calculateResult({ name, roll, classVal, group, marks }) {
  const subjectList = subjectDefinitions[group] || [];
  const obtainedMarks = subjectList.reduce((sum, subject) => {
    return sum + Number(marks[subject.id] || 0);
  }, 0);

  let totalMarks = 0;
  if (classVal === '9th' || classVal === '10th') {
    totalMarks = 550;
  } else if (classVal === '11th' || classVal === '12th') {
    totalMarks = 550;
  } else if (classVal === 'Matric' || classVal === 'Intermediate') {
    totalMarks = 1100;
  }

  if (obtainedMarks > totalMarks) {
    alert('Obtained marks cannot be greater than total marks.');
    return null;
  }

  const percentage = totalMarks === 0 ? 0 : (obtainedMarks / totalMarks) * 100;
  let gpa = 0;
  if (percentage >= 80) gpa = 4.0;
  else if (percentage >= 70) gpa = 3.0;
  else if (percentage >= 60) gpa = 2.0;
  else if (percentage >= 50) gpa = 1.0;
  else gpa = 0.0;

  const status = percentage >= 40 ? 'Pass' : 'Fail';

  return {
    name,
    roll,
    classVal,
    group,
    marks,
    totalMarks,
    obtainedMarks,
    percentage: Number(percentage.toFixed(2)),
    gpa: Number(gpa.toFixed(1)),
    status
  };
}

function renderResult(result) {
  const existing = document.querySelector('.result-card');
  if (existing) {
    existing.remove();
  }

  const section = document.createElement('section');
  section.className = 'result-card';

  const heading = document.createElement('h2');
  heading.textContent = 'Result Card';

  const studentResult = document.createElement('div');
  studentResult.className = 'student-result';

  const appendItem = (labelText, valueText) => {
    const item = document.createElement('div');
    item.className = 'result-item';

    const label = document.createElement('h3');
    label.textContent = labelText;

    const value = document.createElement('span');
    value.textContent = valueText;

    item.append(label, value);
    studentResult.appendChild(item);
  };

  appendItem('Name:', result.name);
  appendItem('Roll No:', result.roll);
  appendItem('Class:', result.classVal);
  appendItem('Group:', result.group);
  appendItem('Total Marks', result.totalMarks);
  appendItem('Obtained Marks', result.obtainedMarks);
  appendItem('Percentage', `${result.percentage.toFixed(2)}%`);
  appendItem('GPA', result.gpa.toFixed(1));

  const statusDiv = document.createElement('div');
  statusDiv.className = 'status';

  const statusInput = document.createElement('input');
  statusInput.type = 'text';
  statusInput.id = 'status';
  statusInput.readOnly = true;
  statusInput.value = result.status;
  statusInput.style.color = 'white';
  statusInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';

  if (result.status === 'Pass') {
    statusInput.style.background = 'linear-gradient(135deg, #11998e, #38ef7d)';
    statusInput.style.boxShadow = '0 8px 25px rgba(56, 239, 125, 0.3)';
  } else {
    statusInput.style.background = 'linear-gradient(135deg, #eb3349, #f45c43)';
    statusInput.style.boxShadow = '0 8px 25px rgba(244, 92, 67, 0.3)';
  }

  statusDiv.appendChild(statusInput);
  section.append(heading, studentResult, statusDiv);
  document.body.appendChild(section);
}

function downloadPdf() {
  const saved = getSavedData();
  const result = saved.result;
  if (!result) {
    alert('Please generate result first!');
    return;
  }

  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert('Download is not available because jsPDF failed to load.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 40;
  let position = 60;

  pdf.setFontSize(22);
  pdf.text('Student Result', margin, position);
  position += 30;

  pdf.setFontSize(12);
  const lines = [
    `Name: ${result.name}`,
    `Roll No: ${result.roll}`,
    `Class: ${result.classVal}`,
    `Group: ${result.group}`,
    `Total Marks: ${result.totalMarks}`,
    `Obtained Marks: ${result.obtainedMarks}`,
    `Percentage: ${result.percentage.toFixed(2)}%`,
    `GPA: ${result.gpa.toFixed(1)}`,
    `Status: ${result.status}`
  ];

  lines.forEach((line) => {
    pdf.text(line, margin, position);
    position += 20;
  });

  pdf.save('student-result.pdf');
}

function initialize() {
  loadSavedInputs();
  const saved = getSavedData();
  if (saved.result) {
    renderResult(saved.result);
  }
}

classSelect.addEventListener('change', (event) => {
  const classVal = event.target.value;
  buildGroupSelect(classVal);
  saveInputs();
});

document.body.addEventListener('change', (event) => {
  if (event.target.matches('#group')) {
    buildSubjectInputs(event.target.value);
    saveInputs();
  }
});

infoPage.addEventListener('input', (event) => {
  if (event.target.matches('#name, #rollno, .subjects input')) {
    saveInputs();
  }
});

calculateBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const inputs = getCurrentInputs();
  if (!validateForm(inputs)) {
    return;
  }

  const result = calculateResult(inputs);
  if (!result) {
    return;
  }

  renderResult(result);
  saveResult(result);
  saveInputs();
});

downloadBtn.addEventListener('click', (event) => {
  event.preventDefault();
  downloadPdf();
});

initialize();
