import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
    stnumber: "", title: "", agent: "",
    descriptionsTmp:"", tags:"", macrosTmp:"",
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
      if(record.descriptions) record.descriptionsTmp = JSON.stringify( record.descriptions );
      if(record.caseType) record.tags = record.caseType.join(" | "); //JSON.stringify( record.caseType );
      if(record.macros) record.macrosTmp = JSON.stringify( record.macros );
      
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
   

   editedRecord.descriptions = editedRecord.descriptionsTmp.split(".");
   //  editedRecord.macros = editedRecord.macrosTmp.split(",");
   editedRecord.caseType =  editedRecord.tags.split("|");

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
         <input type="text" className="form-control" id="stnumber" value={form.stnumber}
           onChange={(e) => updateForm({ stnumber: e.target.value })} />
       </div>
       <div className="form-group">
         <label htmlFor="title">Title</label>
         <input type="text" className="form-control" id="title" value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })} />
       </div>
       <div className="form-group">
         <label htmlFor="agent">Agent</label>
         <input type="text" className="form-control" id="agent" value={form.agent}
           onChange={(e) => updateForm({ agent: e.target.value })} />
       </div>
       
       

       
       <div className="form-group">
         <label htmlFor="slackThread">slack Thread</label>
         <input type="text" className="form-control" id="slackThread" value={form.slackThread}
           onChange={(e) => updateForm({ slackThread: e.target.value })} />
       </div>

       <div className="form-group">
         <label htmlFor="jiraTicket">Jira Ticket</label>
         <input type="text" className="form-control" id="slack" value={form.jiraTicket}
           onChange={(e) => updateForm({ jiraTicket: e.target.value })} />
       </div>

       
       <div className="form-group">
         <label htmlFor="caseType">Types</label>
         <input type="text" className="form-control" id="caseType" value={form.tags}
           onChange={(e) => updateForm({ tags: e.target.value })} />
       </div>
       <div className="form-group">
         <label htmlFor="macros">Macros</label>
         <input type="text" className="form-control" id="macros" value={form.macrosTmp}
           onChange={(e) => updateForm({ macrosTmp: e.target.value })} />
       </div>

       <div className="form-group">
         <label htmlFor="descriptions">Descriptions</label>
         <input type="text" className="form-control" id="descriptions" value={form.descriptionsTmp}
           onChange={(e) => updateForm({ descriptionsTmp: e.target.value })} />
       </div>
       
       <br />
 
       <div className="form-group">
         <input type="submit" value="Update Record" className="btn btn-primary" />
       </div>
     </form>
   </div>
 );
}