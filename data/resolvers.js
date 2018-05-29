import { Country, Users } from './connectors';
import sequelize from 'sequelize';

const resolvers = {
  Query: {
    allCountry () {
        return Country.findAll();
    },
    findCountry (_, args) {
        return Country.findAll({ where: args });
    },
    allUsers () {
        return Users.findAll({
				attributes: [
					[sequelize.fn('CONCAT', sequelize.col('first_name'), ' ', sequelize.col('last_name') )  , 'fullName'],
					[ 'id', 'userId' ],
					[ 'first_name', 'firstName' ],
					[ 'last_name', 'lastName' ],
					[ 'gender' , 'gender' ],
					[ 'google_authenticator_verified', 'googleAuth' ],
					[ 'rank_vip', 'kycLevel' ],
					[ 'referral_id', 'refererUser' ],
					[ 'last_login', 'lastLogin' ],
					[sequelize.fn('date_format', sequelize.col('created_at'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
					[sequelize.fn('date_format', sequelize.col('created_at'), '%Y-%m-%d %H:%i:%s'), 'registerDate'],
					[sequelize.fn('date_format', sequelize.col('last_login'), '%Y-%m-%d %H:%i:%s'), 'lastLogin'],
				]});
    },
    findUsers (_, args) {
        return Users.findAll({ where: args });
    }
  }
};

export default resolvers;