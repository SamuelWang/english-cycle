import merge from 'webpack-merge';
import baseServices from './Service.Base';
import authServices from './Service.Auth';
import cycleServices from './Service.Cycle';

const Service = {
  install(Vue, options) {
    let services = merge(baseServices, authServices, cycleServices);
    let isServicesInited = false;

    Vue.prototype.$services = function () {
      let self = this;

      if (!isServicesInited) {
        for (let key in services) {
          services[key] = services[key].bind(self);
        }

        isServicesInited = true;
      }

      return services;
    };
  },
};

export default Service;
