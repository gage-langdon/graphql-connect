const { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } = require('graphql-tools');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

/*
*	@description Creates a connection to a remote graphql schema, allowing the usage and merging of the schema is if it were local.
*	@param {String} uri The uri location of the remote schema
*	@param {Object} headers The http headers being sent to the remote schema
*/
module.exports.createRemoteSchema = async ({ uri, headers }) => {
	const link = new HttpLink({
		uri,
		fetch,
		headers
	});
	const schema = await introspectSchema(link);
	return makeRemoteExecutableSchema({
		schema,
		link
	});
};

/*
*	@description Merges multiple GraphQL schemas into one.
*	@param {Array.<Object>} schemas The array of schemas that are being merged.
*/
module.exports.mergeSchemas = async ({ schemas: raw }) => {
	const schemas = await Promise.all(raw);
	return mergeSchemas({ schemas });
};
