import React from 'react';
import {
  Grid,
  Card,
  Text,
  Title,
  Group,
  Button,
  Stack,
  Progress,
  Badge,
  SimpleGrid,
  ActionIcon,
  ThemeIcon,
  RingProgress,
  Center,
  Container,
} from '@mantine/core';
import {
  IconPlus,
  IconTrendingUp,
  IconUsers,
  IconHeart,
  IconShare,
  IconEye,
  IconCalendar,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandFacebook,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { title: 'Total Reach', value: '24.3K', increase: 12, icon: IconEye, color: 'blue' },
  { title: 'Engagement Rate', value: '4.2%', increase: 8, icon: IconHeart, color: 'pink' },
  { title: 'Followers', value: '8.9K', increase: 15, icon: IconUsers, color: 'green' },
  { title: 'Posts This Month', value: '28', increase: 5, icon: IconShare, color: 'violet' },
];

const recentPosts = [
  {
    id: 1,
    platform: 'Instagram',
    content: 'Check out our latest product launch! 🚀',
    engagement: 89,
    icon: IconBrandInstagram,
    color: 'pink',
  },
  {
    id: 2,
    platform: 'Twitter',
    content: 'Excited to share our company updates...',
    engagement: 76,
    icon: IconBrandTwitter,
    color: 'blue',
  },
  {
    id: 3,
    platform: 'LinkedIn',
    content: 'Industry insights: The future of social media marketing',
    engagement: 92,
    icon: IconBrandLinkedin,
    color: 'blue',
  },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={1}>Dashboard</Title>
            <Text c="dimmed" mt={4}>
              Welcome back! Here's your social media performance overview.
            </Text>
          </div>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/dashboard/create')}
          >
            Create Content
          </Button>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
          {stats.map((stat) => (
            <Card key={stat.title} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <ThemeIcon size="lg" variant="light" color={stat.color}>
                  <stat.icon size={20} />
                </ThemeIcon>
                <Badge color="green" variant="light" size="sm">
                  +{stat.increase}%
                </Badge>
              </Group>
              <Text size="xl" fw={700}>
                {stat.value}
              </Text>
              <Text c="dimmed" size="sm">
                {stat.title}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={3}>Recent Posts Performance</Title>
                <Button variant="light" size="sm" onClick={() => navigate('/dashboard/posts')}>
                  View All
                </Button>
              </Group>
              <Stack gap="md">
                {recentPosts.map((post) => (
                  <Card key={post.id} padding="md" radius="sm" withBorder>
                    <Group justify="space-between">
                      <Group>
                        <ThemeIcon size="md" variant="light" color={post.color}>
                          <post.icon size={16} />
                        </ThemeIcon>
                        <div>
                          <Text fw={500}>{post.platform}</Text>
                          <Text size="sm" c="dimmed" lineClamp={1}>
                            {post.content}
                          </Text>
                        </div>
                      </Group>
                      <Group gap="xs">
                        <Text size="sm" fw={500}>
                          {post.engagement}% engagement
                        </Text>
                        <Progress value={post.engagement} size="sm" w={60} />
                      </Group>
                    </Group>
                  </Card>
                ))}
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Content Calendar
                </Title>
                <Group mb="md">
                  <ThemeIcon size="sm" variant="light">
                    <IconCalendar size={14} />
                  </ThemeIcon>
                  <Text size="sm">Upcoming posts: 12</Text>
                </Group>
                <Button variant="light" fullWidth onClick={() => navigate('/dashboard/calendar')}>
                  View Calendar
                </Button>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Monthly Goal
                </Title>
                <Center>
                  <RingProgress
                    size={120}
                    thickness={8}
                    sections={[{ value: 75, color: 'blue' }]}
                    label={
                      <Center>
                        <div>
                          <Text ta="center" size="xs" c="dimmed">
                            Posts
                          </Text>
                          <Text ta="center" fw={700}>
                            30/40
                          </Text>
                        </div>
                      </Center>
                    }
                  />
                </Center>
                <Text ta="center" mt="md" size="sm" c="dimmed">
                  10 more posts to reach your monthly goal
                </Text>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}