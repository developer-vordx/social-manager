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
} from '@tabler/icons-react';

const platforms = [
  { value: 'instagram', label: 'Instagram', icon: IconBrandInstagram, color: 'pink' },
  { value: 'twitter', label: 'Twitter', icon: IconBrandTwitter, color: 'blue' },
  { value: 'linkedin', label: 'LinkedIn', icon: IconBrandLinkedin, color: 'blue' },
  { value: 'facebook', label: 'Facebook', icon: IconBrandFacebook, color: 'blue' },
];

const suggestedHashtags = [
  '#SocialMedia', '#Marketing', '#ContentCreator', '#DigitalMarketing',
  '#Engagement', '#Growth', '#Strategy', '#Branding', '#Social', '#Online',
];

const aiGeneratedCaptions = [
  "Ready to take your social media game to the next level? 🚀 Our latest tips will help you create content that truly engages your audience! #SocialMediaTips #ContentCreation",
  "Transform your social presence with these proven strategies! ✨ From content planning to audience engagement, we've got you covered. #MarketingTips #Growth",
  "Creating content that converts starts with understanding your audience. Here's how to craft posts that drive real results! 💡 #DigitalMarketing #Success"
];

export function ContentCreator() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');
  const [caption, setCaption] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<string>('compose');

  const handleGenerateCaption = () => {
    const randomCaption = aiGeneratedCaptions[Math.floor(Math.random() * aiGeneratedCaptions.length)];
    setCaption(randomCaption);
  };

  const handleHashtagClick = (hashtag: string) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(selectedHashtags.filter(h => h !== hashtag));
    } else {
      setSelectedHashtags([...selectedHashtags, hashtag]);
    }
  };

  const selectedPlatformData = platforms.find(p => p.value === selectedPlatform);

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={1}>Create Content</Title>
            <Text c="dimmed" mt={4}>
              Create engaging content for your social media platforms
            </Text>
          </div>
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="compose" leftSection={<IconSparkles size={14} />}>
              Compose
            </Tabs.Tab>
            <Tabs.Tab value="design" leftSection={<IconPalette size={14} />}>
              Design
            </Tabs.Tab>
            <Tabs.Tab value="schedule" leftSection={<IconBrandInstagram size={14} />}>
              Schedule
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="compose" pt="xl">
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Card shadow="sm" padding="xl" radius="md" withBorder>
                  <Stack gap="lg">
                    <Group>
                      <Text fw={500}>Platform:</Text>
                      <Group gap="xs">
                        {platforms.map((platform) => (
                          <ActionIcon
                            key={platform.value}
                            variant={selectedPlatform === platform.value ? 'filled' : 'light'}
                            color={platform.color}
                            onClick={() => setSelectedPlatform(platform.value)}
                          >
                            <platform.icon size={18} />
                          </ActionIcon>
                        ))}
                      </Group>
                    </Group>

                    <div>
                      <Group justify="space-between" mb="sm">
                        <Text fw={500}>Caption</Text>
                        <Button
                          variant="light"
                          size="xs"
                          leftSection={<IconSparkles size={14} />}
                          onClick={handleGenerateCaption}
                        >
                          AI Generate
                        </Button>
                      </Group>
                      <Textarea
                        placeholder="Write your caption here..."
                        minRows={6}
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                      />
                      <Text size="xs" c="dimmed" mt="xs">
                        {caption.length}/2200 characters
                      </Text>
                    </div>

                    <div>
                      <Group justify="space-between" mb="sm">
                        <Text fw={500}>Hashtags</Text>
                        <Text size="xs" c="dimmed">
                          {selectedHashtags.length}/30 selected
                        </Text>
                      </Group>
                      <Group gap="xs">
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
                    </div>

                    <Group justify="flex-end">
                      <Button variant="light">
                        Save as Draft
                      </Button>
                      <Button>
                        Schedule Post
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
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      AI Suggestions
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
                    </Stack>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group justify="space-between" mb="md">
                      <Title order={4}>Preview</Title>
                      {selectedPlatformData && (
                        <ThemeIcon size="sm" variant="light" color={selectedPlatformData.color}>
                          <selectedPlatformData.icon size={14} />
                        </ThemeIcon>
                      )}
                    </Group>
                    <Paper p="md" withBorder>
                      <Stack gap="xs">
                        <Group gap="xs">
                          <Text size="sm" fw={500}>
                            Your Brand
                          </Text>
                          <Badge size="xs" variant="light">
                            {selectedPlatformData?.label}
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
                      </Stack>
                    </Paper>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="design" pt="xl">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Stack align="center" gap="xl" py={60}>
                <ThemeIcon size={60} variant="light" color="blue">
                  <IconPalette size={30} />
                </ThemeIcon>
                <div style={{ textAlign: 'center' }}>
                  <Title order={3} mb="sm">
                    Visual Editor Coming Soon
                  </Title>
                  <Text c="dimmed">
                    Create stunning visuals with our drag-and-drop editor, templates, and AI-powered design suggestions.
                  </Text>
                </div>
                <Button variant="light">
                  Request Early Access
                </Button>
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="schedule" pt="xl">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Stack align="center" gap="xl" py={60}>
                <ThemeIcon size={60} variant="light" color="green">
                  <IconBrandInstagram size={30} />
                </ThemeIcon>
                <div style={{ textAlign: 'center' }}>
                  <Title order={3} mb="sm">
                    Advanced Scheduling
                  </Title>
                  <Text c="dimmed">
                    Schedule your posts across multiple platforms with optimal timing suggestions and automation features.
                  </Text>
                </div>
                <Button variant="light">
                  Learn More
                </Button>
              </Stack>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}