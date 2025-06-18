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
  Indicator,
  Popover,
  Stack,
  Paper,
  Button,
  Divider,
  ScrollArea,
  ThemeIcon,
  Box,
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
  IconCheck,
  IconX,
  IconHeart,
  IconMessageCircle,
  IconShare,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandFacebook,
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';

const navigationItems = [
  { icon: IconDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: IconPencilPlus, label: 'Create Content', path: '/dashboard/create' },
  { icon: IconFileText, label: 'Posts', path: '/dashboard/posts' },
  { icon: IconCalendar, label: 'Content Calendar', path: '/dashboard/calendar' },
  { icon: IconChartLine, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: IconLink, label: 'Social Connections', path: '/dashboard/social-connections' },
  { icon: IconUsers, label: 'Team', path: '/dashboard/team' },
  { icon: IconCreditCard, label: 'Billing', path: '/dashboard/billing' },
  { icon: IconBell, label: 'Notifications', path: '/dashboard/notifications' },
  { icon: IconSettings, label: 'Settings', path: '/dashboard/settings' },
];

const notificationTypeConfig = {
  info: { color: 'blue', icon: IconBell },
  success: { color: 'green', icon: IconCheck },
  warning: { color: 'yellow', icon: IconX },
  error: { color: 'red', icon: IconX },
  post: { color: 'violet', icon: IconBell },
  engagement: { color: 'pink', icon: IconHeart },
  team: { color: 'orange', icon: IconUsers },
  system: { color: 'gray', icon: IconSettings },
};

const platformConfig = {
  instagram: { icon: IconBrandInstagram, color: 'pink' },
  twitter: { icon: IconBrandTwitter, color: 'blue' },
  linkedin: { icon: IconBrandLinkedin, color: 'blue' },
  facebook: { icon: IconBrandFacebook, color: 'blue' },
};

export function DashboardLayout() {
  const [opened, setOpened] = useState(false);
  const [notificationOpened, setNotificationOpened] = useState(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    setNotificationOpened(false);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const recentNotifications = notifications.slice(0, 5);

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
            
            {/* Notification Bell with Popover */}
            <Popover
              width={400}
              position="bottom-end"
              withArrow
              shadow="md"
              opened={notificationOpened}
              onChange={setNotificationOpened}
            >
              <Popover.Target>
                <Indicator
                  inline
                  label={unreadCount > 0 ? unreadCount : undefined}
                  size={16}
                  color="red"
                  disabled={unreadCount === 0}
                >
                  <ActionIcon
                    variant="subtle"
                    size="lg"
                    onClick={() => setNotificationOpened((o) => !o)}
                  >
                    <IconBell style={{ width: rem(20), height: rem(20) }} />
                  </ActionIcon>
                </Indicator>
              </Popover.Target>
              <Popover.Dropdown p={0}>
                <Stack gap={0}>
                  <Group justify="space-between" p="md" pb="sm">
                    <Text fw={600}>Notifications</Text>
                    {unreadCount > 0 && (
                      <Text size="sm" c="blue" fw={500}>
                        {unreadCount} new
                      </Text>
                    )}
                  </Group>
                  
                  <Divider />
                  
                  <ScrollArea h={300}>
                    {recentNotifications.length > 0 ? (
                      <Stack gap={0}>
                        {recentNotifications.map((notification, index) => {
                          const typeConfig = notificationTypeConfig[notification.type];
                          const platformIcon = notification.platform ? platformConfig[notification.platform] : null;
                          
                          return (
                            <Box key={notification.id}>
                              <Paper
                                p="sm"
                                style={{ 
                                  cursor: 'pointer',
                                  backgroundColor: notification.read ? undefined : 'var(--mantine-color-blue-0)',
                                }}
                                onClick={() => handleNotificationClick(notification)}
                              >
                                <Group align="flex-start" gap="sm">
                                  <ThemeIcon
                                    size="md"
                                    variant="light"
                                    color={typeConfig.color}
                                  >
                                    <typeConfig.icon size={16} />
                                  </ThemeIcon>
                                  
                                  <div style={{ flex: 1 }}>
                                    <Group gap="xs" mb={2}>
                                      <Text size="sm" fw={notification.read ? 400 : 600} lineClamp={1}>
                                        {notification.title}
                                      </Text>
                                      {!notification.read && (
                                        <Box
                                          style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: 'var(--mantine-color-blue-6)',
                                            flexShrink: 0,
                                          }}
                                        />
                                      )}
                                      {platformIcon && (
                                        <ThemeIcon size="xs" variant="light" color={platformIcon.color}>
                                          <platformIcon.icon size={8} />
                                        </ThemeIcon>
                                      )}
                                    </Group>
                                    
                                    <Text size="xs" c="dimmed" lineClamp={2} mb={4}>
                                      {notification.message}
                                    </Text>
                                    
                                    <Text size="xs" c="dimmed">
                                      {getTimeAgo(notification.timestamp)}
                                    </Text>
                                  </div>
                                </Group>
                              </Paper>
                              {index < recentNotifications.length - 1 && <Divider />}
                            </Box>
                          );
                        })}
                      </Stack>
                    ) : (
                      <Stack align="center" gap="md" p="xl">
                        <ThemeIcon size={40} variant="light" color="gray">
                          <IconBell size={20} />
                        </ThemeIcon>
                        <Text size="sm" c="dimmed" ta="center">
                          No notifications yet
                        </Text>
                      </Stack>
                    )}
                  </ScrollArea>
                  
                  <Divider />
                  
                  <Button
                    variant="subtle"
                    fullWidth
                    onClick={() => {
                      setNotificationOpened(false);
                      navigate('/dashboard/notifications');
                    }}
                    style={{ borderRadius: 0 }}
                  >
                    View All Notifications
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>
            
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
              label={
                <Group justify="space-between" w="100%">
                  <span>{item.label}</span>
                  {item.path === '/dashboard/notifications' && unreadCount > 0 && (
                    <Box
                      style={{
                        backgroundColor: 'var(--mantine-color-red-6)',
                        color: 'white',
                        borderRadius: '50%',
                        width: 18,
                        height: 18,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 600,
                      }}
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Box>
                  )}
                </Group>
              }
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