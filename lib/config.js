const config = {
  modules: [
    {
      name: 'core',
      desc: 'Core Adapter Beschreibung',
      controllers: [ {
        name: 'Firmware',
        commands: [ {
          name: 'info',
          desc: '',
          url: '/core/Firewall/info',
          method: 'GET',
          refresh: 60,
          ignore: [ 'propertyName' ]
        }, {
          name: 'status',
          url: null,
          method: 'GET',
          refresh: 3600,
          ignore: null,
          transformResponse: (data) => {
            return data
          }
        } ]
      } ]
    }
  ]
}


module.exports = config;
