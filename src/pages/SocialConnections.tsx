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
  ThemeIcon,
  Progress,
  SimpleGrid,
  Box,
  List,
  Alert,
  Modal,
  Stepper,
  Center,
  Avatar,
  Divider,
} from '@mantine/core';
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBrandTiktok,
  IconBrandPinterest,
  IconBrandSnapchat,
  IconCheck,
  IconPlus,
  IconShield,
  IconUsers,
  IconTrendingUp,
  IconRefresh,
  IconExternalLink,
  IconAlertCircle,
  IconLock,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  connected: boolean;
  username?: string;
  followers?: number;
  lastSync?: Date;
  features: string[];
  description: string;
}

const socialPlatforms: SocialPlatform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: IconBrandInstagram,
    color: 'pink',
    connected: true,
    username: '@yourcompany',
    followers: 12500,
    lastSync: new Date('2024-12-10T10:30:00'),
    features: ['Posts & Stories', 'Reels', 'IGTV', 'Analytics', 'Auto-posting'],
    description: 'Share photos, videos, and stories with your audience',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: IconBrandFacebook,
    color: 'blue',
    connected: true,
    username: 'Your Company Page',
    followers: 8900,
    lastSync: new Date('2024-12-10T09:15:00'),
    features: ['Posts', 'Events', 'Page Analytics', 'Messenger', 'Auto-posting'],
    description: 'Connect with your community and share updates',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: IconBrandTwitter,
    color: 'blue',
    connected: false,
    features: ['Tweets', 'Threads', 'Analytics', 'Scheduling', 'Auto-posting'],
    description: 'Share quick updates and engage in conversations',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: IconBrandLinkedin,
    color: 'blue',
    connected: false,
    features: ['Posts', 'Articles', 'Company Updates', 'Analytics', 'Auto-posting'],
    description: 'Build professional relationships and share industry insights',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: IconBrandYoutube,
    color: 'red',
    connected: false,
    features: ['Video Upload', 'Thumbnails', 'Analytics', 'Community Posts'],
    description: 'Share video content and build a subscriber base',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: IconBrandTiktok,
    color: 'dark',
    connected: false,
    features: ['Video Posts', 'Analytics', 'Trending Hashtags', 'Auto-posting'],
    description: 'Create short-form video content for younger audiences',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: IconBrandPinterest,
    color: 'red',
    connected: false,
    features: ['Pins', 'Boards', 'Analytics', 'Rich Pins', 'Auto-posting'],
    description: 'Share visual content and drive traffic to your website',
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    icon: IconBrandSnapchat,
    color: 'yellow',
    connected: false,
    features: ['Snaps', 'Stories', 'Spotlight', 'Analytics'],
    description: 'Share ephemeral content with a younger demographic',
  },
];

export function SocialConnections() {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);
  const [connectionStep, setConnectionStep] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);

  const connectedPlatforms = socialPlatforms.filter(p => p.connected);
  const connectionProgress = (connectedPlatforms.length / socialPlatforms.length) * 100;

  const handleConnect = (platform: SocialPlatform) => {
    setSelectedPlatform(platform);
    setConnectionStep(0);
    open();
  };

  const handleDisconnect = (platformId: string) => {
    // Simulate disconnection
    console.log(`Disconnecting ${platformId}`);
  };

  const handleSync = (platformId: string) => {
    // Simulate sync
    console.log(`Syncing ${platformId}`);
  };

  const simulateConnection = () => {
    setConnectionStep(1);
    setTimeout(() => setConnectionStep(2), 2000);
    setTimeout(() => {
      setConnectionStep(3);
      // Update platform connection status
      if (selectedPlatform) {
        const platformIndex = socialPlatforms.findIndex(p => p.id === selectedPlatform.id);
        if (platformIndex !== -1) {
          socialPlatforms[platformIndex].connected = true;
          socialPlatforms[platformIndex].username = `@yourcompany_${selectedPlatform.id}`;
          socialPlatforms[platformIndex].followers = Math.floor(Math.random() * 10000) + 1000;
          socialPlatforms[platformIndex].lastSync = new Date();
        }
      }
    }, 4000);
  };

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={1}>Social Media Connections</Title>
            <Text c="dimmed" mt={4}>
              Connect your social media accounts to start managing all your content from one place
            </Text>
          </div>
        </Group>

        {/* Connection Progress */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <div>
              <Text fw={500} mb="xs">
                Connection Progress
              </Text>
              <Text size="sm" c="dimmed">
                {connectedPlatforms.length} of {socialPlatforms.length} platforms connected
              </Text>
            </div>
            <Badge size="lg" variant="light" color="blue">
              {Math.round(connectionProgress)}% Complete
            </Badge>
          </Group>
          <Progress value={connectionProgress} size="lg" radius="md" />
        </Card>

        {/* Security Notice */}
        <Alert icon={<IconShield size={16} />} color="blue" variant="light">
          <Text fw={500} mb="xs">
            Your data is secure
          </Text>
          <Text size="sm">
            We use OAuth 2.0 authentication and never store your passwords. All connections are encrypted and can be revoked at any time.
          </Text>
        </Alert>

        {/* Connected Accounts */}
        {connectedPlatforms.length > 0 && (
          <div>
            <Title order={3} mb="md">
              Connected Accounts
            </Title>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              {connectedPlatforms.map((platform) => (
                <Card key={platform.id} shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="md">
                    <Group gap="sm">
                      <ThemeIcon size="lg" variant="light" color={platform.color}>
                        <platform.icon size={24} />
                      </ThemeIcon>
                      <div>
                        <Text fw={500}>{platform.name}</Text>
                        <Text size="sm" c="dimmed">
                          {platform.username}
                        </Text>
                      </div>
                    </Group>
                    <Badge color="green" variant="light">
                      Connected
                    </Badge>
                  </Group>

                  <Group justify="space-between" mb="md">
                    <Group gap="lg">
                      <div>
                        <Text size="sm" c="dimmed">
                          Followers
                        </Text>
                        <Text fw={500}>
                          {platform.followers?.toLocaleString()}
                        </Text>
                      </div>
                      <div>
                        <Text size="sm" c="dimmed">
                          Last Sync
                        </Text>
                        <Text fw={500} size="sm">
                          {platform.lastSync?.toLocaleTimeString()}
                        </Text>
                      </div>
                    </Group>
                  </Group>

                  <Group>
                    <Button
                      variant="light"
                      size="xs"
                      leftSection={<IconRefresh size={14} />}
                      onClick={() => handleSync(platform.id)}
                    >
                      Sync
                    </Button>
                    <Button
                      variant="light"
                      color="red"
                      size="xs"
                      onClick={() => handleDisconnect(platform.id)}
                    >
                      Disconnect
                    </Button>
                  </Group>
                </Card>
              ))}
            </SimpleGrid>
          </div>
        )}

        {/* Available Platforms */}
        <div>
          <Title order={3} mb="md">
            Available Platforms
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="md">
            {socialPlatforms
              .filter(platform => !platform.connected)
              .map((platform) => (
                <Card key={platform.id} shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack gap="md">
                    <Group justify="space-between">
                      <Group gap="sm">
                        <ThemeIcon size="lg" variant="light" color={platform.color}>
                          <platform.icon size={24} />
                        </ThemeIcon>
                        <div>
                          <Text fw={500}>{platform.name}</Text>
                          <Badge size="xs" variant="light">
                            Not Connected
                          </Badge>
                        </div>
                      </Group>
                    </Group>

                    <Text size="sm" c="dimmed">
                      {platform.description}
                    </Text>

                    <div>
                      <Text size="sm" fw={500} mb="xs">
                        Features:
                      </Text>
                      <List spacing="xs" size="xs">
                        {platform.features.slice(0, 3).map((feature, index) => (
                          <List.Item key={index} icon={<IconCheck size={12} color="green" />}>
                            {feature}
                          </List.Item>
                        ))}
                        {platform.features.length > 3 && (
                          <List.Item icon={<Text size="xs" c="dimmed">+{platform.features.length - 3} more</Text>}>
                          </List.Item>
                        )}
                      </List>
                    </div>

                    <Button
                      fullWidth
                      leftSection={<IconPlus size={16} />}
                      onClick={() => handleConnect(platform)}
                    >
                      Connect {platform.name}
                    </Button>
                  </Stack>
                </Card>
              ))}
          </SimpleGrid>
        </div>

        {/* Connection Modal */}
        <Modal
          opened={opened}
          onClose={close}
          title={`Connect ${selectedPlatform?.name}`}
          size="md"
          centered
        >
          {selectedPlatform && (
            <Stack gap="lg">
              <Group gap="sm">
                <ThemeIcon size="xl" variant="light" color={selectedPlatform.color}>
                  <selectedPlatform.icon size={30} />
                </ThemeIcon>
                <div>
                  <Text fw={500} size="lg">
                    {selectedPlatform.name}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {selectedPlatform.description}
                  </Text>
                </div>
              </Group>

              <Stepper active={connectionStep} breakpoint="sm">
                <Stepper.Step
                  label="Authorize"
                  description="Grant permissions"
                  icon={<IconLock size={18} />}
                >
                  <Stack gap="md" py="md">
                    <Alert icon={<IconAlertCircle size={16} />} color="blue" variant="light">
                      <Text size="sm">
                        You'll be redirected to {selectedPlatform.name} to authorize EngagePro to access your account.
                      </Text>
                    </Alert>
                    <List spacing="xs" size="sm">
                      <List.Item icon={<IconCheck size={14} color="green" />}>
                        Read and write posts
                      </List.Item>
                      <List.Item icon={<IconCheck size={14} color="green" />}>
                        Access basic profile information
                      </List.Item>
                      <List.Item icon={<IconCheck size={14} color="green" />}>
                        View analytics and insights
                      </List.Item>
                    </List>
                  </Stack>
                </Stepper.Step>

                <Stepper.Step
                  label="Connecting"
                  description="Establishing connection"
                  loading={connectionStep === 1}
                >
                  <Center py="xl">
                    <Stack align="center" gap="md">
                      <Text>Connecting to {selectedPlatform.name}...</Text>
                      <Text size="sm" c="dimmed">
                        This may take a few seconds
                      </Text>
                    </Stack>
                  </Center>
                </Stepper.Step>

                <Stepper.Step
                  label="Complete"
                  description="Successfully connected"
                  icon={<IconCheck size={18} />}
                >
                  <Stack align="center" gap="md" py="md">
                    <ThemeIcon size={60} variant="light" color="green">
                      <IconCheck size={30} />
                    </ThemeIcon>
                    <div style={{ textAlign: 'center' }}>
                      <Text fw={500} mb="xs">
                        Successfully Connected!
                      </Text>
                      <Text size="sm" c="dimmed">
                        Your {selectedPlatform.name} account is now connected to EngagePro.
                      </Text>
                    </div>
                  </Stack>
                </Stepper.Step>
              </Stepper>

              <Group justify="flex-end" mt="md">
                {connectionStep === 0 && (
                  <>
                    <Button variant="light" onClick={close}>
                      Cancel
                    </Button>
                    <Button
                      leftSection={<IconExternalLink size={16} />}
                      onClick={simulateConnection}
                    >
                      Authorize on {selectedPlatform.name}
                    </Button>
                  </>
                )}
                {connectionStep === 3 && (
                  <Button onClick={close}>
                    Done
                  </Button>
                )}
              </Group>
            </Stack>
          )}
        </Modal>
      </Stack>
    </Container>
  );
}