import React from 'react'

export default function Question(props:any){
    //state to monitor which choice button is currently active
    const [press, setPress] = React.useState([false,false,false,false])
    //make necessary updated when a choice is selected
    function buttonPressed(event: any, id:string){
        const idx = Number(event.target.name)
        const pressArray = [false,false,false,false]
        setPress(prevPress => {
            pressArray[idx] = !prevPress[idx]
            return pressArray
        })
        props.updateAnswer(id, props.choices[idx])
    }
    //defines styles based on a number of states for the choices buttons
    function styles(idx:number){
                return {backgroundColor: 
                            press[idx] ? (
                                props.dispalyScore ? (
                                        props.correct_answer === props.choices[idx] ? 
                                            '#94D7A2':'#F8BCBC')
                                        : '#D6DBF5')
                                : (props.displayscore ? 
                                    (props.correct_answer === props.choices[idx] ? 
                                        '#94D7A2' : 'transparent') 
                                    : 'transparent')}
                               
    }

    return (
        <>
        <div className="flex-item">
            <div className="question">{ props.quest }</div>
            <div className="grid-button">
                <button onClick={(event) => {buttonPressed(event,props.id)}} name='0' style={styles(0)} className="button">{ props.choices[0] }</button>
                <button onClick={(event) => {buttonPressed(event,props.id)}} name='1' style={styles(1)} className="button">{ props.choices[1] }</button>
                <button onClick={(event) => {buttonPressed(event,props.id)}} name='2'style={styles(2)} className="button">{ props.choices[2] }</button>
                <button onClick={(event) => {buttonPressed(event,props.id)}} name='3' style={styles(3)} className="button">{ props.choices[3] }</button>
            </div>
        </div>
        <hr />
        </>
    )
}