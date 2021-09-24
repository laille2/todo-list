import { useState } from "react";


function Formulaire({ ajoutTodo, todoList, categories, todoStates }) {
    const [nomForm, updateNomForm] = useState("TODO");
    const [decriptionForm, updateDescriptionForm] = useState("Faire un TODO");
    const [deadlineForm, updateDeadlineForm] = useState("2022-01-01T00:00");


    function envoi(e, nomForm, decriptionForm, deadlineForm) {
        e.preventDefault();
        if (todoList.some(todo => todo.nom === nomForm)) {
            alert('Ce nom est déjà pris !');
        } else {
            ajoutTodo(nomForm, decriptionForm, deadlineForm, e.target[4].value === todoStates[2] ? 2 : (Date.parse(deadlineForm) < Date.now() ? 0 : 1), e.target[3].value);
            updateNomForm("TODO");
            updateDescriptionForm("Faire un TODO");
            updateDeadlineForm("2022-01-01T00:00");
        }
    }

    return (<form onSubmit={(e) => envoi(e, nomForm, decriptionForm, deadlineForm)}>
        Nom : <input type="text" name="nom" value={nomForm} onChange={(e) => updateNomForm(e.target.value)} />
        Description : <input type="text" name="description" value={decriptionForm} onChange={(e) => updateDescriptionForm(e.target.value)} />
        Deadline : <input type="datetime-local" name="deadline" value={deadlineForm} onChange={(e) => updateDeadlineForm(e.target.value)} min="2021-01-01T00:00" max="2023-12-31T23:59" />
        Catégorie(s) :  <select>(
            {categories.map(({ nomCategory }) =>
                <option key={nomCategory}>{nomCategory}</option>
            )}
            )</select>
        État :  <select>(
            <option>A faire</option>
            <option>{todoStates[2]}</option>
            )</select>
        <button type="submit">Ajouter</button>
    </form>)
}

export default Formulaire;