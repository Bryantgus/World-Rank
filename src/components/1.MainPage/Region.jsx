import "./Region.css"
import PropTypes from "prop-types"
import { useState } from "react"

export default function Region(props) {
    
    const [isClicked, setIsClicked] = useState(false);
    return (
        <div className={`region ${props.classNameRegion} ${isClicked ? "clicked" : ""}`}>
            <button 
            onClick={() => {setIsClicked((prev) => !prev);
                            props.onRegionClick(props.region);
            }} 
            className={"font3 color3"}
            >
            {props.region}
            </button>
        </div>
        
    )
}

Region.propTypes = {
    region: PropTypes.string,
    classNameRegion: PropTypes.string,
    onRegionClick: PropTypes.func

}