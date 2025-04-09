import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {

const initialFighters =[
  {
    id: 1,
    name: 'Survivor',
    price: 12,
    strength: 6,
    agility: 4,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png',
  },
  {
    id: 2,
    name: 'Scavenger',
    price: 10,
    strength: 5,
    agility: 5,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png',
  },
  {
    id: 3,
    name: 'Shadow',
    price: 18,
    strength: 7,
    agility: 8,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png',
  },
  {
    id: 4,
    name: 'Tracker',
    price: 14,
    strength: 7,
    agility: 6,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png',
  },
  {
    id: 5,
    name: 'Sharpshooter',
    price: 20,
    strength: 6,
    agility: 8,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png',
  },
  {
    id: 6,
    name: 'Medic',
    price: 15,
    strength: 5,
    agility: 7,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png',
  },
  {
    id: 7,
    name: 'Engineer',
    price: 16,
    strength: 6,
    agility: 5,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png',
  },
  {
    id: 8,
    name: 'Brawler',
    price: 11,
    strength: 8,
    agility: 3,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png',
  },
  {
    id: 9,
    name: 'Infiltrator',
    price: 17,
    strength: 5,
    agility: 9,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png',
  },
  {
    id: 10,
    name: 'Leader',
    price: 22,
    strength: 7,
    agility: 6,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png',
  },
]

   // State for the player's current team (starts empty)
   const [team, setTeam] = useState([]);
   // State for the player's available money (starts at 100)
   const [money, setMoney] = useState(100);
   // State for the list of fighters available to recruit
   const [zombieFighters, setZombieFighters] = useState(initialFighters);
 
   // --- Handler Functions ---
 
 
   const handleAddFighter = (fighterToAdd) => {
     // Check if player can afford the fighter
     if (money >= fighterToAdd.price) {
       // Update team state: Create a new array with the existing team + the new fighter
       setTeam([...team, fighterToAdd]);
 
       // Update available fighters state: Create a new array filtering out the added fighter
       setZombieFighters(zombieFighters.filter(fighter => fighter.id !== fighterToAdd.id));
 
       // Update money state: Subtract the fighter's price
       setMoney(money - fighterToAdd.price);
     } else {
       // Log message if not enough money (can be enhanced later for UI)
       console.log(`Not enough money to recruit ${fighterToAdd.name}`);
       // alert(`Not enough money to recruit ${fighterToAdd.name}`); // Optional UI feedback
     }
   };
 
 
   const handleRemoveFighter = (fighterToRemove) => {
     // Update team state: Create a new array filtering out the removed fighter
     setTeam(team.filter(fighter => fighter.id !== fighterToRemove.id));
 
     // Update available fighters state: Create a new array with existing fighters + the removed one
     // Adding it back maintains the list of recruitable characters
     setZombieFighters([...zombieFighters, fighterToRemove]);
 
     // Update money state: Add the fighter's price back (refund)
     setMoney(money + fighterToRemove.price);
   };
 
   // --- Calculated Values (Derived State) ---
   // Calculate total strength of the current team. This runs on every render.
   const totalStrength = team.reduce((accumulator, currentFighter) => {
     return accumulator + currentFighter.strength;
   }, 0); // Start accumulator at 0
 
   // Calculate total agility of the current team. This runs on every render.
   const totalAgility = team.reduce((accumulator, currentFighter) => {
     return accumulator + currentFighter.agility;
   }, 0); // Start accumulator at 0
 
   // Calculate total cost of the current team.
     const totalCost = team.reduce((accumulator, currentFighter) => {
     return accumulator + currentFighter.price;
   }, 0); // Start accumulator at 0
 
 
   // --- JSX for Rendering ---
   return (
     <div className="App"> 
       <h1>Zombie Apocalypse Team Builder</h1>
 
       
       <section className="stats">
         <h2>Stats</h2>
         <p>Money: ${money}</p>
         <p>Team Strength: {totalStrength}</p>
         <p>Team Agility: {totalAgility}</p>
         <p>Team Cost: ${totalCost}</p>
       </section>

       <section className="team">
         <h2>Your Team</h2>
         {team.length === 0 ? (
           <p>Pick some team members!</p>
         ) : (
           <ul>
             {team.map((member) => (
               <li key={member.id} className="fighter-card">
                 <img src={member.img} alt={member.name} />
                 <h3>{member.name}</h3>
                 <p>Price: ${member.price}</p>
                 <p>Strength: {member.strength}</p>
                 <p>Agility: {member.agility}</p>
                
                 <button onClick={() => handleRemoveFighter(member)}>Remove</button>
               </li>
             ))}
           </ul>
         )}
       </section>
 
       
       <section className="available-fighters">
         <h2>Available Fighters</h2>
         <ul>
           {zombieFighters.map((fighter) => (
             <li key={fighter.id} className="fighter-card">
               <img src={fighter.img} alt={fighter.name} />
               <h3>{fighter.name}</h3>
               <p>Price: ${fighter.price}</p>
               <p>Strength: {fighter.strength}</p>
               <p>Agility: {fighter.agility}</p>
               
               <button onClick={() => handleAddFighter(fighter)}>Add</button>
             </li>
           ))}
         </ul>
       </section>
     </div>
   ); 
};

export default App
