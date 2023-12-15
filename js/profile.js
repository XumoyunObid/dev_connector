// document.addEventListener("DOMContentLoaded", async () => {
//     axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

//     let userToken = localStorage.getItem("userToken");
//     let profileInfo = document.querySelector(".profile");


//     let { data: profile } = await axios.get("/profile", {
//         headers: {
//             "Content-Type": "application/json",
//             "x-auth-token": `${userToken}`,
//         },
//     });
//     console.log(profile);

// });
