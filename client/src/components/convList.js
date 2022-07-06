import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
 <tr>
    <td>
      <a target="_blank" href={`https://app.intercom.com/a/apps/qq7v0gqb/inbox/inbox/all/conversations/${props.record.number}`} ><small>{props.record.number}</small></a>   
    </td>
    <td>{props.record.title}</td>
    <td>{props.record.agent}</td>
    <td>
      <small>{props.record.tags}</small>
    </td>
    <td>   
      <Link className="btn btn-primary btn-sm" to={`/edit/${props.record._id}`}>Edit</Link>
      &nbsp;
      <button className="btn btn-danger btn-sm"
       onClick={() => {
         props.deleteRecord(props.record._id);
        //  props.deleteRecord(props.record.number);
       }} >
       <i class="bi bi-trash"></i> Del
      </button>
    </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/conversation/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     records.forEach(doc=> {
      if(doc.caseType){
        doc.tags = JSON.stringify( doc.caseType );
      }
     });
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
    console.log(`delete record ${id}`);
   await fetch(`http://localhost:5000/conversation/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Number</th>
           <th>Title</th>
           <th>Agent</th>
           <th> <span alt="caseType">Tags</span></th>
           <th>Actions</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}