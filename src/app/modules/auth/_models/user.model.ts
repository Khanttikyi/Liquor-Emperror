import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';

export class UserModel extends AuthModel {
  id?: number;
  username?: string;
  password?: string;
  fullname?: string;
  email?: string;
  pic?: string;
  roles?: number[];
  occupation?: string;
  companyName?: string;
  phone?: string;
  address?: AddressModel;
  firstName?: string;
  lastName?: string;
  website?: string;
  // account information
  language?: string;
  timeZone?: string;
  communication?: {
    email?: boolean,
    sms?: boolean,
    phone?: boolean
  };
  // email settings
  emailSettings?: {
    emailNotification?: boolean,
    sendCopyToPersonalEmail?: boolean,
    activityRelatesEmail?: {
      youHaveNewNotifications?: boolean,
      youAreSentADirectMessage?: boolean,
      someoneAddsYouAsAsAConnection?: boolean,
      uponNewOrder?: boolean,
      newMembershipApproval?: boolean,
      memberRegistration?: boolean
    },
    updatesFromKeenthemes?: {
      newsAboutKeenthemesProductsAndFeatureUpdates?: boolean,
      tipsOnGettingMoreOutOfKeen?: boolean,
      thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean,
      newsAboutMetronicOnPartnerProductsAndOtherServices?: boolean,
      tipsOnMetronicBusinessProducts?: boolean
    }
  };

  setUser(user?: any) {
    this.id = user.id;
    this.username = user.username || '';
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.password = user.password || '';
    this.fullname = user.fullname || '';
    this.email = user.email || '';
    this.pic = user.pic || './assets/media/users/default.jpg';
    this.roles = user.roles || [];
    this.occupation = user.occupation || '';
    this.companyName = user.companyName || '';
    this.phone = user.phone || '';
    this.address = user.address;
  }
}
