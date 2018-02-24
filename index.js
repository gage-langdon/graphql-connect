const { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } = require('graphql-tools');
const { transformSchema } = require('graphql-transform-schema');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

/*
*	@description Creates a connection to a remote graphql schema, allowing the usage and merging of the schema is if it were local.
*	@param {String} uri The uri location of the remote schema
*	@param {Object} headers The http headers being sent to the remote schema
*	@param {Object} filters The queries or mutations that should be filtered out before returning the schema
*/
module.exports.createRemoteSchema = async ({ uri, headers, filters }) => {
	const link = new HttpLink({
		uri,
		fetch,
		headers
	});
	const introspection = await introspectSchema(link);
	const executableSchema = makeRemoteExecutableSchema({
		schema,
		link
	});

	// filter out specified query or mutations from schema
	return transformSchema(executableSchema, filters);
};

/*
*	@description Merges multiple GraphQL schemas into one
*	@param {Array.<Object>} schemas The array of schemas that are being merged.
*/
module.exports.mergeSchemas = async ({ schemas: raw }) => {
	const schemas = await Promise.all(raw);
	return mergeSchemas({ schemas });
};
