import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import HotelsPage from "./pages/HotelsPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import BookingConfirmPage from "./pages/BookingConfirmPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FlightSearch from "./pages/FlightSearch";
import CarsPage from "./pages/CarsPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import CarBookingConfirmPage from "./pages/CarBookingConfirmPage";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Auth */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/flights" element= {<FlightSearch />} />
                    <Route
                        path="/hotels/:hotelId/rooms/:roomId/confirm"
                        element={<ProtectedRoute><BookingConfirmPage /></ProtectedRoute>}
                    />
                    <Route path="/dashboard" element={<Navigate to="/" replace />} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

                    {/* Hotels */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/hotels" element={<HotelsPage />} />
                    <Route path="/hotels/:hotelId" element={<HotelDetailsPage />} />
                    <Route path="/hotels/:hotelId/rooms/:roomId/confirm" element={
                        <ProtectedRoute><BookingConfirmPage /></ProtectedRoute>
                    } />

                    {/* Cars — /bookings AVANT /:carId */}
                    <Route path="/cars" element={<CarsPage />} />
                    <Route path="/cars/:carId" element={<CarDetailsPage />} />
                    <Route path="/cars/:carId/confirm" element={
                        <ProtectedRoute><CarBookingConfirmPage /></ProtectedRoute>
                    } />

                    {/* Fallback — toujours en dernier */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}