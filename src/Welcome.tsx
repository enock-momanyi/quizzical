import React from "react";

export default function Welcome(props: any){



    return (
        <div className="flex-container">
            <h2 className="welcome-header">Quizzical</h2>
            <p className="welcome-info">Get access to easy level science and nature questions</p>
                <button 
                    className="start-button"
                    onClick={props.start}
                    >Start Quiz</button>
        </div>
    )
}