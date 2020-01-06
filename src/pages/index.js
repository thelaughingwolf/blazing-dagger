import React from 'react'
import Layout from '../components/layout'

import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import delay from 'delay'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import Axios from 'axios'

/* class ReCaptcha extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getTokenHandle(this.props.googleReCaptchaProps.executeRecaptcha);
		//const token = await this.props.googleReCaptchaProps.executeRecaptcha('homepage');
	}

	render() {
		return '';
	}
}

const ReCaptchaCapture = withGoogleReCaptcha(ReCaptcha); */

function ReCaptchaCapture(props) {
	const { executeRecaptcha } = useGoogleReCaptcha();

	props.getTokenHandle(executeRecaptcha);

	return null;
}

class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isArticleVisible: false,
			timeout: false,
			articleTimeout: false,
			article: '',
			loading: 'is-loading',
			recaptchaTokenHandle: null
		}
		this.handleOpenArticle = this.handleOpenArticle.bind(this);
		this.handleCloseArticle = this.handleCloseArticle.bind(this);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleSubmitContactForm = this.handleSubmitContactForm.bind(this);
		this.getTokenHandle = this.getTokenHandle.bind(this);
	}

	componentDidMount () {
		this.timeoutId = setTimeout(() => {
			this.setState({loading: ''});
		}, 100);
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount () {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	async handleOpenArticle(article) {
		this.setState({
			isArticleVisible: true,
			article
		})

		await delay(325);

		this.setState({
			timeout: true
		})

		await delay(25);

		this.setState({
			articleTimeout: true
		})
	}

	async handleCloseArticle() {
		this.setState({
			articleTimeout: false
		})

		await delay(325);

		this.setState({
			timeout: false
		})

		await (delay(25));

		this.setState({
			isArticleVisible: false,
			article: ''
		})
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			if (this.state.isArticleVisible) {
				this.handleCloseArticle();
			}
		}
	}

	async handleSubmitContactForm(values) {
		//const recaptchaToken = this.state.recaptchaToken;
		const recaptchaToken = await this.state.recaptchaTokenHandle('homepage');
		const data = {
			contact_captcha: recaptchaToken,
			contact_name: values.name,
			contact_email: values.email,
			contact_subject: values.subject,
			contact_message: values.message
		};

		return await Axios({
			url: 'https://thelaughingwolf.net/contact-form.php',
			method: 'post',
			responseType: 'json',
			data: data
		});
	}

	getTokenHandle(handle) {
		if (!this.state.recaptchaTokenHandle) {
			this.setState({
				recaptchaTokenHandle: handle
			})
		}
	}

	render() {
		return (
			<Layout location={this.props.location}>
				<GoogleReCaptchaProvider reCaptchaKey="6Lc_aswUAAAAAOjB6s8Upfody3xlrqq-UCxbtBDd">
					<ReCaptchaCapture getTokenHandle={this.getTokenHandle} />
					<div className={`body ${this.state.loading} ${this.state.isArticleVisible ? 'is-article-visible' : ''}`}>
						<div id="wrapper">
							<Header onOpenArticle={this.handleOpenArticle} timeout={this.state.timeout} />
							<Main
								isArticleVisible={this.state.isArticleVisible}
								timeout={this.state.timeout}
								articleTimeout={this.state.articleTimeout}
								article={this.state.article}
								onOpenArticle={this.handleOpenArticle}
								onCloseArticle={this.handleCloseArticle}
								onSubmitContactForm={this.handleSubmitContactForm}
								setWrapperRef={this.setWrapperRef}
							/>
							<Footer timeout={this.state.timeout} />
						</div>
						<div id="bg" />
					</div>
				</GoogleReCaptchaProvider>
			</Layout>
		)
	}
}

export default IndexPage
