import React, { useEffect, useState } from 'react';

const Users = () => {
const [data,setData]= useState([]);
useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(result=>result.json())
    .then(data=> setData(data))
},[])

    return (
        <div>
            <h1>all user {data.length}</h1>
        </div>
    );
};

export default Users;