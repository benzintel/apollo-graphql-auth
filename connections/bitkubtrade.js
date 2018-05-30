import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const Op = Sequelize.Op;

const bitkubMarket = new Sequelize('bitkub_market', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: false,
    freezeTableName: false,
    constraints:false,
});



export { bitkubMarket };