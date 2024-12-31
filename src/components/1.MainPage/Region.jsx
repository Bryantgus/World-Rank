import PropTypes from 'prop-types'
import {useState} from 'react'
import "./Region.css"
export default function Region(props) {
    const [btClicked, setBtClicked] = useState(false)
    return (
        <div className={`region ${props.classRegion} ${btClicked ? "btClicked" : ""}`}>
            <button 
            className="font3 color3"
            onClick={() => setBtClicked((prev) => !prev)}>
            {props.region}
            </button>
        </div>
    )
}

Region.propTypes = {
    region: PropTypes.string,
    classRegion: PropTypes.string,
}