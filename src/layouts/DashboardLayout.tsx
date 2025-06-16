import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Group,
  Avatar,
  UnstyledButton,
  Menu,
  rem,
  NavLink,
  ActionIcon,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import {
  IconDashboard,
  IconPencilPlus,
  IconCalendar,
  IconChartLine,
  IconUsers,
  IconSettings,
  IconLogout,
  IconUser,
  IconBell,
  IconSearch,
  IconFileText,
  IconLink,
  IconCreditCard,
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const navigationItems = [
  { icon: IconDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: IconPencilPlus, label: 'Create Content', path: '/dashboard/create' },
  { icon: IconFileText, label: 'Posts', path: '/dashboard/posts' },
  { icon: IconCalendar, label: 'Content Calendar', path: '/dashboard/calendar' },
  { icon: IconChartLine, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: IconLink, label: 'Social Connections', path: '/dashboard/social-connections' },
  { icon: IconUsers, label: 'Team', path: '/dashboard/team' },
  { icon: IconCreditCard, label: 'Billing', path: '/dashboard/billing' },
  { icon: IconSettings, label: 'Settings', path: '/dashboard/settings' },
];

export function DashboardLayout() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      header={{ height: 70 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              hiddenFrom="sm"
            />
            <Text size="xl" fw={700} c="blue">
              EngagePro
            </Text>
          </Group>

          <Group>
            <ActionIcon variant="subtle" size="lg">
              <IconSearch style={{ width: rem(20), height: rem(20) }} />
            </ActionIcon>
            <ActionIcon variant="subtle" size="lg">
              <IconBell style={{ width: rem(20), height: rem(20) }} />
            </ActionIcon>
            
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton>
                  <Group gap="sm">
                    <Avatar src={user?.avatar} radius="xl" size="sm" color="blue">
                      {user?.name?.charAt(0)}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <Text size="sm" fw={500}>
                        {user?.name}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {user?.plan} plan
                      </Text>
                    </div>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}>
                  Profile
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow>
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              active={location.pathname === item.path}
              label={item.label}
              leftSection={<item.icon size="1rem" />}
              onClick={() => {
                navigate(item.path);
                setOpened(false);
              }}
              style={{ borderRadius: theme.radius.md }}
              mb={4}
            />
          ))}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}