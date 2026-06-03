import { useState } from "react";
function Submitcomplaint(){
    const [title, seTitle ]= useState("");
    const [ category , seCategory ]= useState("");
    const [description , setDescription ]= useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log({title, category, description});
    }
    return(
        <div>
            <h1>Submit Complaint</h1>
            <form onSubmit={handleSubmit}>
                <label >Complaint Title</label>
                <br />
                <input type="text" placeholder="Enter your complaint title" value={title}
                 onChange={(e) => seTitle(e.target.value)} />
                 <br /><br />
                 <label >Complaint Category</label>
                 <br />
                 <input type="text" placeholder="Enter your complaint category" value={category} onChange={(e) => seCategory(e.target.value)} />
                 <br />
                 <label >Complaint Description</label>
                 <br />
                 <textarea placeholder="Enter your complaint description" value={description} onChange={(e) => setDescription(e.target.value)} />
                 <br />
                 <button type="submit">Submit Complaint</button>
            </form>
        </div>
    );
}

export default Submitcomplaint;