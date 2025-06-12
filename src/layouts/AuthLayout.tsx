import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Paper, Center, Stack, Text, Group } from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';

export function AuthLayout() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Container size={420} my={40}>
        <Center mb={40}>
          <Group gap="sm">
            <IconSparkles size={32} color="white" />
            <Text size="xl" fw={700} c="white">
              EngagePro
            </Text>
          </Group>
        </Center>

        <Paper shadow="lg" p={30} radius="md">
          <Outlet />
        </Paper>
      </Container>
    </div>
  );
}