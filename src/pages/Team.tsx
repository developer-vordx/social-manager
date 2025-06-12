import React, { useState } from 'react';
import {
  Grid,
  Card,
  Text,
  Title,
  Button,
  Stack,
  Group,
  Avatar,
  Badge,
  ActionIcon,
  Menu,
  TextInput,
  Select,
  Modal,
  Container,
  Table,
  Paper,
} from '@mantine/core';
import {
  IconPlus,
  IconDots,
  IconEdit,
  IconTrash,
  IconMail,
  IconUser,
  IconUsers,
  IconCrown,
  IconSearch,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Admin',
    avatar: null,
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'Editor',
    avatar: null,
    status: 'active',
    joinDate: '2024-02-20',
    lastActive: '1 day ago',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'Viewer',
    avatar: null,
    status: 'pending',
    joinDate: '2024-03-10',
    lastActive: 'Never',
  },
  {
    id: 4,
    name: 'Alex Thompson',
    email: 'alex.thompson@company.com',
    role: 'Editor',
    avatar: null,
    status: 'active',
    joinDate: '2024-02-05',
    lastActive: '3 hours ago',
  },
];

const roles = [
  { value: 'admin', label: 'Admin - Full access' },
  { value: 'editor', label: 'Editor - Create and edit content' },
  { value: 'viewer', label: 'Viewer - View only access' },
];

export function Team() {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      role: 'viewer',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleInvite = (values: typeof form.values) => {
    console.log('Inviting user:', values);
    form.reset();
    close();
  };

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'red';
      case 'editor':
        return 'blue';
      case 'viewer':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return IconCrown;
      case 'editor':
        return IconEdit;
      case 'viewer':
        return IconUser;
      default:
        return IconUser;
    }
  };

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={1}>Team Management</Title>
            <Text c="dimmed" mt={4}>
              Manage your team members and their access permissions
            </Text>
          </div>
          <Button leftSection={<IconPlus size={16} />} onClick={open}>
            Invite Member
          </Button>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group mb="md">
                  <IconUsers size={24} />
                  <div>
                    <Text fw={500}>Team Overview</Text>
                    <Text size="sm" c="dimmed">
                      Current team statistics
                    </Text>
                  </div>
                </Group>
                <Stack gap="md">
                  <Group justify="space-between">
                    <Text size="sm">Total Members</Text>
                    <Badge variant="light">{teamMembers.length}</Badge>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm">Active Members</Text>
                    <Badge color="green" variant="light">
                      {teamMembers.filter(m => m.status === 'active').length}
                    </Badge>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm">Pending Invites</Text>
                    <Badge color="yellow" variant="light">
                      {teamMembers.filter(m => m.status === 'pending').length}
                    </Badge>
                  </Group>
                </Stack>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Role Permissions
                </Title>
                <Stack gap="md">
                  <div>
                    <Group mb="xs">
                      <IconCrown size={16} color="red" />
                      <Text size="sm" fw={500}>
                        Admin
                      </Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                      Full access to all features, team management, and billing
                    </Text>
                  </div>
                  <div>
                    <Group mb="xs">
                      <IconEdit size={16} color="blue" />
                      <Text size="sm" fw={500}>
                        Editor
                      </Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                      Create, edit, and schedule content. View analytics
                    </Text>
                  </div>
                  <div>
                    <Group mb="xs">
                      <IconUser size={16} color="gray" />
                      <Text size="sm" fw={500}>
                        Viewer
                      </Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                      View-only access to content and basic analytics
                    </Text>
                  </div>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={3}>Team Members</Title>
                <TextInput
                  placeholder="Search members..."
                  leftSection={<IconSearch size={16} />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  w={250}
                />
              </Group>

              <Paper withBorder>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Member</Table.Th>
                      <Table.Th>Role</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Last Active</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {filteredMembers.map((member) => {
                      const RoleIcon = getRoleIcon(member.role);
                      return (
                        <Table.Tr key={member.id}>
                          <Table.Td>
                            <Group gap="sm">
                              <Avatar
                                src={member.avatar}
                                size="sm"
                                radius="xl"
                                color="blue"
                              >
                                {member.name.charAt(0)}
                              </Avatar>
                              <div>
                                <Text size="sm" fw={500}>
                                  {member.name}
                                </Text>
                                <Text size="xs" c="dimmed">
                                  {member.email}
                                </Text>
                              </div>
                            </Group>
                          </Table.Td>
                          <Table.Td>
                            <Badge
                              color={getRoleColor(member.role)}
                              variant="light"
                              leftSection={<RoleIcon size={12} />}
                            >
                              {member.role}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Badge
                              color={member.status === 'active' ? 'green' : 'yellow'}
                              variant="light"
                            >
                              {member.status}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" c="dimmed">
                              {member.lastActive}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Menu shadow="md" width={160}>
                              <Menu.Target>
                                <ActionIcon variant="subtle" size="sm">
                                  <IconDots size={14} />
                                </ActionIcon>
                              </Menu.Target>
                              <Menu.Dropdown>
                                <Menu.Item leftSection={<IconEdit size={14} />}>
                                  Edit Role
                                </Menu.Item>
                                <Menu.Item leftSection={<IconMail size={14} />}>
                                  Send Message
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                  color="red"
                                  leftSection={<IconTrash size={14} />}
                                >
                                  Remove
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Table.Td>
                        </Table.Tr>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              </Paper>
            </Card>
          </Grid.Col>
        </Grid>

        <Modal opened={opened} onClose={close} title="Invite Team Member" size="md">
          <form onSubmit={form.onSubmit(handleInvite)}>
            <Stack>
              <TextInput
                label="Full Name"
                placeholder="John Doe"
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Email Address"
                placeholder="john@company.com"
                {...form.getInputProps('email')}
              />
              <Select
                label="Role"
                data={roles}
                {...form.getInputProps('role')}
              />
              <Group justify="flex-end" mt="md">
                <Button variant="light" onClick={close}>
                  Cancel
                </Button>
                <Button type="submit" leftSection={<IconMail size={16} />}>
                  Send Invite
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </Stack>
    </Container>
  );
}