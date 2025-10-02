import React from 'react';
import {
  PageSection,
  PageSectionVariants,
  Title,
} from '@patternfly/react-core';

const SettingsPage: React.FC = () => {
  return (
    <PageSection variant={PageSectionVariants.light}>
      <Title headingLevel="h1" size="2xl">
        Settings
      </Title>
      <p>Settings content coming soon...</p>
    </PageSection>
  );
};

export default SettingsPage;