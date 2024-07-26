const createInterceptor = require("./interceptor_factory");

const setUserInterceptor = (page) => {
  return createInterceptor(page, false);
};

const setUserInterceptorWithAllVideos = (page) => {
  return createInterceptor(page, true);
};

module.exports = { setUserInterceptor, setUserInterceptorWithAllVideos };
