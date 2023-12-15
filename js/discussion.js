document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

    let commentForm = document.querySelector(".comment-form");
    let userToken = localStorage.getItem("userToken");
    let postId = localStorage.getItem("postId");
    let container = document.querySelector(".container");
    let logo = document.querySelector(".logo");
    let commentWrapper = document.querySelector(".comment-wrapper");

    logo.addEventListener("click", () => {
        if (userToken) {
            window.location.replace("/dashboard2.html");
        }
    });

    let { data: allPosts } = await axios.get("/posts", {
        headers: {
            "x-auth-token": `${userToken}`,
        },
    });

    let eachPost = allPosts;
    let formatDate = (date) => {
        let time = new Date(date);
        let day = String(time.getDate()).padStart(2, "0");
        let month = String(time.getMonth() + 1).padStart(2, "0");
        let year = String(time.getFullYear()).padStart(2, "0");
        return `${day}/${month}/${year}`;
    };
    eachPost.forEach((post) => {
        let postId = localStorage.getItem("postId");
        if (post._id == postId) {
            let postWrapper = document.createElement("div");
            postWrapper.classList.add(
                "w-100",
                "border",
                "p-4",
                "d-flex",
                "gap-2",
                "mb-3",
                "align-items-center"
            );

            let postInfo = document.createElement("div");
            postInfo.classList.add("text-center", "w-25");
            postWrapper.append(postInfo);

            let img = document.createElement("img");
            img.setAttribute("src", post.avatar);
            img.classList.add("rounded-circle", "mb-3");
            img.addEventListener("click", () => {
                window.location.replace("profile.html");
            });
            postInfo.append(img);

            let name = document.createElement("p");
            name.classList.add("text-primary", "mb-2");
            name.innerText = post.name;
            postInfo.append(name);

            let postDetails = document.createElement("div");
            postDetails.classList.add("p-2", "w-75");
            postWrapper.append(postDetails);

            let text = document.createElement("p");
            text.innerText = post.text;
            postDetails.append(text);

            let postDate = document.createElement("small");

            let formatTimeRange = (fromDate) => {
                let date = formatDate(fromDate);
                return `${date}`;
            };
            let date = formatTimeRange(new Date(post.date));
            postDetails.append(postDate);
            postDate.textContent = "Posted on " + date;

            let btns = document.createElement("div");
            btns.classList.add("d-flex", "gap-2", "mt-3", "align-items-center");
            postDetails.append(btns);

            let like = document.createElement("button");
            like.classList.add("btn", "btn-light", "border", "rounded-0");
            like.innerHTML = `<i class="fa-solid fa-thumbs-up"></i><span class="likes">${post.likes.length}</span>`;
            like.addEventListener("click", (e) => {
                e.preventDefault();
                axios
                    .put(
                        `/posts/like/${post._id}`,
                        {},
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "x-auth-token": `${userToken}`,
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                setTimeout(() => {
                    window.location.reload();
                }, 1_000);
            });
            btns.append(like);

            let dislike = document.createElement("button");
            dislike.classList.add("btn", "btn-light", "border", "rounded-0");
            dislike.innerHTML = `<i class="fa-solid fa-thumbs-down"></i>`;
            dislike.addEventListener("click", () => {
                axios
                    .put(
                        `/posts/unlike/${post._id}`,
                        {},
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "x-auth-token": `${userToken}`,
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                setTimeout(() => {
                    window.location.reload();
                }, 1_000);
            });
            btns.append(dislike);

            let discussionBtn = document.createElement("button");
            discussionBtn.classList.add("btn", "btn-primary", "rounded-0");
            discussionBtn.innerText = "Discussion " + post.comments.length;
            discussionBtn.addEventListener("click", (e) => {
                e.preventDefault();
                axios
                    .get(`/posts/${post._id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": `${userToken}`,
                        },
                    })
                    .then((res) => {
                        console.log(res.data._id);
                        localStorage.setItem("postId", res.data._id);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                // localStorage.setItem("postId", res.data._id)
                window.location.replace("/discussion.html");
            });

            btns.append(discussionBtn);

            let deletePost = document.createElement("button");
            deletePost.classList.add("btn", "btn-danger", "rounded-0");
            deletePost.innerText = "X";
            deletePost.addEventListener("click", (e) => {
                e.preventDefault();
                axios
                    .delete(`/posts/${post._id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": `${userToken}`,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            });
            btns.append(deletePost);

            container.prepend(postWrapper);
        }
    });
    commentForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let postCommit = commentForm[0].value;

        let { data: comments } = await axios.post(
            `/posts/comment/${post._id}`,
            {
                text: postCommit,
            },
            {
                headers: {
                    "x-auth-token": `${userToken}`,
                },
            }
        );
        console.log(comments);
    });
    //
    let eachComment = allPosts;
    console.log(allPosts);
    eachComment.forEach((comment) => {
        let postId = localStorage.getItem("postId");
        if (comment.comments._id == postId) {
            // Use comment._id instead of post._id
            comment.forEach((commentElem) => {
                let postWrapper = document.createElement("div");
                postWrapper.classList.add(
                    "w-100",
                    "border",
                    "p-4",
                    "d-flex",
                    "gap-2",
                    "mb-3",
                    "align-items-center"
                );

                let postInfo = document.createElement("div");
                postInfo.classList.add("text-center", "w-25");
                postWrapper.append(postInfo);

                let img = document.createElement("img");
                img.setAttribute("src", commentElem.avatar);
                img.classList.add("rounded-circle", "mb-3");
                img.addEventListener("click", () => {
                    window.location.replace("profile.html");
                });
                postInfo.append(img);

                let name = document.createElement("p");
                name.classList.add("text-primary", "mb-2");
                name.innerText = commentElem.name;
                postInfo.append(name);

                let postDetails = document.createElement("div");
                postDetails.classList.add("p-2", "w-75");
                postWrapper.append(postDetails);

                let text = document.createElement("p");
                text.innerText = commentElem.text;
                postDetails.append(text);

                let postDate = document.createElement("small");

                let formatDate = (date) => {
                    // Implement your date formatting logic here
                    return date.toLocaleDateString(); // Adjust this based on your needs
                };

                let formatTimeRange = (fromDate) => {
                    let date = formatDate(fromDate);
                    return `${date}`;
                };

                let date = formatTimeRange(new Date(commentElem.date));
                postDetails.append(postDate);
                postDate.textContent = "Posted on " + date;

                commentWrapper.append(postWrapper);
            });
        }
    });
});
