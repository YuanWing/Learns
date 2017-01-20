const Sequelize = require('sequelize');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'abc123',
  databse: 'mydb',
  port: 3306,  // - MySQL默认端口
};
const sequelize = new Sequelize(config.databse, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mysql',
  define: {
    timestamps: false, // - 关闭Sequelize的自动添加timestamp的功能
  },
});
// - dialect可取值：'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'
// - 实例化一个 Sequelize，实例化之后才能定义 Model，后续操作都是基于 Model 的
// - 实例化时还有另一种方式：
// - sequelize = new Sequelize('mysql://root:abc123@localhost:3306/mydb', [options = {}]);
// - 更多信息查询：http://sequelize.readthedocs.io/en/latest/api/sequelize/

const User = sequelize.define('user', {
  userId: {
    type: Sequelize.STRING,
    field: 'user_id',
  },
  name: Sequelize.STRING,
});
// - 创建一个 user 的 Model，对应的数据库表名是 users

User.sync({ force: true }).then(() => {
  return User.create({
    userId: `u_${Date.now()}`,
    name: 'Jie',
  });
});

User.create({
  userId: Date.now(),
  name: 'Wing',
}).then((result) => {
  console.log(`Created: ${result}`);
}).catch((err) => {
  console.log(`Fail: ${err}`);
});
