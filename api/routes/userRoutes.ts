import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { expressAdapter } from '../../common/adapters/expressAdapter';
import { UserService } from '../../common/services/userService';
import { Validator } from '../../common/middlewares/validator';
import { UserSchema } from '../models/userModel';

const router = Router();
const userController = new UserController(new UserService());

router.get('/', expressAdapter(userController.getAll));
router.get('/:id', expressAdapter(userController.getById));
router.post('/', Validator.validate(UserSchema), expressAdapter(userController.create));
router.put('/:id', Validator.validate(UserSchema), expressAdapter(userController.update));
router.delete('/:id', expressAdapter(userController.delete));

export { router as userRoutes };