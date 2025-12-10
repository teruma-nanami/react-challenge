import api from "../../lib/api/";
import { User } from "../users/user.entity";

export const accountRepository = {
  async updateProfile(name: string, file?: File) {
    const result = await api.putForm("/account/profile", { name, file });
    return new User(result.data);
  },
};
