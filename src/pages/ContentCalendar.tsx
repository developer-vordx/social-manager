import React, { useState } from 'react';
import {
  Grid,
  Card,
  Text,
  Title,
  Button,
  Stack,
  Group,
  Badge,
  ActionIcon,
  ThemeIcon,
  Menu,
  Container,
  Paper,
  Avatar,
} from '@mantine/core';
import { Calendar } from '@mantine/dates';
import {
  IconCalendar,
  IconDots,
  IconEdit,
  IconTrash,
  IconEye,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconPlus,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const scheduledPosts = [
  {
    id: 1,
    date: new Date(2024, 11, 15),
    time: '10:00 AM',
    platform: 'Instagram',
    icon: IconBrandInstagram,
    color: 'pink',
    content: 'Check out our latest product launch! 🚀',
    status: 'scheduled',
    engagement: null,
  },
  {
    id: 2,
    date: new Date(2024, 11, 16),
    time: '2:00 PM',
    platform: 'Twitter',
    icon: IconBrandTwitter,
    color: 'blue',
    content: 'Excited to share our company updates...',
    status: 'scheduled',
    engagement: null,
  },
  {
    id: 3,
    date: new Date(2024, 11, 14),
    time: '9:00 AM',
    platform: 'LinkedIn',
    icon: IconBrandLinkedin,
    color: 'blue',
    content: 'Industry insights: The future of social media marketing',
    status: 'published',
    engagement: 92,
  },
  {
    id: 4,
    date: new Date(2024, 11, 17),
    time: '4:00 PM',
    platform: 'Facebook',
    icon: IconBrandFacebook,
    color: 'blue',
    content: 'Join us for our upcoming webinar on digital marketing trends',
    status: 'scheduled',
    engagement: null,
  },
];

export function ContentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const navigate = useNavigate();

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(
      post => post.date.toDateString() === date.toDateString()
    );
  };

  const getDatesWithPosts = () => {
    return scheduledPosts.map(post => post.date);
  };

  const selectedDatePosts = selectedDate ? getPostsForDate(selectedDate) : [];

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={1}>Content Calendar</Title>
            <Text c="dimmed" mt={4}>
              Plan, schedule, and manage your social media content
            </Text>
          </div>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/create')}
          >
            Create Content
          </Button>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">
                Calendar View
              </Title>
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                size="lg"
                renderDay={(date) => {
                  const hasPost = getDatesWithPosts().some(
                    postDate => postDate.toDateString() === date.toDateString()
                  );
                  return (
                    <div style={{ position: 'relative' }}>
                      {date.getDate()}
                      {hasPost && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 2,
                            right: 2,
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: '#228be6',
                          }}
                        />
                      )}
                    </div>
                  );
                }}
              />
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>
                  {selectedDate
                    ? `Posts for ${selectedDate.toLocaleDateString()}`
                    : 'Select a date'}
                </Title>
                <Badge variant="light">
                  {selectedDatePosts.length} posts
                </Badge>
              </Group>

              {selectedDatePosts.length > 0 ? (
                <Stack gap="md">
                  {selectedDatePosts.map((post) => (
                    <Paper key={post.id} p="md" withBorder>
                      <Stack gap="xs">
                        <Group justify="space-between">
                          <Group gap="xs">
                            <ThemeIcon size="sm" variant="light" color={post.color}>
                              <post.icon size={14} />
                            </ThemeIcon>
                            <div>
                              <Text size="sm" fw={500}>
                                {post.platform}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {post.time}
                              </Text>
                            </div>
                          </Group>
                          <Group gap="xs">
                            <Badge
                              size="xs"
                              color={post.status === 'published' ? 'green' : 'yellow'}
                              variant="light"
                            >
                              {post.status}
                            </Badge>
                            <Menu shadow="md" width={160}>
                              <Menu.Target>
                                <ActionIcon variant="subtle" size="sm">
                                  <IconDots size={14} />
                                </ActionIcon>
                              </Menu.Target>
                              <Menu.Dropdown>
                                <Menu.Item leftSection={<IconEye size={14} />}>
                                  Preview
                                </Menu.Item>
                                <Menu.Item leftSection={<IconEdit size={14} />}>
                                  Edit
                                </Menu.Item>
                                <Menu.Item
                                  color="red"
                                  leftSection={<IconTrash size={14} />}
                                >
                                  Delete
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Group>
                        </Group>
                        <Text size="sm" lineClamp={2}>
                          {post.content}
                        </Text>
                        {post.engagement && (
                          <Badge size="xs" variant="light" color="green">
                            {post.engagement}% engagement
                          </Badge>
                        )}
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              ) : (
                <Paper p="xl" ta="center">
                  <Stack align="center" gap="md">
                    <ThemeIcon size="xl" variant="light" color="gray">
                      <IconCalendar size={24} />
                    </ThemeIcon>
                    <div>
                      <Text fw={500} mb={4}>
                        No posts scheduled
                      </Text>
                      <Text size="sm" c="dimmed">
                        Select a different date or create new content
                      </Text>
                    </div>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => navigate('/create')}
                    >
                      Create Content
                    </Button>
                  </Stack>
                </Paper>
              )}
            </Card>
          </Grid.Col>
        </Grid>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={3}>Upcoming Posts</Title>
            <Button variant="light" size="sm">
              View All
            </Button>
          </Group>
          <Grid>
            {scheduledPosts
              .filter(post => post.status === 'scheduled')
              .slice(0, 6)
              .map((post) => (
                <Grid.Col key={post.id} span={{ base: 12, sm: 6, md: 4 }}>
                  <Paper p="md" withBorder>
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Group gap="xs">
                          <ThemeIcon size="sm" variant="light" color={post.color}>
                            <post.icon size={14} />
                          </ThemeIcon>
                          <Text size="sm" fw={500}>
                            {post.platform}
                          </Text>
                        </Group>
                        <Text size="xs" c="dimmed">
                          {post.date.toLocaleDateString()} {post.time}
                        </Text>
                      </Group>
                      <Text size="sm" lineClamp={2}>
                        {post.content}
                      </Text>
                      <Badge size="xs" variant="light" color="yellow">
                        Scheduled
                      </Badge>
                    </Stack>
                  </Paper>
                </Grid.Col>
              ))}
          </Grid>
        </Card>
      </Stack>
    </Container>
  );
}