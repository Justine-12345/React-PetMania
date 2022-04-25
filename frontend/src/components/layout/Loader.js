import React from 'react'
const Loader = () => {
    return (
        <div className="box" style={{marginTop:"10%"}}>
          <svg width="200" height="200" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="22" fill="none" stroke="#3be6cd" strokeWidth="3" strokeDasharray="34" strokeLinecap="round">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 25 25" to="360 25 25" dur="1.5s" repeatCount="indefinite" />
              <animate attributeType="XML" attributeName="stroke" values="#3be6cd;#02bcfe;#3be6cd;" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="25" cy="25" r="12" fill="none" stroke="#02bcfe" strokeWidth="3" strokeDasharray="19" strokeLinecap="round">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="360 25 25;0 25 25;" dur="1.5s" repeatCount="indefinite" />
              <animate attributeType="XML" attributeName="stroke" values="#02bcfe;#3be6cd;#02bcfe;" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
    )
}
export default Loader