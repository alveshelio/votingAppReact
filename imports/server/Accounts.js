Accounts.onCreateUser((options, user) => {
  if (Meteor.settings.private.admins.includes('jules@gmail.com')) {
    user.roles = ['admin'];
  }
  return user;
});
