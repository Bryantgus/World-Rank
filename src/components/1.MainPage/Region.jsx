import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import "./Region.css"

export default function Region(props) {

    const [btClicked, setBtClicked] = useState(false);
    const [regionsClicked, setRegionsClicked] = useState({
        americas: false,
        antartic: false,
        africa: false,
        asia: false,
        europe: false,
        oceania: false
    })
 
    return (
        <div className={`region ${props.classRegion} ${btClicked ? "btClicked" : ""}`}>
            <button 
            className="font3 color3"
            onClick={(region) => {setBtClicked((prev) => !prev);
                    setRegionsClicked((prev) => {
                        return {
                            ...prev,
                            [region]: !prev[region],
                        }
                    });
                
            }}>
            {props.region}
            </button>
        </div>
    )
}

Region.propTypes = {
    region: PropTypes.string,
    classRegion: PropTypes.string,
}