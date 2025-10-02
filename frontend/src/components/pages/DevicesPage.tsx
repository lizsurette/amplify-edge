import React, { useState } from 'react';
import {
  PageSection,
  Title,
  Card,
  CardBody,
  Label,
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarGroup,
  SearchInput,
  Select,
  SelectOption,
  SelectList,
  MenuToggle,
  MenuToggleElement,
  Alert,
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import {
  FilterIcon,
  EllipsisVIcon
} from '@patternfly/react-icons';

interface DevicesPageProps {
  onAddDeviceClick: () => void;
  onDeviceSelect: (deviceId: string) => void;
}

// Mock data for devices
const mockDevices = [
  { id: '1', name: 'Device-01', status: 'ERROR', type: 'Gateway', location: 'New York', ip: '192.168.1.10', firmware: 'v2.1.3' },
  { id: '2', name: 'Device-02', status: 'HEALTHY', type: 'Sensor', location: 'San Francisco', ip: '192.168.1.15', firmware: 'v1.8.2' },
  { id: '3', name: 'Device-03', status: 'DEGRADED', type: 'Compute', location: 'Los Angeles', ip: '192.168.1.20', firmware: 'v2.0.1' },
  { id: '4', name: 'Device-04', status: 'UNKNOWN', type: 'Router', location: 'Chicago', ip: '192.168.1.25', firmware: 'v1.9.5' },
  { id: '5', name: 'Device-05', status: 'HEALTHY', type: 'Storage', location: 'Miami', ip: '192.168.1.30', firmware: 'v2.2.0' },
  { id: '6', name: 'Device-06', status: 'HEALTHY', type: 'Gateway', location: 'Boston', ip: '192.168.1.35', firmware: 'v2.1.3' },
  { id: '7', name: 'Device-07', status: 'ERROR', type: 'Sensor', location: 'Seattle', ip: '192.168.1.40', firmware: 'v1.8.2' },
  { id: '8', name: 'Device-08', status: 'HEALTHY', type: 'Compute', location: 'Denver', ip: '192.168.1.45', firmware: 'v2.0.1' },
];

const DevicesPage: React.FC<DevicesPageProps> = ({ onAddDeviceClick, onDeviceSelect }) => {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'ONLINE', label: 'Online' },
    { value: 'OFFLINE', label: 'Offline' },
    { value: 'ERROR', label: 'Error' },
    { value: 'MAINTENANCE', label: 'Maintenance' },
    { value: 'PROVISIONING', label: 'Provisioning' },
  ];

  // Simple filtering logic
  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = !statusFilter || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeviceClick = (deviceId: string) => {
    setSelectedDevice(deviceId);
    onDeviceSelect(deviceId);
  };

  return (
    <>
      {/* Header */}
      <PageSection>
        <Title headingLevel="h1" size="2xl">
          Devices
        </Title>
        <p>Flight Control is waiting for devices to connect and report their status. Devices will report a "Pending sync" status until they are able to connect.</p>
      </PageSection>

      {/* System Recovery Alert */}
      <PageSection>
        <Alert
          variant="warning"
          title="System recovery complete."
          isInline
        >
          Flight Control is waiting for devices to connect and report their status. Devices will report a "Pending sync" status until they are able to connect. Devices with configuration conflicts will report a "Suspended" status and require manual action to resume.
        </Alert>
      </PageSection>

      {/* Main Content */}
      <PageSection>
        <Card>
          <CardBody>
            {/* Filters Toolbar */}
            <Toolbar>
              <ToolbarContent>
                <ToolbarGroup>
                  <ToolbarItem>
                    <Select
                      isOpen={isStatusOpen}
                      selected={statusFilter}
                      onSelect={(_event, value) => {
                        setStatusFilter(value as string);
                        setIsStatusOpen(false);
                      }}
                      onOpenChange={setIsStatusOpen}
                      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                        <MenuToggle ref={toggleRef} onClick={() => setIsStatusOpen(!isStatusOpen)} icon={<FilterIcon />}>
                          Filter by status
                        </MenuToggle>
                      )}
                    >
                      <SelectList>
                        {statusOptions.map((option) => (
                          <SelectOption key={option.value} value={option.value}>
                            {option.label}
                          </SelectOption>
                        ))}
                      </SelectList>
                    </Select>
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button variant="control">Labels and fleets</Button>
                  </ToolbarItem>
                  <ToolbarItem>
                    <SearchInput
                      placeholder=""
                      value={searchValue}
                      onChange={(_event, value) => setSearchValue(value)}
                      onClear={() => setSearchValue('')}
                      style={{ width: '200px' }}
                    />
                  </ToolbarItem>
                </ToolbarGroup>
                <ToolbarGroup align={{ default: 'alignEnd' }}>
                  <ToolbarItem>
                    <Button variant="primary" onClick={onAddDeviceClick}>Add devices</Button>
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button variant="secondary">Decommission devices</Button>
                  </ToolbarItem>
                </ToolbarGroup>
              </ToolbarContent>
            </Toolbar>

            {/* Results Summary */}
            <div style={{ margin: '16px 0', fontSize: '14px', color: '#6a6e73' }}>
              Showing {filteredDevices.length} of {mockDevices.length} devices
              {(searchValue || statusFilter) && (
                <Button
                  variant="link"
                  isInline
                  onClick={() => { setSearchValue(''); setStatusFilter(''); }}
                  style={{ marginLeft: '8px' }}
                >
                  Clear filters
                </Button>
              )}
            </div>

            {/* Device Table */}
            <Table aria-label="Device list" variant="compact">
              <Thead>
                <Tr>
                  <Th width={10}></Th>
                  <Th>Alias</Th>
                  <Th>Name</Th>
                  <Th>Fleet</Th>
                  <Th>Application status</Th>
                  <Th>Device status</Th>
                  <Th>System update status</Th>
                  <Th>Last seen</Th>
                  <Th width={10}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredDevices.map((device, index) => (
                  <Tr
                    key={device.id}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedDevice === device.id ? '#f0f8ff' : undefined
                    }}
                    onClick={() => handleDeviceClick(device.id)}
                  >
                    <Td>
                      <input type="checkbox" />
                    </Td>
                    <Td>
                      <Button variant="link" style={{ color: '#06c', padding: 0 }}>
                        Just a friendly name here
                      </Button>
                    </Td>
                    <Td style={{ fontFamily: 'monospace' }}>
                      {`0A83BC2347AFE7F${index + 2}`}
                    </Td>
                    <Td>
                      {index === 0 ? '--' : (
                        <Button variant="link" style={{ color: '#06c', padding: 0 }}>
                          Fitting Room Devices
                        </Button>
                      )}
                    </Td>
                    <Td>
                      {index === 0 ? (
                        <Label color="red">● Error</Label>
                      ) : index === 1 ? (
                        <Label color="green">● Healthy</Label>
                      ) : index === 2 ? (
                        <Label color="orange">● Degraded</Label>
                      ) : index === 3 ? (
                        <Label color="grey">● Unknown</Label>
                      ) : (
                        <Label color="green">● Healthy</Label>
                      )}
                    </Td>
                    <Td>
                      <Label color="blue">● Pending Sync</Label>
                    </Td>
                    <Td>
                      {index === 0 ? (
                        <Label color="red">● Failed</Label>
                      ) : index === 1 ? (
                        <Label color="green">● Up-to-date</Label>
                      ) : index === 2 ? (
                        <Label color="orange">● Out-of-date</Label>
                      ) : index === 3 ? (
                        <Label color="blue">● Updating (23%)</Label>
                      ) : index === 4 ? (
                        <Label color="grey">● Unknown</Label>
                      ) : (
                        <Label color="orange">● Rolling Back</Label>
                      )}
                    </Td>
                    <Td>4days ago</Td>
                    <Td>
                      <Button
                        variant="plain"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Options for ${device.name}`);
                        }}
                      >
                        <EllipsisVIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {filteredDevices.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6a6e73' }}>
                <p>No devices match your search criteria.</p>
                <Button
                  variant="link"
                  onClick={() => { setSearchValue(''); setStatusFilter(''); }}
                >
                  Clear filters to see all devices
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};

export default DevicesPage;