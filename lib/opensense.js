const axios = require('axios').default;

const HTTP_SUCCESS = [200, 201, 202, 203, 204, 205, 206, 207];

class OPNSenseClient {

    constructor(apiKey, apiSecret, baseUrl, verifyCert = false) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.baseUrl = (baseUrl[baseUrl.length - 1] == '/') ? baseUrl : baseUrl + '/';
        this.verifyCert = verifyCert;

        this.useHttps = baseUrl.includes('https');

        this.getUrl = (endpoint) => {
            if (endpoint !== null && endpoint.length > 0) {
                return `${this.baseUrl}${endpoint[0] == '/' ? endpoint.substring(1, endpoint.length) : endpoint}`;
            } else {
                throw 'Invalid EndPoint'
            }
        }

        this.getOptions = () => {
            return {
                auth: {
                    user: this.apiKey,
                    password: this.apiSecret
                },
                insecure: !this.verifyCert,
                rejectUnauthorized: this.verifyCert
            }
        }
    }

    get(endpoint, parseJSON = true) {
        return new Promise((resolve, reject) => {
            axios.get(this.getUrl(endpoint)
              .then(function (response) {
                  // handle success
                  console.log(response);
              })
              .catch(function (error) {
                  // handle error
                  console.log(error);
              })
              .then(function () {
                  // always executed
              })
            );
        });
    }

    post(endpoint, body, parseJSON = true) {
        return new Promise((resolve, reject) => {
            var options = this.getOptions();
            options.body = body;

            request.post(this.getUrl(endpoint), options, (err, res, body) => {
                if (!err) {
                    if (HTTP_SUCCESS.includes(res.statusCode)) {
                        try {
                            resolve(parseJSON ? JSON.parse(body) : body);
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        reject('Not Successful');
                    }
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = OPNSenseClient;
