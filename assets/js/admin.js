// Admin Dashboard JavaScript



loadAdminData();





async function loadAdminData(){





// =============================
// USER INFORMATION
// =============================


const userBox =

document.getElementById(
"userData"
);




let username =

sessionStorage.getItem(
"sessionUser"
)

|| 

"Unknown";






let currentDate =

new Date()
.toLocaleString();






let browser =

navigator.userAgent;







userBox.innerHTML = `


<p>

<strong>
Username:
</strong>

${username}

</p>



<p>

<strong>
Date / Time:
</strong>

${currentDate}

</p>




<p>

<strong>
Browser:
</strong>

${browser}

</p>


`;









// =============================
// IP ADDRESS
// =============================


try{


const response =

await fetch(
"https://api.ipify.org?format=json"
);



const ipData =

await response.json();





userBox.innerHTML += `


<p>

<strong>
IP Address:
</strong>

${ipData.ip}

</p>


`;



}

catch(error){


userBox.innerHTML += `


<p>

<strong>
IP:
</strong>

Unavailable

</p>


`;


}









// =============================
// LOCAL STORAGE
// =============================


let localObject = {};





for(
let i = 0;
i < localStorage.length;
i++
){


let key =

localStorage.key(i);



localObject[key] =

localStorage.getItem(key);



}






document.getElementById(
"localData"
)

.textContent =

JSON.stringify(

localObject,

null,

2

);









// =============================
// SESSION STORAGE
// =============================


let sessionObject = {};





for(
let i = 0;
i < sessionStorage.length;
i++
){


let key =

sessionStorage.key(i);



sessionObject[key] =

sessionStorage.getItem(key);



}







document.getElementById(
"sessionData"
)

.textContent =

JSON.stringify(

sessionObject,

null,

2

);









// =============================
// GIST LINK
// =============================


let gist =

sessionStorage.getItem(
"gistURL"
);




if(gist){


const link =

document.getElementById(
"adminGistLink"
);



link.href = gist;


link.textContent =
"Open Saved GitHub Gist";


}




}
