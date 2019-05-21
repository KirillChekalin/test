const AWS = require('aws-sdk');

let iam = new AWS.IAM();

let get = function(ctx, next) {
  var params = {
};
iam.listUsers(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    data.Users.forEach(user => {
      for(key in user){
        if (key === 'Path' || key === 'Arn' || key === 'PasswordLastUsed' || key === 'Tags') delete user[key];
      }
    });

    ctx.body = JSON.stringify(data.Users);
  }
});

};



let post = function(ctx, next) {
  let user = ctx.request.body;
  console.log(user.name);

  let params = {
    UserName: user.name
   };

   iam.createUser(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response

   });

   ctx.body = true;

};

module.exports.get = get;
module.exports.post = post;
