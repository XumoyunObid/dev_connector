document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api"

    let userToken = localStorage.getItem("userToken")

    let { data } = await axios.get("/auth",{
            headers: {'Content-Type': 'application/json', 'x-auth-token':`${userToken}`,}
    });

    let h4 = document.querySelector(".mb-4");
    
    let userName = document.createElement("span")
    userName.classList.add("userName")
    userName.innerText = data.name;
    h4.append(userName)
})