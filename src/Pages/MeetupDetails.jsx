import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Header from "../components/Header";

const MeetupDetails = () => {
    const eventName = useParams();
    console.log(eventName.meetupTitle);
    const {data, loading, error} = useFetch("https://meetup-backend-eight.vercel.app/meetup")

    const eventData = data? data.find(d => d.eventTitle === eventName.meetupTitle) : null;
    console.log(eventData);
    
    const formatDateTime = (dateStr) => {
        const date = new Date(dateStr);
        
        const dateOption = {weekday: "short", day: "numeric", year: "numeric", month: "short"}
        const datePart = date.toLocaleDateString("en-US", dateOption);

        const timeOption = {hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata"}
        const timePart = date.toLocaleTimeString("en-US", timeOption)

        return `${datePart} • ${timePart} IST`

    }

    return(
        <div className="bg-light">
            <Header/>

            <main className="container">
                
                {eventData ?<div className="row">
                    <div className="col-md-8">
                        <h1>{eventData.eventTitle}</h1>

                        <h5 className="fw-normal">Hosted By:</h5>
                        <p className="fs-5"><strong>{eventData.host}</strong></p>

                        <img src={eventData.eventImageUrl} alt={eventData.eventTitle} height={300} width={500}/>
                        
                        <h5 className="mt-3">Details:</h5>
                        <p>{eventData.eventDetails}</p>

                        <h5>Additional Information:</h5>

                        <p><strong>Dress Code:</strong> {eventData.dressCode}</p>

                        <p><strong>Age Restriction:</strong> {eventData.ageRestrictions ? `${eventData.ageRestrictions} and above` : "None"}</p>
                    
                        <h4>Event Tags:</h4>

                        {eventData.eventTags.map(tag => (
                            <button className="btn btn-danger me-3">{tag}</button>
                            
                        ))}
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 p-3">
                            <div className="card-body">

                            <div className="mb-2 d-flex">
                                <i className="pt-2 bi bi-clock me-2 "></i>
                                <div>
                                    {formatDateTime(eventData.startDateTime)} to <br/>{formatDateTime(eventData.endDateTime)}
                                    
                                </div>
                            </div>

                                <div className="mb-2 d-flex ">
                                    
                                        <i className="pt-1 bi bi-geo-alt me-2 "></i>
                                    
                                    <div>
                                        <p>{eventData.address}</p>
                                    </div>
                                    
                                </div>
                                <div className=" d-flex ">
                                    
                                        <i className=" bi bi-currency-rupee me-2 "></i>
                                    
                                    <div>
                                        <p>{eventData.price}</p>
                                    </div>
                                    
                                </div>

                                
                                
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <h3>Speakers: ({eventData.speakers.length})</h3>

                        </div>
                        <div>
                            <div className="row mt-4">
                                {eventData.speakers.map(speaker => (
                                    <div className="col">
                                    <div className="card border-0 shadow text-center">
                                        <div className="card-body">
                                            <img src={speaker.speakerImageUrl} className="rounded-circle mx-auto d-block mb-2" height={70} width={70}/>
                                            <p className="card-text"><strong>{speaker.speakerName}</strong></p>
                                            {speaker.speakerDesignation}
                                        </div>
                                    </div>
                                </div>
                                ))}
                                
                                

                            </div>
                        </div>

                    </div>
                </div>: null}
                <br/><br/>
            </main>

        </div>
    )
}

export default MeetupDetails;