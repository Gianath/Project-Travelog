// Search Bars
const searchBar = document.getElementById("search_bar"),
  searchList = document.getElementById("search_list"),
  username = document.getElementById("profile__text__greet__name"),
  logoutBtn = document.getElementById("profile__text__logout");

// Available city/Regions List
const city = [
  "Kuala Lumpur",
  "Bali",
  "Jakarta",
  "Lampung",
  "Bangkok",
  "Yogyakarta",
  "Manila",
  "Beijing",
];

const country = {
  "Kuala Lumpur": "Malaysia",
  Bali: "Indonesia",
  Jakarta: "Indonesia",
  Lampung: "Indonesia",
  Bangkok: "Thailand",
  Yogyakarta: "Indonesia",
  Manila: "Philippines",
  Beijing: "China",
};

let searchRes = [],
  regChosen = false;

window.onload = async () => {
  loadDestination(city);
  regionEventListener();

  try {
    var res = await fetch("/user/api").then((res) => res.json());
    if (res.status === "failed") {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }
    username.innerHTML = res.username;
  } catch (error) {}
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

// Load regions to DOM
function loadDestination(regList) {
  searchList.innerHTML = "";
  // "<div class='destinations__list__location' style='height:0; margin: 0'></div>";
  regList.forEach((reg) => {
    searchList.innerHTML += `
      <div class="destinations__list__location" data-region="${reg}">
        <p>${reg}</p>
      </div>
    `;
  });
}

// Add event listener to region buttons
function regionEventListener() {
  const regionButtons = document.querySelectorAll(
    ".destinations__list__location"
  );

  regionButtons.forEach(async (reg) => {
    reg.addEventListener("click", () => {
      if (regChosen) document.querySelector("#active").id = "";
      reg.id = "active";
      regChosen = true;
    });
  });
}

searchBar.addEventListener("keyup", () => {
  let searchVal = searchBar.value;
  let searchFilter = (reg) => {
    return reg.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
  };
  searchRes = city.filter(searchFilter);
  loadDestination(searchRes);
});

///////////////////////////////////////////////////////////
// Quill Editor
var options = {
  modules: {
    toolbar: {
      container: "#toolbar",
    },
  },
  placeholder: "Write the body of your post here!",
  theme: "snow",
};
var editor = new Quill(".compose__editor", options);
///////////////////////////////////////////////////////////

// Handling post submission
const form = document.getElementById("post-form"),
  title = document.getElementById("title"),
  text = document.getElementById("editor");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let postTitle = title.value,
    postBody = editor.root.innerHTML,
    chosenCountry = document.querySelector("#active");
  if (!postTitle) {
    alert("Please add a title");
    return;
  }
  if (!postBody) {
    alert("Please add body of the post");
    return;
  }
  if (!chosenCountry) {
    alert("Please choose a city");
    return;
  }
  var res = await fetch("/post/api/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: postTitle,
      content: postBody,
      country: country[chosenCountry.getAttribute("data-region")],
      city: chosenCountry.getAttribute("data-region"),
    }),
  });
  title.value = "";
  postBody = editor.root.innerHTML = "";
  alert("Successfully posted");
});
