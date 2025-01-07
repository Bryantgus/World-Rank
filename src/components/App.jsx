import "./App.css"
import MainPage from "./1.MainPage/MainPage"

export default function App() {
    

    return (
        <div className="appContainer">
            <div className="bgContainer">
                <div>
                    <img src="/hero-image-wr.jpg" alt="hero-img-wr" />
                </div>
                <div>
                    <img src="/Logo.svg" alt="Logo Wr" />
                </div>
            </div>
            <MainPage />        
       
            
        </div>
    )
}