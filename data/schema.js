import { makeExecutableSchema } from 'graphql-tools';
import mocks from './mocks';
import resolvers from './resolvers';

const typeDefs = `
	type Query {
		findCountry(country: String): [Country]
		allCountry: [Country]
		findUsers(id: String): [Users]
		allUsers: [Users]
	}

	type Country {
		id: Int
		country: String
		abbreviation: String
		createdAt: String
		updatedAt: String
		score: String
		callingCode: String
	}

	type Users {
		userId: Int
		firstName: String
		lastName: String
		fullName: String
		gender: String
		googleAuth: Int
		kycLevel: Int
		refererUser: Int
		registerDate: String
		lastLogin: String
		updatedAt: String
		createdAt: String
	}
`;


const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;