// brainBucketAuth.js
// Handles authentication state, session storage, and protected pages.

(() => {

    const AUTH_KEY = "courseCatalogAuth";
    const USER_KEY = "courseCatalogUser";
    const TOKEN_KEY = "courseCatalogToken";


    function getLoginPage() {

        return "/pages/auth.html";

    }



    function getHomePage() {

        return "/index.html";

    }



    function saveSession(username, token) {

        sessionStorage.setItem(
            AUTH_KEY,
            "true"
        );


        sessionStorage.setItem(
            USER_KEY,
            username
        );


        if (token) {

            sessionStorage.setItem(
                TOKEN_KEY,
                token
            );

        }

    }




    function isAuthenticated() {

        return sessionStorage.getItem(AUTH_KEY) === "true";

    }





    function getUser() {

        return sessionStorage.getItem(USER_KEY) || "";

    }





    function getToken() {

        return sessionStorage.getItem(TOKEN_KEY) || "";

    }





    function logout() {


        sessionStorage.removeItem(
            AUTH_KEY
        );


        sessionStorage.removeItem(
            USER_KEY
        );


        sessionStorage.removeItem(
            TOKEN_KEY
        );


        window.location.href = getLoginPage();

    }






    function requireAuth() {


        if (!isAuthenticated()) {


            window.location.href = getLoginPage();


            return false;

        }


        return true;


    }






    function redirectIfAuthenticated() {


        if (isAuthenticated()) {


            window.location.href = getHomePage();


            return true;

        }


        return false;


    }







    window.brainBucketAuth = {


        saveSession,

        isAuthenticated,

        getUser,

        getToken,

        logout,

        requireAuth,

        redirectIfAuthenticated,

        getLoginPage,

        getHomePage


    };



})();