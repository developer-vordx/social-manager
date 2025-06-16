import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Grid,
  Card,
  ThemeIcon,
  Badge,
  Avatar,
  SimpleGrid,
  Box,
  Center,
  Divider,
  List,
  Anchor,
  Image,
  Transition,
} from '@mantine/core';
import {
  IconSparkles,
  IconCalendar,
  IconTrendingUp,
  IconUsers,
  IconShield,
  IconBolt,
  IconStar,
  IconCheck,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandTiktok,
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: IconSparkles,
    title: 'AI-Powered Content Creation',
    description: 'Generate engaging captions and hashtags with our advanced AI technology.',
    color: 'violet',
  },
  {
    icon: IconCalendar,
    title: 'Smart Scheduling',
    description: 'Schedule posts across multiple platforms with optimal timing suggestions.',
    color: 'blue',
  },
  {
    icon: IconTrendingUp,
    title: 'Advanced Analytics',
    description: 'Track performance with detailed insights and engagement metrics.',
    color: 'green',
  },
  {
    icon: IconUsers,
    title: 'Team Collaboration',
    description: 'Work together with your team with role-based access and approval workflows.',
    color: 'orange',
  },
  {
    icon: IconShield,
    title: 'Enterprise Security',
    description: 'Bank-level security with 2FA, SSO, and compliance certifications.',
    color: 'red',
  },
  {
    icon: IconBolt,
    title: 'Automation Tools',
    description: 'Automate repetitive tasks and focus on creating amazing content.',
    color: 'yellow',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechCorp',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'EngagePro has transformed our social media strategy. We\'ve seen a 300% increase in engagement since switching.',
  },
  {
    name: 'Michael Chen',
    role: 'Content Creator',
    company: 'Creative Studio',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'The AI content generation is incredible. It saves me hours every week and the quality is consistently high.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Social Media Manager',
    company: 'Fashion Brand',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'Managing multiple platforms has never been easier. The scheduling and analytics features are game-changers.',
  },
];

const platforms = [
  { icon: IconBrandInstagram, name: 'Instagram', color: 'pink' },
  { icon: IconBrandFacebook, name: 'Facebook', color: 'blue' },
  { icon: IconBrandTwitter, name: 'Twitter', color: 'blue' },
  { icon: IconBrandLinkedin, name: 'LinkedIn', color: 'blue' },
  { icon: IconBrandYoutube, name: 'YouTube', color: 'red' },
  { icon: IconBrandTiktok, name: 'TikTok', color: 'dark' },
];

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '2M+', label: 'Posts Scheduled' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

// Dashboard screenshots for slider
const dashboardImages = [
  {
    title: 'Dashboard Overview',
    description: 'Get a complete view of your social media performance',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Content Calendar',
    description: 'Plan and schedule your content across all platforms',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track engagement and performance with detailed insights',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Content Creator',
    description: 'Create engaging content with AI-powered suggestions',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export function Landing() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dashboardImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + dashboardImages.length) % dashboardImages.length);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Navigation */}
        <Container size="xl" py="md">
          <Group justify="space-between">
            <Group gap="sm">
              <IconSparkles size={32} />
              <Text size="xl" fw={700}>
                EngagePro
              </Text>
            </Group>
            <Group>
              <Button variant="subtle" color="white" onClick={() => navigate('/pricing')}>
                Pricing
              </Button>
              <Button variant="subtle" color="white" onClick={() => navigate('/auth/login')}>
                Sign In
              </Button>
              <Button variant="white" color="dark" onClick={() => navigate('/auth/signup')}>
                Get Started
              </Button>
            </Group>
          </Group>
        </Container>

        {/* Hero Section */}
        <Container size="xl" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="xl">
                <div>
                  <Badge size="lg" variant="light" color="white" mb="md">
                    🚀 Trusted by 50,000+ creators
                  </Badge>
                  <Title size={60} fw={800} mb="md">
                    Supercharge Your Social Media Presence
                  </Title>
                  <Text size="xl" opacity={0.9} mb="xl">
                    Create, schedule, and analyze your social media content across all platforms with AI-powered tools that save you time and boost engagement.
                  </Text>
                </div>
                <Group>
                  <Button
                    size="xl"
                    variant="white"
                    color="dark"
                    rightSection={<IconArrowRight size={20} />}
                    onClick={() => navigate('/auth/signup')}
                  >
                    Start Free Trial
                  </Button>
                  <Button size="xl" variant="outline" color="white">
                    Watch Demo
                  </Button>
                </Group>
                <Group gap="xl">
                  {stats.map((stat, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                      <Text size="xl" fw={700}>
                        {stat.value}
                      </Text>
                      <Text size="sm" opacity={0.8}>
                        {stat.label}
                      </Text>
                    </div>
                  ))}
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Center>
                <Box
                  style={{
                    width: '100%',
                    maxWidth: 500,
                    height: 350,
                    position: 'relative',
                    borderRadius: 20,
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {/* Dashboard Image Slider */}
                  <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {dashboardImages.map((slide, index) => (
                      <Transition
                        key={index}
                        mounted={index === currentSlide}
                        transition="fade"
                        duration={500}
                      >
                        {(styles) => (
                          <Box
                            style={{
                              ...styles,
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                            }}
                          >
                            <Image
                              src={slide.image}
                              alt={slide.title}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                            <Box
                              style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                color: 'white',
                                padding: '20px',
                              }}
                            >
                              <Text fw={600} mb="xs">
                                {slide.title}
                              </Text>
                              <Text size="sm" opacity={0.9}>
                                {slide.description}
                              </Text>
                            </Box>
                          </Box>
                        )}
                      </Transition>
                    ))}

                    {/* Navigation Arrows */}
                    <Button
                      variant="subtle"
                      color="white"
                      style={{
                        position: 'absolute',
                        left: 10,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                      }}
                      onClick={prevSlide}
                    >
                      <IconChevronLeft size={20} />
                    </Button>
                    <Button
                      variant="subtle"
                      color="white"
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                      }}
                      onClick={nextSlide}
                    >
                      <IconChevronRight size={20} />
                    </Button>

                    {/* Slide Indicators */}
                    <Group
                      gap="xs"
                      justify="center"
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10,
                      }}
                    >
                      {dashboardImages.map((_, index) => (
                        <Box
                          key={index}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                          }}
                          onClick={() => setCurrentSlide(index)}
                        />
                      ))}
                    </Group>
                  </Box>
                </Box>
              </Center>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container size="xl" py={80}>
        <Stack align="center" mb={60}>
          <Badge size="lg" variant="light">
            Features
          </Badge>
          <Title order={2} ta="center" size={40}>
            Everything you need to succeed
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={600}>
            Powerful tools designed to help you create better content, engage your audience, and grow your social media presence.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
          {features.map((feature, index) => (
            <Card key={index} shadow="sm" padding="xl" radius="md" withBorder>
              <ThemeIcon size={60} variant="light" color={feature.color} mb="md">
                <feature.icon size={30} />
              </ThemeIcon>
              <Title order={4} mb="sm">
                {feature.title}
              </Title>
              <Text c="dimmed">
                {feature.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Platforms Section */}
      <Box style={{ background: '#f8f9fa' }} py={80}>
        <Container size="xl">
          <Stack align="center" mb={60}>
            <Badge size="lg" variant="light">
              Integrations
            </Badge>
            <Title order={2} ta="center" size={40}>
              Connect all your platforms
            </Title>
            <Text size="lg" c="dimmed" ta="center" maw={600}>
              Manage all your social media accounts from one dashboard. We support all major platforms.
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 3, md: 6 }} spacing="xl">
            {platforms.map((platform, index) => (
              <Card key={index} shadow="sm" padding="xl" radius="md" withBorder ta="center">
                <ThemeIcon size={60} variant="light" color={platform.color} mx="auto" mb="md">
                  <platform.icon size={30} />
                </ThemeIcon>
                <Text fw={500}>
                  {platform.name}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container size="xl" py={80}>
        <Stack align="center" mb={60}>
          <Badge size="lg" variant="light">
            Testimonials
          </Badge>
          <Title order={2} ta="center" size={40}>
            Loved by creators worldwide
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={600}>
            See what our customers have to say about their experience with EngagePro.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          {testimonials.map((testimonial, index) => (
            <Card key={index} shadow="sm" padding="xl" radius="md" withBorder>
              <Group mb="md">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <IconStar key={i} size={16} fill="gold" color="gold" />
                ))}
              </Group>
              <Text mb="md" style={{ fontStyle: 'italic' }}>
                "{testimonial.text}"
              </Text>
              <Group>
                <Avatar src={testimonial.avatar} radius="xl" />
                <div>
                  <Text fw={500}>{testimonial.name}</Text>
                  <Text size="sm" c="dimmed">
                    {testimonial.role} at {testimonial.company}
                  </Text>
                </div>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* CTA Section */}
      <Box
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
        py={80}
      >
        <Container size="xl">
          <Stack align="center" gap="xl">
            <Title order={2} ta="center" size={40}>
              Ready to transform your social media?
            </Title>
            <Text size="lg" ta="center" maw={600} opacity={0.9}>
              Join thousands of creators who are already using EngagePro to grow their audience and save time.
            </Text>
            <Group>
              <Button
                size="xl"
                variant="white"
                color="dark"
                rightSection={<IconArrowRight size={20} />}
                onClick={() => navigate('/auth/signup')}
              >
                Start Free Trial
              </Button>
              <Button size="xl" variant="outline" color="white" onClick={() => navigate('/pricing')}>
                View Pricing
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box style={{ background: '#1a1b1e', color: 'white' }} py={60}>
        <Container size="xl">
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Group gap="sm" mb="md">
                <IconSparkles size={24} />
                <Text size="lg" fw={700}>
                  EngagePro
                </Text>
              </Group>
              <Text c="dimmed" mb="md">
                The ultimate social media management platform for creators and businesses.
              </Text>
              <Text size="sm" c="dimmed">
                © 2024 EngagePro. All rights reserved.
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 2 }}>
              <Text fw={500} mb="md">
                Product
              </Text>
              <Stack gap="xs">
                <Anchor c="dimmed" size="sm">Features</Anchor>
                <Anchor c="dimmed" size="sm" onClick={() => navigate('/pricing')}>Pricing</Anchor>
                <Anchor c="dimmed" size="sm">Integrations</Anchor>
                <Anchor c="dimmed" size="sm">API</Anchor>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 2 }}>
              <Text fw={500} mb="md">
                Company
              </Text>
              <Stack gap="xs">
                <Anchor c="dimmed" size="sm">About</Anchor>
                <Anchor c="dimmed" size="sm">Blog</Anchor>
                <Anchor c="dimmed" size="sm">Careers</Anchor>
                <Anchor c="dimmed" size="sm">Contact</Anchor>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 2 }}>
              <Text fw={500} mb="md">
                Resources
              </Text>
              <Stack gap="xs">
                <Anchor c="dimmed" size="sm">Help Center</Anchor>
                <Anchor c="dimmed" size="sm">Community</Anchor>
                <Anchor c="dimmed" size="sm">Tutorials</Anchor>
                <Anchor c="dimmed" size="sm">Webinars</Anchor>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 2 }}>
              <Text fw={500} mb="md">
                Legal
              </Text>
              <Stack gap="xs">
                <Anchor c="dimmed" size="sm">Privacy</Anchor>
                <Anchor c="dimmed" size="sm">Terms</Anchor>
                <Anchor c="dimmed" size="sm">Security</Anchor>
                <Anchor c="dimmed" size="sm">GDPR</Anchor>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}