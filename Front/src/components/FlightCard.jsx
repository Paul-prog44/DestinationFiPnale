import { Link } from "react-router-dom"
import { useMemo } from "react"

export default function FlightCard({ flight }) {

    const durationMinutes = useMemo(() => {
        const diffMs = new Date(flight.arrTime) - new Date(flight.deptTime)
        return Math.floor(diffMs / 1000 / 60)
    }, [flight.deptTime, flight.arrTime])

    const hours = Math.floor(durationMinutes / 60)
    const minutes = durationMinutes % 60

    return (
        <div className="col-12">
            <div className="card border-0 shadow-sm overflow-hidden rounded-5 h-100">
                <div className="row g-0 align-items-center">
                    <div className="col-lg-3">
                        <img 
                            className="w-100 h-100" 
                            src={flight.imgPath || "https://via.placeholder.com/250x150?text=Avion"} 
                            alt={flight.companyName} 
                            style={{ minHeight: "200px", objectFit: "cover" }} 
                        />
                    </div>
                    
                    <div className="col-lg-6">
                        <div className="card-body p-4 p-lg-5">
                            <p className="text-secondary mb-2">{flight.companyName}</p>
                            <h2 className="h3 fw-semibold mb-3">
                                {flight.depCity} ➔ {flight.arrCity}
                            </h2>
                            
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                <span className="badge rounded-pill text-dark border px-3 py-2">
                                    Vol Direct
                                </span>
                            </div>
                            
                            {durationMinutes > 0 && (
                                <p className="text-secondary mb-0">
                                    Durée du vol : {hours}h {minutes}m
                                </p>
                            )}
                        </div>
                    </div>
                    
                    <div className="col-lg-3">
                        <div className="card-body p-4 p-lg-5 h-100 d-flex flex-column justify-content-center align-items-lg-end text-lg-end border-top border-lg-top-0">
                            <p className="text-secondary mb-1">Prix dès</p>
                            <p className="h4 fw-semibold mb-2" style={{ color: "#8EA604" }}>
                                {flight.price ? `${flight.price} EUR` : "Sur demande"}
                            </p>
                            <p className="small text-secondary mb-4">Tarif standard</p>
                            <Link className="btn btn-outline-dark rounded-pill px-4" to={`/flights/${flight.id}`}>
                                Réserver
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}