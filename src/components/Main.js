import PropTypes from 'prop-types'
import React from 'react'
import pic01 from '../images/pic01.jpg'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/pic03.jpg'
import delay from 'delay'

class ContactForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			values: {
				name: '',
				email: '',
				subject: '',
				message: ''
			},
			status: 'pending'
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		let newState = {
			values: {
				...this.state.values,
				[name]: value
			}
		};

		// Clear the error state, if any
		if (this.state.status === 'error') {
			newState.status = 'pending';
		}

		this.setState(newState);
	}

	async handleSubmit(event) {
		event.preventDefault();

		let response = await this.props.onSubmitContactForm(this.state.values);

		if (response.data.success) {
			this.setState({
				values: {
					name: '',
					email: '',
					subject: '',
					message: ''
				},
				status: 'success'
			});
			await delay(500);
			this.props.onCloseArticle();
		}
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="field half first">
					<label htmlFor="name">Name*</label>
					<input
						type="text"
						name="name"
						id="contact-form-name"
						required
						value={this.state.values.name}
						onChange={this.handleChange}
					/>
				</div>
				<div className="field half">
					<label htmlFor="email">Email*</label>
					<input
						type="text"
						name="email"
						id="contact-form-email"
						required
						value={this.state.values.email}
						onChange={this.handleChange}
					/>
				</div>
				<div className="field">
					<label htmlFor="subject">Subject</label>
					<input
						type="text"
						name="subject"
						id="contact-form-subject"
						value={this.state.values.subject}
						onChange={this.handleChange}
					/>
				</div>
				<div className="field">
					<label htmlFor="message">Message*</label>
					<textarea
						name="message"
						id="contact-form-message"
						required
						value={this.state.values.message}
						onChange={this.handleChange}
						rows="4"
					></textarea>
				</div>
				<div className={"contact-form-response contact-form-success " + ((this.state.status === 'success') ? 'active' : '')}>
					Thanks for contacting me!
				</div>
				<div className={"contact-form-response contact-form-error " + ((this.state.status === 'error') ? 'active' : '')}>
					Sorry, something went wrong. Please try again!
				</div>
				<ul className="actions">
					<li>
						<input type="submit" value="Send Message" className="special" />
					</li>
					<li>
						<input type="reset" value="Reset" />
					</li>
				</ul>
			</form>
		);
	}
}

ContactForm.propTypes = {
	onSubmitContactForm: PropTypes.func,
	onCloseArticle: PropTypes.func
}

class Main extends React.Component {
	render() {
		let close = (
			<div
				className="close"
				onClick={() => {
					this.props.onCloseArticle()
				}}
			></div>
		)

		function Article(props) {
			return (
				<article
					id={props.id}
					className={`${
						props.id === props.activeArticle ? 'active' : ''
					} ${
						props.articleTimeout ? 'timeout' : ''
					}`}
					style={{ display: 'none' }}
				>
					{props.children}
					{close}
				</article>
			);
		}

		return (
			<div
				ref={this.props.setWrapperRef}
				id="main"
				style={this.props.timeout ? { display: 'flex' } : { display: 'none' }}
			>
				<Article id="intro" activeArticle={this.props.article} articleTimeout={this.props.articleTimeout}>
					<h2 className="major">Intro</h2>
					{/* <span className="image main">
						<img src={pic01} alt="" />
					</span> */}
					<p>
						Welcome to my site! Thanks for checking it out. This site was a way to learn Gatsby and to make my personal mark on the web after spending years making companies’ marks on the web for them. By the way, check out my <a href="#work" onClick={() => {this.props.onOpenArticle('work')}}>awesome work</a>.
					</p>
				</Article>

				<Article id="work" activeArticle={this.props.article} articleTimeout={this.props.articleTimeout}>
					<h2 className="major">Work</h2>
					{/* <span className="image main">
						<img src={pic02} alt="" />
					</span> */}
					<p>
						In the early days I designed and built apps in PHP. Once we shifted to Node, we used Sails as a back end (pro tip: don’t use Sails) and AngularJS as a front end.
					</p>
					<p>
						In addition to company work, I also host websites. I only have <a href="https://littlebitterrootranch.com" target="_blank">a</a> <a href="https://hotspringsbiblechurch.com" target="_blank">couple</a> right now, but I’m always happy to add more!
					</p>
					{close}
				</Article>

				<Article id="about" activeArticle={this.props.article} articleTimeout={this.props.articleTimeout}>
					<h2 className="major">About</h2>
					{/* <span className="image main">
						<img src={pic03} alt="" />
					</span> */}
					<p>
						My name is Michael Bennett. I’m a firm Christian, dedicated husband, and proud father to two adorable kids. I’m also a mostly-JavaScript programmer, although I’ve used PHP enough to appreciate (and, sometimes, bemoan) its quirks, too. I live in Montana, which is gorgeous, if a little lacking in web developers - I’m trying to do my part to increase the ratio!
					</p>
					{close}
				</Article>

				<Article id="contact" activeArticle={this.props.article} articleTimeout={this.props.articleTimeout}>
					<h2 className="major">Contact</h2>
					<ContactForm
						onSubmitContactForm={this.props.onSubmitContactForm}
						onCloseArticle={this.props.onCloseArticle}
					/>
					<ul className="icons">
						{/* <li>
							<a
								href="https://twitter.com/HuntaroSan"
								className="icon fa-twitter"
							>
								<span className="label">Twitter</span>
							</a>
						</li> */}
						<li>
							<a
								href="https://www.linkedin.com/in/thelaughingwolf"
								target="_blank"
								className="icon fa-linkedin"
							>
								<span className="label">LinkedIn</span>
							</a>
						</li>
						{/* <li>
							<a href="https://codebushi.com" className="icon fa-instagram">
								<span className="label">Instagram</span>
							</a>
						</li> */}
						<li>
							<a
								href="https://github.com/thelaughingwolf"
								target="_blank"
								className="icon fa-github"
							>
								<span className="label">GitHub</span>
							</a>
						</li>
					</ul>
					{close}
				</Article>
			</div>
		)
	}
}

Main.propTypes = {
	route: PropTypes.object,
	article: PropTypes.string,
	articleTimeout: PropTypes.bool,
	onOpenArticle: PropTypes.func,
	onCloseArticle: PropTypes.func,
	onSubmitContactForm: PropTypes.func,
	timeout: PropTypes.bool,
	setWrapperRef: PropTypes.func.isRequired,
}

export default Main
