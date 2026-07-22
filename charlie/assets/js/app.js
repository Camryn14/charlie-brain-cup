// Course Catalog App
// JSON + Fetch API + Search + Filter + Sort + Likes + GitHub Gist


let courses = [];

const JSON_FILE = "data/courses.json";





// Load JSON when page starts

loadCourses();







// ===============================
// FETCH JSON DATA
// ===============================

async function loadCourses(){


    try {


        const response = await fetch(JSON_FILE);



        courses = await response.json();




        // Load saved session data if it exists

        const savedData =
        sessionStorage.getItem("courseData");



        if(savedData){

            courses =
            JSON.parse(savedData);

        }





        displayCourses();



        loadGistLink();



    }


    catch(error){


        console.error(
            "Unable to load JSON:",
            error
        );


    }


}









// ===============================
// DISPLAY CARDS
// ===============================

function displayCourses(list = courses){


    const courseList =
    document.getElementById("courseList");



    if(!courseList){

        return;

    }





    courseList.innerHTML = "";





    // Likes appear first

    list.sort((a,b)=>{

        return b.liked - a.liked;

    });







    list.forEach((course,index)=>{



        let likedClass =
        course.liked
        ? "liked-card"
        : "";





        courseList.innerHTML += `


<div class="col-md-4 mb-4">


<div class="card shadow course-card ${likedClass}">


<div class="card-body">


<h5
contenteditable="true"
id="title-${index}">

${course.id} - ${course.name}

</h5>





<p>

Hours:

<span

contenteditable="true"

id="hours-${index}">

${course.hours}

</span>

</p>





<p>

Date:

${course.date}

</p>





<p>

Tags:

${course.tags.join(", ")}

</p>






<div>


<strong>
Links:
</strong>


<ul>


${

course.links.map(link =>


`

<li>

<a

href="${link.url}"

target="_blank">

${link.description}

</a>


</li>

`

).join("")

}



</ul>


</div>







<button

class="btn btn-warning"

onclick="likeCourse(${index})">


${course.liked ? "Unlike" : "Like"}


</button>






<button

class="btn btn-primary"

onclick="saveCourse(${index})">


Save


</button>






<button

class="btn btn-danger"

onclick="deleteCourse(${index})">


Delete


</button>




</div>


</div>


</div>


`;



    });


}










// ===============================
// ADD COURSE
// ===============================

function addCourse(){


const id =
document.getElementById("courseID").value;



const name =
document.getElementById("courseName").value;



const hours =
document.getElementById("courseHours").value;





if(!id || !name || !hours){


alert("Complete all fields");


return;


}







courses.push({


id:id,


name:name,


hours:Number(hours),


date:
new Date()
.toISOString()
.split("T")[0],



tags:["New"],



liked:false,



links:[]



});





saveLocalData();



displayCourses();



}











// ===============================
// EDIT COURSE
// ===============================

function saveCourse(index){


let title =

document.getElementById(
"title-" + index
).textContent;



let hours =

document.getElementById(
"hours-" + index
).textContent;






if(title.includes("-")){


courses[index].name =

title
.split("-")[1]
.trim();



}





courses[index].hours =
hours.trim();




saveLocalData();



alert("Saved");


}











// ===============================
// DELETE
// ===============================

function deleteCourse(index){


courses.splice(index,1);


saveLocalData();


displayCourses();


}











// ===============================
// LIKE
// ===============================

function likeCourse(index){


courses[index].liked =

!courses[index].liked;



saveLocalData();



displayCourses();


}











// ===============================
// SEARCH
// ===============================

function searchCourses(){



let text =

document.getElementById(
"searchBox"
)
.value
.toLowerCase();






let results =

courses.filter(course =>


JSON.stringify(course)

.toLowerCase()

.includes(text)



);




displayCourses(results);


}











// ===============================
// FILTER TAG
// ===============================

function filterCourses(){



let tag =

document.getElementById(
"tagFilter"
)
.value;





if(tag === "all"){


displayCourses();


return;


}





let results =

courses.filter(course =>


course.tags.includes(tag)


);




displayCourses(results);



}











// ===============================
// SORT TITLE
// ===============================

function sortTitle(){


courses.sort((a,b)=>


a.name.localeCompare(
b.name
)


);



displayCourses();



}











// ===============================
// SORT DATE
// ===============================

function sortDate(){


courses.sort((a,b)=>


new Date(a.date)

-

new Date(b.date)


);



displayCourses();



}











// ===============================
// SESSION STORAGE
// ===============================

function saveLocalData(){



sessionStorage.setItem(

"courseData",

JSON.stringify(courses)

);


}











// ===============================
// SAVE TO GITHUB GIST
// ===============================

async function saveToGist(){



const token =

"PUT_YOUR_GITHUB_TOKEN_HERE";






const gist = {



description:
"Course Catalog JSON",



public:true,



files:{



"courses.json":{


content:

JSON.stringify(

courses,

null,

2

)


}



}



};








try{



const response =

await fetch(

"https://api.github.com/gists",

{


method:"POST",



headers:{


"Authorization":

"Bearer " + token,



"Content-Type":

"application/json"



},



body:

JSON.stringify(gist)



}

);






const data =

await response.json();







sessionStorage.setItem(

"gistURL",

data.html_url

);





loadGistLink();





alert(

"Gist saved!"

);



}

catch(error){



alert(

"Unable to save gist"

);



}





}











// ===============================
// SHOW GIST LINK
// ===============================

function loadGistLink(){



const link =

sessionStorage.getItem(
"gistURL"
);





if(link){



document.getElementById(
"gistLink"
).href = link;



document.getElementById(
"gistLink"
).textContent =
"Open Gist";



}



}