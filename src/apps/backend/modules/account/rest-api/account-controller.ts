import {
  Account,
  AccountService,
  CreateAccountParams,
  CreateAccountParamsByPhoneNumber,
  CreateAccountParamsByUsernameAndPassword,
  DeleteAccountParams,
  GetAccountParams,
  PhoneNumber,
  ResetPasswordParams,
  UpdateAccountDetailsParams,
  UpdateAccountParams,
} from 'backend/modules/account';
import { serializeAccountAsJSON } from 'backend/modules/account/rest-api/account-serializer';
import {
  applicationController,
  HttpStatusCodes,
  Request,
  Response,
} from 'backend/modules/application';

export class AccountController {
  createAccount = applicationController(
    async (req: Request<CreateAccountParams>, res: Response) => {
      let account: Account;
      const { firstName, lastName, password, username } =
        req.body as CreateAccountParamsByUsernameAndPassword;
      const { phoneNumber } = req.body as CreateAccountParamsByPhoneNumber;

      if (username && password) {
        account = await AccountService.createAccountByUsernameAndPassword(
          firstName,
          lastName,
          password,
          username
        );
      } else if (phoneNumber) {
        account = await AccountService.getOrCreateAccountByPhoneNumber(
          new PhoneNumber(phoneNumber.countryCode, phoneNumber.phoneNumber)
        );
      }

      const accountJSON = serializeAccountAsJSON(account);

      res.status(HttpStatusCodes.CREATED).send(accountJSON);
    }
  );

  getAccountById = applicationController(
    async (req: Request<GetAccountParams>, res: Response) => {
      const account = await AccountService.getAccountById({
        accountId: req.params.accountId,
      });
      const accountJSON = serializeAccountAsJSON(account);

      res.status(HttpStatusCodes.OK).send(accountJSON);
    }
  );

  updateAccount = applicationController(
    async (req: Request<UpdateAccountParams>, res: Response) => {
      const { accountId } = req.params;
      let account: Account;
      const { firstName, lastName } = req.body as UpdateAccountDetailsParams;

      const { newPassword, token } = req.body as ResetPasswordParams;

      if (newPassword && token) {
        account = await AccountService.resetAccountPassword({
          accountId,
          newPassword,
          token,
        });
      } else {
        account = await AccountService.updateAccountDetails({
          accountId,
          firstName,
          lastName,
        });
      }

      const accountJSON = serializeAccountAsJSON(account);

      res.status(HttpStatusCodes.OK).send(accountJSON);
    }
  );

  deleteAccount = applicationController(
    async (req: Request<DeleteAccountParams>, res: Response) => {
      const { accountId } = req.params as DeleteAccountParams;
      await AccountService.deleteAccountById({
        accountId,
      });

      res.status(HttpStatusCodes.NO_CONTENT).send();
    }
  );
}
