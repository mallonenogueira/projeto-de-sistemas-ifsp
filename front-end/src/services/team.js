import axios from "axios";

class TeamService {
  constructor() {
    this.baseUrl = "http://localhost:3001/teams";
    this.axios = axios;
    this.store = this.store.bind(this);
  }

  async store(team) {
    if (team.id) {
      return this.update(team);
    } else {
      return this.create(team);
    }
  }

  async create(team) {
    const { data } = await this.axios.post(this.baseUrl, team);

    return { id: data.id, ...team };
  }

  async update(team) {
    await this.axios.put(`${this.baseUrl}/${team.id}`, team);

    return team;
  }

  async delete(id) {
    return this.axios.delete(`${this.baseUrl}/${id}`);
  }

  async list(q) {
    const { data } = await axios.get(this.baseUrl, { params: { q } });

    return data;
  }
}

export default new TeamService();
