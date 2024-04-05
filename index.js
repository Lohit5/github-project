let userinput = document.querySelector(".userinput");

let maintag = document.querySelector(".herosection");
const body = document.querySelector('body');
const follow = document.querySelector(".follow");

const noresult = document.querySelector(".no-result");
noresult.style.visibility = "hidden"


let searchinput = document.querySelector(".btn");

let apiurl = "https://api.github.com/users/";

const get = (param) => document.getElementById(`${param}`);


if (userinput.value === "") {
    userinput.value = "thepranaygupta";
    getUser(apiurl, userinput.value);
    userinput.value = "";
};


let headtag = get("maintag");
const newurl = get("data-url");
userinput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        if (userinput.value !== "") {
            getUser();

        }
    }
}, false);

searchinput.addEventListener("click", function () {
    if (userinput.value !== "") {
        getUser()
    }
});

searchinput.addEventListener("searchinput", function () {
    noresult.style.visibility = "visible";

});


let getdarkmode = localStorage.getItem("dark-mode");


const icon = get("changeicon");
const texticon = document.querySelector(".text-icon");
let iconimage = document.querySelector(".icon-image")
iconimage.src = "./images/sun-icon.svg";

function darkmode() {
    icon.innerText = "DARK";
    iconimage.src = "./images/moon-icon.svg";
    icon.appendChild(iconimage);
    body.classList.add("bodybg");
    headtag.classList.add("lightlist");
    userinput.classList.add("lightlist");
    maintag.classList.add("lightlist");
    follow.classList.add("lightlist");
    localStorage.setItem("dark-mode", "false");

}

function Lightmode() {
    icon.innerText = "LIGHT"
    iconimage.src = "./images/sun-icon.svg";
    icon.appendChild(iconimage);
    body.classList.remove("bodybg");
    headtag.classList.remove("lightlist");
    userinput.classList.remove("lightlist");
    maintag.classList.remove("lightlist");
    follow.classList.remove("lightlist");
    localStorage.setItem("dark-mode", "true");
}



icon.addEventListener("click", () => {
    icon.innerText == "LIGHT" ? darkmode() : Lightmode();
})

if (getdarkmode === "false") {
    darkmode();
}
icon.addEventListener("click", () => {
    getdarkmode = localStorage.getItem("dark-mode");
    if (getdarkmode === "false") {
        darkmode();
    } else {
        Lightmode();
    }
})

async function getUser() {
    try {
        const url = `${apiurl}${userinput.value}`;
        const response = await fetch(url);
        const data = await response.json();
        Renderdata(data);
    } catch (error) {
        console.log(error)
    }
}

var nulltext = "Not Available";


function Renderdata(data) {
    if (data.message == "Not Found") {

        userinput.value +=
            noresult.style.visibility = "visible";

        userinput.addEventListener("keyup", (e) => {
            if (e.key == "Backspace") {
                noresult.style.visibility = "hidden";
            }
        });

    } else {

        const image = document.querySelector(".data-image");
        const name = document.querySelector(".data-name");
        const date = document.querySelector(".data-year");
        const url = get("data-url");
        const proper = get("data-proper");
        const bio = get("data-bio");
        const repo = get("data-repos");
        const follow = get("data-follow");
        const following = get("data-following");
        const map = get("data-map");
        const biolink = get("data-biolink");
        const twiterurl = get("data-twiter");
        let newdate = new Date(data?.created_at);
        let str = newdate.toDateString();
        let strobj = str.substring(3);
        url.href = data?.html_url;
        image.src = data?.avatar_url;
        image.classList.add("imagestyle");
        name.innerText = data?.name ? data?.name : data?.login;
        date.innerText = "joined" + " " + strobj;
        url.innerText = "@" + data?.html_url.split("/").pop();
        bio.innerText = data?.bio ? data?.bio : "This profile has no bio-data";
        repo.innerText = data?.public_repos;
        follow.innerText = data?.followers;
        following.innerText = data?.following;

        map.innerText = data?.location ? data?.location : nulltext;

        biolink.href = data?.blog ? data?.blog : " #";
        biolink.innerText = data?.blog ? data?.blog : nulltext;
        twiterurl.href = data?.twitter_username ? `https://twitter.com/${data?.twitter_username}` : "#";
        twiterurl.innerText = data?.twitter_username ? data?.twitter_username : nulltext;
        proper.innerText = data?.company ? data?.company : nulltext;

    }
}


// icon.innerText == "LIGHT" ? darkmode() : Lightmode();
