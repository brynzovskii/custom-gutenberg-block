//  Import CSS.
import './editor.scss';
import './style.scss';

import BlockEdit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withSelect } = wp.data;

/**
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-custom-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Custom Page Box' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Custom Page Box' ),
	],
	attributes: {
		pageId: {
			type: 'integer',
		},
		page: {
			type: 'object',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: withSelect( ( select ) => {
		const currentPostId = select( 'core/editor' ).getCurrentPostId();
		const query = { per_page: -1, exclude: currentPostId };
		return {
			posts: select( 'core' ).getEntityRecords( 'postType', 'page', query ),
		};
	} )( BlockEdit ),

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: () => {
		return null;
	},
} );
