document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api"

    localStorage.removeItem("userToken")
    let formLogin = document.querySelector(".form-login")
    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();

        let email = formLogin[0].value;
        let password = formLogin[1].value;


        let { data: user } = await axios.post(
            "/auth",
            {
                email: email,
                password: password,
            }
        );
        localStorage.setItem("userToken", user.token)

    console.log(user);

    setTimeout(() => {
        window.location.replace("/dashboard2.html");
      }, 3_000);
    })
})