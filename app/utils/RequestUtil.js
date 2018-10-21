

import getUrl from './UrlUtil';

const request = (url, method, body) => {
  let isOk;
  return new Promise((resolve, reject) => {
    fetch(getUrl(url), {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
          console.log('aaaaa', responseData)
          if (responseData.success) {
              resolve(responseData);
          } else {
              reject(responseData);
          }

      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  request
};
