import React from 'react'
import PropTypes from 'prop-types'

const Footer = (props) => (
		<footer id="footer" style={props.timeout ? {display: 'none'} : {}}>
				<p style={{fontSize: '66.66666666%'}}>This site is protected by reCAPTCHA; the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
				<p className="copyright">&copy; Gatsby Starter - Dimension. Design: <a href="https://html5up.net">HTML5 UP</a>. Built with: <a href="https://www.gatsbyjs.org/">Gatsby.js</a></p>
		</footer>
)

Footer.propTypes = {
		timeout: PropTypes.bool
}

export default Footer
