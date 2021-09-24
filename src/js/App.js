import { useEffect, useState } from 'react';
import '../css/App.css';
import Formulaire from './Formulaire';
import Header from './Header';
import Todo from './Todo';

function App() {
  const todoStates = ["Trop tard !", "En cours.", "Fini !"];
  const todoListSaved = JSON.parse(localStorage.getItem('todoList'));
  const categoriesSaved = JSON.parse(localStorage.getItem('categories'));

  const [todoList, updateTodoList] = useState(todoListSaved ? todoListSaved : []);
  const [categories, updateCategories] = useState(categoriesSaved ? categoriesSaved : []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [nomCategory, updateNomCategory] = useState("Catégorie");

  useEffect(
    () => {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]
  )

  useEffect(
    () => {
      localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]
  )

  useEffect(
    () => {
      doStyleOnOpenForm(isFormOpen);
    }, [isFormOpen]
  )

  function ajoutTodo(nom, description, deadline, stateValue, category) {
    updateTodoList([...todoList, { nom, description, deadline, stateValue, category }])
  }

  function updateTodo(nom, description, deadline, stateValue, category) {
    const array = todoList.filter((todo) => todo.nom !== nom);
    updateTodoList([...array, { nom, description, deadline, stateValue, category }])
  }

  function deleteTodo(nom) {
    updateTodoList(todoList.filter((todo) => todo.nom !== nom));
  }

  function doStyleOnOpenForm(isOpen) {
    if (isOpen) {
      document.getElementById('top_gradient').style.height = "30px";
      document.getElementById('bottom_gradient').style.height = "30px";
    } else {
      document.getElementById('top_gradient').style.height = "15px";
      document.getElementById('bottom_gradient').style.height = "15px";
    }
  }

  return (
    <div className="App">

      <Header />

      <div id="top_gradient"></div>

      <form onSubmit={(e) => { e.preventDefault(); updateCategories([...categories, { nomCategory }]) }}>
        Nom de la catégorie à ajouter : <input type="text" name="nom" value={nomCategory} onChange={(e) => updateNomCategory(e.target.value)} />
        <button type="submit">Ajouter</button>
      </form>

      {isFormOpen ? (<div>
        <Formulaire
          ajoutTodo={ajoutTodo}
          todoList={todoList}
          categories={categories}
          todoStates={todoStates} />
        <button onClick={() => { setIsFormOpen(false) }}>Annuler</button>
      </div>) : (
        <button onClick={() => { setIsFormOpen(true) }}>Ajouter un TODO</button>
      )}

      <div id="bottom_gradient"></div>

      {categories.map(({ nomCategory }) =>
        <div key={nomCategory} className="todo_list">
          <h2>{nomCategory}</h2>
          {todoStates.map((state, indexState) => (
            <td key={state} className="colonne">
              <h3>{state}</h3>
              {todoList.length > 0 && (
                <div>
                  {
                    todoList.map(({ nom, description, deadline, stateValue, category }, index) => (
                      category === nomCategory && stateValue === indexState && (<tr key={`${nom}-${index}`}>
                        <Todo
                          nom={nom}
                          description={description}
                          deadline={deadline}
                          deleteTodo={deleteTodo}
                          stateValue={stateValue}
                          category={category}
                          updateTodo={updateTodo}
                          todoStates={todoStates} />
                      </tr>)
                    ))
                  }
                </div>
              )}
            </td>
          ))}

        </div>
      )}

    </div>
  );
}

export default App;
