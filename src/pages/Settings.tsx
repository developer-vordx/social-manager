import React from 'react';
import {
  Grid,
  Card,
  Text,
  Title,
  Button,
  Stack,
  Group,
  TextInput,
  PasswordInput,
  Switch,
  Select,
  Tabs,
  Badge,
  Container,
  Divider,
  ActionIcon,
  ThemeIcon,
  Alert,
} from '@mantine/core';
import {
  IconUser,
  IconBell,
  IconCreditCard,
  IconShield,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconLink,
  IconUnlink,
  IconInfoCircle,
  IconCheck,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';

const connectedAccounts = [
  {
    platform: 'Instagram',
    username: '@yourcompany',
    connected: true,
    icon: IconBrandInstagram,
    color: 'pink',
  },
  {
    platform: 'Twitter',
    username: '@yourcompany',
    connected: true,
    icon: IconBrandTwitter,
    color: 'blue',
  },
  {
    platform: 'LinkedIn',
    username: 'Your Company',
    connected: false,
    icon: IconBrandLinkedin,
    color: 'blue',
  },
  {
    platform: 'Facebook',
    username: 'Your Company Page',
    connected: false,
    icon: IconBrandFacebook,
    color: 'blue',
  },
];

const timezones = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'EST', label: 'EST (Eastern Standard Time)' },
  { value: 'PST', label: 'PST (Pacific Standard Time)' },
  { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
];

export function Settings() {
  const profileForm = useForm({
    initialValues: {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Example Company',
      timezone: 'EST',
    },
  });

  const passwordForm = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      newPassword: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
      confirmPassword: (value, values) =>
        value !== values.newPassword ? 'Passwords do not match' : null,
    },
  });

  return (
    <Container size="xl">
      <Stack gap="xl">
        <div>
          <Title order={1}>Settings</Title>
          <Text c="dimmed" mt={4}>
            Manage your account settings and preferences
          </Text>
        </div>

        <Tabs defaultValue="profile">
          <Tabs.List>
            <Tabs.Tab value="profile" leftSection={<IconUser size={14} />}>
              Profile
            </Tabs.Tab>
            <Tabs.Tab value="notifications" leftSection={<IconBell size={14} />}>
              Notifications
            </Tabs.Tab>
            <Tabs.Tab value="billing" leftSection={<IconCreditCard size={14} />}>
              Billing
            </Tabs.Tab>
            <Tabs.Tab value="security" leftSection={<IconShield size={14} />}>
              Security
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile" pt="xl">
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Card shadow="sm" padding="xl" radius="md" withBorder>
                  <Title order={3} mb="lg">
                    Profile Information
                  </Title>
                  <form onSubmit={profileForm.onSubmit((values) => console.log(values))}>
                    <Stack>
                      <Group grow>
                        <TextInput
                          label="Full Name"
                          {...profileForm.getInputProps('name')}
                        />
                        <TextInput
                          label="Email"
                          {...profileForm.getInputProps('email')}
                        />
                      </Group>
                      <TextInput
                        label="Company"
                        {...profileForm.getInputProps('company')}
                      />
                      <Select
                        label="Timezone"
                        data={timezones}
                        {...profileForm.getInputProps('timezone')}
                      />
                      <Group justify="flex-end" mt="md">
                        <Button variant="light">Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                      </Group>
                    </Stack>
                  </form>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={4} mb="md">
                    Connected Accounts
                  </Title>
                  <Stack gap="md">
                    {connectedAccounts.map((account) => (
                      <Group key={account.platform} justify="space-between">
                        <Group gap="sm">
                          <ThemeIcon
                            size="sm"
                            variant="light"
                            color={account.color}
                          >
                            <account.icon size={14} />
                          </ThemeIcon>
                          <div>
                            <Text size="sm" fw={500}>
                              {account.platform}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {account.connected ? account.username : 'Not connected'}
                            </Text>
                          </div>
                        </Group>
                        <ActionIcon
                          variant="light"
                          color={account.connected ? 'red' : 'blue'}
                          size="sm"
                        >
                          {account.connected ? (
                            <IconUnlink size={14} />
                          ) : (
                            <IconLink size={14} />
                          )}
                        </ActionIcon>
                      </Group>
                    ))}
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="notifications" pt="xl">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Title order={3} mb="lg">
                Notification Preferences
              </Title>
              <Stack>
                <Group justify="space-between">
                  <div>
                    <Text fw={500}>Email Notifications</Text>
                    <Text size="sm" c="dimmed">
                      Receive notifications about your posts and engagement
                    </Text>
                  </div>
                  <Switch defaultChecked />
                </Group>
                <Divider />
                <Group justify="space-between">
                  <div>
                    <Text fw={500}>Post Reminders</Text>
                    <Text size="sm" c="dimmed">
                      Get reminded about scheduled posts before they go live
                    </Text>
                  </div>
                  <Switch defaultChecked />
                </Group>
                <Divider />
                <Group justify="space-between">
                  <div>
                    <Text fw={500}>Weekly Reports</Text>
                    <Text size="sm" c="dimmed">
                      Receive weekly performance reports via email
                    </Text>
                  </div>
                  <Switch />
                </Group>
                <Divider />
                <Group justify="space-between">
                  <div>
                    <Text fw={500}>Team Activity</Text>
                    <Text size="sm" c="dimmed">
                      Get notified when team members make changes
                    </Text>
                  </div>
                  <Switch defaultChecked />
                </Group>
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="billing" pt="xl">
            <Stack>
              <Card shadow="sm" padding="xl" radius="md" withBorder>
                <Group justify="space-between" mb="lg">
                  <div>
                    <Title order={3}>Current Plan</Title>
                    <Text c="dimmed">
                      Manage your subscription and billing information
                    </Text>
                  </div>
                  <Badge size="lg" variant="light" color="blue">
                    Pro Plan
                  </Badge>
                </Group>
                
                <Alert icon={<IconInfoCircle size={16} />} mb="lg">
                  Your Pro plan includes unlimited posts, advanced analytics, and team collaboration.
                  Next billing date: December 15, 2024
                </Alert>

                <Group>
                  <Button variant="light">Change Plan</Button>
                  <Button variant="light">Update Payment Method</Button>
                  <Button variant="light" color="red">
                    Cancel Subscription
                  </Button>
                </Group>
              </Card>

              <Card shadow="sm" padding="xl" radius="md" withBorder>
                <Title order={4} mb="md">
                  Billing History
                </Title>
                <Stack gap="md">
                  <Group justify="space-between">
                    <div>
                      <Text fw={500}>Pro Plan - November 2024</Text>
                      <Text size="sm" c="dimmed">
                        Paid on Nov 15, 2024
                      </Text>
                    </div>
                    <Group gap="sm">
                      <Text fw={500}>$29.00</Text>
                      <Badge color="green" variant="light" size="sm">
                        <IconCheck size={10} style={{ marginRight: 4 }} />
                        Paid
                      </Badge>
                    </Group>
                  </Group>
                  <Divider />
                  <Group justify="space-between">
                    <div>
                      <Text fw={500}>Pro Plan - October 2024</Text>
                      <Text size="sm" c="dimmed">
                        Paid on Oct 15, 2024
                      </Text>
                    </div>
                    <Group gap="sm">
                      <Text fw={500}>$29.00</Text>
                      <Badge color="green" variant="light" size="sm">
                        <IconCheck size={10} style={{ marginRight: 4 }} />
                        Paid
                      </Badge>
                    </Group>
                  </Group>
                </Stack>
              </Card>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="security" pt="xl">
            <Stack>
              <Card shadow="sm" padding="xl" radius="md" withBorder>
                <Title order={3} mb="lg">
                  Change Password
                </Title>
                <form onSubmit={passwordForm.onSubmit((values) => console.log(values))}>
                  <Stack>
                    <PasswordInput
                      label="Current Password"
                      {...passwordForm.getInputProps('currentPassword')}
                    />
                    <PasswordInput
                      label="New Password"
                      {...passwordForm.getInputProps('newPassword')}
                    />
                    <PasswordInput
                      label="Confirm New Password"
                      {...passwordForm.getInputProps('confirmPassword')}
                    />
                    <Group justify="flex-end" mt="md">
                      <Button variant="light">Cancel</Button>
                      <Button type="submit">Update Password</Button>
                    </Group>
                  </Stack>
                </form>
              </Card>

              <Card shadow="sm" padding="xl" radius="md" withBorder>
                <Title order={4} mb="md">
                  Two-Factor Authentication
                </Title>
                <Group justify="space-between">
                  <div>
                    <Text fw={500}>Enable 2FA</Text>
                    <Text size="sm" c="dimmed">
                      Add an extra layer of security to your account
                    </Text>
                  </div>
                  <Button variant="light">Setup 2FA</Button>
                </Group>
              </Card>

              <Card shadow="sm" padding="xl" radius="md" withBorder>
                <Title order={4} mb="md">
                  Active Sessions
                </Title>
                <Stack gap="md">
                  <Group justify="space-between">
                    <div>
                      <Text fw={500}>Current Session</Text>
                      <Text size="sm" c="dimmed">
                        Chrome on MacOS • Last active now
                      </Text>
                    </div>
                    <Badge color="green" variant="light">
                      Current
                    </Badge>
                  </Group>
                  <Divider />
                  <Group justify="space-between">
                    <div>
                      <Text fw={500}>Mobile App</Text>
                      <Text size="sm" c="dimmed">
                        iPhone • Last active 2 hours ago
                      </Text>
                    </div>
                    <Button variant="light" size="xs" color="red">
                      Revoke
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}