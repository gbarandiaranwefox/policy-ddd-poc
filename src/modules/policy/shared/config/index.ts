import convict from 'convict';

const policyConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  mongo: {
    url: {
      doc: 'The Mongo connection URL',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://localhost:27017/policy-backend-dev'
    }
  }
});

policyConfig.loadFile([__dirname + '/default.json', __dirname + '/' + policyConfig.get('env') + '.json']);

export default policyConfig;
