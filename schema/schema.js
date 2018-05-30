import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './../resolvers/resolvers';

const typeDefs = `
	type Query {
		findCountry(country: String): [Country]
		allCountry: [Country]
		findUsers(id: String): [Users]
		allUsers: [Users]
		findDeposit(txn_id: String): [Deposit]
		allDeposit: [Deposit]
		findWithdraw(txn_id: String): [Withdraw]
		allWithdraw: [Withdraw]
		findTrade(txn_id: String): [Trade]
		allTrade: [Trade]
		allCashback: [Cashback]
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

	type Deposit {
		_id: Int
		fullName: String
		userId: String
		txnId: String
		currency: String
		amount: Float
		status: String
		feeTHB: Float
		creditUse: Float
		createdAt: String
		updatedAt: String
	}

	type Withdraw {
		_id: Int
		fullName: String
		userId: String
		txnId: String
		currency: String
		amount: Float
		status: String
		feeTHB: Float
		creditUse: Float
		createdAt: String
		updatedAt: String
	}

	type Trade {
		fullName: String
		userId: String
		txnId: String
		currency: String
		amount: Float
		side: String
		type: String
		status: String
		feeTHB: Float
		creditUse: Float
		createdAt: String
	}

	type Cashback {
		fullName: String
		userId: String
		txnId: String
		currency: String
		side: String
		cashback: Float
		refererId: Float
		referrerCashback: String
		createdAt: String
	}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;