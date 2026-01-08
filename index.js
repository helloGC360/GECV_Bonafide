var message;
const form = document.getElementById("studentForm");

//bonafide fill detail
const ltrNoSpan = document.getElementById("ltrNo");
const dateSpan = document.getElementById("date");
const titleSpan = document.getElementById("title");
const nameField = document.getElementById("nameField");
const regNoField = document.getElementById("regNoField");
const branchFields = document.getElementById("branchField");
const academicYearField = document.getElementById("academicYearField");
const semesterField = document.getElementById("semesterField");


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const studentName = document.getElementById("student_name").value;
  const registrationNo = document.getElementById("registration_no").value;
  const branch = document.querySelector('input[name="branch"]:checked')?.value || "";
  const academicYear = document.getElementById("academic_year").value;
  const semester = document.getElementById("semester").value;
  const gender = document.getElementById("gender").value;
  

  if (!(validateForm(studentName, registrationNo, branch, academicYear, semester , gender))) {
    return;
  }
  // Show loader
  showLoader();

  // Simulate form submission delay
  setTimeout(() => {
    hideLoader();

    ltrNoSpan.innerText = "GEC/ACAD/BD/" + Math.floor(1000 + Math.random() * 9000);
    const today = new Date();
    const formattedDate = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
    dateSpan.innerText = formattedDate;
    titleSpan.innerText = titleSelector(gender);
    nameField.innerText = " " + studentName.replace(/^Mr\. |^Ms\. /, '');
    regNoField.innerText = registrationNo;
    let branchName = branchFullForm(branch);
    branchFields.innerText = branchName;
    academicYearField.innerText = academicYear;
    semesterField.innerText = semesterFormater(semester);

    enableDownload();
    popupMsg("Form submitted successfully!");
  }, 2000);

});






function validateForm(studentName, registrationNo, branch, academicYear, semester , gender) {
  if (studentName === "" || studentName.length < 3) {
    popupMsg("Name must be at least 3 characters long");
    return false;
  }

  if (registrationNo === "") {
    popupMsg("Please enter registration number");
    return false;
  }

  if (!branch) {
    popupMsg("Please select a course / branch");
    return false;
  }

  if (academicYear === "") {
    popupMsg("Please select academic year");
    return false;
  }

  if (semester === "") {
    popupMsg("Please select semester");
    return false;
  }

  if (!/^[a-zA-Z\s.]+$/.test(studentName)) {
    popupMsg("plz enter valid name");
    return false;
  }

  if (gender === "") {
    popupMsg("Please select gender");
    return false;
  }

  return true;
}







function popupMsg(msg) {

  const popupBox = document.getElementById("popupBox");
  const popupMessage = document.getElementById("popupText");
  popupMessage.innerText = msg;
  popupBox.style.display = "block";
  setTimeout(() => {
    popupBox.style.display = "none";
  }, 3000);

}

closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", () => {
  const popupBox = document.getElementById("popupBox");
  popupBox.style.display = "none";
});




function hideLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}

function showLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "flex";
}


function branchFullForm(branch) {
  switch (branch) {
    case "CSE":
      return "Computer Science & Engineering";
    case "CSE(iot)":
      return "Computer Science & Engineering (IoT)";
    case "ECE":
      return "Electronics & Communication Engineering";
    case "ACT":
      return "Electronics & Communication Engineering (ACT)";
    case "ME":
      return "Mechanical Engineering";
    case "CE":
      return "Civil Engineering";
    case "EE":
      return "Electrical Engineering";
    case "FT":
      return "Food Technology";
    default:
      return "";
  }
}


function titleSelector(gender) {
  if (gender === "Male") {
    return "Mr.";
  } else {
    return "Ms.";
  }
}


function semesterFormater(semester) {
  const semNum = parseInt(semester);
  if (isNaN(semNum) || semNum < 1 || semNum > 8) {
    return "";
  }
  const suffixes = ["st", "nd", "rd", "th", "th", "th", "th", "th"];
  return semNum + suffixes[semNum - 1];
}   




function enableDownload() {
  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.style.display = "block";
}




function downloadPDF() {
  const element = document.getElementById("bonafideContainer");
  const opt = {
    margin: 0, 
    filename: `Bonafide_${regNoField.innerText.trim()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },

    html2canvas: {
      scale: 2,
      scrollY: 0,
      windowHeight: element.scrollHeight 
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: ['avoid-all'] } 
  };

  html2pdf().set(opt).from(element).save();
}


const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      downloadPDF();
}); 

