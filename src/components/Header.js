import React from 'react'
import PropTypes from 'prop-types'
import logo from '../images/laughing-logo.png'

const Header = (props) => (
	<header id="header" style={props.timeout ? {display: 'none'} : {}}>
		<div className="logo">
			{/* <span className="icon fa-diamond"></span> */}
			<img src={logo} alt="The Laughing Wolf" />
		</div>
		<div className="content">
			<div className="inner">
				<h1>The Laughing Wolf</h1>
				<p>Custom web development from the wilds of Montana.</p>
			</div>
		</div>
		<nav>
			<ul>
				<li><a href="#intro"		onClick={() => {props.onOpenArticle('intro')}}>Intro</a></li>
				<li><a href="#work"			onClick={() => {props.onOpenArticle('work')}}>Work</a></li>
				<li><a href="#about"		onClick={() => {props.onOpenArticle('about')}}>About</a></li>
				<li><a href="#contact"	onClick={() => {props.onOpenArticle('contact')}}>Contact</a></li>
			</ul>
		</nav>
	</header>
)

Header.propTypes = {
	onOpenArticle: PropTypes.func,
	timeout: PropTypes.bool
}

export default Header
