import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
    stnumber: "", title: "", agent: "",
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/conversation/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     record.stnumber = ''+record.number;
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
    console.log('Updating record');
   e.preventDefault();
   const editedRecord = {
    stnumber: form.stnumber,
    title: form.title,
    agent: form.agent,
   };
 
   editedRecord.number = parseInt(editedRecord.stnumber);

   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/conversation/${params.id}`, {
     method: "PUT",
     body: JSON.stringify(editedRecord),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
     <div className="form-group">
         <label htmlFor="stnumber">Number</label>
         <input
           type="text"
           className="form-control"
           id="stnumber"
           value={form.stnumber}
           onChange={(e) => updateForm({ stnumber: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="title">Title</label>
         <input
           type="text"
           className="form-control"
           id="title"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="agent">Agent</label>
         <input
           type="text"
           className="form-control"
           id="agent"
           value={form.agent}
           onChange={(e) => updateForm({ agent: e.target.value })}
         />
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}