const AWS = require('aws-sdk');

let iam = new AWS.IAM();

let get = async function(ctx, next) {

let params = {};
let users = [];

let promise = function () {
  return new Promise((resolve, reject) => {
    iam.listUsers(params, function(err, data) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        data.Users.forEach(user => {
          for(key in user){
            if (key === 'Path' || key === 'Arn' || key === 'PasswordLastUsed' || key === 'Tags') delete user[key];
          }
        });
        resolve(data.Users);
      }
    });
  });
};

users = await promise();

ctx.body = users;
};



let post = function(ctx, next) {
  let user = ctx.request.body;

  let params = {
    UserName: user.name
   };

let promise = function () {
  return new Promise((resolve, reject) => {
    iam.createUser(params, function(err, data) {
      if (err) reject(err); // an error occurred
      else     resolve(data);           // successful response
    });
  });
};

promise()
  .then(
    result => ctx.body = true,
    err => ctx.throw(err.statusCode, err.message)
  );
};

module.exports.get = get;
module.exports.post = post;
