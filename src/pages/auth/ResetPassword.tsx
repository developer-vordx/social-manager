import React, { useState, useEffect } from 'react';
import {
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
  Alert,
  Loader,
  Progress,
  ThemeIcon,
  Paper,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';

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

export function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const token = searchParams.get('token');
  
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) => {
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  useEffect(() => {
    // Validate token on component mount
    const validateToken = async () => {
      if (!token) {
        setTokenValid(false);
        return;
      }

      try {
        // Simulate token validation API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, consider token valid if it's not empty
        setTokenValid(true);
      } catch (error) {
        setTokenValid(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setError(null);
      setLoading(true);
      
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state while validating token
  if (tokenValid === null) {
    return (
      <Stack gap="lg" align="center">
        <Loader size="lg" />
        <Text c="dimmed">Validating reset token...</Text>
      </Stack>
    );
  }

  // Invalid token state
  if (tokenValid === false) {
    return (
      <Stack gap="lg" align="center">
        <ThemeIcon size={60} variant="light" color="red">
          <IconX size={30} />
        </ThemeIcon>
        
        <div style={{ textAlign: 'center' }}>
          <Title order={2} mb="xs">
            Invalid or expired link
          </Title>
          <Text c="dimmed" size="sm" mb="lg">
            This password reset link is invalid or has expired. Please request a new one.
          </Text>
        </div>

        <Button
          component={Link}
          to="/auth/forgot-password"
          variant="light"
          fullWidth
        >
          Request new reset link
        </Button>

        <Text ta="center" size="sm">
          <Anchor component={Link} to="/auth/login" fw={500}>
            Back to login
          </Anchor>
        </Text>
      </Stack>
    );
  }

  // Success state
  if (success) {
    return (
      <Stack gap="lg" align="center">
        <ThemeIcon size={60} variant="light" color="green">
          <IconCheck size={30} />
        </ThemeIcon>
        
        <div style={{ textAlign: 'center' }}>
          <Title order={2} mb="xs">
            Password reset successful
          </Title>
          <Text c="dimmed" size="sm" mb="lg">
            Your password has been successfully reset. You will be redirected to the login page shortly.
          </Text>
        </div>

        <Button
          component={Link}
          to="/auth/login"
          fullWidth
        >
          Continue to login
        </Button>
      </Stack>
    );
  }

  const passwordStrength = getPasswordStrength(form.values.password);

  return (
    <Stack gap="lg">
      <div style={{ textAlign: 'center' }}>
        <Title order={2} mb="xs">
          Reset your password
        </Title>
        <Text c="dimmed" size="sm">
          Enter your new password below
        </Text>
      </div>

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
          {error}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <div>
            <PasswordInput
              label="New password"
              placeholder="Create a strong password"
              size="md"
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
            label="Confirm new password"
            placeholder="Confirm your password"
            size="md"
            {...form.getInputProps('confirmPassword')}
          />

          <Paper p="sm" withBorder>
            <Text size="xs" fw={500} mb="xs">Password requirements:</Text>
            <Stack gap={2}>
              <Text size="xs" c={form.values.password.length >= 8 ? 'green' : 'dimmed'}>
                • At least 8 characters
              </Text>
              <Text size="xs" c={/[A-Z]/.test(form.values.password) ? 'green' : 'dimmed'}>
                • One uppercase letter
              </Text>
              <Text size="xs" c={/[0-9]/.test(form.values.password) ? 'green' : 'dimmed'}>
                • One number
              </Text>
              <Text size="xs" c={/[^A-Za-z0-9]/.test(form.values.password) ? 'green' : 'dimmed'}>
                • One special character (recommended)
              </Text>
            </Stack>
          </Paper>

          <Button 
            type="submit" 
            fullWidth 
            size="md"
            loading={loading}
            disabled={loading}
          >
            {loading ? <Loader size="sm" /> : 'Reset password'}
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