import { LabelLarge } from 'frontend/components';
import PersonalInfoForm from 'frontend/pages/profile/settings/personal-info-form';
import { Account } from 'frontend/types';
import React from 'react';

interface PersonalInfoSectionProps {
  accountDetails: Account;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  accountDetails,
}) => (
  <div className="col-span-5 xl:col-span-3">
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <LabelLarge>Personal Information</LabelLarge>
      </div>
      <div className="p-7">
        <PersonalInfoForm accountDetails={accountDetails} />
      </div>
    </div>
  </div>
);

export default PersonalInfoSection;
