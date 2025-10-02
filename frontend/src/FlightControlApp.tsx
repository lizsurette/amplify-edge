import React, { useState } from 'react';
import {
  Page,
  Select,
  SelectOption,
  SelectList,
  MenuToggle,
  Alert,
} from '@patternfly/react-core';

// Import our new components
import AppMasthead from './components/layout/Masthead';
import AppSidebar from './components/layout/Sidebar';
import DeviceModal from './components/shared/DeviceModal';
import OverviewPage from './components/pages/OverviewPage';
import DevicesPage from './components/pages/DevicesPage';
import FleetsPage from './components/pages/FleetsPage';
import RepositoriesPage from './components/pages/RepositoriesPage';
import SettingsPage from './components/pages/SettingsPage';

// Import PatternFly CSS
import '@patternfly/react-core/dist/styles/base.css';


const FlightControlApp: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [activeItem, setActiveItem] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);

  // Sidebar toggle function
  const onSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDeviceClick = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const masthead = (
    <AppMasthead
      isSidebarOpen={isSidebarOpen}
      onSidebarToggle={onSidebarToggle}
    />
  );

  const sidebar = (
    <AppSidebar
      isSidebarOpen={isSidebarOpen}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    />
  );

  return (
    <Page masthead={masthead} sidebar={sidebar}>
      {/* Alert for prototype interactions */}
      {showAlert && (
        <Alert
          variant="info"
          title={`Device ${selectedDevice} selected`}
          isInline
          timeout={3000}
          onTimeout={() => setShowAlert(false)}
        />
      )}

      {/* Add Device Modal */}
      <DeviceModal
        isOpen={isAddDeviceModalOpen}
        onClose={() => setIsAddDeviceModalOpen(false)}
      />

      {/* Secondary bar for Charlie Services - only show for devices and fleets */}
      {(activeItem === 'devices' || activeItem === 'fleets') && (
        <div style={{
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #d1d5db',
          padding: '8px 24px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          minHeight: '48px'
        }}>
          <Select
            isOpen={false}
            selected="Charlie Services"
            toggle={(toggleRef) => (
              <MenuToggle
                ref={toggleRef}
                variant="secondary"
                style={{ fontSize: '14px' }}
              >
                Charlie Services
              </MenuToggle>
            )}
          >
            <SelectList>
              <SelectOption value="charlie">Charlie Services</SelectOption>
              <SelectOption value="other">Other Services</SelectOption>
            </SelectList>
          </Select>
        </div>
      )}

      {/* Content based on active navigation item */}
      {activeItem === 'devices' && (
        <DevicesPage
          onAddDeviceClick={() => setIsAddDeviceModalOpen(true)}
          onDeviceSelect={handleDeviceClick}
        />
      )}

      {/* Fleets Page */}
      {activeItem === 'fleets' && <FleetsPage />}

      {/* Overview Page */}
      {activeItem === 'overview' && <OverviewPage />}

      {/* Repositories Page */}
      {activeItem === 'repositories' && <RepositoriesPage />}

      {/* Settings Page */}
      {activeItem === 'settings' && <SettingsPage />}
    </Page>
  );
};

export default FlightControlApp;