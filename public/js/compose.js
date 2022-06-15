// Search Bars
const searchBar = document.getElementById("search_bar"),
  searchList = document.getElementById("search_list");

// Available Countries/Regions List
const countries = [
  "Kuala Lumpur",
  "Bali",
  "Indonesia",
  "Lampung",
  "Bangkok",
  "Yogyakarta",
  "Manila",
  "Beijing",
];

let searchRes = [],
  regChosen = false;

window.onload = () => {
  loadDestination(countries);
  regionEventListener();
};

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
  searchRes = countries.filter(searchFilter);
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

form.addEventListener("submit", (e) => {
  let postTitle = title.value,
    postBody = editor.getContents(),
    chosenCountry = document.querySelector("#active");

  console.log(postTitle, postBody, chosenCountry.getAttribute("data-region"));
  e.preventDefault();
});
