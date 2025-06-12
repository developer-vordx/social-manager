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

export function Signup() {
  const { signup } = useAuth();
  
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await signup(values.name, values.email, values.password);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <Stack>
      <Title order={2} ta="center">
        Create account
      </Title>
      <Text c="dimmed" size="sm" ta="center">
        Join EngagePro and start creating amazing content
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Full name"
            placeholder="John Doe"
            {...form.getInputProps('name')}
          />
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
          <PasswordInput
            label="Confirm password"
            placeholder="Confirm your password"
            {...form.getInputProps('confirmPassword')}
          />
          <Button type="submit" fullWidth>
            Create account
          </Button>
        </Stack>
      </form>

      <Text ta="center" size="sm">
        Already have an account?{' '}
        <Anchor component={Link} to="/auth/login">
          Sign in
        </Anchor>
      </Text>
    </Stack>
  );
}