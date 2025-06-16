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
  List,
  ThemeIcon,
  Switch,
  SimpleGrid,
  Box,
  Divider,
  Accordion,
  Center,
} from '@mantine/core';
import {
  IconCheck,
  IconX,
  IconSparkles,
  IconUsers,
  IconTrendingUp,
  IconShield,
  IconHeadphones,
  IconStar,
  IconArrowRight,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for getting started',
    features: [
      { text: '3 social accounts', included: true },
      { text: '10 posts per month', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Content calendar', included: true },
      { text: 'AI content suggestions', included: false },
      { text: 'Team collaboration', included: false },
      { text: 'Advanced analytics', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Started Free',
    popular: false,
    color: 'gray',
  },
  {
    name: 'Pro',
    price: { monthly: 29, yearly: 24 },
    description: 'For growing creators and small businesses',
    features: [
      { text: '10 social accounts', included: true },
      { text: 'Unlimited posts', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'AI content generation', included: true },
      { text: 'Optimal posting times', included: true },
      { text: 'Hashtag suggestions', included: true },
      { text: 'Team collaboration (3 users)', included: true },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Pro Trial',
    popular: true,
    color: 'blue',
  },
  {
    name: 'Team',
    price: { monthly: 99, yearly: 82 },
    description: 'For agencies and larger teams',
    features: [
      { text: 'Unlimited social accounts', included: true },
      { text: 'Unlimited posts', included: true },
      { text: 'Advanced analytics & reports', included: true },
      { text: 'AI content generation', included: true },
      { text: 'Team collaboration (unlimited)', included: true },
      { text: 'Approval workflows', included: true },
      { text: 'White-label reports', included: true },
      { text: '24/7 priority support', included: true },
    ],
    cta: 'Start Team Trial',
    popular: false,
    color: 'violet',
  },
];

const faqs = [
  {
    question: 'Can I change my plan at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, we offer a 14-day free trial for all paid plans. No credit card required to start.',
  },
  {
    question: 'What social media platforms do you support?',
    answer: 'We support Instagram, Facebook, Twitter, LinkedIn, YouTube, TikTok, Pinterest, and Snapchat.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Absolutely. You can cancel your subscription at any time from your account settings. No cancellation fees.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans if you\'re not satisfied with our service.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use enterprise-grade security with encryption, regular backups, and comply with GDPR and SOC 2 standards.',
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = (planName: string) => {
    if (planName === 'Free') {
      navigate('/auth/signup');
    } else {
      navigate('/auth/signup', { state: { plan: planName.toLowerCase() } });
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
        py={80}
      >
        <Container size="xl">
          <Stack align="center" gap="xl">
            <Badge size="lg" variant="light" color="white">
              Pricing Plans
            </Badge>
            <Title order={1} ta="center" size={50}>
              Choose the perfect plan for your needs
            </Title>
            <Text size="xl" ta="center" maw={600} opacity={0.9}>
              Start free and scale as you grow. All plans include our core features with no hidden fees.
            </Text>
            
            <Group gap="md">
              <Text>Monthly</Text>
              <Switch
                size="lg"
                checked={isYearly}
                onChange={(event) => setIsYearly(event.currentTarget.checked)}
              />
              <Text>Yearly</Text>
              <Badge color="green" variant="light">
                Save 17%
              </Badge>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Pricing Cards */}
      <Container size="xl" py={80}>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          {plans.map((plan, index) => (
            <Card
              key={index}
              shadow={plan.popular ? 'xl' : 'sm'}
              padding="xl"
              radius="lg"
              withBorder
              style={{
                position: 'relative',
                transform: plan.popular ? 'scale(1.05)' : 'none',
                border: plan.popular ? '2px solid #228be6' : undefined,
              }}
            >
              {plan.popular && (
                <Badge
                  color="blue"
                  variant="filled"
                  size="lg"
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  Most Popular
                </Badge>
              )}

              <Stack gap="lg">
                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="xl" fw={700}>
                      {plan.name}
                    </Text>
                    <ThemeIcon size="lg" variant="light" color={plan.color}>
                      <IconStar size={20} />
                    </ThemeIcon>
                  </Group>
                  <Text c="dimmed" mb="lg">
                    {plan.description}
                  </Text>
                  
                  <Group align="end" gap="xs" mb="md">
                    <Text size={48} fw={800}>
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </Text>
                    <Text c="dimmed" mb="sm">
                      {plan.price.monthly > 0 ? '/month' : ''}
                    </Text>
                  </Group>
                  
                  {isYearly && plan.price.monthly > 0 && (
                    <Text size="sm" c="dimmed">
                      Billed annually (${(isYearly ? plan.price.yearly : plan.price.monthly) * 12}/year)
                    </Text>
                  )}
                </div>

                <Button
                  size="lg"
                  variant={plan.popular ? 'filled' : 'light'}
                  color={plan.color}
                  fullWidth
                  rightSection={<IconArrowRight size={16} />}
                  onClick={() => handleGetStarted(plan.name)}
                >
                  {plan.cta}
                </Button>

                <Divider />

                <List spacing="sm" size="sm">
                  {plan.features.map((feature, featureIndex) => (
                    <List.Item
                      key={featureIndex}
                      icon={
                        <ThemeIcon
                          size="sm"
                          variant="light"
                          color={feature.included ? 'green' : 'red'}
                        >
                          {feature.included ? (
                            <IconCheck size={12} />
                          ) : (
                            <IconX size={12} />
                          )}
                        </ThemeIcon>
                      }
                    >
                      <Text
                        c={feature.included ? undefined : 'dimmed'}
                        td={feature.included ? undefined : 'line-through'}
                      >
                        {feature.text}
                      </Text>
                    </List.Item>
                  ))}
                </List>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Enterprise Section */}
      <Box style={{ background: '#f8f9fa' }} py={80}>
        <Container size="xl">
          <Card shadow="sm" padding="xl" radius="lg" withBorder>
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="md">
                  <Group>
                    <ThemeIcon size="xl" variant="light" color="orange">
                      <IconShield size={30} />
                    </ThemeIcon>
                    <div>
                      <Title order={3}>Enterprise</Title>
                      <Text c="dimmed">
                        Custom solutions for large organizations
                      </Text>
                    </div>
                  </Group>
                  
                  <List spacing="xs" size="sm">
                    <List.Item icon={<IconCheck size={14} color="green" />}>
                      Custom integrations and API access
                    </List.Item>
                    <List.Item icon={<IconCheck size={14} color="green" />}>
                      Dedicated account manager
                    </List.Item>
                    <List.Item icon={<IconCheck size={14} color="green" />}>
                      Advanced security and compliance
                    </List.Item>
                    <List.Item icon={<IconCheck size={14} color="green" />}>
                      Custom training and onboarding
                    </List.Item>
                  </List>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack align="center">
                  <Text size="xl" fw={700}>
                    Custom Pricing
                  </Text>
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                </Stack>
              </Grid.Col>
            </Grid>
          </Card>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container size="xl" py={80}>
        <Stack align="center" mb={60}>
          <Badge size="lg" variant="light">
            FAQ
          </Badge>
          <Title order={2} ta="center" size={40}>
            Frequently Asked Questions
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={600}>
            Got questions? We've got answers. If you can't find what you're looking for, contact our support team.
          </Text>
        </Stack>

        <Accordion variant="separated" radius="md">
          {faqs.map((faq, index) => (
            <Accordion.Item key={index} value={index.toString()}>
              <Accordion.Control>
                <Text fw={500}>{faq.question}</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text c="dimmed">{faq.answer}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
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
              Ready to get started?
            </Title>
            <Text size="lg" ta="center" maw={600} opacity={0.9}>
              Join thousands of creators and businesses who trust EngagePro to manage their social media presence.
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
              <Button size="xl" variant="outline" color="white">
                <IconHeadphones size={20} style={{ marginRight: 8 }} />
                Contact Sales
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}