document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

    let addExperienceForm = document.querySelector(".add-experience-form");
    let userToken = localStorage.getItem("userToken");
    let currentJob = document.querySelector("#currentJob");
    let jobDescription = document.querySelector("#jobDescription");

    currentJob.addEventListener("change", function() {
        if (currentJob.checked) {
            endDate.disabled = true;
            jobDescription.disabled = true;
        } else {
            endDate.disabled = false;
            jobDescription.disabled = false;
        }
    });

    addExperienceForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let jobTitle = addExperienceForm[0].value;
        let company = addExperienceForm[1].value;
        let location = addExperienceForm[2].value;
        let startDate = addExperienceForm[3].value;
        let currentJob = addExperienceForm[4].value;
        let endDate = addExperienceForm[5].value;
        let jobDescription = addExperienceForm[6].value;

        
        // console.log(jobTitle);
        // console.log(company);
        // console.log(startDate);
        // console.log(location);
        // console.log(currentJob);
        // console.log(endDate);
        // console.log(jobDescription);

        

        let { data: experience } = await axios.put(
            "/profile/experience",
            {
                title: jobTitle,
                company: company,
                from: startDate,
                to: endDate,
            },
            {
                headers: 
                {'Content-Type': 'application/json', 'x-auth-token':`${userToken}`,}
            }
            
        );
        console.log(experience);
        setTimeout(() => {
            window.location.replace("/dashboard2.html");
        },3_000)
    });
});
