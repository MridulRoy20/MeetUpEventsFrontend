import { useState } from "react";
import useFetch from "../useFetch";
import {Link} from 'react-router-dom'
const HomePage = () => {
    const {data, loading, error} = useFetch("https://meetup-backend-eight.vercel.app/meetup")
    console.log(data);

    // const filter = getElemetById("#filterSelect").value();
    // console.log(filter);
    const [filteredData, setFilteredData] = useState(null)
    let searchData = null;
    
    const handleFilter = (filter) => {
        if(filter === "Both"){
            setFilteredData(data)
        } else{
            setFilteredData(data.filter(d => d.mode === filter ))
        }   
    }
    
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);

        // Date part
        const dateOptions = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
        const datePart = date.toLocaleDateString("en-US", dateOptions);

        // Time part (in IST)
        const timeOptions = { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true, timeZone: "Asia/Kolkata" };
        const timePart = date.toLocaleTimeString("en-US", timeOptions);

        return `${datePart} • ${timePart} IST`;
    };
    const handleSearch = (e) => {
        
        const searchValue = e;
        console.log(searchValue);
        searchData = data?.filter(d => d.eventTitle.toLowerCase() === searchValue.toLowerCase()|| 
        d.eventTags.some((tag => tag.toLowerCase().includes(searchValue.toLowerCase()))) )

        setFilteredData(searchData)
        
        
    }

    return(
        <>
            <div className="bg-light ">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <h1 className="py-3 fw-bold">Meetup Events</h1>

                        <div className="mt-4">
                            <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" onChange={(e) => handleSearch(e.target.value)} placeholder= "🔍 Search by Title and Tag" aria-label="Search"/>
                            
                            </form>
                        </div>
                        
                    </div>

                    
                        <div className="d-flex my-3">
                            <select id="filterSelect" onChange={(e) => handleFilter(e.target.value)} className="ms-auto" defaultValue={""}>
                                <option value={""} disabled>Select Event Type</option>
                                <option value={"Both"}>Both</option>
                                <option value={"Online"}>Online</option>
                                <option value={"Offline"}>Offline</option>
                            </select>
                        </div>
                    
                    <div className="row">

                    {(filteredData|| data)?.map((item) => (
                        <div className="col-md-4 pb-4" key={item._id}>
                            <div className="card border-0 bg-light">
                                <img src= {`${item.eventImageUrl}`} className="card-img-top rounded" alt={`${item.eventTitle}`} width="100" height="250"/>
                                {<span className="badge bg-light fw-medium text-dark position-absolute top-0 start-0 m-2 p-2 py-2">
                                    {item.mode} Event
                                </span>}
                                
                                <div className="card-body">
                                    
                                    <p className="card-text">{formatDateTime(item.startDateTime) }</p>
                                    <Link to={`/meetup/${item.eventTitle}`} className="text-decoration-none text-dark"><h5 className="card-title fw-bold">{item.eventTitle}</h5></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    

                </div>
                </div>
            </div>
        </>
    )
}
export default HomePage;