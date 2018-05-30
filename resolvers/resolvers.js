import { Country, Users, Deposit, WithdrawTHB, bitkubWeb } from './../connections/bitkubweb';
import { bitkubMarket } from './../connections/bitkubtrade';
import sequelize from 'sequelize';

const resolvers = {
  Query: {
    allCountry() {
        return Country.findAll();
    },
    findCountry(_, args) {
        return Country.findAll({ where: args });
    },
    allUsers() {
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
    findUsers(_, args) {
        return Users.findAll({ where: args });
    },
    allDeposit() {
    	return Deposit.findAll({
    		include: [Users],
    		attributes: [
    				[sequelize.fn('CONCAT', sequelize.col('user.first_name'), ' ', sequelize.col('user.last_name') )  , 'fullName'],
					[ 'id', '_id' ],
					[ 'user_id', 'userId' ],
					[ 'txn_id', 'txnId' ],
					[ 'currency', 'currency' ],
					[ 'assigned_amount', 'amount' ],
					[ 'status', 'status' ],
					[sequelize.fn('date_format', sequelize.col('user_deposit.created_at'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
					[sequelize.fn('date_format', sequelize.col('user_deposit.updated_at'), '%Y-%m-%d %H:%i:%s'), 'lastLogin'],
			]});
    },
    findDeposit(_, args) {
    	return Deposit.findAll({
    		where: args,
    		include: [Users],
    		attributes: [
    				[sequelize.fn('CONCAT', sequelize.col('user.first_name'), ' ', sequelize.col('user.last_name') )  , 'fullName'],
					[ 'id', '_id' ],
					[ 'user_id', 'userId' ],
					[ 'txn_id', 'txnId' ],
					[ 'currency', 'currency' ],
					[ 'assigned_amount', 'amount' ],
					[ 'status', 'status' ],
					[sequelize.fn('date_format', sequelize.col('user_deposit.created_at'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
					[sequelize.fn('date_format', sequelize.col('user_deposit.updated_at'), '%Y-%m-%d %H:%i:%s'), 'lastLogin'],
			]});
    },
    allWithdraw() {
    	return WithdrawTHB.findAll({
    		include: [Users],
    		attributes: [
    				[sequelize.fn('CONCAT', sequelize.col('user.first_name'), ' ', sequelize.col('user.last_name') )  , 'fullName'],
    				[sequelize.fn('CONCAT', 'THB' )  , 'currency'],
					[ 'id', '_id' ],
					[ 'user_id', 'userId' ],
					[ 'txn_id', 'txnId' ],
					[ 'amount', 'amount' ],
					[ 'status', 'status' ],
					[ 'fee', 'feeTHB'],
					[sequelize.fn('date_format', sequelize.col('user_withdraw_money.created_at'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
					[sequelize.fn('date_format', sequelize.col('user_withdraw_money.updated_at'), '%Y-%m-%d %H:%i:%s'), 'lastLogin'],
			]});
    },
    findWithdraw(_, args) {
    	return WithdrawTHB.findAll({
    		where: args,
    		include: [Users],
    		attributes: [
    				[sequelize.fn('CONCAT', sequelize.col('user.first_name'), ' ', sequelize.col('user.last_name') )  , 'fullName'],
    				[sequelize.fn('CONCAT', 'THB' )  , 'currency'],
					[ 'id', '_id' ],
					[ 'user_id', 'userId' ],
					[ 'txn_id', 'txnId' ],
					[ 'amount', 'amount' ],
					[ 'status', 'status' ],
					[ 'fee', 'feeTHB'],
					[sequelize.fn('date_format', sequelize.col('user_withdraw_money.created_at'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
					[sequelize.fn('date_format', sequelize.col('user_withdraw_money.updated_at'), '%Y-%m-%d %H:%i:%s'), 'lastLogin'],
			]});
    },
    allTrade() {
    	var query = "SELECT CONCAT(users.first_name, ' ', users.last_name) AS fullName, users.id AS userId, history.txn_id AS txnId, history.currency AS currency, \
					history.order_amount AS amount, CONCAT('success') AS status, history.fee_thb AS feeTHB, history.credit_use as creditUse, history.side as side, history.type as type, history.created_at as createdAt\
					FROM bitkub_web.users AS users\
					JOIN\
					(SELECT CONCAT('BTC') AS currency, txn_id, user_id, order_amount, side, type, fee_thb, credit_use, date_format(created_at, '%Y-%m-%d %H:%i:%s') AS created_at FROM bitkub_market.btc_order_history AS btc\
					UNION ALL\
					SELECT CONCAT('ETH') AS currency, txn_id, user_id, order_amount, side, type, fee_thb, credit_use, date_format(created_at, '%Y-%m-%d %H:%i:%s') AS created_at FROM bitkub_market.eth_order_history AS eth) AS history ON history.user_id = users.id";
    	return bitkubMarket.query(query , { type: sequelize.QueryTypes.SELECT});
    },
    findTrade(_, args) {
    	var query = "SELECT CONCAT(users.first_name, ' ', users.last_name) AS fullName, users.id AS userId, history.txn_id AS txnId, history.currency AS currency, \
					history.order_amount AS amount, CONCAT('success') AS status, history.fee_thb AS feeTHB, history.credit_use as creditUse, history.side as side, history.type as type, history.created_at as createdAt\
					FROM bitkub_web.users AS users\
					JOIN\
					(SELECT CONCAT('BTC') AS currency, txn_id, user_id, order_amount, side, type, fee_thb, credit_use, date_format(created_at, '%Y-%m-%d %H:%i:%s') AS created_at FROM bitkub_market.btc_order_history AS btc\
					UNION ALL\
					SELECT CONCAT('ETH') AS currency, txn_id, user_id, order_amount, side, type, fee_thb, credit_use, date_format(created_at, '%Y-%m-%d %H:%i:%s') AS created_at FROM bitkub_market.eth_order_history AS eth) AS history ON history.user_id = users.id\
					WHERE history.txn_id = :txn_id";
    	return bitkubMarket.query(query , 
    				{ replacements: { txn_id: args.txn_id }, type: sequelize.QueryTypes.SELECT }
    			);
    },
    allCashback() {
    	var query = "SELECT CONCAT(users.first_name, ' ', users.last_name) AS fullName, users.id AS userId, SUBSTR(cashback.txn_id, 1, 3) AS currency, SUBSTR(cashback.txn_id, 4, 3) AS side, cashback.txn_id AS txnId, cashback.user_cashback AS cashback, cashback.referrer_id AS referrerId, cashback.referrer_cashback AS referrerCashback ,date_format(cashback.created_at, '%Y-%m-%d %H:%i:%s') AS createdAt\
					FROM bitkub_web.users AS users\
					JOIN bitkub_market.cashback_history AS cashback ON cashback.user_id = users.id";
    	return bitkubMarket.query(query , { type: sequelize.QueryTypes.SELECT});
    },
  }
};

export default resolvers;