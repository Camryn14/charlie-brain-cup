// auth.js
// Handles login using the JWT Authentication API


(() => {


    const AUTH_API_URL =
        "https://authn.barrycumbie.com/api/authn/login";


    // Assignment requirement:
    // fallback password is cat
    const FALLBACK_PASSWORD = "cat";



    const loginForm =
        document.getElementById("loginForm");


    const usernameInput =
        document.getElementById("userBox");


    const passwordInput =
        document.getElementById("passBox");


    const messageBox =
        document.getElementById("authMsg");





    // Stop if login page elements do not exist

    if (!loginForm ||
        !usernameInput ||
        !passwordInput ||
        !messageBox) {

        return;

    }







    function showMessage(message, error = false) {


        messageBox.textContent = message;


        if (error) {

            messageBox.className =
            "text-danger text-center mt-3";

        } 
        else {

            messageBox.className =
            "text-secondary text-center mt-3";

        }


    }









    async function login(username, password) {


        const response = await fetch(
            AUTH_API_URL,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },


                body: JSON.stringify({

                    username: username,

                    password: password

                })

            }

        );



        if (!response.ok) {


            throw new Error(
                "Authentication failed"
            );


        }



        return await response.json();


    }









    function storeLogin(username, token) {


        sessionStorage.setItem(
            "courseCatalogAuth",
            "true"
        );


        sessionStorage.setItem(
            "courseCatalogUser",
            username
        );



        sessionStorage.setItem(
            "courseCatalogToken",
            token
        );


    }









    async function handleLogin(event) {


        event.preventDefault();



        const username =
            usernameInput.value.trim()
            || "guest";



        let password =
            passwordInput.value.trim();



        // If password is empty,
        // use fallback password

        if (password === "") {

            password =
            FALLBACK_PASSWORD;

        }





        showMessage(
            "Authenticating..."
        );




        try {


            const data =
            await login(
                username,
                password
            );



            const token =
            data.token || "";



            storeLogin(
                username,
                token
            );



            showMessage(
                "Login successful!"
            );



            setTimeout(() => {


                window.location.href =
                "../index.html";


            }, 500);



        }


        catch(error) {



            // fallback mode

            if (password === FALLBACK_PASSWORD) {


                storeLogin(
                    username,
                    "fallback-token"
                );



                showMessage(
                    "Fallback login successful!"
                );



                setTimeout(() => {


                    window.location.href =
                    "../index.html";


                },500);



            }


            else {


                showMessage(
                    "Invalid login.",
                    true
                );


            }


        }



    }







    loginForm.addEventListener(
        "submit",
        handleLogin
    );



})();