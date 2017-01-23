const Sequelize = require('sequelize');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'abc123',
  database: 'mydb', // - 要使用的数据库名
  port: 3306, // - MySQL默认端口
};
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
  // - 关闭 Sequelize 的自动添加 timestamp 的功能
  // - 如果不关闭 timestamp ，默认会为表添加 createdAt 和 updatedAt 两个字段
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

User.sync().then(() => {
  User.create({
    userId: `u_${Date.now()}`,
    name: 'Yuan.Wing',
  });
});
// - ModelName.sync() 创建表
// - force: true 时，如果 users 存在，则会先将其删除，然后再创建一个新的 users 表
// - 默认 force: fail;
/* eslint max-len: ["error", { "ignoreComments": true }] */
// -  CREATE TABLE IF NOT EXISTS `user` (`id` INTEGER NOT NULL auto_increment , `user_id` VARCHAR(255), `name` VARCHAR(255), PRIMARY KEY (`id`)) ENGINE=InnoDB;
// -  SHOW INDEX FROM `users`;
// -  INSERT INTO `users` (`id`,`user_id`,`name`) VALUES (DEFAULT,'u_1485163697034','Yuan.Wing');


// User.create({
//   userId: Date.now(),
//   name: 'JieJie',
// }).then((result) => {
//   console.log(`Created: ${JSON.stringify(result)}`);
// }).catch((err) => {
//   console.log(`Fail: ${err}`);
// });
// - 插入一条数据之前 表 一定要先存在，如果是新创建的，要先执行 Model.sync()
// - ModelName.create({}) 插入一条数据到表中
// -  INSERT INTO `users` (`id`,`user_id`,`name`) VALUES (DEFAULT,1485163247106,'JieJie');

// User.findAll({
//   attributes: ['name'],
// }).then((result) => {
//   console.log(JSON.stringify(result));
// });
// - SELECT `name` FROM `users` AS `user`;
// - [{"name":"Wing"},{"name":"Yuan.Wing"},{"name":"JieJie"},{"name":"JieJie"},{"name":"Yuan.Wing"}]

// User.findAll({
//   where: {
//     id: 2,
//   },
// }).then((result) => {
//   console.log(JSON.stringify(result));
// });
// - SELECT `id`, `user_id` AS `userId`, `name` FROM `users` AS `user` WHERE `user`.`id` = 2;
// - [{"id":2,"userId":"u_1485138030781","name":"Yuan.Wing"}]

// User.destroy({
//   where: {
//     name: 'JieJie',
//   },
// }).then((result) => {
//   console.log(JSON.stringify(result));
// });
// - DELETE FROM `users` WHERE `name` = 'JieJie'
// - 2，result 返回删除的条数

// User.update({
//   name: 'Yuan.Wing.Update',
// }, {
//   where: {
//     name: 'Yuan.Wing',
//   },
// }).then((result) => {
//   console.log(JSON.stringify(result));
// });
// - 第一个参数中指定更新的字段和值，在第二个参数中指定条件
// -  UPDATE `users` SET `name`='Yuan.Wing.Update' WHERE `name` = 'Yuan.Wing'
// - 2，result 返回更新的条数
