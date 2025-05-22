export  const mockConversations = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Michael Davis',
      email: 'michael.davis@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGRpdmVyc2UlMjBwZW9wbGV8ZW58MHx8fHwxNzQ3NjQ1ODcyfDA&ixlib=rb-4.1.0&fit=fillmax&h=200&w=200',
      online: true,
      lastSeen: new Date().setHours(new Date().getHours() - 1),
      customerSince: new Date().setMonth(new Date().getMonth() - 3),
      location: 'San Francisco, CA',
      browser: 'Chrome',
      os: 'Windows',
      sessionDuration: '14m 23s'
    },
    assignedAgent: null,
    lastMessage: 'I need help with a refund for my recent purchase.',
    lastMessageTime: new Date().setHours(new Date().getHours() - 0.5),
    status: 'open',
    tags: ['refund', 'urgent'],
    messages: [
      {
        id: 'm1',
        content: 'Hello, I need help with a refund for my recent purchase.',
        timestamp: new Date().setHours(new Date().getHours() - 0.5),
        sender: 'user',
        status: 'delivered'
      },
      {
        id: 'm2',
        content: 'Hi Michael, I\'d be happy to help you with the refund. Could you provide your order number please?',
        timestamp: new Date().setMinutes(new Date().getMinutes() - 25),
        sender: 'ai',
        status: 'delivered'
      },
      {
        id: 'm3',
        content: 'My order number is ORD-7829354.',
        timestamp: new Date().setMinutes(new Date().getMinutes() - 20),
        sender: 'user',
        status: 'delivered'
      }
    ],
    notes: [
      {
        id: 'n1',
        content: 'Customer has had 2 previous refund requests in the past month. May need to escalate to billing department.',
        timestamp: new Date().setHours(new Date().getHours() - 1),
        author: 'System'
      }
    ]
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Sara Ahmed',
      email: 'sara.ahmed@example.com',
      avatar: 'https://images.unsplash.com/photo-1573496358773-bdcdbd984982?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGRpdmVyc2UlMjBwZW9wbGV8ZW58MHx8fHwxNzQ3NjQ1ODcyfDA&ixlib=rb-4.1.0&fit=fillmax&h=200&w=200',
      online: false,
      lastSeen: new Date().setHours(new Date().getHours() - 2),
      customerSince: new Date().setYear(new Date().getFullYear() - 1),
      location: 'London, UK',
      browser: 'Safari',
      os: 'Mac OS'
    },
    assignedAgent: null,
    lastMessage: 'When will the premium features be available?',
    lastMessageTime: new Date().setHours(new Date().getHours() - 3),
    status: 'open',
    tags: ['premium', 'inquiry'],
    messages: [
      {
        id: 'm1',
        content: 'Hello, I\'m interested in your premium plan. When will the new features be available?',
        timestamp: new Date().setHours(new Date().getHours() - 3),
        sender: 'user',
        status: 'delivered'
      },
      {
        id: 'm2',
        content: 'Hi Sara, thanks for your interest in our premium plan! The new features are scheduled to roll out next week. Would you like me to send you a preview?',
        timestamp: new Date().setHours(new Date().getHours() - 2.8),
        sender: 'ai',
        status: 'delivered'
      },
      {
        id: 'm3',
        content: 'Yes, please. That would be helpful!',
        timestamp: new Date().setHours(new Date().getHours() - 2.7),
        sender: 'user',
        status: 'delivered'
      }
    ],
    notes: [
      {
        id: 'n1',
        content: 'VIP customer, please prioritize responses and offer exclusive beta access where possible.',
        timestamp: new Date().setHours(new Date().getHours() - 3),
        author: 'Account Manager'
      }
    ]
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      avatar: 'https://images.unsplash.com/photo-1474176857210-7287d38d27c6?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGRpdmVyc2UlMjBwZW9wbGV8ZW58MHx8fHwxNzQ3NjQ1ODcyfDA&ixlib=rb-4.1.0&fit=fillmax&h=200&w=200',
      online: true,
      lastSeen: new Date().setMinutes(new Date().getMinutes() - 5),
      customerSince: new Date().setMonth(new Date().getMonth() - 6)
    },
    assignedAgent: {
      id: 'a2',
      name: 'Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGRpdmVyc2UlMjBwZW9wbGV8ZW58MHx8fHwxNzQ3NjQ1ODcyfDA&ixlib=rb-4.1.0&fit=fillmax&h=200&w=200',
    },
    lastMessage: 'I\'m having trouble connecting my account to the API.',
    lastMessageTime: new Date().setHours(new Date().getHours() - 5),
    status: 'open',
    tags: ['technical', 'API'],
    messages: [
      {
        id: 'm1',
        content: 'Hello, I\'m having trouble connecting my account to the API. I keep getting a 403 error.',
        timestamp: new Date().setHours(new Date().getHours() - 5),
        sender: 'user',
        status: 'delivered'
      },
      {
        id: 'm2',
        content: 'Hi James, I\'m sorry to hear you\'re having issues with the API. I\'ll need to check your account permissions. Can you please provide your API key (last 4 digits only)?',
        timestamp: new Date().setHours(new Date().getHours() - 4.9),
        sender: 'agent',
        status: 'delivered'
      },
      {
        id: 'm3',
        content: 'The last 4 digits are 8542.',
        timestamp: new Date().setHours(new Date().getHours() - 4.8),
        sender: 'user',
        status: 'delivered'
      },
      {
        id: 'm4',
        content: 'Thank you, I\'ve checked your account and it looks like your API key needs to be refreshed. I\'ve generated a new key for you. Please check your email in the next few minutes.',
        timestamp: new Date().setHours(new Date().getHours() - 4.7),
        sender: 'agent',
        status: 'delivered'
      }
    ]
  },
  {
    id: '4',
    user: {
      id: 'u4',
      name: 'Priya Mehta',
      email: 'priya.mehta@example.com',
      avatar: 'https://images.unsplash.com/photo-1573496130141-209d200cebd8?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGRpdmVyc2UlMjBwZW9wbGV8ZW58MHx8fHwxNzQ3NjQ1ODcyfDA&ixlib=rb-4.1.0&fit=fillmax&h=200&w=200',
      online: false,
      lastSeen: new Date().setHours(new Date().getHours() - 12)
    },
    assignedAgent: null,
    lastMessage: 'How do I export all my data?',
    lastMessageTime: new Date().setDate(new Date().getDate() - 1),
    status: 'open',
    tags: ['export', 'data'],
    messages: [
      {
        id: 'm1',
        content: 'Hi there, I need to export all my data from my account. How can I do this?',
        timestamp: new Date().setDate(new Date().getDate() - 1),
        sender: 'user',
        status: 'delivered'
      },
      {
        id: 'm2',
        content: 'Hello Priya, you can export your data by going to Settings > Privacy > Data Export. Would you like me to guide you through the process?',
        timestamp: new Date().setDate(new Date().getDate() - 1),
        sender: 'ai',
        status: 'delivered'
      }
    ]
  },
  {
    id: '5',
    user: {
      id: 'u5',
      name: 'Carlos Rodriguez',
      email: 'carlos.rodriguez@example.com',
      avatar: 'https://api.dicebear.com/6.x/personas/svg?seed=carlos',
      online: false,
      lastSeen: new Date().setDate(new Date().getDate() - 3)
    },
    assignedAgent: null,
    lastMessage: 'Can I upgrade my plan mid-cycle?',
    lastMessageTime: new Date().setDate(new Date().getDate() - 2),
    status: 'closed',
    tags: ['billing', 'upgrade'],
    messages: [
      {
        id: 'm1',
        content: 'Hello, I currently have the basic plan but I need more features. Can I upgrade to pro mid-cycle?',
        timestamp: new Date().setDate(new Date().getDate() - 2),
        sender: 'user',
        status: 'delivered'
      },
      {
        id: 'm2',
        content: 'Hi Carlos, yes you can upgrade at any time! The billing will be prorated for the remainder of your current cycle. Would you like me to help you with the upgrade?',
        timestamp: new Date().setDate(new Date().getDate() - 2),
        sender: 'ai',
        status: 'delivered'
      },
      {
        id: 'm3',
        content: 'That sounds good. Let\'s proceed with the upgrade.',
        timestamp: new Date().setDate(new Date().getDate() - 2),
        sender: 'user',
        status: 'delivered'
      },
      {
        id: 'm4',
        content: 'Great! I\'ve upgraded your account to the Pro plan. You should receive an email confirmation shortly. The prorated amount of $29.50 will be charged to your card ending in 4382. Is there anything else I can help you with?',
        timestamp: new Date().setDate(new Date().getDate() - 2),
        sender: 'ai',
        status: 'delivered'
      },
      {
        id: 'm5',
        content: 'No, that\'s all for now. Thank you!',
        timestamp: new Date().setDate(new Date().getDate() - 2),
        sender: 'user',
        status: 'delivered'
      }
    ],
    notes: [
      {
        id: 'n1',
        content: 'Customer successfully upgraded from Basic to Pro plan. Prorated charge of $29.50 processed.',
        timestamp: new Date().setDate(new Date().getDate() - 2),
        author: 'Billing Team'
      }
    ]
  }
];

export const mockAgents = [
  {
    id: 'a1',
    name: 'Alex Johnson',
    avatar: 'https://api.dicebear.com/6.x/personas/svg?seed=alex',
    role: 'Support Lead',
    status: 'online'
  },
  {
    id: 'a2',
    name: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGRpdmVyc2UlMjBwZW9wbGV8ZW58MHx8fHwxNzQ3NjQ1ODcyfDA&ixlib=rb-4.1.0&fit=fillmax&h=200&w=200',
    role: 'Technical Support',
    status: 'online'
  },
  {
    id: 'a3',
    name: 'Marcus Williams',
    avatar: 'https://api.dicebear.com/6.x/personas/svg?seed=marcus',
    role: 'Billing Support',
    status: 'away'
  }
];
 