import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const Op = Sequelize.Op;

const bitkubWeb = new Sequelize('bitkub_web', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: false,
    freezeTableName: false,
});

const CountryModel = bitkubWeb.define('country_data', {
    id: { type: Sequelize.STRING, primaryKey: true },
    country: { type: Sequelize.STRING },
    abbreviation: { type: Sequelize.STRING },
    createdAt: {type: Sequelize.DATE, field: 'created_at'},
    updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
    score: { type: Sequelize.STRING },
    callingCode: {type: Sequelize.STRING, field: 'calling_code'},
});

const UsersModel = bitkubWeb.define('users', {
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

const UsersJoinModel = bitkubWeb.define('users', {
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
});

const DepositModel = bitkubWeb.define('user_deposit', {
    _id: { type: Sequelize.STRING, primaryKey: true , field: 'id'},
    userId: { type: Sequelize.STRING, field: 'user_id'},
    txnId: { type: Sequelize.STRING, field: 'txn_id' },
    currency: { type: Sequelize.STRING, field: 'currency' },
    amount: { type: Sequelize.STRING, field: 'assigned_amount'},
    status: { type: Sequelize.STRING, field: 'status' },
    createdAt: { type: Sequelize.DATEONLY, field: 'created_at' },
    updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
    fullName: { type: Sequelize.STRING },
    feeTHB: { type: Sequelize.STRING },
    creditUse: { type: Sequelize.STRING },
    },
    {
        freezeTableName: true,
        tableName: 'user_deposit'
    }
);

UsersJoinModel.hasMany(DepositModel, {foreignKey: 'user_id'})
DepositModel.belongsTo(UsersJoinModel, {foreignKey: 'id'})

const WithdrawMoneyModel = bitkubWeb.define('user_withdraw_money', {
    _id: { type: Sequelize.STRING, primaryKey: true , field: 'id'},
    userId: { type: Sequelize.STRING, field: 'user_id'},
    txnId: { type: Sequelize.STRING, field: 'txn_id' },
    currency: { type: Sequelize.STRING, defaultValue: 'THB' },
    amount: { type: Sequelize.STRING, field: 'amount'},
    status: { type: Sequelize.STRING, field: 'status' },
    createdAt: { type: Sequelize.DATEONLY, field: 'created_at' },
    updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
    fullName: { type: Sequelize.STRING },
    feeTHB: { type: Sequelize.STRING , field: 'fee' },
    creditUse: { type: Sequelize.STRING },
    },
    {
        freezeTableName: true,
        tableName: 'user_withdraw_money'
    }
);

UsersJoinModel.hasMany(WithdrawMoneyModel, {foreignKey: 'user_id'})
WithdrawMoneyModel.belongsTo(UsersJoinModel, {foreignKey: 'id'})




bitkubWeb.sync();

const Country = bitkubWeb.models.country_data;
const Users = bitkubWeb.models.users;
const Deposit = bitkubWeb.models.user_deposit;
const WithdrawTHB = bitkubWeb.models.user_withdraw_money;

export { Country, Users, Deposit, WithdrawTHB, bitkubWeb };