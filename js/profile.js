document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

    let userToken = localStorage.getItem("userToken");
    let profileInfo = document.querySelector(".profile");
    let container = document.querySelector(".container");

    let { data: profile } = await axios.get("/profile", {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${userToken}`,
        },
    });
    // console.log(profile);

    profile.forEach((eachProfile) => {
        let profId = localStorage.getItem("idToken");
        if (eachProfile.user._id == profId) {
            console.log(eachProfile);
            let avatar = document.createElement("img");
            avatar.setAttribute("src", eachProfile.user.avatar);
            avatar.classList.add("w-25", "img-fluid", "rounded-circle", "mb-3");
            profileInfo.append(avatar);

            let name = document.createElement("h1");
            name.innerText = eachProfile.user.name;
            name.classList.add("mb-3");
            profileInfo.append(name);

            let userJob = document.createElement("h3");
            userJob.innerText =
                eachProfile.status + " at " + eachProfile.company;
            userJob.classList.add("mb-3");
            profileInfo.append(userJob);

            let userLocation = document.createElement("p");
            userLocation.innerText = eachProfile.location;
            profileInfo.append(userLocation);

            let socials = document.createElement("div");
            socials.classList.add("d-flex", "justify-content-around");

            let userInfo = document.createElement("div");
            userInfo.classList.add(
                "border",
                "bg-light",
                "text-center",
                "w-100",
                "p-5",
                "mb-3"
            );
            container.append(userInfo);

            let userBio = document.createElement("h3");
            userBio.innerText = eachProfile.user.name + "'s bio";
            userBio.classList.add("text-primary");
            userInfo.append(userBio);

            let bio = document.createElement("p");
            bio.innerText = eachProfile.bio;
            userInfo.append(bio);

            let skillSet = document.createElement("div");
            skillSet.classList.add(
                "mb-3",
                "border",
                "bg-light",
                "text-center",
                "w-100",
                "p-5"
            );
            container.append(skillSet);

            let skillsLabel = document.createElement("h2");
            skillsLabel.innerText = "Skills Set";
            skillSet.append(skillsLabel);

            let skillsList = document.createElement("ul");
            skillsList.classList.add(
                "d-flex",
                "gap-5",
                "justify-content-between"
            );

            let skillsArray = eachProfile.skills;
            skillsArray.forEach((skill) => {
                let skills = document.createElement("li");
                skills.classList.add("text-primary");
                let check = document.createElement("i");
                check.classList.add("fa-solid", "fa-check", "text-primary");
                skills.append(check);
                skills.append(skill);
                skillsList.append(skills);
            });
            skillSet.append(skillsList);

            let credentialsWrapper = document.createElement("div");
            credentialsWrapper.classList.add("d-flex", "gap-3");
            container.append(credentialsWrapper);

            let experienceCredential = document.createElement("div");
            experienceCredential.classList.add("border", "w-50", "p-4");
            credentialsWrapper.append(experienceCredential);

            let experienceLabel = document.createElement("h3");
            experienceLabel.classList.add("text-primary", "mb-2");
            experienceLabel.innerText = "Experience: ";
            experienceCredential.append(experienceLabel);

            let formatDate = (date) => {
                let time = new Date(date);
                let day = String(time.getDate()).padStart(2, "0");
                let month = String(time.getMonth() + 1).padStart(2, "0");
                let year = String(time.getFullYear()).padStart(2, "0");
                return `${day}/${month}/${year}`;
            };

            let userExperience = eachProfile.experience;
            userExperience.forEach((experience) => {
                let jobTitle = document.createElement("h4");
                jobTitle.innerText = `${experience.company || "Not Provided"}`;
                experienceCredential.append(jobTitle);

                let years = document.createElement("p");
                let formatTimeRange = (fromDate, toDate) => {
                    let from = formatDate(fromDate);
                    let to = toDate ? formatDate(toDate) : "Now";
                    return `${from} - ${to}`;
                };
                let toDate = experience.to
                    ? new Date(experience.to)
                    : undefined;
                let from = formatTimeRange(new Date(experience.from), toDate);
                experienceCredential.append(years);
                years.textContent = from;

                let posititon = document.createElement("h5");
                posititon.innerText = `Position: ${
                    experience.title || "Not Provided"
                }`;
                posititon.classList.add("mb-2");
                experienceCredential.append(posititon);

                let location = document.createElement("h5");
                location.innerText = `Location: ${
                    experience.location || "Not provided"
                }`;
                location.classList.add("mb-2");
                experienceCredential.append(location);

                let description = document.createElement("h5");
                description.classList.add("mb-2");
                description.innerText = `Description: ${
                    experience.description || "Not Provided"
                }`;
                experienceCredential.append(description);

                let hr = document.createElement("hr");
                hr.classList.add("w-100");
                experienceCredential.append(hr);
            });

            let educationCredential = document.createElement("div");
            educationCredential.classList.add("border", "w-50", "p-4");
            credentialsWrapper.append(educationCredential);

            let educationLabel = document.createElement("h3");
            educationLabel.classList.add("text-primary", "mb-2");
            educationLabel.innerText = `Education: `;
            educationCredential.append(educationLabel);

            let userEducation = eachProfile.education;
            userEducation.forEach((education) => {
                let school = document.createElement("h4");
                school.innerText = `${education.school || "Not Provided"}`;
                educationCredential.append(school);

                let years = document.createElement("p");
                let formatTimeRange = (fromDate, toDate) => {
                    let from = formatDate(fromDate);
                    let to = toDate ? formatDate(toDate) : "Now";
                    return `${from} - ${to}`;
                };
                let toDate = education.to ? new Date(education.to) : undefined;
                let from = formatTimeRange(new Date(education.from), toDate);
                educationCredential.append(years);
                years.textContent = from;

                let degree = document.createElement("h5");
                degree.innerText = `Degree: ${
                    education.degree || "Not Provided"
                }`;
                degree.classList.add("mb-2");
                educationCredential.append(degree);

                let fieldOfStudy = document.createElement("h5");
                fieldOfStudy.innerText = `Filed Of Study: ${
                    education.fieldofstudy || "Not provided"
                }`;
                fieldOfStudy.classList.add("mb-2");
                educationCredential.append(fieldOfStudy);

                let description = document.createElement("h5");
                description.classList.add("mb-2");
                description.innerText = `Description: ${
                    education.description || "Not Provided"
                }`;
                educationCredential.append(description);

                let hr = document.createElement("hr");
                hr.classList.add("w-100");
                educationCredential.append(hr);
            });

            let githubLabel = document.createElement("h4");
            githubLabel.classList.add("text-primary", "mt-3");
            githubLabel.innerText = "Github Repos";
            container.append(githubLabel);


            let githubUserName = eachProfile.githubusername;
            console.log(githubUserName);

            axios.get(`/profile/github/${githubUserName}`)
                .then((response) => {
                    let githubRepos = response.data;
                    console.log(githubRepos);
                    
                    githubRepos.forEach(repos => {
                        let wrapper = document.createElement("div");
                    wrapper.classList.add("border", "w-100", "p-3", "mb-3", "h-50");
                    container.append(wrapper)

                    let repoName = document.createElement("p");
                    repoName.innerText = repos.name;
                    repoName.classList.add("text-primary","mb-3")
                    wrapper.append(repoName);

                    let repoComment = document.createElement("p")
                    repoComment.innerText = repos.description;
                    wrapper.append(repoComment);
                    });
                })
                .catch((err) => {
                    console.error(err);
                });

        }
    });
});
