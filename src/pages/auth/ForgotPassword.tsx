import React, { useState } from 'react';
import {
  TextInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
  Alert,
  Loader,
  Paper,
  Center,
  ThemeIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';
import { IconAlertCircle, IconMail, IconCheck, IconArrowLeft } from '@tabler/icons-react';

export function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setError(null);
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setEmailSent(true);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <Stack gap="lg" align="center">
        <ThemeIcon size={60} variant="light" color="green">
          <IconCheck size={30} />
        </ThemeIcon>
        
        <div style={{ textAlign: 'center' }}>
          <Title order={2} mb="xs">
            Check your email
          </Title>
          <Text c="dimmed" size="sm" mb="lg">
            We've sent a password reset link to {form.values.email}
          </Text>
        </div>

        <Paper p="md" withBorder w="100%">
          <Text size="sm" ta="center" mb="md">
            Didn't receive the email? Check your spam folder or try again.
          </Text>
          <Button
            variant="light"
            fullWidth
            onClick={() => {
              setEmailSent(false);
              form.reset();
            }}
          >
            Try again
          </Button>
        </Paper>

        <Text ta="center" size="sm">
          <Anchor component={Link} to="/auth/login" fw={500}>
            <IconArrowLeft size={14} style={{ marginRight: 4 }} />
            Back to login
          </Anchor>
        </Text>
      </Stack>
    );
  }

  return (
    <Stack gap="lg">
      <div style={{ textAlign: 'center' }}>
        <Title order={2} mb="xs">
          Forgot your password?
        </Title>
        <Text c="dimmed" size="sm">
          Enter your email address and we'll send you a link to reset your password
        </Text>
      </div>

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
          {error}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Email address"
            placeholder="your@email.com"
            size="md"
            leftSection={<IconMail size={16} />}
            {...form.getInputProps('email')}
          />

          <Button 
            type="submit" 
            fullWidth 
            size="md"
            loading={loading}
            disabled={loading}
          >
            {loading ? <Loader size="sm" /> : 'Send reset link'}
          </Button>
        </Stack>
      </form>

      <Text ta="center" size="sm">
        Remember your password?{' '}
        <Anchor component={Link} to="/auth/login" fw={500}>
          Sign in
        </Anchor>
      </Text>
    </Stack>
  );
}