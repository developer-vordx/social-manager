import React, { useState } from 'react';
import {
  Grid,
  Card,
  Text,
  Title,
  Button,
  Stack,
  Group,
  Textarea,
  Select,
  Badge,
  ActionIcon,
  ThemeIcon,
  Paper,
  Tabs,
  FileInput,
  Image,
  Container,
  Modal,
  DateTimePicker,
  Switch,
  NumberInput,
  Divider,
  Alert,
  Progress,
  Table,
  Checkbox,
  Anchor,
  List,
  SimpleGrid,
  Center,
  Loader,
} from '@mantine/core';
import {
  IconSparkles,
  IconRefresh,
  IconCopy,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconUpload,
  IconPalette,
  IconHash,
  IconCalendar,
  IconClock,
  IconRobot,
  IconFileSpreadsheet,
  IconDownload,
  IconTrash,
  IconEdit,
  IconEye,
  IconTrendingUp,
  IconUsers,
  IconTarget,
  IconBulb,
  IconFileText,
  IconPhoto,
  IconVideo,
  IconMusic,
  IconGif,
  IconSticker,
  IconFilter,
  IconAdjustments,
  IconColorPicker,
  IconTypography,
  IconLayout,
  IconTemplate,
  IconBrush,
  IconCrop,
  IconRotate,
  IconFlip,
  IconShadow,
  IconBorderRadius,
  IconGradient,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DateTimePicker as MantineDateTimePicker } from '@mantine/dates';

const platforms = [
  { value: 'instagram', label: 'Instagram', icon: IconBrandInstagram, color: 'pink' },
  { value: 'twitter', label: 'Twitter', icon: IconBrandTwitter, color: 'blue' },
  { value: 'linkedin', label: 'LinkedIn', icon: IconBrandLinkedin, color: 'blue' },
  { value: 'facebook', label: 'Facebook', icon: IconBrandFacebook, color: 'blue' },
];

const suggestedHashtags = [
  '#SocialMedia', '#Marketing', '#ContentCreator', '#DigitalMarketing',
  '#Engagement', '#Growth', '#Strategy', '#Branding', '#Social', '#Online',
  '#Business', '#Entrepreneur', '#Success', '#Innovation', '#Creative',
];

const aiGeneratedCaptions = [
  "Ready to take your social media game to the next level? 🚀 Our latest tips will help you create content that truly engages your audience! #SocialMediaTips #ContentCreation",
  "Transform your social presence with these proven strategies! ✨ From content planning to audience engagement, we've got you covered. #MarketingTips #Growth",
  "Creating content that converts starts with understanding your audience. Here's how to craft posts that drive real results! 💡 #DigitalMarketing #Success",
  "Consistency is key in social media! Here's how to maintain a regular posting schedule that keeps your audience engaged. 📅 #ContentStrategy #SocialMedia",
  "Behind every great brand is a story worth telling. What's yours? Share your journey and connect with your audience on a deeper level. 🌟 #Storytelling #Brand",
];

const optimalPostingTimes = {
  instagram: { weekday: '11:00 AM - 1:00 PM', weekend: '10:00 AM - 12:00 PM' },
  twitter: { weekday: '9:00 AM - 10:00 AM', weekend: '12:00 PM - 1:00 PM' },
  linkedin: { weekday: '8:00 AM - 10:00 AM', weekend: 'Not recommended' },
  facebook: { weekday: '1:00 PM - 3:00 PM', weekend: '12:00 PM - 2:00 PM' },
};

const csvTemplate = `platform,content,scheduled_time,hashtags,media_url
instagram,"Check out our latest product launch! 🚀","2024-12-15 10:00:00","#ProductLaunch,#Innovation,#SocialMedia","https://example.com/image1.jpg"
twitter,"Excited to share our company updates...","2024-12-15 14:00:00","#CompanyNews,#Updates","https://example.com/image2.jpg"
linkedin,"Industry insights: The future of digital marketing","2024-12-16 09:00:00","#DigitalMarketing,#Industry,#Insights","https://example.com/image3.jpg"
facebook,"Join us for our upcoming webinar","2024-12-16 16:00:00","#Webinar,#Education,#Marketing","https://example.com/image4.jpg"`;

const designTemplates = [
  { id: 1, name: 'Modern Minimal', category: 'Business', preview: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 2, name: 'Vibrant Gradient', category: 'Creative', preview: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 3, name: 'Professional Quote', category: 'Quote', preview: 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 4, name: 'Product Showcase', category: 'Product', preview: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 5, name: 'Event Announcement', category: 'Event', preview: 'https://images.pexels.com/photos/1591063/pexels-photo-1591063.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 6, name: 'Social Media Story', category: 'Story', preview: 'https://images.pexels.com/photos/1591064/pexels-photo-1591064.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

const scheduledPosts = [
  {
    id: 1,
    platform: 'instagram',
    content: 'Check out our latest product launch! 🚀',
    scheduledTime: new Date('2024-12-15T10:00:00'),
    status: 'scheduled',
    hashtags: ['#ProductLaunch', '#Innovation'],
  },
  {
    id: 2,
    platform: 'twitter',
    content: 'Excited to share our company updates...',
    scheduledTime: new Date('2024-12-15T14:00:00'),
    status: 'scheduled',
    hashtags: ['#CompanyNews', '#Updates'],
  },
];

export function ContentCreator() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram']);
  const [caption, setCaption] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<string>('compose');
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPosts, setCsvPosts] = useState<any[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [designModalOpened, { open: openDesignModal, close: closeDesignModal }] = useDisclosure(false);
  const [scheduleModalOpened, { open: openScheduleModal, close: closeScheduleModal }] = useDisclosure(false);
  const [csvModalOpened, { open: openCsvModal, close: closeCsvModal }] = useDisclosure(false);

  const handleGenerateCaption = async () => {
    setAiLoading(true);
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    const randomCaption = aiGeneratedCaptions[Math.floor(Math.random() * aiGeneratedCaptions.length)];
    setCaption(randomCaption);
    setAiLoading(false);
  };

  const handleHashtagClick = (hashtag: string) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(selectedHashtags.filter(h => h !== hashtag));
    } else {
      setSelectedHashtags([...selectedHashtags, hashtag]);
    }
  };

  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleCsvUpload = (file: File | null) => {
    if (!file) return;
    setCsvFile(file);
    
    // Parse CSV file (simplified for demo)
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',');
      const posts = lines.slice(1).filter(line => line.trim()).map((line, index) => {
        const values = line.split(',');
        return {
          id: index + 1,
          platform: values[0]?.replace(/"/g, ''),
          content: values[1]?.replace(/"/g, ''),
          scheduledTime: new Date(values[2]?.replace(/"/g, '')),
          hashtags: values[3]?.replace(/"/g, '').split(','),
          mediaUrl: values[4]?.replace(/"/g, ''),
          status: 'pending',
        };
      });
      setCsvPosts(posts);
    };
    reader.readAsText(file);
  };

  const downloadCsvTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'social_media_posts_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getOptimalTime = (platform: string) => {
    const times = optimalPostingTimes[platform as keyof typeof optimalPostingTimes];
    return times ? times.weekday : 'Not available';
  };

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={1}>Create Content</Title>
            <Text c="dimmed" mt={4}>
              Create engaging content with AI assistance, schedule posts, and manage your content pipeline
            </Text>
          </div>
          <Group>
            <Button variant="light" leftSection={<IconFileSpreadsheet size={16} />} onClick={openCsvModal}>
              Bulk Upload
            </Button>
            <Button leftSection={<IconCalendar size={16} />} onClick={openScheduleModal}>
              Schedule Manager
            </Button>
          </Group>
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="compose" leftSection={<IconSparkles size={14} />}>
              Compose
            </Tabs.Tab>
            <Tabs.Tab value="design" leftSection={<IconPalette size={14} />}>
              Visual Editor
            </Tabs.Tab>
            <Tabs.Tab value="schedule" leftSection={<IconClock size={14} />}>
              Advanced Scheduling
            </Tabs.Tab>
            <Tabs.Tab value="ai-assistant" leftSection={<IconRobot size={14} />}>
              AI Assistant
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="compose" pt="xl">
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Card shadow="sm" padding="xl" radius="md" withBorder>
                  <Stack gap="lg">
                    <div>
                      <Text fw={500} mb="sm">Select Platforms:</Text>
                      <Group gap="xs">
                        {platforms.map((platform) => (
                          <ActionIcon
                            key={platform.value}
                            variant={selectedPlatforms.includes(platform.value) ? 'filled' : 'light'}
                            color={platform.color}
                            size="lg"
                            onClick={() => handlePlatformToggle(platform.value)}
                          >
                            <platform.icon size={18} />
                          </ActionIcon>
                        ))}
                      </Group>
                    </div>

                    <div>
                      <Group justify="space-between" mb="sm">
                        <Text fw={500}>Caption</Text>
                        <Group gap="xs">
                          <Button
                            variant="light"
                            size="xs"
                            leftSection={<IconSparkles size={14} />}
                            onClick={handleGenerateCaption}
                            loading={aiLoading}
                          >
                            AI Generate
                          </Button>
                          <Button
                            variant="light"
                            size="xs"
                            leftSection={<IconRefresh size={14} />}
                            onClick={() => setCaption('')}
                          >
                            Clear
                          </Button>
                        </Group>
                      </Group>
                      <Textarea
                        placeholder="Write your caption here..."
                        minRows={6}
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                      />
                      <Group justify="space-between" mt="xs">
                        <Text size="xs" c="dimmed">
                          {caption.length}/2200 characters
                        </Text>
                        <Progress value={(caption.length / 2200) * 100} size="xs" w={100} />
                      </Group>
                    </div>

                    <div>
                      <Group justify="space-between" mb="sm">
                        <Text fw={500}>Hashtags</Text>
                        <Text size="xs" c="dimmed">
                          {selectedHashtags.length}/30 selected
                        </Text>
                      </Group>
                      <Group gap="xs" mb="sm">
                        {suggestedHashtags.map((hashtag) => (
                          <Badge
                            key={hashtag}
                            variant={selectedHashtags.includes(hashtag) ? 'filled' : 'light'}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleHashtagClick(hashtag)}
                          >
                            {hashtag}
                          </Badge>
                        ))}
                      </Group>
                      <Button variant="subtle" size="xs" leftSection={<IconSparkles size={12} />}>
                        Generate AI Hashtags
                      </Button>
                    </div>

                    <Divider />

                    <div>
                      <Group justify="space-between" mb="sm">
                        <Text fw={500}>Scheduling Options</Text>
                        <Switch
                          label="Schedule for later"
                          checked={isScheduled}
                          onChange={(e) => setIsScheduled(e.currentTarget.checked)}
                        />
                      </Group>
                      
                      {isScheduled && (
                        <Stack gap="md">
                          <MantineDateTimePicker
                            label="Schedule Date & Time"
                            placeholder="Select date and time"
                            value={scheduledTime}
                            onChange={setScheduledTime}
                            minDate={new Date()}
                          />
                          <Switch
                            label="Auto-optimize posting times"
                            description="Automatically adjust times for optimal engagement"
                            checked={autoOptimize}
                            onChange={(e) => setAutoOptimize(e.currentTarget.checked)}
                          />
                          {autoOptimize && (
                            <Alert color="blue" variant="light">
                              <Text size="sm">
                                <strong>Optimal times for selected platforms:</strong>
                                <br />
                                {selectedPlatforms.map(platform => (
                                  <span key={platform}>
                                    {platforms.find(p => p.value === platform)?.label}: {getOptimalTime(platform)}
                                    <br />
                                  </span>
                                ))}
                              </Text>
                            </Alert>
                          )}
                        </Stack>
                      )}
                    </div>

                    <Group justify="flex-end">
                      <Button variant="light">
                        Save as Draft
                      </Button>
                      <Button>
                        {isScheduled ? 'Schedule Post' : 'Publish Now'}
                      </Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Media Upload
                    </Title>
                    <FileInput
                      placeholder="Upload image or video"
                      leftSection={<IconUpload size={14} />}
                      accept="image/*,video/*"
                      value={uploadedImage}
                      onChange={setUploadedImage}
                    />
                    {uploadedImage && (
                      <Paper mt="md" p="md" withBorder>
                        <Text size="sm" fw={500} mb="xs">
                          Preview:
                        </Text>
                        <Image
                          src={URL.createObjectURL(uploadedImage)}
                          alt="Preview"
                          radius="sm"
                          h={120}
                          fit="cover"
                        />
                      </Paper>
                    )}
                    <Button variant="light" fullWidth mt="md" onClick={openDesignModal}>
                      Open Visual Editor
                    </Button>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      AI Content Suggestions
                    </Title>
                    <Stack gap="sm">
                      {aiGeneratedCaptions.slice(0, 2).map((suggestion, index) => (
                        <Paper key={index} p="sm" withBorder>
                          <Text size="sm" lineClamp={3}>
                            {suggestion}
                          </Text>
                          <Group justify="flex-end" mt="xs">
                            <ActionIcon
                              size="sm"
                              variant="light"
                              onClick={() => setCaption(suggestion)}
                            >
                              <IconCopy size={12} />
                            </ActionIcon>
                          </Group>
                        </Paper>
                      ))}
                      <Button variant="light" size="xs" fullWidth>
                        Generate More Suggestions
                      </Button>
                    </Stack>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group justify="space-between" mb="md">
                      <Title order={4}>Preview</Title>
                      {selectedPlatforms.length > 0 && (
                        <Group gap="xs">
                          {selectedPlatforms.map(platform => {
                            const platformData = platforms.find(p => p.value === platform);
                            return platformData ? (
                              <ThemeIcon key={platform} size="sm" variant="light" color={platformData.color}>
                                <platformData.icon size={14} />
                              </ThemeIcon>
                            ) : null;
                          })}
                        </Group>
                      )}
                    </Group>
                    <Paper p="md" withBorder>
                      <Stack gap="xs">
                        <Group gap="xs">
                          <Text size="sm" fw={500}>
                            Your Brand
                          </Text>
                          <Badge size="xs" variant="light">
                            {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}
                          </Badge>
                        </Group>
                        <Text size="sm">
                          {caption || 'Your caption will appear here...'}
                        </Text>
                        {selectedHashtags.length > 0 && (
                          <Text size="xs" c="blue">
                            {selectedHashtags.join(' ')}
                          </Text>
                        )}
                        {isScheduled && scheduledTime && (
                          <Text size="xs" c="dimmed">
                            Scheduled for: {scheduledTime.toLocaleString()}
                          </Text>
                        )}
                      </Stack>
                    </Paper>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="design" pt="xl">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Stack gap="xl">
                <Group justify="space-between">
                  <div>
                    <Title order={3} mb="sm">
                      Visual Content Editor
                    </Title>
                    <Text c="dimmed">
                      Create stunning visuals with our drag-and-drop editor, templates, and AI-powered design suggestions.
                    </Text>
                  </div>
                  <Badge size="lg" color="blue" variant="light">
                    Now Available!
                  </Badge>
                </Group>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                  <div>
                    <Title order={4} mb="md">Design Tools</Title>
                    <SimpleGrid cols={2} spacing="md">
                      <Paper p="md" withBorder style={{ textAlign: 'center' }}>
                        <ThemeIcon size="xl" variant="light" color="blue" mx="auto" mb="sm">
                          <IconTemplate size={24} />
                        </ThemeIcon>
                        <Text size="sm" fw={500}>Templates</Text>
                        <Text size="xs" c="dimmed">Pre-designed layouts</Text>
                      </Paper>
                      <Paper p="md" withBorder style={{ textAlign: 'center' }}>
                        <ThemeIcon size="xl" variant="light" color="green" mx="auto" mb="sm">
                          <IconTypography size={24} />
                        </ThemeIcon>
                        <Text size="sm" fw={500}>Typography</Text>
                        <Text size="xs" c="dimmed">Custom fonts & styles</Text>
                      </Paper>
                      <Paper p="md" withBorder style={{ textAlign: 'center' }}>
                        <ThemeIcon size="xl" variant="light" color="orange" mx="auto" mb="sm">
                          <IconColorPicker size={24} />
                        </ThemeIcon>
                        <Text size="sm" fw={500}>Colors</Text>
                        <Text size="xs" c="dimmed">Brand color palettes</Text>
                      </Paper>
                      <Paper p="md" withBorder style={{ textAlign: 'center' }}>
                        <ThemeIcon size="xl" variant="light" color="violet" mx="auto" mb="sm">
                          <IconFilter size={24} />
                        </ThemeIcon>
                        <Text size="sm" fw={500}>Effects</Text>
                        <Text size="xs" c="dimmed">Filters & animations</Text>
                      </Paper>
                    </SimpleGrid>
                  </div>

                  <div>
                    <Title order={4} mb="md">Quick Templates</Title>
                    <SimpleGrid cols={2} spacing="sm">
                      {designTemplates.slice(0, 4).map((template) => (
                        <Paper
                          key={template.id}
                          p="xs"
                          withBorder
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <Image
                            src={template.preview}
                            alt={template.name}
                            radius="sm"
                            h={80}
                            fit="cover"
                          />
                          <Text size="xs" fw={500} mt="xs">
                            {template.name}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {template.category}
                          </Text>
                        </Paper>
                      ))}
                    </SimpleGrid>
                  </div>
                </SimpleGrid>

                <Group justify="center">
                  <Button size="lg" leftSection={<IconBrush size={20} />}>
                    Launch Visual Editor
                  </Button>
                  <Button variant="light" size="lg">
                    Browse All Templates
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="schedule" pt="xl">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Stack gap="xl">
                <Group justify="space-between">
                  <div>
                    <Title order={3} mb="sm">
                      Advanced Scheduling
                    </Title>
                    <Text c="dimmed">
                      Schedule your posts across multiple platforms with optimal timing suggestions and automation features.
                    </Text>
                  </div>
                  <Badge size="lg" color="green" variant="light">
                    Fully Featured!
                  </Badge>
                </Group>

                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
                  <Paper p="lg" withBorder>
                    <ThemeIcon size="xl" variant="light" color="blue" mb="md">
                      <IconTrendingUp size={24} />
                    </ThemeIcon>
                    <Title order={5} mb="sm">Optimal Timing</Title>
                    <Text size="sm" c="dimmed" mb="md">
                      AI analyzes your audience engagement patterns to suggest the best posting times.
                    </Text>
                    <List spacing="xs" size="sm">
                      <List.Item>Audience activity analysis</List.Item>
                      <List.Item>Platform-specific optimization</List.Item>
                      <List.Item>Time zone adjustments</List.Item>
                    </List>
                  </Paper>

                  <Paper p="lg" withBorder>
                    <ThemeIcon size="xl" variant="light" color="green" mb="md">
                      <IconUsers size={24} />
                    </ThemeIcon>
                    <Title order={5} mb="sm">Audience Insights</Title>
                    <Text size="sm" c="dimmed" mb="md">
                      Understand when your audience is most active and engaged.
                    </Text>
                    <List spacing="xs" size="sm">
                      <List.Item>Peak activity hours</List.Item>
                      <List.Item>Engagement rate tracking</List.Item>
                      <List.Item>Demographic analysis</List.Item>
                    </List>
                  </Paper>

                  <Paper p="lg" withBorder>
                    <ThemeIcon size="xl" variant="light" color="orange" mb="md">
                      <IconTarget size={24} />
                    </ThemeIcon>
                    <Title order={5} mb="sm">Smart Automation</Title>
                    <Text size="sm" c="dimmed" mb="md">
                      Set up automated posting schedules and content recycling.
                    </Text>
                    <List spacing="xs" size="sm">
                      <List.Item>Recurring post schedules</List.Item>
                      <List.Item>Content queue management</List.Item>
                      <List.Item>Auto-reposting</List.Item>
                    </List>
                  </Paper>
                </SimpleGrid>

                <div>
                  <Title order={4} mb="md">Scheduled Posts Queue</Title>
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Platform</Table.Th>
                        <Table.Th>Content</Table.Th>
                        <Table.Th>Scheduled Time</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Actions</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {scheduledPosts.map((post) => {
                        const platformData = platforms.find(p => p.value === post.platform);
                        return (
                          <Table.Tr key={post.id}>
                            <Table.Td>
                              <Group gap="xs">
                                {platformData && (
                                  <ThemeIcon size="sm" variant="light" color={platformData.color}>
                                    <platformData.icon size={14} />
                                  </ThemeIcon>
                                )}
                                <Text size="sm">{platformData?.label}</Text>
                              </Group>
                            </Table.Td>
                            <Table.Td>
                              <Text size="sm" lineClamp={1}>
                                {post.content}
                              </Text>
                            </Table.Td>
                            <Table.Td>
                              <Text size="sm">
                                {post.scheduledTime.toLocaleString()}
                              </Text>
                            </Table.Td>
                            <Table.Td>
                              <Badge color="yellow" variant="light" size="sm">
                                {post.status}
                              </Badge>
                            </Table.Td>
                            <Table.Td>
                              <Group gap="xs">
                                <ActionIcon variant="subtle" size="sm">
                                  <IconEye size={14} />
                                </ActionIcon>
                                <ActionIcon variant="subtle" size="sm">
                                  <IconEdit size={14} />
                                </ActionIcon>
                                <ActionIcon variant="subtle" size="sm" color="red">
                                  <IconTrash size={14} />
                                </ActionIcon>
                              </Group>
                            </Table.Td>
                          </Table.Tr>
                        );
                      })}
                    </Table.Tbody>
                  </Table>
                </div>

                <Group justify="center">
                  <Button size="lg" leftSection={<IconCalendar size={20} />}>
                    Open Schedule Manager
                  </Button>
                  <Button variant="light" size="lg">
                    View Analytics
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="ai-assistant" pt="xl">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Stack gap="xl">
                <Group justify="space-between">
                  <div>
                    <Title order={3} mb="sm">
                      AI Content Assistant
                    </Title>
                    <Text c="dimmed">
                      Let AI help you create engaging content, optimize posting times, and improve your social media strategy.
                    </Text>
                  </div>
                  <ThemeIcon size="xl" variant="light" color="violet">
                    <IconRobot size={30} />
                  </ThemeIcon>
                </Group>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                  <Stack gap="md">
                    <Paper p="lg" withBorder>
                      <Group mb="md">
                        <ThemeIcon variant="light" color="blue">
                          <IconBulb size={20} />
                        </ThemeIcon>
                        <Title order={5}>Content Ideas</Title>
                      </Group>
                      <Text size="sm" c="dimmed" mb="md">
                        Get AI-generated content ideas based on your industry and audience.
                      </Text>
                      <Button variant="light" fullWidth>
                        Generate Ideas
                      </Button>
                    </Paper>

                    <Paper p="lg" withBorder>
                      <Group mb="md">
                        <ThemeIcon variant="light" color="green">
                          <IconSparkles size={20} />
                        </ThemeIcon>
                        <Title order={5}>Caption Enhancement</Title>
                      </Group>
                      <Text size="sm" c="dimmed" mb="md">
                        Improve your existing captions with AI suggestions for better engagement.
                      </Text>
                      <Button variant="light" fullWidth>
                        Enhance Caption
                      </Button>
                    </Paper>

                    <Paper p="lg" withBorder>
                      <Group mb="md">
                        <ThemeIcon variant="light" color="orange">
                          <IconHash size={20} />
                        </ThemeIcon>
                        <Title order={5}>Hashtag Research</Title>
                      </Group>
                      <Text size="sm" c="dimmed" mb="md">
                        Find trending and relevant hashtags for maximum reach.
                      </Text>
                      <Button variant="light" fullWidth>
                        Research Hashtags
                      </Button>
                    </Paper>
                  </Stack>

                  <Stack gap="md">
                    <Paper p="lg" withBorder>
                      <Title order={5} mb="md">Recent AI Suggestions</Title>
                      <Stack gap="sm">
                        {aiGeneratedCaptions.slice(0, 3).map((suggestion, index) => (
                          <Paper key={index} p="sm" withBorder>
                            <Text size="sm" lineClamp={2}>
                              {suggestion}
                            </Text>
                            <Group justify="flex-end" mt="xs">
                              <ActionIcon size="sm" variant="light">
                                <IconCopy size={12} />
                              </ActionIcon>
                            </Group>
                          </Paper>
                        ))}
                      </Stack>
                    </Paper>

                    <Paper p="lg" withBorder>
                      <Title order={5} mb="md">Performance Insights</Title>
                      <Text size="sm" c="dimmed" mb="md">
                        AI analysis of your content performance and recommendations.
                      </Text>
                      <List spacing="xs" size="sm">
                        <List.Item>Best performing content types</List.Item>
                        <List.Item>Optimal posting frequency</List.Item>
                        <List.Item>Audience engagement patterns</List.Item>
                      </List>
                      <Button variant="light" fullWidth mt="md">
                        View Full Report
                      </Button>
                    </Paper>
                  </Stack>
                </SimpleGrid>
              </Stack>
            </Card>
          </Tabs.Panel>
        </Tabs>

        {/* CSV Upload Modal */}
        <Modal opened={csvModalOpened} onClose={closeCsvModal} title="Bulk Upload Posts" size="lg">
          <Stack gap="md">
            <Alert color="blue" variant="light">
              <Text size="sm">
                Upload a CSV file to schedule multiple posts at once. Download our template to get started.
              </Text>
            </Alert>

            <Group justify="space-between">
              <Text fw={500}>CSV Template</Text>
              <Button
                variant="light"
                size="sm"
                leftSection={<IconDownload size={14} />}
                onClick={downloadCsvTemplate}
              >
                Download Template
              </Button>
            </Group>

            <FileInput
              label="Upload CSV File"
              placeholder="Select your CSV file"
              accept=".csv"
              leftSection={<IconFileSpreadsheet size={16} />}
              value={csvFile}
              onChange={handleCsvUpload}
            />

            {csvPosts.length > 0 && (
              <div>
                <Text fw={500} mb="sm">
                  Preview ({csvPosts.length} posts)
                </Text>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Platform</Table.Th>
                      <Table.Th>Content</Table.Th>
                      <Table.Th>Scheduled Time</Table.Th>
                      <Table.Th>Status</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {csvPosts.slice(0, 5).map((post) => (
                      <Table.Tr key={post.id}>
                        <Table.Td>
                          <Badge variant="light">
                            {post.platform}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" lineClamp={1}>
                            {post.content}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">
                            {post.scheduledTime.toLocaleString()}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge color="yellow" variant="light" size="sm">
                            {post.status}
                          </Badge>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
                {csvPosts.length > 5 && (
                  <Text size="sm" c="dimmed" ta="center" mt="sm">
                    ... and {csvPosts.length - 5} more posts
                  </Text>
                )}
              </div>
            )}

            <Group justify="flex-end">
              <Button variant="light" onClick={closeCsvModal}>
                Cancel
              </Button>
              <Button disabled={csvPosts.length === 0}>
                Schedule All Posts
              </Button>
            </Group>
          </Stack>
        </Modal>

        {/* Design Modal */}
        <Modal opened={designModalOpened} onClose={closeDesignModal} title="Visual Editor" size="xl">
          <Stack gap="md">
            <Text c="dimmed">
              Create stunning visuals with our drag-and-drop editor
            </Text>
            
            <SimpleGrid cols={{ base: 2, md: 3 }} spacing="md">
              {designTemplates.map((template) => (
                <Paper
                  key={template.id}
                  p="md"
                  withBorder
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <Image
                    src={template.preview}
                    alt={template.name}
                    radius="sm"
                    h={120}
                    fit="cover"
                  />
                  <Text size="sm" fw={500} mt="sm">
                    {template.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {template.category}
                  </Text>
                </Paper>
              ))}
            </SimpleGrid>

            <Group justify="center" mt="xl">
              <Button size="lg">
                Start Creating
              </Button>
            </Group>
          </Stack>
        </Modal>

        {/* Schedule Manager Modal */}
        <Modal opened={scheduleModalOpened} onClose={closeScheduleModal} title="Schedule Manager" size="xl">
          <Stack gap="md">
            <Group justify="space-between">
              <Text c="dimmed">
                Manage all your scheduled posts
              </Text>
              <Button size="sm" leftSection={<IconPlus size={14} />}>
                Add New Post
              </Button>
            </Group>

            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Platform</Table.Th>
                  <Table.Th>Content</Table.Th>
                  <Table.Th>Scheduled Time</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {scheduledPosts.map((post) => {
                  const platformData = platforms.find(p => p.value === post.platform);
                  return (
                    <Table.Tr key={post.id}>
                      <Table.Td>
                        <Group gap="xs">
                          {platformData && (
                            <ThemeIcon size="sm" variant="light" color={platformData.color}>
                              <platformData.icon size={14} />
                            </ThemeIcon>
                          )}
                          <Text size="sm">{platformData?.label}</Text>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" lineClamp={1}>
                          {post.content}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">
                          {post.scheduledTime.toLocaleString()}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color="yellow" variant="light" size="sm">
                          {post.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon variant="subtle" size="sm">
                            <IconEye size={14} />
                          </ActionIcon>
                          <ActionIcon variant="subtle" size="sm">
                            <IconEdit size={14} />
                          </ActionIcon>
                          <ActionIcon variant="subtle" size="sm" color="red">
                            <IconTrash size={14} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
}