const destinationContainer = document.getElementById("destinationsContainer");
const textSearchDest = document.getElementById("textSearchDest");
const postContainer = document.getElementById("posts__container");
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
  var country;
  if (el.classList.contains("regContainer")) {
    country = el.dataset.region;
    removeActiveRegion();
    el.setAttribute("class", "regContainer activeRegion");
  } else if (el.parentElement.classList.contains("regContainer")) {
    country = el.parentElement.dataset.region;
    removeActiveRegion();
    el.parentElement.setAttribute("class", "regContainer activeRegion");
  }
  if (country) {
    try {
      postContainer.innerHTML = "";
      var res = await fetch(`/post/api?country=${country}`)
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
        <div class="subCont">
          <h3 class="subCont-title">${element.title}</h3>
          <h5 class="subCont-title2">by : ${element.authorID.username} / ${totalDays} ago</h5>
        </div>`;
      }
    } catch (error) {}
  }
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
