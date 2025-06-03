'use strict';

// Función para calcular el promedio de un arreglo de números
function average(scores) {
  if (!Array.isArray(scores) || scores.length === 0) return 0;
  const sum = scores.reduce((a, b) => a + b, 0);
  return sum / scores.length;
}

// Función para normalizar una nota de "bit-1" si tiene arreglo de 10 números
function normalizeBit1Score(score) {
  if (Array.isArray(score) && score.length === 10) {
    const sum = score.reduce((a, b) => a + b, 0);
    return (sum / 2); 
  } else if (Array.isArray(score)) {
    const avg = average(score);
    return avg / 2;
  } else if (typeof score === 'number') {
    return score / 2;
  }
  return 0;
}


function formatScore(score) {
  return parseFloat(score).toFixed(1);
}

// Función para calcular el promedio general de todos los proyectos de un estudiante (escala 1-5)
function averageScore(projects) {
  let total = 0;
  let count = 0;

  for (const project of projects) {
    let scoreValue;

    if (project.name === 'bit-1') {
      scoreValue = normalizeBit1Score(project.score);
    } else {
      scoreValue = average(project.score);
    }

    total += scoreValue;
    count++;
  }

  const avg = count ? total / count : 0;
  return formatScore(avg);
}

// Función para renderizar la lista de proyectos con sus notas
function renderProjectScores(projects) {
  if (!Array.isArray(projects) || projects.length === 0) {
    return '<p class="card-text"><strong>Proyectos:</strong> Ninguno</p>';
  }

  const listItems = projects.map(project => {
    let scoreValue;

    if (project.name === 'bit-1') {
      scoreValue = normalizeBit1Score(project.score);
    } else {
      scoreValue = average(project.score);
    }

    return `<li>${project.name}: ${formatScore(scoreValue)} / 5</li>`;
  }).join('');

  return `
    <p class="card-text mb-1"><strong>Notas por proyecto:</strong></p>
    <ul class="list-unstyled small mb-1">${listItems}</ul>
  `;
}

// Función para crear la tarjeta HTML de un estudiante
function createStudentCard(student) {
  const { student: name, intensity, usernameGithub, projects } = student;
  const avg = averageScore(projects);

  const imgSrc = usernameGithub
    ? `https://github.com/${usernameGithub}.png`
    : 'no-photo.png';

  const card = document.createElement('div');
  card.className = 'col';

  card.innerHTML = `
    <div class="card h-100 shadow-sm">
      <div class="d-flex justify-content-center mt-3">
        <img src="${imgSrc}" alt="Foto de ${name}" class="rounded-circle" width="100" height="100" loading="lazy" onerror="this.onerror=null;this.src='no-photo.png';" />
      </div>
      <div class="card-body text-center">
        <h5 class="card-title">${name}</h5>
        <p class="card-text mb-1"><strong>Intensidad:</strong> ${intensity}</p>
        <p class="card-text mb-1"><strong>Promedio proyectos:</strong> ${avg} / 5</p>
        ${renderProjectScores(projects)}
        ${
          usernameGithub
            ? `<a href="https://github.com/${usernameGithub}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm mt-2">GitHub</a>`
            : ''
        }
      </div>
    </div>
  `;

  return card;
}

// Función para cargar el JSON y mostrar las tarjetas
async function loadStudents() {
  try {
    const response = await fetch('students.json');
    const data = await response.json();

    const withGithub = data.filter(s => s.usernameGithub);
    const withoutGithub = data.filter(s => !s.usernameGithub);

    withGithub.sort((a, b) => a.student.localeCompare(b.student));
    withoutGithub.sort((a, b) => a.student.localeCompare(b.student));

    const container = document.getElementById('students-container');
    container.innerHTML = '';

    withGithub.forEach(student => {
      container.appendChild(createStudentCard(student));
    });

    withoutGithub.forEach(student => {
      container.appendChild(createStudentCard(student));
    });
  } catch (error) {
    console.error('Error cargando el archivo JSON:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadStudents);
