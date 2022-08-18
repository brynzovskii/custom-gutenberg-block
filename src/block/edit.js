import Preview from './components/preview/';

const { useEffect, Fragment } = wp.element;
const { SelectControl, Spinner } = wp.components;
const { __ } = wp.i18n;

const BlockEdit = ( { posts, setAttributes, attributes, className } ) => {
	const { pageId, page } = attributes;

	const selectOptions = [
		{
			value: '',
			label: __( 'Nothing selected' ),
		},
	];

	//Populate select options with pages
	if ( posts ) {
		posts.forEach( ( item ) => {
			const option = {
				value: item.id,
				label: item.title.rendered,
			};
			selectOptions.push( option );
		} );
	}

	//Detect the selected page
	useEffect( () => {
		setAttributes( {
			page: posts ? posts.filter( ( item ) => item.id === parseInt( pageId ) )[ 0 ] : null,
		} );
	}, [ pageId ] );

	return (
		<div className={ className }>
			{ posts ? (
				<Fragment>
					<SelectControl
						label={ __( 'Please, select a Page to display' ) }
						value={ pageId }
						options={ selectOptions }
						onChange={ ( selectedPageID ) => {
							setAttributes( {
								pageId: parseInt( selectedPageID ),
							} );
						} }
					/>
					{ page && <Preview page={ page } /> }
				</Fragment>
			) : <div className="spinner__wrapper"><Spinner /></div> }
		</div>
	);
};

export default BlockEdit;
