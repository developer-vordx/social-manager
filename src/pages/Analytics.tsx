import React, { useState } from 'react';
import {
  Grid,
  Card,
  Text,
  Title,
  Group,
  Stack,
  Select,
  ThemeIcon,
  Badge,
  Progress,
  Container,
  SimpleGrid,
  Paper,
  RingProgress,
  Center,
} from '@mantine/core';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconHeart,
  IconShare,
  IconEye,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconCalendar,
} from '@tabler/icons-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const timeRanges = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '1y', label: 'Last year' },
];

const engagementData = [
  { name: 'Mon', value: 65 },
  { name: 'Tue', value: 78 },
  { name: 'Wed', value: 90 },
  { name: 'Thu', value: 81 },
  { name: 'Fri', value: 95 },
  { name: 'Sat', value: 85 },
  { name: 'Sun', value: 92 },
];

const platformData = [
  { name: 'Instagram', posts: 45, engagement: 4.2, reach: 12500, followers: 3200, color: '#E1306C' },
  { name: 'Twitter', posts: 32, engagement: 3.8, reach: 8900, followers: 2100, color: '#1DA1F2' },
  { name: 'LinkedIn', posts: 18, engagement: 5.1, reach: 5600, followers: 1800, color: '#0077B5' },
  { name: 'Facebook', posts: 28, engagement: 3.2, reach: 9800, followers: 2800, color: '#1877F2' },
];

const topPosts = [
  {
    id: 1,
    platform: 'Instagram',
    content: 'Product launch announcement with behind-the-scenes...',
    engagement: 8.5,
    reach: 2100,
    likes: 189,
    comments: 24,
    shares: 15,
    icon: IconBrandInstagram,
    color: 'pink',
  },
  {
    id: 2,
    platform: 'LinkedIn',
    content: 'Industry insights: The future of digital marketing...',
    engagement: 7.2,
    reach: 1800,
    likes: 156,
    comments: 31,
    shares: 22,
    icon: IconBrandLinkedin,
    color: 'blue',
  },
  {
    id: 3,
    platform: 'Twitter',
    content: 'Quick tips for improving your social media ROI...',
    engagement: 6.8,
    reach: 1650,
    likes: 142,
    comments: 18,
    shares: 28,
    icon: IconBrandTwitter,
    color: 'blue',
  },
];

const pieData = [
  { name: 'Instagram', value: 35, color: '#E1306C' },
  { name: 'Twitter', value: 25, color: '#1DA1F2' },
  { name: 'LinkedIn', value: 20, color: '#0077B5' },
  { name: 'Facebook', value: 20, color: '#1877F2' },
];

export function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={1}>Analytics</Title>
            <Text c="dimmed" mt={4}>
              Track your social media performance and engagement metrics
            </Text>
          </div>
          <Select
            data={timeRanges}
            value={timeRange}
            onChange={setTimeRange}
            leftSection={<IconCalendar size={16} />}
            w={160}
          />
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <ThemeIcon size="lg" variant="light" color="blue">
                <IconEye size={20} />
              </ThemeIcon>
              <Badge color="green" variant="light" size="sm">
                <IconTrendingUp size={12} style={{ marginRight: 4 }} />
                +12%
              </Badge>
            </Group>
            <Text size="xl" fw={700}>
              36.8K
            </Text>
            <Text c="dimmed" size="sm">
              Total Reach
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <ThemeIcon size="lg" variant="light" color="pink">
                <IconHeart size={20} />
              </ThemeIcon>
              <Badge color="green" variant="light" size="sm">
                <IconTrendingUp size={12} style={{ marginRight: 4 }} />
                +8%
              </Badge>
            </Group>
            <Text size="xl" fw={700}>
              4.2%
            </Text>
            <Text c="dimmed" size="sm">
              Engagement Rate
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <ThemeIcon size="lg" variant="light" color="green">
                <IconUsers size={20} />
              </ThemeIcon>
              <Badge color="green" variant="light" size="sm">
                <IconTrendingUp size={12} style={{ marginRight: 4 }} />
                +15%
              </Badge>
            </Group>
            <Text size="xl" fw={700}>
              9.9K
            </Text>
            <Text c="dimmed" size="sm">
              Total Followers
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <ThemeIcon size="lg" variant="light" color="violet">
                <IconShare size={20} />
              </ThemeIcon>
              <Badge color="red" variant="light" size="sm">
                <IconTrendingDown size={12} style={{ marginRight: 4 }} />
                -3%
              </Badge>
            </Group>
            <Text size="xl" fw={700}>
              123
            </Text>
            <Text c="dimmed" size="sm">
              Posts This Month
            </Text>
          </Card>
        </SimpleGrid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">
                Engagement Trends
              </Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#228be6"
                    strokeWidth={2}
                    dot={{ fill: '#228be6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">
                Platform Distribution
              </Title>
              <Center>
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Center>
              <Stack gap="xs" mt="md">
                {pieData.map((item) => (
                  <Group key={item.name} justify="space-between">
                    <Group gap="xs">
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 2,
                          backgroundColor: item.color,
                        }}
                      />
                      <Text size="sm">{item.name}</Text>
                    </Group>
                    <Text size="sm" fw={500}>
                      {item.value}%
                    </Text>
                  </Group>
                ))}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">
                Platform Performance
              </Title>
              <Stack gap="md">
                {platformData.map((platform, index) => (
                  <Paper key={platform.name} p="md" withBorder>
                    <Group justify="space-between" mb="sm">
                      <Group gap="sm">
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 2,
                            backgroundColor: platform.color,
                          }}
                        />
                        <Text fw={500}>{platform.name}</Text>
                      </Group>
                      <Badge variant="light" size="sm">
                        {platform.posts} posts
                      </Badge>
                    </Group>
                    <SimpleGrid cols={3} spacing="xs">
                      <div>
                        <Text size="xs" c="dimmed">
                          Engagement
                        </Text>
                        <Text size="sm" fw={500}>
                          {platform.engagement}%
                        </Text>
                      </div>
                      <div>
                        <Text size="xs" c="dimmed">
                          Reach
                        </Text>
                        <Text size="sm" fw={500}>
                          {platform.reach.toLocaleString()}
                        </Text>
                      </div>
                      <div>
                        <Text size="xs" c="dimmed">
                          Followers
                        </Text>
                        <Text size="sm" fw={500}>
                          {platform.followers.toLocaleString()}
                        </Text>
                      </div>
                    </SimpleGrid>
                    <Progress
                      value={platform.engagement * 20}
                      size="xs"
                      mt="sm"
                      color={platform.name.toLowerCase()}
                    />
                  </Paper>
                ))}
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">
                Top Performing Posts
              </Title>
              <Stack gap="md">
                {topPosts.map((post, index) => (
                  <Paper key={post.id} p="md" withBorder>
                    <Group justify="space-between" mb="sm">
                      <Group gap="sm">
                        <Badge
                          size="sm"
                          variant="light"
                          leftSection={
                            <ThemeIcon size="xs" variant="transparent">
                              <post.icon size={12} />
                            </ThemeIcon>
                          }
                        >
                          #{index + 1}
                        </Badge>
                        <Text size="sm" fw={500}>
                          {post.platform}
                        </Text>
                      </Group>
                      <Badge color="green" variant="light" size="sm">
                        {post.engagement}% engagement
                      </Badge>
                    </Group>
                    <Text size="sm" lineClamp={2} mb="sm">
                      {post.content}
                    </Text>
                    <SimpleGrid cols={4} spacing="xs">
                      <div>
                        <Text size="xs" c="dimmed">
                          Reach
                        </Text>
                        <Text size="xs" fw={500}>
                          {post.reach.toLocaleString()}
                        </Text>
                      </div>
                      <div>
                        <Text size="xs" c="dimmed">
                          Likes
                        </Text>
                        <Text size="xs" fw={500}>
                          {post.likes}
                        </Text>
                      </div>
                      <div>
                        <Text size="xs" c="dimmed">
                          Comments
                        </Text>
                        <Text size="xs" fw={500}>
                          {post.comments}
                        </Text>
                      </div>
                      <div>
                        <Text size="xs" c="dimmed">
                          Shares
                        </Text>
                        <Text size="xs" fw={500}>
                          {post.shares}
                        </Text>
                      </div>
                    </SimpleGrid>
                  </Paper>
                ))}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}