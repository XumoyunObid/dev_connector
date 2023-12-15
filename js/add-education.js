document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

    let addEducationForm = document.querySelector(".add-education-form");
    let userToken = localStorage.getItem("userToken");
    let currentSchool = document.querySelector("#currentSchool");
    let programDescription = document.querySelector("#programDescription");

    currentSchool.addEventListener("change", function() {
        if (currentSchool.checked) {
            endDate.disabled = true;
            programDescription.disabled = true;
        } else {
            endDate.disabled = false;
            programDescription.disabled = false;
        }
    });


    addEducationForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let school = addEducationForm[0].value;
        let degree = addEducationForm[1].value;
        let filedOfStudy = addEducationForm[2].value;
        let startDate = addEducationForm[3].value;
        let currentSchool = addEducationForm[4].value;
        let endDate = addEducationForm[5].value;
        let programDescription = addEducationForm[6].value;

        // if (currentJob.checked == true) {
        //     endDate.disabled = true;
        //     jobDescription.disabled = true;
        // }
        
        // console.log(jobTitle);
        // console.log(company);
        // console.log(startDate);
        // console.log(location);
        // console.log(currentJob);
        // console.log(endDate);
        // console.log(jobDescription);

        

        let { data: education } = await axios.put(
            "/profile/education",
            {
                school: school,
                degree: degree,
                fieldofstudy: filedOfStudy,
                from: startDate,
                to: endDate,
            },
            {
                headers: 
                {'Content-Type': 'application/json', 'x-auth-token':`${userToken}`,}
            }
            
        );
        console.log(education);
        setTimeout(() => {
            window.location.replace("/dashboard2.html");
        },3_000)
    });
});
