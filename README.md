# graphql-connect
GraphQL tool that makes for easy remote schema connections and merging multiple schemas into one.

![alt text](http://i68.tinypic.com/2dnymc.jpg)

### Get Started
 - Install `npm install graphql-connect`
 - Import `const { createRemoteSchema, mergeSchemas } = require('graphql-connect');`

#### Connect Remote Schema
```
const remoteSchema = createRemoteSchema({
  uri: 'localhost:8080/graphql'
});
```

#### Merge Multiple Schemas Into One
```
 const schemas = await mergeSchemas({ schemas: [remoteSchema] });
```

#### Example
```
import { createRemoteSchema, mergeSchemas } from 'graphql-connect';

// Local Schemas
import cmsSchema from './schemas/cms';

export default async userToken => {
	// Remote Schemas
	const userSchema = createRemoteSchema({
		uri: process.env.user,
		headers: {
			'X-Auth': userToken,
			Authorization: process.env.user_secret
		}
	});

	// Return both schemas merged into one
	return await mergeSchemas({ schemas: [userSchema, cmsSchema] });
};

```

#### Contributions
Contributions, issues, and feature requests would be awesome, just submit an issue or PR! :)

