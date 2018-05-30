import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import dotenv from 'dotenv'

dotenv.config()

const Op = Sequelize.Op;

const bitkubMarket = new Sequelize(process.env.DB_MARKET, process.env.DB_MARKET_USER, process.env.DB_MARKET_PASSWORD, {
    host: process.env.DB_MARKET_HOST,
    dialect: process.env.DB_MARKET_DRIVER,
    port: process.env.DB_MARKET_POST,
    operatorsAliases: false,
    freezeTableName: false,
    constraints:false,
});



export { bitkubMarket };