
import React, { useEffect } from "react";

import { useState } from "react";

//create your first component
const Home = () => {
	const [inputValue , setInputValue] = useState('');
	
	const [user,setUser]= useState();
const createUser = async ()=> {
	await fetch('https://playground.4geeks.com/todo/users/Komtudo', {
		method: 'POST'
	}).then(resp=>{
		if(resp.ok){
			alert('The user have  created correctly');
			getUser();
		}
	})
};

const getUser = async()=>{
	await fetch('https://playground.4geeks.com/todo/users/Komtudo').then(resp => {
		if(!resp.ok){
			createUser();
		}
		return resp.json()
	}).then(user=>setUser(user))
};
const deleteUser=async()=>{
	await fetch('https://playground.4geeks.com/todo/users/Komtudo',{
		method: 'DELETE'
	}).then(resp=>resp.ok && setUser(null))
};
useEffect(()=>{
	getUser();
	
},[]);

const createTask = async(inputValue) => {
	await fetch('https://playground.4geeks.com/todo/todos/Komtudo',{
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify({
			label:inputValue,
			is_done: false
		})
	}).then(resp=>{
		if(resp.ok){
			return resp.json()
		}
	}).then(respJson => {
		const userTask =user.todos;
			const newUser = {
				...user,
				todos:[...userTask,respJson]
			}
			setUser(newUser);

	})
}
const deleteTask = async(inputValue) =>{
	const id = inputValue.id;
	await fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
		method: 'DELETE'
	}).then(resp=>{
		if (resp.ok) {
			const userTasks = user.todos.filter(el=>el.id!==inputValue.id);
			const newUser = {
				...user,
				todos:[...userTasks]
			};
			setUser(newUser)
		}
	})
}
	return (
		<div className="container">
			<h1>TO-DO con Fetch</h1>
			<ul>
				<li>
					<input type="text" 
					onChange={(e)=>setInputValue(e.target.value)}
					value={inputValue}
					onKeyDown={(e)=>{
						if (e.key==='Enter') {
							createTask(inputValue);
							setInputValue('');
						}
					}}
					placeholder="¿Que quieres hacer?"/>
					
				</li>
				{
				user && user.todos.map((item, index)=>(
						<li key={index} >
							{item.label}{' '}
							<i className="fas fa-trash-alt" onClick={()=>deleteTask(item)}></i>
						</li>
					))
				}
			</ul>
			<div className="todosN">Tu tienes {user && user.todos.length} cositas en tu lista</div>
			<button onClick={()=>deleteUser()}>Eliminar usuario</button>
		</div>
	);
};

export default Home;
