const mongoose = require('mongoose');
// - 引入 mongoose

const db = mongoose.connection;
// - 连接实例

mongoose.Promise = global.Promise;
// - 替换 mongoose 自带的 Promise 为 Node 的 Promise

mongoose.connect('mongodb://127.0.0.1:27017/mongoose');
// - 在这之前要先启动 MongoDB 数据库，不然会报连接错误($ mongod)
// - MongoDB 启动成功后，默认端口为 27017
// - 连接数据库，URI组成 = mongodb:// + 数据库主机地址包括端口 + 数据库名
// - 这个时候即使数据库名还不存在也没关系，在最后有数据插入的时候会自动创建数据库
// - 连接一旦建立成功，该连接实例的 open 事件就被触发；
// - mongoose 在与数据库真正建立连接之前便缓存了所有的命令，也就是说在定义模型、执行查询时不必非得确认与 MongoDB 数据库的连接是否成功；

db.on('error', (err) => {
  console.log(err);
});
// - 连接错误执行的事件

db.once('open', () => {
  console.log('connection success...');
});
// - 连接成功执行的事件

/**
 * 命令行下执行 $ node 001_getting_start.js
 * 如果输出: connection success... 则说明我们的连接一切正常
 */

// ------- 先运行上边的代码，结果正常再往下看 ------- //

// - 在 mongoose 中，所有的操作都是基于 Schema 的
// - With Mongoose, everything is derived from a Schema.

const UserSchema = mongoose.Schema({
  name: String,
  age: Number,
});
// - 定义了一个 UserSchema 的 Schema，她有两个字;
// - 字段 name 的类型是 String，字段 age 的类型是 Number
// - 有了 Schema 之后，要真正用起来，还需要创建一个 Model

const User = mongoose.model('User', UserSchema);
// - 基于 UserSchema 创建一个 User 的 model
// - 有了 model 之后，就可以开始创建数据啦，也就是 new 一个 model

const wing = new User({
  name: 'Wing',
  age: 18,
});
// - 创建了一条新数据，name = 'Wing', age = 18，这里值的类型要跟我们上边的 Schema 一样哟
// - 类型如果不一样，默认会进行一些简单的类型转换，转换不成功会当作 undefined
// - '18' -> 18, '18c' -> undefined

console.log(`${wing.name} is ${wing.age}`);
/**
 * 命令行下执行 $ node 001_getting_start.js
 * 如果输出: Wing is 18 则说明一切正常
 * 这个时候，虽然数据有了，但是还未写入到库中，所以这个时候我们的 mongoose 数据库还是不存在的哟
 */

// ------- 先运行上边的代码，结果正常再往下看 ------- //

// - 在 Schema 上我们还可以定义方法，给 model 实例调用

UserSchema.methods.eat = function eat(foodName = 'Oops') {
  // - 这里我范了个错，方法定义的时候我采用了箭头函数，结果 this 指向的是一个空对象，而不是我们的 model 实例
  const myName = this.name || 'I';
  console.log(`${myName} eat ${foodName}!`);
};
// - 在 UserSchema 上定义了一个 eat 方法
// - 方法必须在创建 model 之前定义，所以这里如果直接调用 wing.eat() 会报错，
// - 因为 wing 对应的 User model 并没有 eat() 方法

const YoungUser = mongoose.model('YoungUser', UserSchema);
// - 基于 UserSchema 创建一个 YoungUser 的 model

const youngWing = new YoungUser({
  name: 'Young.Wing',
  age: 16,
});
youngWing.eat();
// - 正常命令行下输出：Young.Wing eat Oops!
youngWing.eat('sugar');
// - 正常命令行下输出：Young.Wing eat sugar!

/**
 * 到这里，我们一切正常，不错哟，现在我们创建了两条数据，但是都还没写入到库中，下面进行数据库的写入
 * 要写入数据到库中，直接调用 model 实例的 save() 方法就行啦
 * save() 方法接受两参数，第一个参数是错误信息，第二个参数是成功之后的回调信息(库里记录的数据了哟)
 */
// wing.save((err, doc) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Save success!');
//     console.log(doc);
//   }
// });
// - 创建 mongoose 数据库，并将 wing 这条数据写入到库的 users 集合(表)里(如果 mongoose 库存在，则只是执行数据写入)
// - 方便后边的学习，这里先将这条数据注释了

/**
 * 命令行下执行 $ node 001_getting_start.js
 * 每次执行都会往库里写入一条 wing 的数据哟
 */

// youngWing.save((err, doc) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(doc);
//   }
// });
// - 将 youngWing 这条数字写入到 mongoose 库的 youngWing 集合(表)中
// - 方便后边的学习，这里先将这条数据注释了

/**
 * 到这里，我们已经学会了，数据库的创建及数据的 [增] 操作
 * 下一步，学习一下数据的 [删] 操作
 * 上边已经说了，数据的操作都是基于 Schema 的，这里我们直接执行删除 wing 这条数据，因为 Schema 上边已经创建好了，操作起来比较方便
 */

// wing.remove((err, docs) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Delete success: ');
//     console.log(docs);
//   }
// });

// - 这里 remove() 会删除所有查到的数据哟，
// - 如果只想删除一条，可以先执行查找，然后再执行删除或者直接调用 User.findOneAndRemove() 方法
// - 方便后边的学习，这里先将这条数据注释了

/**
 * 到这里，我们已经学会了，数据库的创建及数据的 [增][删] 操作，下边开始 [改]
 * [改] 一次，只能改一条，如果要改多条，也是要先执行 [查]，再一条条的 [改]
 */

// const query = { name: 'Wing' };
// const update = { name: 'Yuan.Wing' };
// User.findOneAndUpdate(query, update, (err, doc) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Update success!');
//     console.log(doc);
//   }
// });
// - 这里的 doc 返回的是修改前的数据哟

User.find({}, (err, docs) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Find success!');
    console.log(docs);
  }
});
// - 第一个参数是查询的条件，我们这里传了一个空对象，则查询 User 集合里面的所有数据
// - docs 是一个数组哟

db.close();
// - 关闭数据库连接
