module.exports = {
    env: process.env.NODE_ENV || 'development',
    cfg: require('./configs.js')[process.env.NODE_ENV || 'development']
};
