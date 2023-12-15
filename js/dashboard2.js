document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

    let userToken = localStorage.getItem("userToken");
    let tbody = document.querySelector(".experience-table-body");
    let educationTableBody = document.querySelector(".education-table-body");
    let logOutBtn = document.querySelector(".logout");
    if (!userToken) {
        window.location.replace("/login.html");
    }

    logOutBtn.addEventListener("click", () => {
        if (!userToken) {
            window.location.replace("/login.html");
        }
    });

    let { data } = await axios.get("/auth", {
        headers: {
            "x-auth-token": `${userToken}`,
        },
    });
    console.log(data.name);

    let h4 = document.querySelector(".mb-4");

    let userName = document.createElement("span");
    userName.classList.add("userName");
    userName.innerText = data.name;
    h4.append(userName);

    let { data: profile } = await axios.get("/profile/me", {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${userToken}`,
        },
    });

    console.log(profile);
    let experience = profile.experience;
    let education = profile.education;

    let formatDate = (date) => {
        let time = new Date(date);
        let day = String(time.getDate()).padStart(2, "0");
        let month = String(time.getMonth() + 1).padStart(2, "0");
        let year = String(time.getFullYear()).padStart(2, "0");
        return `${day}/${month}/${year}`;
    };

    experience.forEach((experience) => {
        let tr = document.createElement("tr");
        let companyName = document.createElement("td");
        companyName.innerText = experience.company;
        tr.append(companyName);

        let title = document.createElement("td");
        title.innerText = experience.title;
        tr.append(title);

        let years = document.createElement("td");
        let formatTimeRange = (fromDate, toDate) => {
            let from = formatDate(fromDate);
            let to = toDate ? formatDate(toDate) : "Now";
            return `${from} - ${to}`;
        };
        let toDate = experience.to ? new Date(experience.to) : undefined;
        let from = formatTimeRange(new Date(experience.from), toDate);
        tr.append(years);
        years.textContent = from;

        let deleteEXP = document.createElement("button");
        deleteEXP.classList.add("btn", "btn-danger");
        deleteEXP.innerText = "DELETE";

        deleteEXP.addEventListener("click", () => {
            if (
                confirm(`Are you sure you want to DELETE this Experience?\nCompany Name : ${experience.company}\n
        Job Title   : ${experience.title}`)
            ) {
                axios
                    .delete(`/profile/experience/${experience._id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": `${userToken}`,
                        },
                    })
                    .then(() => {
                        alert("Experience Deleted");
                        location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
        tr.append(deleteEXP);

        tbody.append(tr);
    });

    education.forEach((education) => {
        let tr = document.createElement("tr");
        let schoolName = document.createElement("td");
        schoolName.innerText = education.school;
        tr.append(schoolName);

        let degree = document.createElement("td");
        degree.innerText = education.degree;
        tr.append(degree);

        let years = document.createElement("td");
        let formatTimeRange = (fromDate, toDate) => {
            let from = formatDate(fromDate);
            let to = toDate ? formatDate(toDate) : "Now";
            return `${from} - ${to}`;
        };
        let toDate = experience.to ? new Date(education.to) : undefined;
        let from = formatTimeRange(new Date(education.from), toDate);
        tr.append(years);
        years.textContent = from;

        let deleteEXP = document.createElement("button");
        deleteEXP.classList.add("btn", "btn-danger");
        deleteEXP.innerText = "DELETE";

        deleteEXP.addEventListener("click", () => {
            if (
                confirm(`Are you sure you want to DELETE this Education?\nSchool Name : ${education.school}\n
            Education Degree   : ${education.degree}`)
            ) {
                axios
                    .delete(`/profile/education/${education._id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": `${userToken}`,
                        },
                    })
                    .then(() => {
                        alert("Education Deleted");
                        location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
        tr.append(deleteEXP);

        educationTableBody.append(tr);
    });

    let deleteAccBtn = document.querySelector(".delete-btn");
    deleteAccBtn.addEventListener("click", () => {
        if (confirm("Are You Sure Want To Delete Your Account?")) {
            axios
                .delete("/profile", {
                    headers: {
                        "x-auth-token": userToken,
                    },
                })
                .then((res) => {
                    console.log(res);
                    window.location.href = "/login.html";
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error Occured!");
                });
        }
    });
});
