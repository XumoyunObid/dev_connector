document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

    let createForm = document.querySelector(".create-form");
    let socialURL = document.querySelector(".socialURL");
    let urlBtn = document.querySelector(".urlBtn");
    let userToken = localStorage.getItem("userToken");
    let logo = document.querySelector(".logo");

    logo.addEventListener("click", () => {
        if (userToken) {
            window.location.replace("/dashboard2.html")
        }
    })

    urlBtn.addEventListener("click", () => {
        socialURL.classList.toggle("d-none");
    });

    createForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let pStatus = createForm[0].value;
        let company = createForm[1].value;
        let website = createForm[2].value;
        let location = createForm[3].value;
        let skills = createForm[4].value;
        let github = createForm[5].value;
        let bio = createForm[6].value;
        let twitterURL = createForm[7].value;
        let facebookURL = createForm[8].value;
        let youtubeURL = createForm[9].value;
        let linkedinURL = createForm[10].value;
        let instagramURL = createForm[11].value;

        // console.log(pStatus);
        // console.log(company);
        // console.log(website);
        // console.log(location);
        // console.log(skills);
        // console.log(github);
        // console.log(bio);

        let { data: profile } = await axios.post(
            "/profile",
            {
                status: pStatus,
                company: company,
                website: website,
                location: location,
                skills: skills,
                githubusername: github,
                bio: bio,
                twitter: twitterURL,
                facebook: facebookURL,
                youtube: youtubeURL,
                linkedin: linkedinURL,
                insagram: instagramURL,
            },
            {
                headers: 
                {'Content-Type': 'application/json', 'x-auth-token':`${userToken}`,}
            }
            
        );
        console.log(profile);
        setTimeout(() => {
            window.location.replace("/dashboard2.html");
        },3_000)
    });
});
