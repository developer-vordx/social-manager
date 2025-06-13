import React, { useState } from 'react';
import {
  Container,
  Stack,
  Title,
  Text,
  Group,
  Button,
  Card,
  Badge,
  ActionIcon,
  Menu,
  TextInput,
  Select,
  Grid,
  Paper,
  ThemeIcon,
  Avatar,
  Tabs,
  SimpleGrid,
  Image,
  Pagination,
  Modal,
  Textarea,
} from '@mantine/core';
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconDots,
  IconEdit,
  IconTrash,
  IconEye,
  IconShare,
  IconHeart,
  IconMessageCircle,
  IconRepeat,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconCalendar,
  IconTrendingUp,
  IconPhoto,
  IconVideo,
  IconFileText,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

interface Post {
  id: string;
  platform: 'instagram' | 'twitter' | 'linkedin' | 'facebook';
  content: string;
  mediaType: 'image' | 'video' | 'text' | 'carousel';
  mediaUrl?: string;
  status: 'published' | 'scheduled' | 'draft' | 'failed';
  publishedAt?: Date;
  scheduledFor?: Date;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
  };
  hashtags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const mockPosts: Post[] = [
  {
    id: '1',
    platform: 'instagram',
    content: 'Excited to share our latest product launch! 🚀 This innovative solution will transform how you manage your social media presence. What do you think? #ProductLaunch #Innovation #SocialMedia',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'published',
    publishedAt: new Date('2024-12-10T10:00:00'),
    engagement: { likes: 245, comments: 18, shares: 12, reach: 3200 },
    hashtags: ['#ProductLaunch', '#Innovation', '#SocialMedia'],
    createdAt: new Date('2024-12-09T15:30:00'),
    updatedAt: new Date('2024-12-10T10:00:00'),
  },
  {
    id: '2',
    platform: 'twitter',
    content: 'Just published a comprehensive guide on social media marketing trends for 2024. Check it out and let me know your thoughts! 📈',
    mediaType: 'text',
    status: 'published',
    publishedAt: new Date('2024-12-09T14:30:00'),
    engagement: { likes: 89, comments: 12, shares: 24, reach: 1800 },
    hashtags: ['#SocialMediaMarketing', '#Trends2024', '#DigitalMarketing'],
    createdAt: new Date('2024-12-09T12:00:00'),
    updatedAt: new Date('2024-12-09T14:30:00'),
  },
  {
    id: '3',
    platform: 'linkedin',
    content: 'The future of work is here, and it\'s more flexible than ever. Here are 5 key trends shaping the modern workplace that every leader should know about.',
    mediaType: 'carousel',
    status: 'published',
    publishedAt: new Date('2024-12-08T09:00:00'),
    engagement: { likes: 156, comments: 28, shares: 45, reach: 4500 },
    hashtags: ['#FutureOfWork', '#Leadership', '#WorkplaceTrends'],
    createdAt: new Date('2024-12-07T16:00:00'),
    updatedAt: new Date('2024-12-08T09:00:00'),
  },
  {
    id: '4',
    platform: 'facebook',
    content: 'Behind the scenes of our latest campaign shoot! Our team worked incredibly hard to bring this vision to life. Swipe to see the magic happen ✨',
    mediaType: 'video',
    mediaUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'scheduled',
    scheduledFor: new Date('2024-12-15T16:00:00'),
    engagement: { likes: 0, comments: 0, shares: 0, reach: 0 },
    hashtags: ['#BehindTheScenes', '#TeamWork', '#Creative'],
    createdAt: new Date('2024-12-10T11:00:00'),
    updatedAt: new Date('2024-12-10T11:00:00'),
  },
  {
    id: '5',
    platform: 'instagram',
    content: 'Monday motivation: Success is not final, failure is not fatal: it is the courage to continue that counts. 💪 #MondayMotivation #Success #Inspiration',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'draft',
    engagement: { likes: 0, comments: 0, shares: 0, reach: 0 },
    hashtags: ['#MondayMotivation', '#Success', '#Inspiration'],
    createdAt: new Date('2024-12-10T08:00:00'),
    updatedAt: new Date('2024-12-10T08:00:00'),
  },
];

const platformConfig = {
  instagram: { icon: IconBrandInstagram, color: 'pink', label: 'Instagram' },
  twitter: { icon: IconBrandTwitter, color: 'blue', label: 'Twitter' },
  linkedin: { icon: IconBrandLinkedin, color: 'blue', label: 'LinkedIn' },
  facebook: { icon: IconBrandFacebook, color: 'blue', label: 'Facebook' },
};

const statusConfig = {
  published: { color: 'green', label: 'Published' },
  scheduled: { color: 'yellow', label: 'Scheduled' },
  draft: { color: 'gray', label: 'Draft' },
  failed: { color: 'red', label: 'Failed' },
};

const mediaTypeConfig = {
  image: { icon: IconPhoto, color: 'blue' },
  video: { icon: IconVideo, color: 'red' },
  text: { icon: IconFileText, color: 'gray' },
  carousel: { icon: IconPhoto, color: 'violet' },
};

export function Posts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activePage, setActivePage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPlatform = selectedPlatform === 'all' || post.platform === selectedPlatform;
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (activePage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const getEngagementRate = (post: Post) => {
    if (post.engagement.reach === 0) return 0;
    const totalEngagement = post.engagement.likes + post.engagement.comments + post.engagement.shares;
    return ((totalEngagement / post.engagement.reach) * 100).toFixed(1);
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    open();
  };

  const platformStats = Object.keys(platformConfig).map(platform => {
    const posts = mockPosts.filter(p => p.platform === platform);
    const publishedPosts = posts.filter(p => p.status === 'published');
    const totalEngagement = publishedPosts.reduce((sum, post) => 
      sum + post.engagement.likes + post.engagement.comments + post.engagement.shares, 0
    );
    
    return {
      platform,
      totalPosts: posts.length,
      publishedPosts: publishedPosts.length,
      totalEngagement,
      avgEngagement: publishedPosts.length > 0 ? Math.round(totalEngagement / publishedPosts.length) : 0,
    };
  });

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={1}>Posts</Title>
            <Text c="dimmed" mt={4}>
              Manage all your social media posts across platforms
            </Text>
          </div>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/create')}
          >
            Create Post
          </Button>
        </Group>

        {/* Platform Statistics */}
        <SimpleGrid cols={{ base: 2, md: 4 }}>
          {platformStats.map(stat => {
            const config = platformConfig[stat.platform as keyof typeof platformConfig];
            return (
              <Card key={stat.platform} shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <ThemeIcon size="lg" variant="light" color={config.color}>
                    <config.icon size={20} />
                  </ThemeIcon>
                  <Badge variant="light" size="sm">
                    {stat.publishedPosts} published
                  </Badge>
                </Group>
                <Text size="xl" fw={700}>
                  {stat.totalPosts}
                </Text>
                <Text c="dimmed" size="sm">
                  {config.label} Posts
                </Text>
                <Text size="xs" c="dimmed" mt={4}>
                  Avg. {stat.avgEngagement} engagements
                </Text>
              </Card>
            );
          })}
        </SimpleGrid>

        {/* Filters */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <Group>
              <TextInput
                placeholder="Search posts..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                w={300}
              />
              <Select
                placeholder="All platforms"
                data={[
                  { value: 'all', label: 'All Platforms' },
                  { value: 'instagram', label: 'Instagram' },
                  { value: 'twitter', label: 'Twitter' },
                  { value: 'linkedin', label: 'LinkedIn' },
                  { value: 'facebook', label: 'Facebook' },
                ]}
                value={selectedPlatform}
                onChange={setSelectedPlatform}
                w={150}
              />
              <Select
                placeholder="All statuses"
                data={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'published', label: 'Published' },
                  { value: 'scheduled', label: 'Scheduled' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'failed', label: 'Failed' },
                ]}
                value={selectedStatus}
                onChange={setSelectedStatus}
                w={150}
              />
            </Group>
            <Text size="sm" c="dimmed">
              {filteredPosts.length} posts found
            </Text>
          </Group>
        </Card>

        {/* Posts Grid */}
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
          {paginatedPosts.map((post) => {
            const platformConf = platformConfig[post.platform];
            const statusConf = statusConfig[post.status];
            const mediaConf = mediaTypeConfig[post.mediaType];
            
            return (
              <Card
                key={post.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ cursor: 'pointer' }}
                onClick={() => handlePostClick(post)}
              >
                <Stack gap="sm">
                  <Group justify="space-between">
                    <Group gap="xs">
                      <ThemeIcon size="sm" variant="light" color={platformConf.color}>
                        <platformConf.icon size={14} />
                      </ThemeIcon>
                      <Text size="sm" fw={500}>
                        {platformConf.label}
                      </Text>
                      <ThemeIcon size="xs" variant="light" color={mediaConf.color}>
                        <mediaConf.icon size={10} />
                      </ThemeIcon>
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
                        <Menu.Item leftSection={<IconEye size={14} />}>
                          View Details
                        </Menu.Item>
                        <Menu.Item leftSection={<IconEdit size={14} />}>
                          Edit Post
                        </Menu.Item>
                        <Menu.Item leftSection={<IconRepeat size={14} />}>
                          Duplicate
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>

                  {post.mediaUrl && (
                    <Image
                      src={post.mediaUrl}
                      alt="Post media"
                      radius="sm"
                      h={120}
                      fit="cover"
                    />
                  )}

                  <Text size="sm" lineClamp={3}>
                    {post.content}
                  </Text>

                  <Group gap="xs">
                    {post.hashtags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} size="xs" variant="light">
                        {tag}
                      </Badge>
                    ))}
                    {post.hashtags.length > 3 && (
                      <Badge size="xs" variant="light" color="gray">
                        +{post.hashtags.length - 3}
                      </Badge>
                    )}
                  </Group>

                  <Group justify="space-between">
                    <Badge color={statusConf.color} variant="light" size="sm">
                      {statusConf.label}
                    </Badge>
                    <Text size="xs" c="dimmed">
                      {post.status === 'published' && post.publishedAt
                        ? post.publishedAt.toLocaleDateString()
                        : post.status === 'scheduled' && post.scheduledFor
                        ? `Scheduled: ${post.scheduledFor.toLocaleDateString()}`
                        : `Created: ${post.createdAt.toLocaleDateString()}`}
                    </Text>
                  </Group>

                  {post.status === 'published' && (
                    <Group justify="space-between" pt="xs">
                      <Group gap="lg">
                        <Group gap="xs">
                          <IconHeart size={14} color="red" />
                          <Text size="xs">{post.engagement.likes}</Text>
                        </Group>
                        <Group gap="xs">
                          <IconMessageCircle size={14} color="blue" />
                          <Text size="xs">{post.engagement.comments}</Text>
                        </Group>
                        <Group gap="xs">
                          <IconShare size={14} color="green" />
                          <Text size="xs">{post.engagement.shares}</Text>
                        </Group>
                      </Group>
                      <Badge size="xs" color="green" variant="light">
                        {getEngagementRate(post)}% engagement
                      </Badge>
                    </Group>
                  )}
                </Stack>
              </Card>
            );
          })}
        </SimpleGrid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Group justify="center">
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={totalPages}
              size="sm"
            />
          </Group>
        )}

        {/* Post Detail Modal */}
        <Modal
          opened={opened}
          onClose={close}
          title={selectedPost ? `${platformConfig[selectedPost.platform].label} Post` : ''}
          size="lg"
        >
          {selectedPost && (
            <Stack gap="md">
              <Group justify="space-between">
                <Group gap="xs">
                  <ThemeIcon
                    size="md"
                    variant="light"
                    color={platformConfig[selectedPost.platform].color}
                  >
                    {React.createElement(platformConfig[selectedPost.platform].icon, { size: 18 })}
                  </ThemeIcon>
                  <div>
                    <Text fw={500}>{platformConfig[selectedPost.platform].label}</Text>
                    <Text size="xs" c="dimmed">
                      {selectedPost.status === 'published' && selectedPost.publishedAt
                        ? `Published: ${selectedPost.publishedAt.toLocaleString()}`
                        : selectedPost.status === 'scheduled' && selectedPost.scheduledFor
                        ? `Scheduled: ${selectedPost.scheduledFor.toLocaleString()}`
                        : `Created: ${selectedPost.createdAt.toLocaleString()}`}
                    </Text>
                  </div>
                </Group>
                <Badge
                  color={statusConfig[selectedPost.status].color}
                  variant="light"
                >
                  {statusConfig[selectedPost.status].label}
                </Badge>
              </Group>

              {selectedPost.mediaUrl && (
                <Image
                  src={selectedPost.mediaUrl}
                  alt="Post media"
                  radius="md"
                  mah={300}
                  fit="contain"
                />
              )}

              <Textarea
                label="Content"
                value={selectedPost.content}
                readOnly
                autosize
                minRows={3}
              />

              <div>
                <Text size="sm" fw={500} mb="xs">Hashtags</Text>
                <Group gap="xs">
                  {selectedPost.hashtags.map((tag, index) => (
                    <Badge key={index} variant="light">
                      {tag}
                    </Badge>
                  ))}
                </Group>
              </div>

              {selectedPost.status === 'published' && (
                <Paper p="md" withBorder>
                  <Text size="sm" fw={500} mb="sm">Engagement Metrics</Text>
                  <SimpleGrid cols={4}>
                    <div style={{ textAlign: 'center' }}>
                      <Text size="lg" fw={700} c="red">
                        {selectedPost.engagement.likes}
                      </Text>
                      <Text size="xs" c="dimmed">Likes</Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Text size="lg" fw={700} c="blue">
                        {selectedPost.engagement.comments}
                      </Text>
                      <Text size="xs" c="dimmed">Comments</Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Text size="lg" fw={700} c="green">
                        {selectedPost.engagement.shares}
                      </Text>
                      <Text size="xs" c="dimmed">Shares</Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Text size="lg" fw={700} c="violet">
                        {selectedPost.engagement.reach}
                      </Text>
                      <Text size="xs" c="dimmed">Reach</Text>
                    </div>
                  </SimpleGrid>
                  <Text size="sm" ta="center" mt="sm" c="dimmed">
                    Engagement Rate: {getEngagementRate(selectedPost)}%
                  </Text>
                </Paper>
              )}

              <Group justify="flex-end">
                <Button variant="light" onClick={close}>
                  Close
                </Button>
                <Button onClick={() => navigate('/create')}>
                  Edit Post
                </Button>
              </Group>
            </Stack>
          )}
        </Modal>
      </Stack>
    </Container>
  );
}