class Api {
  constructor({
    url,
    login,
    user,
    updateHouses,
  }) {
    this.url = url;
    this.user = user;
    this.updateHouses = updateHouses;
    this.login = login;
    this.token = localStorage.getItem('token') || '';
    this.status = [200, 400, 401, 409];
    this.getResponse = this.getResponse.bind(this);
  }

  getResponse(res) {
    if (this.status.includes(res.status)) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка api: ${res.status}`));
  }

  authorizationPost({ password, email }) { // получение токена
    return fetch(`${this.url}${this.login}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ password, username: email }),
    }).then(this.getResponse);
  }

  getInfoForUser(token) {
    return fetch(`${this.url}${this.user}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    }).then(this.getResponse);
  }

  getInfoUpdateUser({ company_id, page, perPage }) {
    return fetch(`${this.url}${this.updateHouses}${company_id}/?page=${page}&perPage=${perPage}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${this.token}`,
      },
    }).then(this.getResponse);
  }
}

const api = new Api({
  url: 'http://test-alpha.reestrdoma.ru/api/',
  user: 'reestrdoma/companies/',
  login: 'login/',
  updateHouses: 'reestrdoma/company/houses/',
});

export default api;
