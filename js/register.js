document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api"

    let formRegister = document.querySelector(".register-form")

    formRegister.addEventListener("submit", async (e) => {
        e.preventDefault();

        let name = formRegister[0].value;
        let email = formRegister[1].value;
        let password = formRegister[2].value;
        let confirmPassword = formRegister[3].value;

        if (password == confirmPassword) {
            let { data: user } = await axios.post(
                "/users",
                {
                    name: name,
                    email: email,
                    password: password,
                }
            );
            localStorage.setItem("userToken", user.token)
        console.log(user);
        setTimeout(() => {
            window.location.replace("/dashboard.html");
        },3_000)
        } else {
            alert ("Password did not match!")
        }
    })
})