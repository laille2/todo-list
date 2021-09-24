import { useEffect, useState } from "react";
import "../css/Todo.css"

function Todo({ nom, description, deadline, stateValue, category, deleteTodo, updateTodo, todoStates }) {
    const [classNames, updateClassNames] = useState("main");
    const [presentState, updatePresentState] = useState(todoStates[1]);
    const isTooLate = Date.parse(deadline) < Date.now();

    useEffect(
        () => { updateClassesAndStates(stateValue === 2); }
        , [presentState]
    );

    function updatePresentStateValue(value) {
        if (value) {
            updatePresentState(todoStates[2])
        } else if (isTooLate) {
            updatePresentState(todoStates[0])
        } else {
            updatePresentState(todoStates[1])
        }
    }

    function updateClassesAndStates(checked) {
        updatePresentStateValue(checked);
        if (checked) {
            updateClassNames("main todo_checked")
        } else if (isTooLate) {
            updateClassNames("main todo_too_late")
        } else {
            updateClassNames("main todo_pending")
        }
    }

    function updateCheck(e) {
        updatePresentStateValue(e.target.value);
        updateTodo(nom, description, deadline, e.target.value, category);
    }

    return <div className={classNames}>
        {nom} {" : "} {description}
        {presentState !== todoStates[2] && (isTooLate ? <span> TROP TARD !!!</span> : <span> avant : {deadline} </span>)}
        <input type="checkbox" name="done" defaultChecked={stateValue === 2} onClick={(e) => updateCheck(e)}></input>
        <button name="delete" onClick={() => deleteTodo(nom)}>Supprimer</button>
    </div>;
}

export default Todo;