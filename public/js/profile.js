const username = document.getElementById("username"),
  bio = document.getElementById("bio"),
  badges = document.getElementById("badges"),
  createdPosts = document.getElementById("created"),
  likedPosts = document.getElementById("liked");

window.onload = async () => {
  let res = await fetch("/user/api").then((res) => res.json());
  if (res.status === "failed") {
    alert("Please login first");
    window.location.href = "/login";
    return;
  }
  displayInformation(res);
};

function displayInformation(res) {
  username.innerText = res.username;
  bio.innerText = res.bio;
  createdPosts.innerText = res.postCreated;
  likedPosts.innerText = res.postLiked;
}
