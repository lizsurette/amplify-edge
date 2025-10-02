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
  EllipsisVIcon
} from '@patternfly/react-icons';

// Mock fleet data for prototype
const mockFleets = [
  { id: '1', name: 'Warehouse name', systemImage: 'github.com/flightctl/flightctl-demos @ main', upToDate: 1520, total: 1520, status: 'Valid' },
  { id: '2', name: 'Warehouse name', systemImage: 'Local', upToDate: 125, total: 340, status: 'Selector overlap' },
  { id: '3', name: 'Warehouse name', systemImage: 'github.com/flightctl/flightctl-demos @ main', upToDate: 217, total: 217, status: 'Valid' },
  { id: '4', name: 'Warehouse name', systemImage: 'github.com/flightctl/flightctl-demos @ main', upToDate: 217, total: 217, status: 'Valid' },
];

const FleetsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      {/* Header */}
      <PageSection >
        <Title headingLevel="h1" size="2xl">
          Fleets
        </Title>
      </PageSection>

      {/* Suspended Devices Alert */}
      <PageSection >
        <Alert
          variant="danger"
          title="Suspended devices detected"
          isInline
        >
          <p><strong>42 devices in this fleet</strong> are suspended because their local configuration is newer than the server's record. These devices will not receive updates until they are resumed.</p>
          <p><strong>Warning:</strong> Please review this fleet's configuration before taking action. Resuming a device will cause it to apply the current specification, which may be older than what is on the device.</p>
          <div style={{ marginTop: '12px' }}>
            <Button variant="link" style={{ padding: 0, marginRight: '16px' }}>Resume all</Button>
            <Button variant="link" style={{ padding: 0 }}>View all suspended devices</Button>
          </div>
        </Alert>
      </PageSection>

      {/* Main Content */}
      <PageSection>
        <Card>
          <CardBody>
            {/* Toolbar */}
            <Toolbar>
              <ToolbarContent>
                <ToolbarGroup>
                  <ToolbarItem>
                    <SearchInput
                      placeholder="Search by name"
                      value={searchValue}
                      onChange={(_event, value) => setSearchValue(value)}
                      onClear={() => setSearchValue('')}
                      style={{ width: '300px' }}
                    />
                  </ToolbarItem>
                </ToolbarGroup>
                <ToolbarGroup align={{ default: 'alignEnd' }}>
                  <ToolbarItem>
                    <Button variant="primary">Create fleet</Button>
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button variant="secondary">Import fleets</Button>
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button variant="control">Actions</Button>
                  </ToolbarItem>
                </ToolbarGroup>
              </ToolbarContent>
            </Toolbar>

            {/* Fleet Table */}
            <Table aria-label="Fleet list" variant="compact">
              <Thead>
                <Tr>
                  <Th width={10}></Th>
                  <Th>Name</Th>
                  <Th>System image</Th>
                  <Th>Up-to-date/devices</Th>
                  <Th>Status</Th>
                  <Th width={10}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockFleets.map((fleet, index) => (
                  <Tr key={fleet.id}>
                    <Td>
                      <input type="checkbox" />
                    </Td>
                    <Td>
                      <Button variant="link" style={{ color: '#06c', padding: 0 }}>
                        {fleet.name}
                      </Button>
                    </Td>
                    <Td style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                      {fleet.systemImage}
                    </Td>
                    <Td>
                      <span style={{ color: index === 1 ? '#c9190b' : '#3e8635' }}>
                        {fleet.upToDate}
                      </span>
                      <span style={{ color: '#6a6e73' }}>/{fleet.total}</span>
                    </Td>
                    <Td>
                      {fleet.status === 'Valid' ? (
                        <Label color="green">● Valid</Label>
                      ) : (
                        <Label color="orange">⚠ Selector overlap</Label>
                      )}
                    </Td>
                    <Td>
                      <Button
                        variant="plain"
                        onClick={() => alert(`Fleet options for ${fleet.name}`)}
                      >
                        <EllipsisVIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};

export default FleetsPage;