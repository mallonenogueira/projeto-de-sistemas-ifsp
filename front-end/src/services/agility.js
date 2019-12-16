import axios from "axios";

class AgilityService {
  constructor() {
    this.baseUrl = "http://localhost:3001/agilidade";
    this.store = this.store.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.list = this.list.bind(this);
  }

  async store(data) {
    if (data.id) {
      return this.update(data);
    } else {
      return this.create(data);
    }
  }

  async create(data) {
    const { data: response } = await axios.post(this.baseUrl, data);

    return { id: response.id, ...data };
  }

  async update(data) {
    await axios.put(`${this.baseUrl}/${data.id}`, data);

    return data;
  }

  async delete(id) {
    return axios.delete(`${this.baseUrl}/${id}`);
  }

  async list() {
    const { data } = await axios.get(this.baseUrl);

    return data;
  }

  async find(id) {
    const { data } = await axios.get(`${this.baseUrl}/${id}`);

    return data;
  }
}

export default new AgilityService();
