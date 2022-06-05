const userprofile = document.getElementById("username");
const logoutBtn = document.getElementById("logoutBtn");
const postDataView = document.getElementById("postViewContainer");
const postDataLike = document.getElementById("postLikeContainer");

window.onload = async () => {
  var res = await fetch("/user/api").then((res) => res.json());

  if (res.status === "failed") {
    alert("Please login first");
    window.location.href = "/login";
    return;
  }
  userprofile.innerHTML = res.username;

  res = await fetch("/post/api/getPostByView")
    .then((res) => res.json())
    .then((res) => res.results);

  for (var element of res) {
    var { title, authorID: author, views, content } = element;

    if (content.length > 256) {
      content = content.slice(0, 256);
      content += "...";
    }

    postDataView.innerHTML += `
  <div class="post">
    <div class="postHeader">
      <div class="title-post">${title}</div>
      <h6 class="author">by ${author.username}</h6>
      <div class="viewed">
        <div class="view-icon">
          <img src="../assets/view.svg" alt="">
        </div>
        <p class="view-number">${views}</p>
      </div>
    </div>
    <p class="text">${content}</p>
  </div>`;
  }

  res = await fetch("/post/api/getPostByLike")
    .then((res) => res.json())
    .then((res) => res.results);
  for (var element of res) {
    var { title, authorID: author, likes, content } = element;

    if (content.length > 256) {
      content = content.slice(0, 256);
      content += "...";
    }

    postDataLike.innerHTML += `
    <div class="post">
      <div class="postHeader">
        <div class="title-post">${title}</div>
        <h6 class="author">by ${author.username}</h6>
        <div class="liked">
          <div class="like-icon">
            <img src="../assets/thumb.svg" alt="">
          </div>
          <p class="like-number">${likes}</p>
        </div>
      </div>
      <p class="text">${content}</p>
    </div>`;
  }
};

logoutBtn.addEventListener("click", async () => {
  const res = await fetch("/user/api/logout", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
  alert("You have been succesfully logged out");
  window.location.href = "/login";
});
