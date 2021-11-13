import React from "react";
import classes from "./ViewData.module.css"
import myData from "./data.js"

const ViewData = () => {
    return (
        <div className={classes.container}>
            <pre className={classes.code}>{JSON.stringify(myData, null, 4)}</pre>
        </div>
    )
}

export default ViewData;