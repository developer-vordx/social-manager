import React, { useState } from 'react';
import PhoneInput from "react-phone-input-2";
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
  Progress,
  Paper,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { IconAlertCircle, IconBrandGoogle, IconBrandGithub, IconCheck, IconMail, IconLock, IconUser } from '@tabler/icons-react';

const getPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;
  return strength;
};

const getPasswordColor = (strength: number) => {
  if (strength < 50) return 'red';
  if (strength < 75) return 'yellow';
  return 'green';
};

export function Signup() {
  const { signup, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      confirmPassword: '',
      acceptTerms: false,
      marketingEmails: false,
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
      password: (value) => {
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
      // acceptTerms: (value) => (!value ? 'You must accept the terms and conditions' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setError(null);
      await signup(values.name, values.email, values.phone, values.password, values.confirmPassword);
      // Redirect to dashboard after successful signup
      navigate('/dashboard');
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  const handleSocialSignup = (provider: string) => {
    // Simulate social signup
    console.log(`Signing up with ${provider}`);
    setError('Social signup is not implemented yet. Please use email and password.');
  };

  const passwordStrength = getPasswordStrength(form.values.password);

  return (
    <Stack gap="lg">
      <div style={{ textAlign: 'center' }}>
        <Title order={2} mb="xs">
          Create your account
        </Title>
        <Text c="dimmed" size="sm">
          Join thousands of creators using EngagePro
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
            label="Full name"
            placeholder="John Doe"
            size="md"
            leftSection={<IconUser size={16} />}
            {...form.getInputProps('name')}
          />
          
          <TextInput
            label="Email address"
            placeholder="your@email.com"
            size="md"
            leftSection={<IconMail size={16} />}
            {...form.getInputProps('email')}
          />
          <div>
          <div className="mantine-input-wrapper mb-4">
            <label className="mantine-InputWrapper-label fw-500">Phone number</label>
            <PhoneInput
              country={'pk'}
              value={form.values.phone}
              onChange={(value) => form.setFieldValue('phone', value)}
              inputProps={{
                name: 'phone',
                required: true,
              }}
              containerClass="mantine-phone-container"
              inputClass="mantine-phone-input"
              buttonClass="mantine-phone-button"
            />
          </div>
            <PasswordInput
              label="Password"
              placeholder="Create a strong password"
              size="md"
              leftSection={<IconLock size={16} />}
              {...form.getInputProps('password')}
            />
            {form.values.password && (
              <div style={{ marginTop: 8 }}>
                <Progress
                  value={passwordStrength}
                  color={getPasswordColor(passwordStrength)}
                  size="xs"
                  mb={4}
                />
                <Text size="xs" c="dimmed">
                  Password strength: {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Medium' : 'Strong'}
                </Text>
              </div>
            )}
          </div>
          
          <PasswordInput
            label="Confirm password"
            placeholder="Confirm your password"
            size="md"
            leftSection={<IconLock size={16} />}
            {...form.getInputProps('confirmPassword')}
          />

          <Paper p="sm" withBorder>
            <Text size="xs" fw={500} mb="xs">Password requirements:</Text>
            <Stack gap={2}>
              <Text size="xs" c={form.values.password.length >= 8 ? 'green' : 'dimmed'}>
                {form.values.password.length >= 8 && <IconCheck size={12} style={{ marginRight: 4 }} />}
                At least 8 characters
              </Text>
              <Text size="xs" c={/[A-Z]/.test(form.values.password) ? 'green' : 'dimmed'}>
                {/[A-Z]/.test(form.values.password) && <IconCheck size={12} style={{ marginRight: 4 }} />}
                One uppercase letter
              </Text>
              <Text size="xs" c={/[0-9]/.test(form.values.password) ? 'green' : 'dimmed'}>
                {/[0-9]/.test(form.values.password) && <IconCheck size={12} style={{ marginRight: 4 }} />}
                One number
              </Text>
              <Text size="xs" c={/[^A-Za-z0-9]/.test(form.values.password) ? 'green' : 'dimmed'}>
                {/[^A-Za-z0-9]/.test(form.values.password) && <IconCheck size={12} style={{ marginRight: 4 }} />}
                One special character (recommended)
              </Text>
            </Stack>
          </Paper>

          {/* <Stack gap="xs">
            <Checkbox
              label={
                <Text size="sm">
                  I agree to the{' '}
                  <Anchor href="#" size="sm">Terms of Service</Anchor>
                  {' '}and{' '}
                  <Anchor href="#" size="sm">Privacy Policy</Anchor>
                </Text>
              }
              {...form.getInputProps('acceptTerms', { type: 'checkbox' })}
            />
            <Checkbox
              label="Send me product updates and marketing emails"
              {...form.getInputProps('marketingEmails', { type: 'checkbox' })}
            />
          </Stack> */}

          <Button 
            type="submit" 
            fullWidth 
            size="md"
            loading={loading}
            disabled={loading}
          >
            {loading ? <Loader size="sm" /> : 'Create account'}
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
          onClick={() => handleSocialSignup('Google')}
        >
          Continue with Google
        </Button>
        <Button
          variant="light"
          leftSection={<IconBrandGithub size={16} />}
          fullWidth
          size="md"
          onClick={() => handleSocialSignup('GitHub')}
        >
          Continue with GitHub
        </Button>
      </Stack>

      <Text ta="center" size="sm">
        Already have an account?{' '}
        <Anchor component={Link} to="/auth/login" fw={500}>
          Sign in
        </Anchor>
      </Text>
    </Stack>
  );
}