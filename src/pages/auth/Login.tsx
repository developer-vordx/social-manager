import React from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function Login() {
  const { login } = useAuth();
  
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Stack>
      <Title order={2} ta="center">
        Welcome back
      </Title>
      <Text c="dimmed" size="sm" ta="center">
        Sign in to your EngagePro account
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth>
            Sign in
          </Button>
        </Stack>
      </form>

      <Text ta="center" size="sm">
        Don't have an account?{' '}
        <Anchor component={Link} to="/auth/signup">
          Sign up
        </Anchor>
      </Text>
    </Stack>
  );
}