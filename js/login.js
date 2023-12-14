document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api"

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
    console.log(user);

    setTimeout(() => {
        window.location.replace("/dashboard.html");
      }, 3_000);
    })
})