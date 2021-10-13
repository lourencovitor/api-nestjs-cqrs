import { CreateUsersCommandHandler } from "./create-users/create-users.commandhandler";
import { GetUsersByIdQueryHandler } from "./get-users-by-id/get-users-by-id.queryhandler";
import { GetUsersQueryHandler } from "./get-users/get-users.queryhandler";


export default [GetUsersQueryHandler, CreateUsersCommandHandler, GetUsersByIdQueryHandler]