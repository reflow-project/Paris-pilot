import mysql, {Connection, ConnectionOptions} from 'mysql2'
import AWS from 'aws-sdk'

const signer = new AWS.RDS.Signer();

const region = 'eu-west-3';
const dbPort = 3306;
const dbUsername = 'waocndhsdcbjen'; // should be a kansdo specific username (related to the IAM account we are using)
const dbName = 'dimuse';
const dbEndpoint = 'aurora-cluster-mysql-provisioned.cluster-chgmoswed2k1.eu-west-3.rds.amazonaws.com';

function getMysqlConnection () : Promise<Connection> {
  return new Promise((resolve, reject) => {
    signer.getAuthToken({ // uses the IAM role access keys to create an authentication token
      region: region,
      hostname: dbEndpoint,
      port: dbPort,
      username: dbUsername
    }, (err, token) => {
      if (err) {
        console.log(`could not get auth token: ${err}`);
        console.error(err);
        return reject(err)
      } else {
        var connection = mysql.createConnection({
          host: dbEndpoint,
          port: dbPort,
          user: dbUsername,
          password: token,
          database: dbName,
          ssl: 'Amazon RDS',
          authSwitchHandler: function (data, cb) { // modifies the authentication handler
            if (data.pluginName === 'mysql_clear_password') { // authentication token is sent in clear text but connection uses SSL encryption
              console.log('should call Buffer.from(token + \0)')
              // resolve(Buffer.from(token + '\0'));
            }
          }
        });
        connection.connect();
        resolve(connection);
      }
    })
  })
}