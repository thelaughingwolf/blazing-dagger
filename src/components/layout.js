import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Scrollbars } from 'react-custom-scrollbars'
import { StaticQuery, graphql } from 'gatsby'

// Fix renderTrack customization overriding behavior of thumbs
import {
  renderTrackHorizontalDefault,
  renderTrackVerticalDefault
} from 'react-custom-scrollbars/lib/Scrollbars/defaultRenderElements';


import '../assets/scss/main.scss'

class CustomScrollbars extends React.Component {
	render() {
		return (
			<Scrollbars
				{...this.props}
				renderTrackHorizontal={props => renderTrackHorizontalDefault({ ...props, className: 'rcs-custom rcs-custom-track rcs-custom-horizontal' })}
				renderTrackVertical={props => renderTrackVerticalDefault({ ...props, className: 'rcs-custom rcs-custom-track rcs-custom-vertical' })}
				renderThumbHorizontal={props => <div {...props} className="rcs-custom rcs-custom-thumb rcs-custom-horizontal" />}
				renderThumbVertical={props => <div {...props} className="rcs-custom rcs-custom-thumb rcs-custom-vertical" />}
				renderView={props => <div {...props} className="rcs-custom rcs-custom-view"/>}
			>
				{this.props.children}
			</Scrollbars>
		);
	}
}


const Layout = ({ children, location }) => {

	let content;

	if (location && location.pathname === '/') {
		content = (
			<div>
				{children}
			</div>
		)
	} else {
		content = (
			<div id="wrapper" className="page">
				<div>
				{children}
			</div>
			</div>
		)
	}

	return (
		<StaticQuery
			query={graphql`
				query SiteTitleQuery {
					site {
						siteMetadata {
							title
						}
					}
				}
			`}
			render={data => (
				<>
					<Helmet
						title={data.site.siteMetadata.title}
						meta={[
							{ name: 'description', content: 'Sample' },
							{ name: 'keywords', content: 'sample, something' },
						]}
					>
						<html lang="en" />
					</Helmet>
					<CustomScrollbars
						autoHeight
						autoHeightMin="100vh"
						autoHeightMax="100vh"
					>
						{content}
					</CustomScrollbars>
				</>
			)}
		/>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
