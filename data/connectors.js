import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const Op = Sequelize.Op;

const sqlDb = new Sequelize('bitkub_web', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    port: 3306
});

const CountryModel = sqlDb.define('country_data', {
    id: { type: Sequelize.STRING, primaryKey: true },
    country: { type: Sequelize.STRING },
    abbreviation: { type: Sequelize.STRING },
    createdAt: {type: Sequelize.DATE, field: 'created_at'},
    updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
    score: { type: Sequelize.STRING },
    callingCode: {type: Sequelize.STRING, field: 'calling_code'},
});

const UsersModel = sqlDb.define('users', {
    userId: { type: Sequelize.STRING, primaryKey: true, field: 'id' },
    firstName: { type: Sequelize.STRING, field: 'first_name'},
    lastName: { type: Sequelize.STRING, field: 'last_name' },
    gender: { type: Sequelize.STRING, field: 'gender' },
    googleAuth: { type: Sequelize.STRING, field: 'google_authenticator_verified'},
    kycLevel: { type: Sequelize.STRING, field: 'rank_vip' },
    refererUser: { type: Sequelize.STRING, field: 'referral_id' },
    registerDate: { type: Sequelize.DATEONLY, field: 'created_at' },
    lastLogin: { type: Sequelize.STRING, field: 'last_login' },
    createdAt: {type: Sequelize.DATE, field: 'created_at'},
    updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
    fullName: { type: Sequelize.STRING }
});


sqlDb.sync();

const Country = sqlDb.models.country_data;
const Users = sqlDb.models.users;

export { Country, Users };