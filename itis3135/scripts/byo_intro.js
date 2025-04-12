const coursesContainer = document.getElementById('courses-container');
const addCourseBtn = document.getElementById('add-course-btn');
const resetBtn = document.getElementById("reset-btn");
const submitBtn = document.getElementById("submit-btn");
const container = document.getElementById("byo-intro-container");
const title = document.getElementById("byo-intro-h2");
const subtitle = document.getElementById("byo-intro-subtitle");

addCourseBtn.addEventListener('click', function() {

  const courseDiv = document.createElement('div');
  courseDiv.classList.add('course-entry');

  const titleBlock = document.createElement('div');
  titleBlock.classList.add('course-title-block');
  
  const courseTitleLabel = document.createElement('label');
  courseTitleLabel.textContent = 'Course Title:';
  courseTitleLabel.classList.add('block-label');
  
  const courseTitleInput = document.createElement('input');
  courseTitleInput.type = 'text';
  courseTitleInput.required = true;
  courseTitleInput.classList.add('course-title');
  
  titleBlock.appendChild(courseTitleLabel);
  titleBlock.appendChild(courseTitleInput);

  const reasonBlock = document.createElement('div');
  reasonBlock.classList.add('course-reason-block');

  const courseDescLabel = document.createElement('label');
  courseDescLabel.textContent = 'Reason for taking the course:';
  courseDescLabel.classList.add('block-label');
  
  const courseDescTextarea = document.createElement('textarea');
  courseDescTextarea.required = true;
  courseDescTextarea.classList.add('course-reason');
  
  reasonBlock.appendChild(courseDescLabel);
  reasonBlock.appendChild(courseDescTextarea);

  const buttonBlock = document.createElement('div');
  buttonBlock.classList.add('course-button-row');

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.textContent = 'Delete Course';
  deleteBtn.classList.add('delete-course-btn');
  deleteBtn.style.marginTop = '-15px';
  deleteBtn.style.backgroundColor = '#f9dbd5';
  deleteBtn.addEventListener('click', function() {
    coursesContainer.removeChild(courseDiv);
  });
  
  buttonBlock.appendChild(deleteBtn);

  courseDiv.appendChild(titleBlock);
  courseDiv.appendChild(reasonBlock);
  courseDiv.appendChild(buttonBlock);

  coursesContainer.appendChild(courseDiv);
});

const form = document.getElementById('byo-intro-form');
const generatedContent = document.getElementById('generated-content');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name-input').value;
  const mascot = document.getElementById('mascot-input').value;
  const imageInput = document.getElementById('image-input');
  const file = imageInput.files[0];
  let imageURL = '';
  if (file) {
    imageURL = URL.createObjectURL(file);
  }
  const caption = document.getElementById('caption-input').value;
  const personal = document.getElementById('personal-input').value;
  const professional = document.getElementById('professional-input').value;
  const academic = document.getElementById('academic-input').value;
  const webdev = document.getElementById('webdev-input').value;
  const platform = document.getElementById('computer-platform-input').value;
  const funny = document.getElementById('funny-input').value;
  const anythingElse = document.getElementById('anything-else').value;

  let coursesHTML = '';
  const courseEntries = coursesContainer.querySelectorAll('.course-entry');
  courseEntries.forEach((entry) => {
    const courseTitle = entry.querySelector('.course-title').value;
    const courseReason = entry.querySelector('.course-reason').value;
    coursesHTML += `<li><strong>${courseTitle}:</strong> ${courseReason}</li>`;
  });

  const generatedHTML = `
    <main>
      <figure>
        <img id="family-picture" src="${imageURL}" alt="family picture">
        <figcaption>${caption}</figcaption>
      </figure>
      <div class="intro-container">
        <ul>
          <li><strong>Personal background:</strong> ${personal}</li>
          <li><strong>Professional background:</strong> ${professional}</li>
          <li><strong>Academic background:</strong> ${academic}</li>
          <li><strong>Programming Software Background:</strong> ${webdev}</li>
          <li><strong>Primary Computer Platform: </strong> ${platform}</li>
          <li><strong>Courses I'm in & Why:</strong>
            <ul class="nested-list">
              ${coursesHTML}
            </ul>
          </li>
          <li><strong>Funny/Interesting Item about Yourself:</strong> ${funny}</li>
          <li><strong>I'd also like to Share: </strong> ${anythingElse}</li>
        </ul>
      </div>
      <button style="background-color: #586787; color: white; padding: 10px;" id="back-to-form-btn" type="button">Fill out form again</button>
    </main>
  `;

  form.style.display = 'none';
  container.style.backgroundColor = '#f9dbd5';
  title.textContent = "Introduction";
  container.style.textAlign = "left";
  generatedContent.innerHTML = generatedHTML;
  generatedContent.style.display = 'block';
  subtitle.style.display = "none";

  document.getElementById('back-to-form-btn').addEventListener('click', function() {
    title.textContent = "BYO Intro";
    container.style.textAlign = "center";
    container.style.backgroundColor = '#586787';
    generatedContent.style.display = 'none';
    subtitle.style.display = "block";
    form.style.display = '';
    form.reset();
    coursesContainer.innerHTML = '';
  });
});

resetBtn.addEventListener("click", (event) => {
  event.preventDefault();
  form.reset();
  coursesContainer.innerHTML = '';
});
