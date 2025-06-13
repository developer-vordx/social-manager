import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Paper, Center, Stack, Text, Group, Box } from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';

export function AuthLayout() {
  return (
    <Box
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Container size={480} w="100%">
        <Center mb={40}>
          <Group gap="sm">
            <IconSparkles size={32} color="white" />
            <Text size="xl" fw={700} c="white">
              EngagePro
            </Text>
          </Group>
        </Center>

        <Paper 
          shadow="xl" 
          p={40} 
          radius="lg"
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Outlet />
        </Paper>

        <Text ta="center" mt="lg" size="sm" c="white" style={{ opacity: 0.8 }}>
          © 2024 EngagePro. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}