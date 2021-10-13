import { CreateUsersCommandHandler } from "./create-users/create-users.commandhandler";
import { DeleteUsersCommandHandler } from "./delete-users/delete-users.commandhandler";
import { GetUsersByIdQueryHandler } from "./get-users-by-id/get-users-by-id.queryhandler";
import { GetUsersQueryHandler } from "./get-users/get-users.queryhandler";
import { UpdateUsersCommandHandler } from "./update-users/update-users.commandhandler";


export default [GetUsersQueryHandler, CreateUsersCommandHandler, GetUsersByIdQueryHandler, UpdateUsersCommandHandler, DeleteUsersCommandHandler]