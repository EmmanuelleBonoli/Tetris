import PropTypes from "prop-types";

export function GaugeFuel({oil}) {
  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <div>{oil}</div>
       <img style={{ width: "60%" }}  src="/images/Game/fuel.png"/>
    </div>
  )
}

GaugeFuel.propTypes={
  oil: PropTypes.number,
}