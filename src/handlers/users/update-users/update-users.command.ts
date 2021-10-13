export class UpdateUsersCommand {
    constructor(
        public name: string,
        public email: string,
        public userId: string,
        public password?: string,
    ) {}
  }
  