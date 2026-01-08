//accessing form to perfomm operations
const form = document.getElementById("studentForm");

//selcting all bonfide fields
const ltrNoSpan = document.getElementById("ltrNo");
const dateSpan = document.getElementById("date");
const titleSpan = document.getElementById("title");
const nameField = document.getElementById("nameField");
const regNoField = document.getElementById("regNoField");
const branchFields = document.getElementById("branchField");
const academicYearField = document.getElementById("academicYearField");
const semesterField = document.getElementById("semesterField");

//form submit event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Get form values
  const studentName = document.getElementById("student_name").value;
  const registrationNo = document.getElementById("registration_no").value;
  const branch = document.querySelector('input[name="branch"]:checked')?.value || "";
  const academicYear = document.getElementById("academic_year").value;
  const semester = document.getElementById("semester").value;
  const gender = document.getElementById("gender").value;
  
  // Validate form
  if (!(validateForm(studentName, registrationNo, branch, academicYear, semester , gender))) {
    return;
  }
  // Showing loader
  showLoader();

  // Simulate form submission delay till its dummy
  setTimeout(() => {
    hideLoader(); //hide loader after submission

    // Populate bonafide fields
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

    enableDownload();//enable download button
    popupMsg("Form submitted successfully!");
  }, 2000);

});





//form validation function
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






//popup message function
function popupMsg(msg) {
  const popupBox = document.getElementById("popupBox");
  const popupMessage = document.getElementById("popupText");
  popupMessage.innerText = msg;
  popupBox.style.display = "block";
  setTimeout(() => {
    popupBox.style.display = "none";
  }, 3000);

}
//popup close button event listener
closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", () => {
  const popupBox = document.getElementById("popupBox");
  popupBox.style.display = "none";
});

//loader show/hide functions
function showLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "flex";
}
function hideLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}



//branch full form function
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

//title selector function
function titleSelector(gender) {
  if (gender === "Male") {
    return "Mr.";
  } else {
    return "Ms.";
  }
}

//semester formater function
function semesterFormater(semester) {
  const semNum = parseInt(semester);
  if (isNaN(semNum) || semNum < 1 || semNum > 8) {
    return "";
  }
  const suffixes = ["st", "nd", "rd", "th", "th", "th", "th", "th"];
  return semNum + suffixes[semNum - 1];
}   



//enable download button function
function enableDownload() {
  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.style.display = "block";
}



//download PDF function
function downloadPDF() {
  const element = document.getElementById("bonafideBox");
  const opt = {
    margin: 0, // Set margin to 0 for full-page content
    filename: `Bonafide_${regNoField.innerText.trim()}.pdf`,//dynamic file name
    image: { type: 'jpeg', quality: 0.98 },//image quality

    html2canvas: {
      scale: 2,//increase scale for better quality
      scrollY: 0,//to handle any scrolling issues
      windowHeight: element.scrollHeight //to capture full height
    },
    jsPDF: {
      unit: 'mm', //unit of measurement
      format: 'a4', //paper format
      orientation: 'portrait' //paper orientation
    },
    pagebreak: { mode: ['avoid-all'] } //avoid breaking elements across pages
  };

  html2pdf().set(opt).from(element).save();//generate and save PDF
}

//download button event listener
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      downloadPDF();
}); 

