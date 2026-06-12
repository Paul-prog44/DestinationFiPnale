import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getFlight, searchFlights } from "../api/flightApi"
import { getCities } from "../api/cityApi"
import Navbar from "../components/Navbar"
import FlightCard from "../components/FlightCard"

export default function FlightSearch() {
    const [flights, setFlights] = useState([])
    const [departureFilter, setDepartureFilter] = useState("")
    const [arrivalFilter, setArrivalFilter] = useState("") 
    const [departureDate, setDepartureDate] = useState("") 
    const [returnDate, setReturnDate] = useState("")
    const [passengers, setPassengers] = useState("1")
    const [sortOrder, setSortOrder] = useState("duration")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [cities, setCities] = useState([])
    
    const [searchParams, setSearchParams] = useSearchParams()
    const selectedDeparture = searchParams.get("from") ?? ""

    useEffect(() => {
        const initData = async () => {
            try {
                const [flightsData, citiesData] = await Promise.all([
                    searchFlights(),
                    getCities()
                ])
                
                setFlights(flightsData.flights ?? [])
                setCities(citiesData.cities ?? [])
            } catch (err) {
                setError("Impossible de charger les données de voyage.")
            } finally {
                setLoading(false)
            }
        }

        initData()
    }, [])

    useEffect(() => {
        setDepartureFilter(selectedDeparture)
    }, [selectedDeparture])

    const filteredFlights = useMemo(() => {
        const visibleFlights = selectedDeparture
            ? flights.filter((flight) => flight.depCity.toLowerCase() === selectedDeparture.toLowerCase())
            : flights

        return [...visibleFlights].sort((left, right) => {
            if (sortOrder === "price") {
                return (left.price ?? Number.MAX_SAFE_INTEGER) - (right.price ?? Number.MAX_SAFE_INTEGER)
            }

            if (sortOrder === "duration") {
                const durationLeft = new Date(left.arrTime) - new Date(left.deptTime)
                const durationRight = new Date(right.arrTime) - new Date(right.deptTime)
                return durationLeft - durationRight
            }

            return left.companyName.localeCompare(right.companyName)
        })
    }, [flights, selectedDeparture, sortOrder])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        const searchCriteria = {
            from: departureFilter || undefined,
            to: arrivalFilter || undefined,
            dateIn: departureDate || undefined,
            dateOut: returnDate || undefined,
            passengers: passengers
        }

        try {
            const data = await searchFlights(searchCriteria)
            setFlights(data.flights ?? [])
        } catch (err) {
            setError("Une erreur est survenue.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F7F5F0" }}>
            <Navbar currentSection="flights" />

            <div className="container py-4 py-lg-5">
                <div className="card border-0 shadow-sm rounded-5 mb-5" style={{ backgroundColor: "#DEDEDE" }}>
                    <div className="card-body p-4 p-lg-5">
                        <form className="row g-3 align-items-end" onSubmit={handleSubmit}>
                            <div className="col-lg-3 col-md-6">
                                <label className="form-label fw-medium">Départ de</label>
                                <select className="form-select border-0 shadow-sm" value={departureFilter} onChange={(e) => setDepartureFilter(e.target.value)}>
                                    <option value="">Toutes les villes</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.name}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <label className="form-label fw-medium">A destination de</label>
                                <select className="form-select border-0 shadow-sm" value={arrivalFilter} onChange={(e) => setArrivalFilter(e.target.value)}>
                                    <option value="">Toutes les villes</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.name}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <label className="form-label fw-medium">Date aller</label>
                                <input className="form-control border-0 shadow-sm" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <label className="form-label fw-medium">Date retour</label>
                                <input className="form-control border-0 shadow-sm" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <label className="form-label fw-medium">Passagers</label>
                                <select className="form-select border-0 shadow-sm" value={passengers} onChange={(e) => setPassengers(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="col-12 d-flex justify-content-md-start justify-content-lg-end mt-4">
                                <button 
                                    className="btn btn-light border shadow-sm fw-semibold px-5 py-2" 
                                    type="submit"
                                    style={{ minWidth: "200px" }}
                                >
                                    Rechercher un vol
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                    <div>
                        <h1 className="h2 fw-semibold mb-2">{selectedDeparture ? `Vols au départ de ${selectedDeparture}` : "Sélection de vols"}</h1>
                        <p className="text-secondary mb-0">Trouvez les meilleures options pour votre prochain voyage.</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <label className="form-label mb-0 text-secondary">Trier</label>
                        <select className="form-select" style={{ width: "220px" }} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="duration">Durée la plus courte</option>
                            <option value="price">Prix croissant</option>
                            <option value="airline">Compagnie A-Z</option>
                        </select>
                    </div>
                </div>

                {loading && <div className="alert alert-secondary">Chargement des vols...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {!loading && !error && (
                    <div className="row g-4">
                        {filteredFlights.map((flight) => (
                            <FlightCard key={flight.id} flight={flight} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}