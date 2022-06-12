const destinationContainer = document.getElementById("destinationsContainer");
const textSearchDest = document.getElementById("textSearchDest");
const postContainer = document.getElementById("posts__container");
const show_post_container = document.getElementById("show_post_container");
const showPost = document.getElementById("showPost");
const show_comment_container = document.getElementById(
  "show_comment_container"
);
const showComment = document.getElementById("showComment");
const backBtnPost = document.getElementById("backBtnPost");
var commentBtnPost;
const backBtnComment = document.getElementById("backBtnComment");
const userprofile = document.getElementById("username");
const logoutBtn = document.getElementById("logoutBtn");

const regions = [
  "Kuala Lumpur",
  "Bali",
  "Indonesia",
  "Lampung",
  "Bangkok",
  "Yogyakarta",
  "Manila",
  "Beijing",
];

var searchResult = regions;

window.onload = async () => {
  loadDestination();
  try {
    var res = await fetch("/user/api").then((res) => res.json());
    if (res.status === "failed") {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }
    userprofile.innerHTML = res.username;
  } catch (error) {}
};

const loadDestination = () => {
  destinationContainer.innerHTML = "";
  searchResult.forEach((reg) => {
    destinationContainer.innerHTML += `
      <div class="regContainer" data-region="${reg}">
          <h3 class="region">${reg}</h3>
      </div>
    `;
  });
};

const removeActiveRegion = () => {
  const active = document.querySelectorAll(".activeRegion");
  active.forEach((element) => {
    element.setAttribute("class", "regContainer");
  });
};

destinationContainer.addEventListener("click", async (e) => {
  const el = e.target;
  var city;
  if (el.classList.contains("regContainer")) {
    city = el.dataset.region;
    removeActiveRegion();
    el.setAttribute("class", "regContainer activeRegion");
  } else if (el.parentElement.classList.contains("regContainer")) {
    city = el.parentElement.dataset.region;
    removeActiveRegion();
    el.parentElement.setAttribute("class", "regContainer activeRegion");
  }
  if (city) {
    showPost.classList.remove("showPostActive");
    showComment.classList.remove("showCommentActive");
    try {
      postContainer.innerHTML = "";
      var res = await fetch(`/post/api?city=${city}`)
        .then((res) => res.json())
        .then((res) => res.results);

      for (var element of res) {
        var Difference_In_Time = new Date() - new Date(element.date).getTime();

        var Difference_In_Days = parseInt(
          Difference_In_Time / (1000 * 3600 * 24)
        );

        var totalDays =
          Difference_In_Days > 0 ? Difference_In_Days + "d" : "Today";

        postContainer.innerHTML += `          
        <div class="subCont" data-id="${element._id}">
          <h3 class="subCont-title">${element.title}</h3>
          <h5 class="subCont-title2">by : ${element.authorID.username} / ${totalDays} ago</h5>
        </div>`;
      }
    } catch (error) {}
  }
});

postContainer.addEventListener("click", async (e) => {
  const el = e.target;
  var postID;

  if (el.classList.contains("subCont")) {
    postID = el.dataset.id;
  } else if (el.parentElement.classList.contains("subCont")) {
    postID = el.parentElement.dataset.id;
  }

  if (postID) {
    try {
      show_post_container.innerHTML = "";

      var res = await fetch(`/post/api/${postID}`)
        .then((res) => res.json())
        .then((res) => res.results);

      show_post_container.innerHTML = `
      <div class="show_post_title">
        ${res.title}
      </div>
      <div class="country-city-author">
        ${res.city}, ${res.country} / by. ${res.authorID.username}
      </div>
      <div class="likes-comments">
        <div class="likesLogo">
          <img src="../assets/like.svg" alt="">
          <p>${res.likes} Likes</p>
        </div>
        <div class="commentsLogo" id="commentBtnPost" data-id="${res._id}">
          <img src="../assets/comment.svg" alt="">
          <p>${res.commentIDs.length} Comments</p>
        </div>
      </div>
      <div class="post_content">
        ${res.content}
      </div>
      `;
      showPost.classList.add("showPostActive");
      commentBtnPost = document.getElementById("commentBtnPost");
      createListenerCommentBtn();
    } catch (error) {
      console.log(error);
    }
  }
});

backBtnPost.addEventListener("click", () => {
  showPost.classList.remove("showPostActive");
});

function createListenerCommentBtn() {
  commentBtnPost.addEventListener("click", async (e) => {
    const el = e.target;
    var postID;
    if (el.classList.contains("commentsLogo")) {
      postID = el.dataset.id;
    } else if (el.parentElement.classList.contains("commentsLogo")) {
      postID = el.parentElement.dataset.id;
    }

    if (postID) {
      try {
        show_comment_container.innerHTML = "";

        var res = await fetch(`/post/api/${postID}`)
          .then((res) => res.json())
          .then((res) => res.results);

        show_comment_container.innerHTML = `
          <div class="show_comment_title">
          ${res.title}
          </div>
          <div class="country-city-author">
          ${res.city}, ${res.country} / by. ${res.authorID.username}
          </div>
          <div class="likes-comments">
            <div class="likesLogo">
              <img src="../assets/like.svg" alt="">
              <p>${res.likes} Likes</p>
            </div>
            <div class="commentsLogo" id="commentBtnPost">
              <img src="../assets/comment.svg" alt="">
              <p>${res.commentIDs.length} Comments</p>
            </div>
          </div>
        `;

        showComment.classList.add("showCommentActive");

        res.commentIDs.forEach((element) => {
          var day = new Date(element.date).getDate();
          var month = new Date(element.date).getMonth();
          var year = new Date(element.date).getFullYear();

          show_comment_container.innerHTML += `
          <div class="show_comment_content">
            <img src="../assets/profile-picture-blank.svg" alt="">
            <div class="show_comment_text">
              <div class="comment-title">
                <span>${element.authorID.username}</span>
                <span>${day}/${month}/${year}</span>
              </div>
              <div class="comment-body">
                ${element.content}
              </div>
            </div>
          </div>
          `;
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
}

backBtnComment.addEventListener("click", () => {
  showComment.classList.remove("showCommentActive");
});

textSearchDest.addEventListener("keyup", () => {
  var searchValue = textSearchDest.value;
  var searchFilter = (region) => {
    return region.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  };
  searchResult = regions.filter(searchFilter);
  loadDestination();
});

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
