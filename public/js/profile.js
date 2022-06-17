const username = document.getElementById("username"),
  bio = document.getElementById("bio"),
  badges = document.getElementById("badges"),
  createdPosts = document.getElementById("created"),
  likedPosts = document.getElementById("liked"),
  currentUsername = document.getElementById("profile__text__greet__name"),
  profileEditBtn = document.getElementById("profile-desc__edit"),
  editProfileForm = document.getElementById("edit-profile"),
  closeFormButton = document.getElementById("close-edit"),
  usernameEdit = document.getElementById("username-edit"),
  emailEdit = document.getElementById("email-edit"),
  passwordEdit = document.getElementById("password-edit"),
  bioEdit = document.getElementById("bio-edit"),
  logoutBtn = document.getElementById("profile__text__logout"),
  postLiked = document.getElementById("profile-liked__list"),
  noLikedPosts = document.getElementById("no-liked");

window.onload = async () => {
  let res = await fetch("/user/api").then((res) => res.json());
  if (res.status === "failed") {
    alert("Please login first");
    window.location.href = "/login";
    return;
  }
  displayInformation(res);
};

profileEditBtn.addEventListener("click", showEditPage);
closeFormButton.addEventListener("click", closeForm);
editProfileForm.addEventListener("submit", updateProfile);
logoutBtn.addEventListener("click", logout);

async function logout() {
  const res = await fetch("/user/api/logout", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
  alert("You have been succesfully logged out");
  window.location.href = "/login";
}

function displayInformation(res) {
  currentUsername.innerText = res.username;
  username.innerText = res.username;
  bio.innerText = res.bio;
  createdPosts.innerText = res.postCreated;
  likedPosts.innerText = res.postLiked;

  var postsLiked = res.likedPostID;
  postLiked.innerHTML = "";
  if (postsLiked.length === 0) {
    noLikedPosts.style.display = "flex";
    return;
  }
  for (const post of postsLiked) {
    var Difference_In_Time = new Date() - new Date(post.date).getTime();

    var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24));

    var totalDays = Difference_In_Days > 0 ? Difference_In_Days + "d" : "Today";

    postLiked.innerHTML += `
    <div class="profile-liked__post" data-id="${post._id}">
          <p class="profile-liked__post__title">${post.title}</p>
          <p class="profile-liked__post__desc">by ${post.authorID.username} / ${totalDays} ago</p>
    </div>
    `;
  }
  createEventListenerLikedPost();
}

async function showEditPage() {
  openForm();
  const { username, email, bio } = await fetch("/user/api/").then((res) =>
    res.json()
  );

  usernameEdit.value = username;
  emailEdit.value = email;
  bioEdit.value = bio;
}

async function updateProfile(e) {
  e.preventDefault();
  const res = await fetch("/user/api/", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: usernameEdit.value,
      email: emailEdit.value,
      password: passwordEdit.value,
      bio: bioEdit.value,
    }),
  }).then((res) => res.json());
  closeForm();
  currentUsername.innerText = usernameEdit.value;
  username.innerText = usernameEdit.value;
  bio.innerText = bioEdit.value;
}

function createEventListenerLikedPost() {
  const postsLiked = document.querySelectorAll(".profile-liked__post");

  postsLiked.forEach((element) => {
    element.addEventListener("click", () => {
      window.location.href = `/destination?id=${element.dataset.id}`;
    });
  });
}

// Close and open profile edit form
function closeForm() {
  editProfileForm.style.display = "none";
}

function openForm() {
  editProfileForm.style.display = "flex";
}
