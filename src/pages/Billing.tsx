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
  Progress,
  SimpleGrid,
  Box,
  List,
  Alert,
  Modal,
  Table,
  ActionIcon,
  Menu,
  Divider,
  ThemeIcon,
  Switch,
  Paper,
} from '@mantine/core';
import {
  IconCreditCard,
  IconDownload,
  IconDots,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconCrown,
  IconUsers,
  IconTrendingUp,
  IconCalendar,
  IconReceipt,
  IconEdit,
  IconTrash,
  IconPlus,
  IconShield,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

const currentPlan = {
  name: 'Pro',
  price: 29,
  billingCycle: 'monthly',
  nextBilling: new Date('2024-12-15'),
  status: 'active',
  features: [
    '10 social accounts',
    'Unlimited posts',
    'Advanced analytics',
    'AI content generation',
    'Team collaboration (3 users)',
  ],
};

const billingHistory = [
  {
    id: 1,
    date: new Date('2024-11-15'),
    amount: 29.00,
    status: 'paid',
    description: 'Pro Plan - November 2024',
    invoice: 'INV-2024-001',
  },
  {
    id: 2,
    date: new Date('2024-10-15'),
    amount: 29.00,
    status: 'paid',
    description: 'Pro Plan - October 2024',
    invoice: 'INV-2024-002',
  },
  {
    id: 3,
    date: new Date('2024-09-15'),
    amount: 29.00,
    status: 'paid',
    description: 'Pro Plan - September 2024',
    invoice: 'INV-2024-003',
  },
];

const paymentMethods = [
  {
    id: 1,
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2027,
    isDefault: true,
  },
  {
    id: 2,
    type: 'card',
    last4: '5555',
    brand: 'Mastercard',
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
  },
];

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: [
      '3 social accounts',
      '10 posts per month',
      'Basic analytics',
      'Content calendar',
    ],
    limitations: [
      'No AI content generation',
      'No team collaboration',
      'Limited analytics',
    ],
    color: 'gray',
  },
  {
    name: 'Pro',
    price: 29,
    description: 'For growing creators and small businesses',
    features: [
      '10 social accounts',
      'Unlimited posts',
      'Advanced analytics',
      'AI content generation',
      'Team collaboration (3 users)',
      'Priority support',
    ],
    limitations: [],
    color: 'blue',
    popular: true,
  },
  {
    name: 'Team',
    price: 99,
    description: 'For agencies and larger teams',
    features: [
      'Unlimited social accounts',
      'Unlimited posts',
      'Advanced analytics & reports',
      'AI content generation',
      'Unlimited team collaboration',
      'Approval workflows',
      'White-label reports',
      '24/7 priority support',
    ],
    limitations: [],
    color: 'violet',
  },
];

export function Billing() {
  const [isYearly, setIsYearly] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePlanChange = (planName: string) => {
    setSelectedPlan(planName);
    open();
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log(`Downloading invoice: ${invoiceId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'failed':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={1}>Billing & Subscription</Title>
            <Text c="dimmed" mt={4}>
              Manage your subscription, billing information, and payment methods
            </Text>
          </div>
        </Group>

        {/* Current Plan */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Group justify="space-between" mb="lg">
            <div>
              <Group gap="sm" mb="xs">
                <Title order={3}>Current Plan</Title>
                <Badge size="lg" color="blue" variant="light">
                  {currentPlan.name}
                </Badge>
              </Group>
              <Text c="dimmed">
                Your subscription is active and will renew on{' '}
                {currentPlan.nextBilling.toLocaleDateString()}
              </Text>
            </div>
            <Group>
              <Text size="xl" fw={700}>
                ${currentPlan.price}
              </Text>
              <Text c="dimmed">/{currentPlan.billingCycle}</Text>
            </Group>
          </Group>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <div>
              <Text fw={500} mb="sm">
                Plan Features
              </Text>
              <List spacing="xs" size="sm">
                {currentPlan.features.map((feature, index) => (
                  <List.Item key={index} icon={<IconCheck size={14} color="green" />}>
                    {feature}
                  </List.Item>
                ))}
              </List>
            </div>
            <div>
              <Text fw={500} mb="sm">
                Usage This Month
              </Text>
              <Stack gap="sm">
                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">Social Accounts</Text>
                    <Text size="sm" fw={500}>
                      6/10
                    </Text>
                  </Group>
                  <Progress value={60} size="sm" />
                </div>
                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">Posts Published</Text>
                    <Text size="sm" fw={500}>
                      28/∞
                    </Text>
                  </Group>
                  <Progress value={100} size="sm" color="green" />
                </div>
                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">Team Members</Text>
                    <Text size="sm" fw={500}>
                      2/3
                    </Text>
                  </Group>
                  <Progress value={67} size="sm" />
                </div>
              </Stack>
            </div>
          </SimpleGrid>

          <Group mt="lg">
            <Button variant="light" onClick={() => navigate('/pricing')}>
              View All Plans
            </Button>
            <Button variant="outline" color="red">
              Cancel Subscription
            </Button>
          </Group>
        </Card>

        {/* Quick Plan Comparison */}
        <div>
          <Group justify="space-between" mb="md">
            <Title order={3}>Available Plans</Title>
            <Group gap="md">
              <Text size="sm">Monthly</Text>
              <Switch
                checked={isYearly}
                onChange={(event) => setIsYearly(event.currentTarget.checked)}
              />
              <Text size="sm">Yearly</Text>
              <Badge color="green" variant="light" size="sm">
                Save 17%
              </Badge>
            </Group>
          </Group>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{
                  border: plan.name === currentPlan.name ? '2px solid #228be6' : undefined,
                }}
              >
                <Stack gap="md">
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} size="lg">
                        {plan.name}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {plan.description}
                      </Text>
                    </div>
                    {plan.popular && (
                      <Badge color="blue" variant="light">
                        Popular
                      </Badge>
                    )}
                  </Group>

                  <Group align="end" gap="xs">
                    <Text size="xl" fw={700}>
                      ${isYearly ? Math.round(plan.price * 0.83) : plan.price}
                    </Text>
                    <Text c="dimmed" size="sm">
                      /month
                    </Text>
                  </Group>

                  <List spacing="xs" size="sm">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <List.Item key={index} icon={<IconCheck size={12} color="green" />}>
                        {feature}
                      </List.Item>
                    ))}
                    {plan.features.length > 4 && (
                      <Text size="xs" c="dimmed">
                        +{plan.features.length - 4} more features
                      </Text>
                    )}
                  </List>

                  <Button
                    fullWidth
                    variant={plan.name === currentPlan.name ? 'light' : 'filled'}
                    color={plan.color}
                    disabled={plan.name === currentPlan.name}
                    onClick={() => handlePlanChange(plan.name)}
                  >
                    {plan.name === currentPlan.name ? 'Current Plan' : `Upgrade to ${plan.name}`}
                  </Button>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </div>

        {/* Payment Methods */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={4}>Payment Methods</Title>
            <Button leftSection={<IconPlus size={16} />} variant="light">
              Add Payment Method
            </Button>
          </Group>

          <Stack gap="md">
            {paymentMethods.map((method) => (
              <Paper key={method.id} p="md" withBorder>
                <Group justify="space-between">
                  <Group gap="sm">
                    <ThemeIcon variant="light" color="blue">
                      <IconCreditCard size={16} />
                    </ThemeIcon>
                    <div>
                      <Text fw={500}>
                        {method.brand} •••• {method.last4}
                      </Text>
                      <Text size="sm" c="dimmed">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </Text>
                    </div>
                    {method.isDefault && (
                      <Badge size="sm" variant="light">
                        Default
                      </Badge>
                    )}
                  </Group>
                  <Menu shadow="md" width={160}>
                    <Menu.Target>
                      <ActionIcon variant="subtle">
                        <IconDots size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item leftSection={<IconEdit size={14} />}>
                        Edit
                      </Menu.Item>
                      {!method.isDefault && (
                        <Menu.Item leftSection={<IconCheck size={14} />}>
                          Set as Default
                        </Menu.Item>
                      )}
                      <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
                        Remove
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Card>

        {/* Billing History */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={4}>Billing History</Title>
            <Button variant="light" leftSection={<IconDownload size={16} />}>
              Download All
            </Button>
          </Group>

          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {billingHistory.map((invoice) => (
                <Table.Tr key={invoice.id}>
                  <Table.Td>
                    <Text size="sm">{invoice.date.toLocaleDateString()}</Text>
                  </Table.Td>
                  <Table.Td>
                    <div>
                      <Text size="sm" fw={500}>
                        {invoice.description}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {invoice.invoice}
                      </Text>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={500}>
                      ${invoice.amount.toFixed(2)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(invoice.status)} variant="light" size="sm">
                      {invoice.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <ActionIcon
                      variant="subtle"
                      onClick={() => handleDownloadInvoice(invoice.invoice)}
                    >
                      <IconDownload size={16} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>

        {/* Security & Compliance */}
        <Alert icon={<IconShield size={16} />} color="blue" variant="light">
          <Text fw={500} mb="xs">
            Secure Billing
          </Text>
          <Text size="sm">
            All payments are processed securely through Stripe. We never store your payment information on our servers.
            Your billing data is encrypted and complies with PCI DSS standards.
          </Text>
        </Alert>

        {/* Plan Change Modal */}
        <Modal
          opened={opened}
          onClose={close}
          title={`Change to ${selectedPlan} Plan`}
          size="md"
        >
          <Stack gap="md">
            <Alert icon={<IconAlertCircle size={16} />} color="blue" variant="light">
              <Text size="sm">
                Your plan will be changed immediately. You'll be charged a prorated amount for the remainder of your billing cycle.
              </Text>
            </Alert>

            <div>
              <Text fw={500} mb="sm">
                Plan Comparison
              </Text>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Feature</Table.Th>
                    <Table.Th>Current ({currentPlan.name})</Table.Th>
                    <Table.Th>New ({selectedPlan})</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>Social Accounts</Table.Td>
                    <Table.Td>10</Table.Td>
                    <Table.Td>{selectedPlan === 'Free' ? '3' : selectedPlan === 'Team' ? 'Unlimited' : '10'}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Monthly Posts</Table.Td>
                    <Table.Td>Unlimited</Table.Td>
                    <Table.Td>{selectedPlan === 'Free' ? '10' : 'Unlimited'}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Team Members</Table.Td>
                    <Table.Td>3</Table.Td>
                    <Table.Td>{selectedPlan === 'Free' ? '1' : selectedPlan === 'Team' ? 'Unlimited' : '3'}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </div>

            <Group justify="flex-end">
              <Button variant="light" onClick={close}>
                Cancel
              </Button>
              <Button onClick={close}>
                Confirm Change
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
}