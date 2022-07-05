import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
  stnumber: "", title: "", agent: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   console.log('Creating record');
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newRecord = { ...form };

   newRecord.number = parseInt(newRecord.stnumber);
 
   await fetch("http://localhost:5000/conversation/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newRecord),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ stnumber: "", title: "", agent: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
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

       <div className="form-group">
         <input
           type="submit"
           value="Create Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}