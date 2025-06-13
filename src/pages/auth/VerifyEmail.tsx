import React, { useState, useEffect } from 'react';
import {
  Button,
  Title,
  Text,
  Anchor,
  Stack,
  Alert,
  Loader,
  ThemeIcon,
  Paper,
} from '@mantine/core';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { IconAlertCircle, IconCheck, IconX, IconMail } from '@tabler/icons-react';

export function VerifyEmail() {
  const { verifyEmail, resendVerification, loading, user } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'resend'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const token = searchParams.get('token');

  useEffect(() => {
    const handleVerification = async () => {
      if (!token) {
        setVerificationStatus('error');
        setError('Invalid verification link');
        return;
      }

      try {
        await verifyEmail(token);
        setVerificationStatus('success');
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (error) {
        setVerificationStatus('error');
        setError('Failed to verify email. The link may be expired or invalid.');
      }
    };

    handleVerification();
  }, [token, verifyEmail, navigate]);

  const handleResendVerification = async () => {
    try {
      setError(null);
      await resendVerification();
      setVerificationStatus('resend');
    } catch (error) {
      setError('Failed to resend verification email. Please try again.');
    }
  };

  if (verificationStatus === 'loading') {
    return (
      <Stack gap="lg" align="center">
        <Loader size="lg" />
        <Text c="dimmed">Verifying your email address...</Text>
      </Stack>
    );
  }

  if (verificationStatus === 'success') {
    return (
      <Stack gap="lg" align="center">
        <ThemeIcon size={60} variant="light" color="green">
          <IconCheck size={30} />
        </ThemeIcon>
        
        <div style={{ textAlign: 'center' }}>
          <Title order={2} mb="xs">
            Email verified successfully!
          </Title>
          <Text c="dimmed" size="sm" mb="lg">
            Your email address has been verified. You will be redirected to your dashboard shortly.
          </Text>
        </div>

        <Button
          component={Link}
          to="/"
          fullWidth
        >
          Continue to Dashboard
        </Button>
      </Stack>
    );
  }

  if (verificationStatus === 'resend') {
    return (
      <Stack gap="lg" align="center">
        <ThemeIcon size={60} variant="light" color="blue">
          <IconMail size={30} />
        </ThemeIcon>
        
        <div style={{ textAlign: 'center' }}>
          <Title order={2} mb="xs">
            Verification email sent
          </Title>
          <Text c="dimmed" size="sm" mb="lg">
            We've sent a new verification email to {user?.email}. Please check your inbox and click the verification link.
          </Text>
        </div>

        <Paper p="md" withBorder w="100%">
          <Text size="sm" ta="center" mb="md">
            Didn't receive the email? Check your spam folder.
          </Text>
          <Button
            variant="light"
            fullWidth
            onClick={handleResendVerification}
            loading={loading}
          >
            Send again
          </Button>
        </Paper>

        <Text ta="center" size="sm">
          <Anchor component={Link} to="/auth/login" fw={500}>
            Back to login
          </Anchor>
        </Text>
      </Stack>
    );
  }

  return (
    <Stack gap="lg" align="center">
      <ThemeIcon size={60} variant="light" color="red">
        <IconX size={30} />
      </ThemeIcon>
      
      <div style={{ textAlign: 'center' }}>
        <Title order={2} mb="xs">
          Verification failed
        </Title>
        <Text c="dimmed" size="sm" mb="lg">
          {error || 'Unable to verify your email address. The link may be expired or invalid.'}
        </Text>
      </div>

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" w="100%">
          {error}
        </Alert>
      )}

      <Stack w="100%">
        <Button
          variant="light"
          fullWidth
          onClick={handleResendVerification}
          loading={loading}
        >
          Resend verification email
        </Button>
        
        <Button
          component={Link}
          to="/auth/login"
          variant="outline"
          fullWidth
        >
          Back to login
        </Button>
      </Stack>
    </Stack>
  );
}