document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api"

    let userToken = localStorage.getItem("userToken")
    let tbody = document.querySelector(".experience-table-body")

    let { data } = await axios.get("/auth",{
            headers: {'Content-Type': 'application/json', 'x-auth-token':`${userToken}`,}
    });

    let h4 = document.querySelector(".mb-4");
    
    let userName = document.createElement("span")
    userName.classList.add("userName")
    userName.innerText = data.name;
    h4.append(userName)

    let tr = document.createElement("tr");
    let companyName = document.createElement("td")
    tr.append(companyName)

    let title = document.createElement("td")
    tr.append(title)

    let years = document.createElement("td")
    tr.append(years)

    let deleteEXP = document.createElement("button")
    deleteEXP.classList.add("btn", "btn-danger")
    deleteEXP.innerText = "DELETE"
    tr.append(deleteEXP)

    tbody.append(tr)
})