import { useState, createContext, useContext, ReactNode, useEffect } from 'react';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'post' | 'engagement' | 'team' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  avatar?: string;
  platform?: 'instagram' | 'twitter' | 'linkedin' | 'facebook';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock notifications for demo
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'engagement',
    title: 'High Engagement Alert',
    message: 'Your Instagram post "Product Launch 🚀" has reached 500+ likes!',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    actionUrl: '/dashboard/posts',
    actionLabel: 'View Post',
    platform: 'instagram',
  },
  {
    id: '2',
    type: 'post',
    title: 'Post Published Successfully',
    message: 'Your scheduled LinkedIn post has been published.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
    actionUrl: '/dashboard/posts',
    actionLabel: 'View Post',
    platform: 'linkedin',
  },
  {
    id: '3',
    type: 'team',
    title: 'New Team Member',
    message: 'Sarah Johnson has joined your team as an Editor.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    actionUrl: '/dashboard/team',
    actionLabel: 'View Team',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '4',
    type: 'warning',
    title: 'Posting Limit Warning',
    message: 'You\'ve used 80% of your monthly posting limit. Consider upgrading your plan.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
    actionUrl: '/dashboard/billing',
    actionLabel: 'Upgrade Plan',
  },
  {
    id: '5',
    type: 'success',
    title: 'Analytics Report Ready',
    message: 'Your weekly performance report is now available.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    actionUrl: '/dashboard/analytics',
    actionLabel: 'View Report',
  },
  {
    id: '6',
    type: 'system',
    title: 'Scheduled Maintenance',
    message: 'We\'ll be performing maintenance on Dec 20th from 2-4 AM UTC.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
  },
  {
    id: '7',
    type: 'error',
    title: 'Post Failed to Publish',
    message: 'Your Twitter post failed to publish due to API limits. Retrying in 1 hour.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    actionUrl: '/dashboard/posts',
    actionLabel: 'Retry Now',
    platform: 'twitter',
  },
];

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    // Return mock implementation for demo
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    
    const unreadCount = notifications.filter(n => !n.read).length;
    
    const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
      const newNotification: Notification = {
        ...notification,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        read: false,
      };
      setNotifications(prev => [newNotification, ...prev]);
    };
    
    const markAsRead = (id: string) => {
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    };
    
    const markAllAsRead = () => {
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
    };
    
    const deleteNotification = (id: string) => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    };
    
    const clearAll = () => {
      setNotifications([]);
    };
    
    return {
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll,
    };
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const clearAll = () => {
    setNotifications([]);
  };
  
  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications for demo
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const randomNotifications = [
          {
            type: 'engagement' as const,
            title: 'New Comment',
            message: 'Someone commented on your latest post!',
            platform: 'instagram' as const,
            actionUrl: '/dashboard/posts',
            actionLabel: 'View Comment',
          },
          {
            type: 'post' as const,
            title: 'Post Scheduled',
            message: 'Your post has been scheduled for tomorrow at 10 AM.',
            actionUrl: '/dashboard/calendar',
            actionLabel: 'View Calendar',
          },
          {
            type: 'info' as const,
            title: 'Tip of the Day',
            message: 'Try using trending hashtags to increase your reach!',
          },
        ];
        
        const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        addNotification(randomNotification);
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};