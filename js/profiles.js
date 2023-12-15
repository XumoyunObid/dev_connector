document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

    let userToken = localStorage.getItem("userToken");
    let container = document.querySelector(".container");
    let logo = document.querySelector(".logo");

    logo.addEventListener("click", () => {
        if (userToken) {
            window.location.replace("/dashboard2.html")
        }
    })

    let { data: profiles } = await axios.get("/profile", {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${userToken}`,
        },
    });
    console.log(profiles);

    profiles.forEach((profile) => {
        let profileWrapper = document.createElement("div");
        profileWrapper.classList.add(
            "profile-wrapper",
            "d-flex",
            "justify-content-between",
            "bg-light",
            "border",
            "p-4",
            "mb-4"
        );

        let userInfo = document.createElement("div");
        userInfo.classList.add("user-info", "d-flex", "gap-5");
        profileWrapper.append(userInfo);

        let userImg = document.createElement("img");
        userImg.setAttribute("src", profile.user.avatar);
        userImg.classList.add("rounded-circle", "img-fluid");
        userInfo.append(userImg);

        let userStatus = document.createElement("div");
        userStatus.classList.add("user-status");
        userInfo.append(userStatus);

        let userName = document.createElement("h3");
        userName.innerText = profile.user.name;
        userStatus.append(userName);

        let userJob = document.createElement("p");
        userJob.innerText = profile.status + " at " + profile.company;
        userStatus.append(userJob);

        let userLocation = document.createElement("p");
        userLocation.innerText = profile.location;
        userStatus.append(userLocation);

        let viewProfileBtn = document.createElement("a");
        viewProfileBtn.classList.add("btn", "btn-primary");
        viewProfileBtn.innerText = "View Profile";
        viewProfileBtn.addEventListener("click", () => {
            localStorage.setItem("idToken", `${profile.user._id}`);
            window.location.replace("/profile.html");
        })
        userStatus.append(viewProfileBtn);

        let skillsList = document.createElement("ul");
        skillsList.classList.add("p-5")
        let skillsArray = profile.skills;
        skillsArray.forEach((skill) => {
            let skills = document.createElement("li");
            skills.classList.add("text-primary");
            let check = document.createElement("i");
            check.classList.add("fa-solid", "fa-check", "text-primary");
            skills.append(check);
            skills.append(skill);
            skillsList.append(skills);
        });

        profileWrapper.append(skillsList);

        container.append(profileWrapper);
    });
});
