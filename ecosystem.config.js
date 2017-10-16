module.exports = {
  apps : [],
  deploy : {
    production : {
      user : 'pi',
      host : '92.43.189.66',
      port: '2',
      ref  : 'origin/master',
      repo : 'git@bitbucket.org:nbespalov/coral-fe.git',
      path : '/home/pi/coral-fe',
      'post-deploy' : 'export NODE_ENV=production && npm install && node ./node_modules/.bin/webpack',
      env  : {
        NODE_ENV: 'production'
      }
    },
    dev : {
      user : 'pi',
      host : '92.43.189.66',
      port: '2',
      ref  : 'origin/master',
      repo : 'git@bitbucket.org:nbespalov/coral-fe.git',
      path : '/home/pi/coral-fe-dev',
      'post-deploy' : 'export NODE_ENV=development && npm install && node ./node_modules/.bin/webpack',
      env  : {
        NODE_ENV: 'development'
      }
    }
  }
};
