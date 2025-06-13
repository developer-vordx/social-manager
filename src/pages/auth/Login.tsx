import React, { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
  Alert,
  Loader,
  Checkbox,
  Divider,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { IconAlertCircle, IconBrandGoogle, IconBrandGithub, IconMail, IconLock } from '@tabler/icons-react';

export function Login() {
  const { login, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setError(null);
      await login(values.email, values.password);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    console.log(`Logging in with ${provider}`);
    setError('Social login is not implemented yet. Please use email and password.');
  };

  return (
    <Stack gap="lg">
      <div style={{ textAlign: 'center' }}>
        <Title order={2} mb="xs">
          Welcome back
        </Title>
        <Text c="dimmed" size="sm">
          Sign in to your EngagePro account to continue
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
          
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            size="md"
            leftSection={<IconLock size={16} />}
            {...form.getInputProps('password')}
          />

          <Group justify="space-between">
            <Checkbox
              label="Remember me"
              {...form.getInputProps('rememberMe', { type: 'checkbox' })}
            />
            <Anchor component={Link} to="/auth/forgot-password" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          <Button 
            type="submit" 
            fullWidth 
            size="md"
            loading={loading}
            disabled={loading}
          >
            {loading ? <Loader size="sm" /> : 'Sign in'}
          </Button>
        </Stack>
      </form>

      <Divider label="Or continue with" labelPosition="center" />

      <Stack gap="sm">
        <Button
          variant="light"
          leftSection={<IconBrandGoogle size={16} />}
          fullWidth
          size="md"
          onClick={() => handleSocialLogin('Google')}
        >
          Continue with Google
        </Button>
        <Button
          variant="light"
          leftSection={<IconBrandGithub size={16} />}
          fullWidth
          size="md"
          onClick={() => handleSocialLogin('GitHub')}
        >
          Continue with GitHub
        </Button>
      </Stack>

      <Text ta="center" size="sm">
        Don't have an account?{' '}
        <Anchor component={Link} to="/auth/signup" fw={500}>
          Create account
        </Anchor>
      </Text>
    </Stack>
  );
}