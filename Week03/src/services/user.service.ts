import { User } from "../models/user.model";

export const UserService = {
  create(data: { name: string; email: string; address?: string | null }) {
    return User.create(data);
  },

  findAll() {
    return User.findAll({ order: [["id", "ASC"]] });
  },

  findById(id: number) {
    return User.findByPk(id);
  },

  async update(
    id: number,
    data: Partial<Pick<User, "name" | "email" | "address">>
  ) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.update(data);
  },

  async remove(id: number) {
    const user = await User.findByPk(id);
    if (!user) return 0;
    await user.destroy();
    return 1;
  },
};
