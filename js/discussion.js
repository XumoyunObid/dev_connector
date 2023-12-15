document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

    let commentForm = document.querySelector(".comment-form");
    let userToken = localStorage.getItem("userToken");
    let userId = localStorage.getItem("userId");
    let container = document.querySelector(".container");
    let logo = document.querySelector(".logo");

    logo.addEventListener("click", () => {
        if (userToken) {
            window.location.replace("/dashboard2.html")
        }
    })

    try {
        let { data: discuss } = await axios.get(
            `/posts?userId=${userId}`,
            {
                headers: {
                    "x-auth-token": `${userToken}`,
                },
            }
        );
        // console.log(discuss);
        discuss.forEach(postComment => {
            let comments = postComment.comments;
            // console.log(comments);

            comments.forEach(commentItem => {
                // console.log(commentItem.text);
            });
        });
    } catch (error) {
        console.error(error);
    }


    commentForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let postCommit = commentForm[0].value;


        let { data: allPosts } = await axios.get("/posts", {
            headers: {
                "x-auth-token": `${userToken}`,
            },
        });
        let eachPost = allPosts;
        eachPost.forEach(post => {
            axios.post(`/posts/comment/${post._id}`,{
                text: postCommit,
            },
            {
                headers: {
                    "x-auth-token": `${userToken}`,
                },
            }
            )
        });
    });
});
