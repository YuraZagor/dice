import React from "react"

export default function Die(props) {
	const styles = {
		backgroundColor: props.reserved ? 'black' : 'lightgrey'
	} 
	return(
		<div onClick={props.handleClick} style={styles}>
			<img src={require(`../public/images/${props.value}.png`)} alt="" className="dice-view" 
			 />
			
		</div>
	)
}