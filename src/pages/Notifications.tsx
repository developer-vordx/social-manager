import React, { useState } from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Card,
  Badge,
  ActionIcon,
  Avatar,
  ThemeIcon,
  Select,
  TextInput,
  Divider,
  Paper,
  Menu,
  Tabs,
  SimpleGrid,
  Center,
  Box,
  Transition,
} from '@mantine/core';
import {
  IconBell,
  IconBellOff,
  IconCheck,
  IconTrash,
  IconDots,
  IconSearch,
  IconFilter,
  IconSettings,
  IconHeart,
  IconMessageCircle,
  IconShare,
  IconUsers,
  IconAlertTriangle,
  IconInfoCircle,
  IconX,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconExternalLink,
  IconBellRinging,
  IconArchive,
} from '@tabler/icons-react';
import { useNotifications } from '../hooks/useNotifications';
import { useNavigate } from 'react-router-dom';

const notificationTypeConfig = {
  info: { color: 'blue', icon: IconInfoCircle },
  success: { color: 'green', icon: IconCheck },
  warning: { color: 'yellow', icon: IconAlertTriangle },
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

export function Notifications() {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'unread' && !notification.read) ||
                         (filterStatus === 'read' && notification.read);
    
    return matchesSearch && matchesType && matchesStatus;
  });

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
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Group gap="sm" mb="xs">
              <Title order={1}>Notifications</Title>
              {unreadCount > 0 && (
                <Badge size="lg" color="red" variant="filled">
                  {unreadCount} new
                </Badge>
              )}
            </Group>
            <Text c="dimmed">
              Stay updated with your social media activity and team updates
            </Text>
          </div>
          <Group>
            <Button
              variant="light"
              leftSection={<IconCheck size={16} />}
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark All Read
            </Button>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="light" size="lg">
                  <IconDots size={18} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconSettings size={14} />}>
                  Notification Settings
                </Menu.Item>
                <Menu.Item leftSection={<IconArchive size={14} />}>
                  Archive All Read
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item 
                  color="red" 
                  leftSection={<IconTrash size={14} />}
                  onClick={clearAll}
                >
                  Clear All
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

        {/* Quick Stats */}
        <SimpleGrid cols={{ base: 2, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xl" fw={700}>
                  {notifications.length}
                </Text>
                <Text c="dimmed" size="sm">
                  Total
                </Text>
              </div>
              <ThemeIcon size="lg" variant="light" color="blue">
                <IconBell size={20} />
              </ThemeIcon>
            </Group>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xl" fw={700} c="red">
                  {unreadCount}
                </Text>
                <Text c="dimmed" size="sm">
                  Unread
                </Text>
              </div>
              <ThemeIcon size="lg" variant="light" color="red">
                <IconBellRinging size={20} />
              </ThemeIcon>
            </Group>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xl" fw={700} c="green">
                  {notifications.filter(n => n.type === 'engagement').length}
                </Text>
                <Text c="dimmed" size="sm">
                  Engagement
                </Text>
              </div>
              <ThemeIcon size="lg" variant="light" color="pink">
                <IconHeart size={20} />
              </ThemeIcon>
            </Group>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xl" fw={700} c="violet">
                  {notifications.filter(n => n.type === 'post').length}
                </Text>
                <Text c="dimmed" size="sm">
                  Posts
                </Text>
              </div>
              <ThemeIcon size="lg" variant="light" color="violet">
                <IconShare size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </SimpleGrid>

        {/* Filters */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <Group>
              <TextInput
                placeholder="Search notifications..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                w={300}
              />
              <Select
                placeholder="Filter by type"
                data={[
                  { value: 'all', label: 'All Types' },
                  { value: 'engagement', label: 'Engagement' },
                  { value: 'post', label: 'Posts' },
                  { value: 'team', label: 'Team' },
                  { value: 'system', label: 'System' },
                  { value: 'warning', label: 'Warnings' },
                ]}
                value={filterType}
                onChange={setFilterType}
                w={150}
              />
              <Select
                placeholder="Filter by status"
                data={[
                  { value: 'all', label: 'All' },
                  { value: 'unread', label: 'Unread' },
                  { value: 'read', label: 'Read' },
                ]}
                value={filterStatus}
                onChange={setFilterStatus}
                w={120}
              />
            </Group>
            <Text size="sm" c="dimmed">
              {filteredNotifications.length} notifications
            </Text>
          </Group>
        </Card>

        {/* Notifications List */}
        <Tabs defaultValue="all">
          <Tabs.List>
            <Tabs.Tab value="all">
              All ({notifications.length})
            </Tabs.Tab>
            <Tabs.Tab value="unread">
              Unread ({unreadCount})
            </Tabs.Tab>
            <Tabs.Tab value="read">
              Read ({readNotifications.length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all" pt="md">
            <Stack gap="sm">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => {
                  const typeConfig = notificationTypeConfig[notification.type];
                  const platformIcon = notification.platform ? platformConfig[notification.platform] : null;
                  
                  return (
                    <Transition
                      key={notification.id}
                      mounted={true}
                      transition="slide-right"
                      duration={200}
                    >
                      {(styles) => (
                        <Paper
                          style={styles}
                          p="md"
                          withBorder
                          bg={notification.read ? undefined : 'blue.0'}
                          onClick={() => handleNotificationClick(notification)}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <Group justify="space-between" align="flex-start">
                            <Group align="flex-start" gap="md">
                              {notification.avatar ? (
                                <Avatar src={notification.avatar} size="md" radius="xl" />
                              ) : (
                                <ThemeIcon
                                  size="lg"
                                  variant="light"
                                  color={typeConfig.color}
                                >
                                  <typeConfig.icon size={20} />
                                </ThemeIcon>
                              )}
                              
                              <div style={{ flex: 1 }}>
                                <Group gap="xs" mb="xs">
                                  <Text fw={notification.read ? 400 : 600} size="sm">
                                    {notification.title}
                                  </Text>
                                  {!notification.read && (
                                    <Box
                                      style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--mantine-color-blue-6)',
                                      }}
                                    />
                                  )}
                                  {platformIcon && (
                                    <ThemeIcon size="xs" variant="light" color={platformIcon.color}>
                                      <platformIcon.icon size={10} />
                                    </ThemeIcon>
                                  )}
                                </Group>
                                
                                <Text size="sm" c="dimmed" mb="xs">
                                  {notification.message}
                                </Text>
                                
                                <Group gap="md">
                                  <Text size="xs" c="dimmed">
                                    {getTimeAgo(notification.timestamp)}
                                  </Text>
                                  {notification.actionLabel && (
                                    <Button
                                      size="xs"
                                      variant="light"
                                      rightSection={<IconExternalLink size={12} />}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleNotificationClick(notification);
                                      }}
                                    >
                                      {notification.actionLabel}
                                    </Button>
                                  )}
                                </Group>
                              </div>
                            </Group>
                            
                            <Menu shadow="md" width={160}>
                              <Menu.Target>
                                <ActionIcon
                                  variant="subtle"
                                  size="sm"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <IconDots size={14} />
                                </ActionIcon>
                              </Menu.Target>
                              <Menu.Dropdown>
                                {!notification.read ? (
                                  <Menu.Item
                                    leftSection={<IconCheck size={14} />}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(notification.id);
                                    }}
                                  >
                                    Mark as Read
                                  </Menu.Item>
                                ) : (
                                  <Menu.Item leftSection={<IconBellOff size={14} />}>
                                    Mark as Unread
                                  </Menu.Item>
                                )}
                                <Menu.Item leftSection={<IconArchive size={14} />}>
                                  Archive
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                  color="red"
                                  leftSection={<IconTrash size={14} />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                >
                                  Delete
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Group>
                        </Paper>
                      )}
                    </Transition>
                  );
                })
              ) : (
                <Center py="xl">
                  <Stack align="center" gap="md">
                    <ThemeIcon size={60} variant="light" color="gray">
                      <IconBell size={30} />
                    </ThemeIcon>
                    <div style={{ textAlign: 'center' }}>
                      <Text fw={500} mb="xs">
                        No notifications found
                      </Text>
                      <Text size="sm" c="dimmed">
                        {searchQuery || filterType !== 'all' || filterStatus !== 'all'
                          ? 'Try adjusting your filters'
                          : 'You\'re all caught up!'}
                      </Text>
                    </div>
                  </Stack>
                </Center>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="unread" pt="md">
            <Stack gap="sm">
              {unreadNotifications.length > 0 ? (
                unreadNotifications.map((notification) => {
                  const typeConfig = notificationTypeConfig[notification.type];
                  const platformIcon = notification.platform ? platformConfig[notification.platform] : null;
                  
                  return (
                    <Paper
                      key={notification.id}
                      p="md"
                      withBorder
                      bg="blue.0"
                      onClick={() => handleNotificationClick(notification)}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <Group justify="space-between" align="flex-start">
                        <Group align="flex-start" gap="md">
                          {notification.avatar ? (
                            <Avatar src={notification.avatar} size="md" radius="xl" />
                          ) : (
                            <ThemeIcon
                              size="lg"
                              variant="light"
                              color={typeConfig.color}
                            >
                              <typeConfig.icon size={20} />
                            </ThemeIcon>
                          )}
                          
                          <div style={{ flex: 1 }}>
                            <Group gap="xs" mb="xs">
                              <Text fw={600} size="sm">
                                {notification.title}
                              </Text>
                              <Box
                                style={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: 'var(--mantine-color-blue-6)',
                                }}
                              />
                              {platformIcon && (
                                <ThemeIcon size="xs" variant="light" color={platformIcon.color}>
                                  <platformIcon.icon size={10} />
                                </ThemeIcon>
                              )}
                            </Group>
                            
                            <Text size="sm" c="dimmed" mb="xs">
                              {notification.message}
                            </Text>
                            
                            <Group gap="md">
                              <Text size="xs" c="dimmed">
                                {getTimeAgo(notification.timestamp)}
                              </Text>
                              {notification.actionLabel && (
                                <Button
                                  size="xs"
                                  variant="light"
                                  rightSection={<IconExternalLink size={12} />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNotificationClick(notification);
                                  }}
                                >
                                  {notification.actionLabel}
                                </Button>
                              )}
                            </Group>
                          </div>
                        </Group>
                        
                        <ActionIcon
                          variant="light"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                        >
                          <IconCheck size={14} />
                        </ActionIcon>
                      </Group>
                    </Paper>
                  );
                })
              ) : (
                <Center py="xl">
                  <Stack align="center" gap="md">
                    <ThemeIcon size={60} variant="light" color="green">
                      <IconCheck size={30} />
                    </ThemeIcon>
                    <div style={{ textAlign: 'center' }}>
                      <Text fw={500} mb="xs">
                        All caught up!
                      </Text>
                      <Text size="sm" c="dimmed">
                        You have no unread notifications
                      </Text>
                    </div>
                  </Stack>
                </Center>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="read" pt="md">
            <Stack gap="sm">
              {readNotifications.length > 0 ? (
                readNotifications.map((notification) => {
                  const typeConfig = notificationTypeConfig[notification.type];
                  const platformIcon = notification.platform ? platformConfig[notification.platform] : null;
                  
                  return (
                    <Paper
                      key={notification.id}
                      p="md"
                      withBorder
                      onClick={() => handleNotificationClick(notification)}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <Group justify="space-between" align="flex-start">
                        <Group align="flex-start" gap="md">
                          {notification.avatar ? (
                            <Avatar src={notification.avatar} size="md" radius="xl" />
                          ) : (
                            <ThemeIcon
                              size="lg"
                              variant="light"
                              color={typeConfig.color}
                            >
                              <typeConfig.icon size={20} />
                            </ThemeIcon>
                          )}
                          
                          <div style={{ flex: 1 }}>
                            <Group gap="xs" mb="xs">
                              <Text fw={400} size="sm">
                                {notification.title}
                              </Text>
                              {platformIcon && (
                                <ThemeIcon size="xs" variant="light" color={platformIcon.color}>
                                  <platformIcon.icon size={10} />
                                </ThemeIcon>
                              )}
                            </Group>
                            
                            <Text size="sm" c="dimmed" mb="xs">
                              {notification.message}
                            </Text>
                            
                            <Group gap="md">
                              <Text size="xs" c="dimmed">
                                {getTimeAgo(notification.timestamp)}
                              </Text>
                              {notification.actionLabel && (
                                <Button
                                  size="xs"
                                  variant="light"
                                  rightSection={<IconExternalLink size={12} />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNotificationClick(notification);
                                  }}
                                >
                                  {notification.actionLabel}
                                </Button>
                              )}
                            </Group>
                          </div>
                        </Group>
                        
                        <ActionIcon
                          variant="subtle"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <IconTrash size={14} />
                        </ActionIcon>
                      </Group>
                    </Paper>
                  );
                })
              ) : (
                <Center py="xl">
                  <Stack align="center" gap="md">
                    <ThemeIcon size={60} variant="light" color="gray">
                      <IconBell size={30} />
                    </ThemeIcon>
                    <div style={{ textAlign: 'center' }}>
                      <Text fw={500} mb="xs">
                        No read notifications
                      </Text>
                      <Text size="sm" c="dimmed">
                        Read notifications will appear here
                      </Text>
                    </div>
                  </Stack>
                </Center>
              )}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}