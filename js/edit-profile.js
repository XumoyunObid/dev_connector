document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

    let editForm = document.querySelector(".edit-form");
    let socialURL = document.querySelector(".socialURL");
    let urlBtn = document.querySelector(".urlBtn");
    let userToken = localStorage.getItem("userToken");
    let logOutBtn = document.querySelector(".logout")
    if (!userToken) {
        window.location.replace("/login.html");
    }

    let logo = document.querySelector(".logo");

    logo.addEventListener("click", () => {
        if (userToken) {
            window.location.replace("/dashboard2.html")
        }
    })

    
    logOutBtn.addEventListener("click", () => {
        if (!userToken) {
            window.location.replace("/login.html");
        }
    })

    urlBtn.addEventListener("click", () => {
        socialURL.classList.toggle("d-none");
    });

    let { data: profile } = await axios.get(
        "/profile/me",
        {
            headers: 
            {'Content-Type': 'application/json', 'x-auth-token':`${userToken}`,}
        }
    );

    editForm[0].value = profile?.status
    editForm[1].value = profile?.company
    editForm[2].value = profile?.website
    editForm[3].value = profile?.location
    editForm[4].value = profile?.skills.toString()
    editForm[5].value = profile?.githubusername
    editForm[6].value = profile?.bio
    editForm[7].value = profile?.social.twitter
    editForm[8].value = profile?.social.facebook
    editForm[9].value = profile?.social.youtube
    editForm[10].value = profile?.social.linkedin
    editForm[11].value = profile?.social.instagram

    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let pStatus = editForm[0].value;
        let company = editForm[1].value;
        let website = editForm[2].value;
        let location = editForm[3].value;
        let skills = editForm[4].value;
        let github = editForm[5].value;
        let bio = editForm[6].value;
        let twitterURL = editForm[7].value;
        let facebookURL = editForm[8].value;
        let youtubeURL = editForm[9].value;
        let linkedinURL = editForm[10].value;
        let instagramURL = editForm[11].value;

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
