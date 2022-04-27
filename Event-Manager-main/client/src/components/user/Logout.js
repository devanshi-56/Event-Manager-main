import React from "react";

function Logout({ logout, history }) {
    localStorage.clear();
    logout(history);
    return null;
}

export default Logout;