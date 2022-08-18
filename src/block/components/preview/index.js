const { __ } = wp.i18n;
const apiFetch = wp.apiFetch;
const { useState, useEffect } = wp.element;

const BlockPreview = ( { page } ) => {
	const { title, featured_media, link } = page;
	const [ featuredIamge, setFeaturedImage ] = useState( {} );

	// Checking if page has Featured Image
	// and fetch it using WP REST API endpoint
	useEffect( () => {
		setFeaturedImage( {} );

		if ( featured_media ) {
			apiFetch( {
				path: '/wp/v2/media/' + featured_media,
				method: 'GET',
			} ).then( ( res ) => {
				setFeaturedImage( res );
			} );
		}
	}, [ featured_media ] );

	return (
		<div className="wrapper">
			<h2>{ title.rendered }</h2>
			{ featuredIamge.media_details &&
				<img src={ featuredIamge.media_details.sizes.large.source_url }
					alt={ featuredIamge.title.rendered }
					width={ featuredIamge.media_details.sizes.large.width }
					height={ featuredIamge.media_details.sizes.large.height } /> }
			<a href={ link } >{ __( 'Go to page' ) }</a>
		</div>
	);
};

export default BlockPreview;
