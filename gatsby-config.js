const primaryColor = '#2c242a';
module.exports = {
  siteMetadata: {
    title: "The Laughing Wolf",
    author: "Michael Bennett",
		description: "Custom website development from the wilds of Montana",
		siteUrl: "https://thelaughingwolf.net"
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'The Laughing Wolf',
        short_name: 'thelaughingwolf',
        start_url: '/',
        background_color: primaryColor,
        theme_color: primaryColor,
        display: 'minimal-ui',
        icon: 'src/images/laughing-icon.png', // This path is relative to the root of the site.
      },
		},
    'gatsby-plugin-sass',
    'gatsby-plugin-offline'
	],
}
