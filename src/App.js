
import './App.css'
import {useState, useEffect} from 'react';



function App() {
 
  const CHARACTERS_ENDPOINT = "https://64aca29f9edb4181202fab3f.mockapi.io/characters";

  const [characters, setCharacters] = useState([{}])

  const [newCharacterName, setNewCharacterName] = useState('')
  const [newCharacterAlias, setNewCharacterAlias] =useState('')
  const [newCharacterAbilities, setNewCharacterAbilities] =useState('')
  
  const [updatedCharacterName, setUpdatedCharacterName] = useState('')
  const [updatedCharacterAlias, setUpdatedCharacterAlias] =useState('')
  const [updatedCharacterAbilities, setUpdatedCharacterAbilities] =useState('')

  function getCharacters(){
    fetch(CHARACTERS_ENDPOINT)
    .then(data => data.json())
    .then(data => setCharacters(data))
  }

  useEffect(() => {
    getCharacters()
    console.log(characters)
  },[])
  
  
  
  function deleteCharacter(id){
    fetch(`${CHARACTERS_ENDPOINT}/${id}`, {
      method: 'DELETE'
    }).then(() => getCharacters())
  }
  

 
  
  function postNewCharacter(e){
    e.preventDefault()

  

    fetch(CHARACTERS_ENDPOINT, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: newCharacterName,
        alias: newCharacterAlias,
        abilities: newCharacterAbilities,
      })
    }).then(() => getCharacters())
  }

  function updateCharacter(e,characterObject){
    e.preventDefault()

    let updatedCharacterObject = {
      ...characterObject,
      name: updatedCharacterName,
      alias: updatedCharacterAlias,
      abilities: updatedCharacterAbilities,
    }

    fetch(`${CHARACTERS_ENDPOINT}/${characterObject.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedCharacterObject),
        headers: {
          "Content-Type": "application/json"
        }
    }).then(() => getCharacters())
  }
  


  return (
    <div className="App">
      {/* CODE BELOW: PART: 5.3 Connecting our POST */}

<form>
  <h3>POST new character form</h3>
  <label>Name</label>
  <input onChange={(e) => setNewCharacterName(e.target.value)} placeholder="Enter name here"></input>
 
  
  <label>Alias</label>
  <input onChange={(e) => setNewCharacterAlias(e.target.value)} placeholder="Enter alias here"></input>

  <label>Abilities</label>
  <input onChange={(e) => setNewCharacterAbilities(e.target.value)} placeholder="Enter abilities here"></input>
  
  <br>
  </br><button onClick={(e) => postNewCharacter(e)}>Submit</button>
</form>
      {/* CODE BELOW: PART 5.1: Connecting our GET  //  PART 5.4: Connecting our UPDATE */}
    
    {characters.map((characters,index) => (
<div key={index}>
  <div>
    <br></br>
      Name: {characters.name} <br></br>
      Alias: {characters.alias}<br></br>
      Abilities: {characters.abilities} <br></br>
      <br>
    </br>
    <button onClick={() => deleteCharacter(characters.id)}>Delete</button>
  </div>

  <form>
  <h4>update character form</h4>
  <label>Name</label>
  <input onChange={(e) => setUpdatedCharacterName(e.target.value)} placeholder="Enter updated name here"></input>
 
  
  <label>Alias</label>
  <input onChange={(e) => setUpdatedCharacterAlias(e.target.value)} placeholder="Enter updated alias here"></input>

  <label>Abilities</label>
  <input onChange={(e) => setUpdatedCharacterAbilities(e.target.value)} placeholder="Enter updated abilities here"></input>
  
  <br>
  </br><button onClick={(e) => updateCharacter(e, characters)}>Submit</button>
</form>
</div>
    ))}
    </div>
  )
}


export default App

